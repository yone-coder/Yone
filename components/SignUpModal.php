<?php
session_start();

// Database connection details
$host = "sql107.infinityfree.com";
$username = "if0_36183206";
$password = "prxjFDPt6NGLU";
$dbname = "if0_36183206_Gangbang";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "All fields are required"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit;
    }

    // Check if email exists
    $emailCheckSql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($emailCheckSql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        $stmt->close();
        exit;
    }
    $stmt->close();

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the user into the database
    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        // Get the inserted user's ID
        $userId = $stmt->insert_id;
        
        // Create session for the user
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;
        
        // Return user data for frontend
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Account created successfully",
            "user" => [
                "id" => $userId,
                "name" => $name,
                "email" => $email,
                // Add any other user data you need
                "created_at" => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "message" => "Failed to create account"
        ]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false, 
        "message" => "Method not allowed"
    ]);
}

$conn->close();
?>