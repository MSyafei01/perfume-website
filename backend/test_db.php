<?php
require_once 'config.php';

$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
} else {
    echo "✅ MySQL Connected Successfully!";
    
    // Test query
    $result = $db->query("SELECT COUNT(*) as total FROM products");
    $row = $result->fetch_assoc();
    echo "<br>📊 Total Products: " . $row['total'];
}
?>