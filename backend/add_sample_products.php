<?php
require_once 'config.php';
require_once 'api/config/database.php';

$db = new Database();

$products = [
    [
        'name' => 'Versace Eros',
        'description' => 'Aroma fresh dan energik dengan karakter mediteranian',
        'price' => 950000,
        'original_price' => 1200000,
        'image' => '/images/perfumes/versace-eros.jpg',
        'category' => 'Fresh',
        'best_seller' => 0,
        'notes' => ['Mint', 'Green Apple', 'Tonka Bean'],
        'stock' => 12
    ],
    [
        'name' => 'Yves Saint Laurent Libre', 
        'description' => 'Parfum feminin yang powerful dengan lavender dan musk',
        'price' => 1350000,
        'original_price' => 1600000,
        'image' => '/images/perfumes/ysl-libre.jpg',
        'category' => 'Floral',
        'best_seller' => 0,
        'notes' => ['Lavender', 'Musk', 'Vanilla'],
        'stock' => 8
    ],
    [
        'name' => 'Creed Aventus',
        'description' => 'Parfum premium dengan aroma buah dan smoky yang iconic',
        'price' => 3500000, 
        'original_price' => 4200000,
        'image' => '/images/perfumes/creed-aventus.jpg',
        'category' => 'Fruity',
        'best_seller' => 0,
        'notes' => ['Pineapple', 'Birch', 'Musk'],
        'stock' => 5
    ]
];

foreach ($products as $product) {
    $notes = json_encode($product['notes']);
    
    $sql = "INSERT INTO products (name, description, price, original_price, image, category, best_seller, notes, stock) 
            VALUES (
                '{$db->escape($product['name'])}',
                '{$db->escape($product['description'])}',
                '{$product['price']}',
                '{$product['original_price']}',
                '{$product['image']}',
                '{$product['category']}',
                '{$product['best_seller']}',
                '{$notes}',
                '{$product['stock']}'
            )";
    
    if ($db->query($sql)) {
        echo "✅ Added: {$product['name']}<br>";
    } else {
        echo "❌ Failed: {$product['name']} - " . $db->getError() . "<br>";
    }
}

echo "🎉 All products added!";
?>