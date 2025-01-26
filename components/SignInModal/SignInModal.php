<?php
// SignInModal.php
header('Content-Type: application/json');

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Database configuration - Move this to a separate config file in production
define('DB_HOST', 'sql107.infinityfree.com');
define('DB_NAME', 'if0_36183206_Gangbang');
define('DB_USER', 'if0_36183206');
define('DB_PASS', 'prxjFDPt6NGLU');

class SignInModalHandler {
    private $db;

    public function __construct() {
        try {
            $this->db = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                ]
            );
        } catch (PDOException $e) {
            $this->sendResponse(false, 'Database connection failed');
            return;
        }
    }

    public function handleRequest() {
        try {
            // Get request data
            $rawData = file_get_contents('php://input');
            $data = json_decode($rawData, true);

            if (!$data) {
                $data = $_POST;
            }

            // Validate request
            if (!isset($data['action'])) {
                throw new Exception('No action specified');
            }

            // Route to appropriate method
            switch ($data['action']) {
                case 'login':
                    return $this->handleLogin($data);
                case 'forgot_password':
                    return $this->handleForgotPassword($data);
                default:
                    throw new Exception('Invalid action');
            }
        } catch (Exception $e) {
            $this->sendResponse(false, $e->getMessage());
        }
    }

    private function handleLogin($data) {
        if (!isset($data['email']) || !isset($data['password'])) {
            throw new Exception('Email and password are required');
        }

        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['password'])) {
            throw new Exception('Invalid email or password');
        }

        // Remove sensitive data
        unset($user['password']);
        
        // Set session data
        session_start();
        $_SESSION['user'] = $user;
        $_SESSION['last_activity'] = time();

        // Update last login
        $stmt = $this->db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$user['id']]);

        $this->sendResponse(true, 'Login successful', ['user' => $user]);
    }

    private function sendResponse($success, $message, $data = []) {
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }
}

// Initialize and handle request
$handler = new SignInModalHandler();
$handler->handleRequest();