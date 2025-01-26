<?php
// balance-api.php

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database configuration
$host = "localhost";
$db_name = "finance_dashboard";
$username = "root";
$password = "";

try {
    // Create database connection
    $conn = new PDO(
        "mysql:host=" . $host . ";dbname=" . $db_name,
        $username,
        $password
    );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get current month for monthly calculations
    $currentMonth = date('Y-m');
    
    // Get monthly income
    $incomeQuery = "SELECT COALESCE(SUM(amount), 0) as total 
                   FROM transactions 
                   WHERE type = 'income' 
                   AND DATE_FORMAT(date, '%Y-%m') = :month";
    
    $inStmt = $conn->prepare($incomeQuery);
    $inStmt->bindParam(":month", $currentMonth);
    $inStmt->execute();
    $monthlyIncome = $inStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get monthly spending
    $spendingQuery = "SELECT COALESCE(SUM(amount), 0) as total 
                     FROM transactions 
                     WHERE type = 'expense' 
                     AND DATE_FORMAT(date, '%Y-%m') = :month";
    
    $expStmt = $conn->prepare($spendingQuery);
    $expStmt->bindParam(":month", $currentMonth);
    $expStmt->execute();
    $monthlySpending = $expStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get total balance (all time)
    $balanceQuery = "SELECT 
                        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 'income') -
                        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 'expense') 
                    as balance";
    
    $balStmt = $conn->prepare($balanceQuery);
    $balStmt->execute();
    $totalBalance = $balStmt->fetch(PDO::FETCH_ASSOC)['balance'];

    // Format response
    $response = [
        'status' => 'success',
        'data' => [
            'totalBalance' => '$' . number_format($totalBalance, 2),
            'monthlyIncome' => '+$' . number_format($monthlyIncome, 2),
            'monthlySpending' => '-$' . number_format($monthlySpending, 2)
        ]
    ];

} catch(PDOException $e) {
    $response = [
        'status' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ];
}

// Send JSON response
echo json_encode($response);

/*
To set up the database, run these SQL commands:

CREATE DATABASE IF NOT EXISTS finance_dashboard;
USE finance_dashboard;

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATETIME NOT NULL,
    description VARCHAR(255)
);

-- Sample data (optional)
INSERT INTO transactions (type, amount, date, description) VALUES
('income', 2500.00, '2025-01-01 00:00:00', 'Monthly Salary'),
('expense', 1000.00, '2025-01-05 00:00:00', 'Rent'),
('expense', 500.00, '2025-01-10 00:00:00', 'Groceries'),
('income', 300.00, '2025-01-15 00:00:00', 'Freelance Work');
*/