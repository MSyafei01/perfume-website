<?php
header('Content-Type: application/json');
echo json_encode([
    'message' => 'Luxury Perfume Backend API',
    'version' => '1.0',
    'endpoints' => [
        'GET /api/products' => 'Get all products',
        'GET /api/products?best_sellers=1' => 'Get best sellers', 
        'GET /api/products?id=1' => 'Get product by ID',
        'POST /api/orders' => 'Create new order',
        'GET /api/orders' => 'Get all orders (admin)'
    ],
    'status' => 'Running'
]);
?>