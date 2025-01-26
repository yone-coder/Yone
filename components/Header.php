<?php
// header_api.php

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
define('DB_HOST', 'sql107.infinityfree.com');
define('DB_NAME', 'if0_36183206_Gangbang');
define('DB_USER', 'if0_36183206');
define('DB_PASS', 'prxjFDPt6NGLU');

class HeaderAPIHandler {
    private $db;
    private $userId;

    public function __construct() {
        session_start();
        
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
            
            $this->userId = $_SESSION['user_id'] ?? null;
        } catch (PDOException $e) {
            $this->sendResponse(false, 'Database connection failed', null, 500);
            exit;
        }
    }

    public function handleRequest() {
        try {
            // Get request method and data
            $method = $_SERVER['REQUEST_METHOD'];
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Handle preflight requests
            if ($method === 'OPTIONS') {
                header('HTTP/1.1 200 OK');
                exit;
            }

            // Route requests
            switch ($method) {
                case 'GET':
                    $this->handleGET();
                    break;
                case 'POST':
                    $this->handlePOST($data);
                    break;
                default:
                    throw new Exception('Invalid request method');
            }
        } catch (Exception $e) {
            $this->sendResponse(false, $e->getMessage(), null, 400);
        }
    }

    private function handleGET() {
        $action = $_GET['action'] ?? '';

        switch ($action) {
            case 'get_user_data':
                $this->getUserData();
                break;
            case 'get_notifications':
                $this->getNotifications();
                break;
            default:
                throw new Exception('Invalid GET action');
        }
    }

    private function handlePOST($data) {
        if (!isset($data['action'])) {
            throw new Exception('No action specified');
        }

        switch ($data['action']) {
            case 'logout':
                $this->handleLogout();
                break;
            case 'update_notification_status':
                $this->updateNotificationStatus($data);
                break;
            case 'search':
                $this->handleSearch($data);
                break;
            default:
                throw new Exception('Invalid POST action');
        }
    }

    private function getUserData() {
        if (!$this->userId) {
            $this->sendResponse(false, 'Not authenticated', null, 401);
            return;
        }

        try {
            $stmt = $this->db->prepare("
                SELECT id, name, email, photo_url, created_at, last_login
                FROM users
                WHERE id = ?
            ");
            $stmt->execute([$this->userId]);
            $user = $stmt->fetch();

            if (!$user) {
                throw new Exception('User not found');
            }

            $this->sendResponse(true, 'User data retrieved successfully', ['user' => $user]);
        } catch (Exception $e) {
            $this->sendResponse(false, 'Failed to retrieve user data', null, 500);
        }
    }

    private function getNotifications() {
        if (!$this->userId) {
            $this->sendResponse(false, 'Not authenticated', null, 401);
            return;
        }

        try {
            $stmt = $this->db->prepare("
                SELECT id, message, type, created_at, is_read
                FROM notifications
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT 10
            ");
            $stmt->execute([$this->userId]);
            $notifications = $stmt->fetchAll();

            // Get unread count
            $stmt = $this->db->prepare("
                SELECT COUNT(*) as count
                FROM notifications
                WHERE user_id = ? AND is_read = 0
            ");
            $stmt->execute([$this->userId]);
            $unreadCount = $stmt->fetch()['count'];

            $this->sendResponse(true, 'Notifications retrieved successfully', [
                'notifications' => $notifications,
                'unread_count' => $unreadCount
            ]);
        } catch (Exception $e) {
            $this->sendResponse(false, 'Failed to retrieve notifications', null, 500);
        }
    }

    private function handleLogout() {
        try {
            // Clear session
            session_destroy();
            
            // Update last_logout in database
            if ($this->userId) {
                $stmt = $this->db->prepare("
                    UPDATE users 
                    SET last_logout = NOW() 
                    WHERE id = ?
                ");
                $stmt->execute([$this->userId]);
            }

            $this->sendResponse(true, 'Logged out successfully');
        } catch (Exception $e) {
            $this->sendResponse(false, 'Logout failed', null, 500);
        }
    }

    private function updateNotificationStatus($data) {
        if (!$this->userId) {
            $this->sendResponse(false, 'Not authenticated', null, 401);
            return;
        }

        try {
            $notificationId = $data['notification_id'] ?? null;
            $status = $data['is_read'] ?? null;

            if (!$notificationId || !isset($status)) {
                throw new Exception('Invalid notification data');
            }

            $stmt = $this->db->prepare("
                UPDATE notifications
                SET is_read = ?, updated_at = NOW()
                WHERE id = ? AND user_id = ?
            ");
            $stmt->execute([$status, $notificationId, $this->userId]);

            $this->sendResponse(true, 'Notification status updated successfully');
        } catch (Exception $e) {
            $this->sendResponse(false, 'Failed to update notification status', null, 500);
        }
    }

    private function handleSearch($data) {
        if (!$this->userId) {
            $this->sendResponse(false, 'Not authenticated', null, 401);
            return;
        }

        try {
            $query = $data['query'] ?? '';
            if (empty($query)) {
                throw new Exception('Search query is required');
            }

            // Log search query
            $stmt = $this->db->prepare("
                INSERT INTO search_logs (user_id, query, created_at)
                VALUES (?, ?, NOW())
            ");
            $stmt->execute([$this->userId, $query]);

            // Perform search (customize based on your needs)
            $stmt = $this->db->prepare("
                SELECT id, title, type, url
                FROM searchable_content
                WHERE MATCH(title, content) AGAINST (? IN BOOLEAN MODE)
                LIMIT 10
            ");
            $stmt->execute([$query]);
            $results = $stmt->fetchAll();

            $this->sendResponse(true, 'Search completed', ['results' => $results]);
        } catch (Exception $e) {
            $this->sendResponse(false, 'Search failed', null, 500);
        }
    }

    private function sendResponse($success, $message, $data = null, $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }

    private function validateSession() {
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
            session_destroy();
            return false;
        }
        $_SESSION['last_activity'] = time();
        return true;
    }
}

// Initialize and handle request
$handler = new HeaderAPIHandler();
$handler->handleRequest();