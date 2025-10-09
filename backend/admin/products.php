    <?php
    session_start();
    require_once '../config.php';
    require_once '../api/config/database.php';

    // Check login
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        header('Location: index.php');
        exit;
    }

    $db = new Database();
    $message = '';

    // Handle add product
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
        $name = $db->escape($_POST['name']);
        $description = $db->escape($_POST['description']);
        $price = floatval($_POST['price']);
        $original_price = !empty($_POST['original_price']) ? floatval($_POST['original_price']) : null;
        $category = $db->escape($_POST['category']);
        $best_seller = isset($_POST['best_seller']) ? 1 : 0;
        $stock = intval($_POST['stock']);
        $status = $_POST['status'];
        
        // Handle notes
        $notes = [];
        if (!empty($_POST['note1'])) $notes[] = $db->escape($_POST['note1']);
        if (!empty($_POST['note2'])) $notes[] = $db->escape($_POST['note2']);
        if (!empty($_POST['note3'])) $notes[] = $db->escape($_POST['note3']);
        $notes_json = json_encode($notes);
        
        $image_path = '/images/perfumes/default.jpg'; // Default image
        
        $sql = "INSERT INTO products (name, description, price, original_price, image, category, best_seller, notes, stock, status) 
                VALUES ('$name', '$description', $price, " . ($original_price ?: 'NULL') . ", '$image_path', '$category', $best_seller, '$notes_json', $stock, '$status')";
        
        if ($db->query($sql)) {
            $message = "✅ Product added successfully!";
        } else {
            $message = "❌ Error: " . $db->getError();
        }
    }

    // Handle delete product
    if (isset($_GET['delete'])) {
        $id = intval($_GET['delete']);
        $sql = "DELETE FROM products WHERE id = $id";
        if ($db->query($sql)) {
            $message = "✅ Product deleted successfully!";
        } else {
            $message = "❌ Error deleting product: " . $db->getError();
        }
    }

    // Get all products
    $products = $db->query("SELECT * FROM products ORDER BY created_at DESC");
    ?>

    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Manage Products - Luxury Perfume Admin</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #f5f5f5;
            }
            .header {
                background: #2A2D34;
                color: white;
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo { font-size: 1.5rem; font-weight: bold; }
            .logo span { color: #D4AF37; }
            .nav a {
                color: white;
                text-decoration: none;
                margin-left: 1rem;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                transition: background 0.3s;
            }
            .nav a:hover, .nav a.active {
                background: #D4AF37;
            }
            .container {
                max-width: 1200px;
                margin: 2rem auto;
                padding: 0 2rem;
            }
            .message {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 5px;
                text-align: center;
            }
            .message.success { background: #d4edda; color: #155724; }
            .message.error { background: #f8d7da; color: #721c24; }
            .section {
                background: white;
                padding: 1.5rem;
                margin-bottom: 2rem;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .section h2 {
                margin-bottom: 1rem;
                color: #2A2D34;
                border-bottom: 2px solid #D4AF37;
                padding-bottom: 0.5rem;
            }
            .form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            .form-group { margin-bottom: 1rem; }
            label { 
                display: block; 
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: #333;
            }
            input, select, textarea {
                width: 100%;
                padding: 10px;
                border: 2px solid #e1e1e1;
                border-radius: 5px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            input:focus, select:focus, textarea:focus {
                outline: none;
                border-color: #D4AF37;
            }
            .checkbox-group {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .checkbox-group input {
                width: auto;
            }
            .btn {
                background: #D4AF37;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                transition: background 0.3s;
            }
            .btn:hover {
                background: #b8941f;
            }
            .btn-danger {
                background: #dc3545;
            }
            .btn-danger:hover {
                background: #c82333;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
            }
            th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #eee;
            }
            th {
                background: #f8f9fa;
                font-weight: 600;
                color: #2A2D34;
            }
            .status-active { color: #28a745; }
            .status-inactive { color: #dc3545; }
            .best-seller { color: #D4AF37; font-weight: bold; }
            .actions { display: flex; gap: 0.5rem; }
            .actions .btn { padding: 5px 10px; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">Luxury<span>Perfume</span> Admin</div>
            <div class="nav">
                <a href="dashboard.php">Dashboard</a>
                <a href="products.php" class="active">Products</a