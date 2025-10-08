<?php
// Konfigurasi MySQL
define('DB_HOST', 'localhost');      // Host MySQL
define('DB_USER', 'root');           // Username MySQL  
define('DB_PASS', 'admin123');    // Password MySQL kamu
define('DB_NAME', 'perfume_website'); // Nama database

// Upload settings
define('UPLOAD_PATH', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB

// JWT Secret (untuk authentication)
define('JWT_SECRET', 'luxury_perfume_secret_2025');

// CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>