<?php
require_once '../config/database.php';

class ProductsAPI {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
    }
    
    // GET semua produk
    public function getProducts() {
        $sql = "SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC";
        $result = $this->db->query($sql);
        
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = [
                'id' => (int)$row['id'],
                'name' => $row['name'],
                'description' => $row['description'],
                'price' => $row['price'],
                'original_price' => $row['original_price'],
                'image' => $row['image'],
                'category' => $row['category'],
                'best_seller' => (bool)$row['best_seller'],
                'notes' => json_decode($row['notes'], true),
                'stock' => (int)$row['stock'],
                'status' => $row['status']
            ];
        }
        
        json_response($products);
    }
    
    // GET produk by ID
    public function getProduct($id) {
        $id = $this->db->escape($id);
        $sql = "SELECT * FROM products WHERE id = '$id' AND status = 'active'";
        $result = $this->db->query($sql);
        
        if ($result->num_rows === 0) {
            json_error('Product not found', 404);
        }
        
        $product = $result->fetch_assoc();
        $product['id'] = (int)$product['id'];
        $product['best_seller'] = (bool)$product['best_seller'];
        $product['notes'] = json_decode($product['notes'], true);
        $product['stock'] = (int)$product['stock'];
        
        json_response($product);
    }
    
    // GET best sellers
    public function getBestSellers() {
        $sql = "SELECT * FROM products WHERE best_seller = 1 AND status = 'active' ORDER BY created_at DESC LIMIT 3";
        $result = $this->db->query($sql);
        
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = [
                'id' => (int)$row['id'],
                'name' => $row['name'],
                'description' => $row['description'],
                'price' => $row['price'],
                'original_price' => $row['original_price'],
                'image' => $row['image'],
                'category' => $row['category'],
                'best_seller' => (bool)$row['best_seller'],
                'notes' => json_decode($row['notes'], true)
            ];
        }
        
        json_response($products);
    }
    
    // POST new product (admin only)
    public function createProduct($data) {
        // Authentication check bisa ditambahkan di sini
        $required = ['name', 'description', 'price', 'category'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                json_error("Field $field is required");
            }
        }
        
        $name = $this->db->escape($data['name']);
        $description = $this->db->escape($data['description']);
        $price = $this->db->escape($data['price']);
        $original_price = $this->db->escape($data['original_price'] ?? '');
        $category = $this->db->escape($data['category']);
        $best_seller = isset($data['best_seller']) ? (int)$data['best_seller'] : 0;
        $notes = isset($data['notes']) ? json_encode($data['notes']) : '[]';
        $stock = isset($data['stock']) ? (int)$data['stock'] : 0;
        $image = $this->db->escape($data['image'] ?? '');
        
        $sql = "INSERT INTO products (name, description, price, original_price, image, category, best_seller, notes, stock) 
                VALUES ('$name', '$description', '$price', '$original_price', '$image', '$category', $best_seller, '$notes', $stock)";
        
        if ($this->db->query($sql)) {
            json_response(['id' => $this->db->getConnection()->insert_id], 201, 'Product created successfully');
        } else {
            json_error('Failed to create product: ' . $this->db->getError());
        }
    }
}

// Handle requests
$productsAPI = new ProductsAPI();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $productsAPI->getProduct($_GET['id']);
        } elseif (isset($_GET['best_sellers'])) {
            $productsAPI->getBestSellers();
        } else {
            $productsAPI->getProducts();
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $productsAPI->createProduct($input);
        break;
        
    default:
        json_error('Method not allowed', 405);
}
?>