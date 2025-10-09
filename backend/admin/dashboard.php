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

    // Get stats
    $products_count = $db->query("SELECT COUNT(*) as count FROM products")->fetch_assoc()['count'];
    $orders_count = $db->query("SELECT COUNT(*) as count FROM orders")->fetch_assoc()['count'];
    $recent_orders = $db->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5");
    ?>

    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - Luxury Perfume Admin</title>
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
            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .stat-card {
                background: white;
                padding: 1.5rem;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                text-align: center;
            }
            .stat-number {
                font-size: 2rem;
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 0.5rem;
            }
            .stat-label {
                color: #666;
                font-size: 0.9rem;
            }
            .recent-orders {
                background: white;
                padding: 1.5rem;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .recent-orders h2 {
                margin-bottom: 1rem;
                color: #2A2D34;
            }
            table {
                width: 100%;
                border-collapse: collapse;
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
            .status-pending { color: #f39c12; }
            .status-confirmed { color: #27ae60; }
            .btn {
                background: #D4AF37;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                font-size: 0.9rem;
                cursor: pointer;
                transition: background 0.3s;
            }
            .btn:hover {
                background: #b8941f;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">Luxury<span>Perfume</span> Admin</div>
            <div class="nav">
                <a href="dashboard.php" class="active">Dashboard</a>
                <a href="products.php">Products</a>
                <a href="orders.php">Orders</a>
                <a href="?logout=true">Logout</a>
            </div>
        </div>

        <div class="container">
            <h1>Welcome, <?php echo $_SESSION['admin_name']; ?>!</h1>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number"><?php echo $products_count; ?></div>
                    <div class="stat-label">Total Products</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $orders_count; ?></div>
                    <div class="stat-label">Total Orders</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">0</div>
                    <div class="stat-label">Pending Orders</div>
                </div>
            </div>

            <div class="recent-orders">
                <h2>Recent Orders</h2>
                <?php if ($recent_orders->num_rows > 0): ?>
                    <table>
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($order = $recent_orders->fetch_assoc()): ?>
                            <tr>
                                <td><?php echo $order['order_number']; ?></td>
                                <td><?php echo $order['customer_name']; ?></td>
                                <td>Rp <?php echo number_format($order['total_amount'], 0, ',', '.'); ?></td>
                                <td class="status-<?php echo $order['status']; ?>">
                                    <?php echo ucfirst($order['status']); ?>
                                </td>
                                <td><?php echo date('M j, Y', strtotime($order['created_at'])); ?></td>
                            </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p>No orders yet.</p>
                <?php endif; ?>
            </div>

            <div style="margin-top: 2rem; text-align: center;">
                <a href="products.php" class="btn">Manage Products</a>
            </div>
        </div>

        <?php
        // Handle logout
        if (isset($_GET['logout'])) {
            session_destroy();
            header('Location: index.php');
            exit;
        }
        ?>
    </body>
    </html>