<?php
require_once '../config/database.php';

class OrdersAPI {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
    }
    
    // POST new order
    public function createOrder($data) {
        $required = ['customer_name', 'customer_phone', 'customer_email', 'products'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                json_error("Field $field is required");
            }
        }
        
        $customer_name = $this->db->escape($data['customer_name']);
        $customer_phone = $this->db->escape($data['customer_phone']);
        $customer_email = $this->db->escape($data['customer_email']);
        $customer_address = $this->db->escape($data['customer_address'] ?? '');
        $notes = $this->db->escape($data['notes'] ?? '');
        $products = json_encode($data['products']);
        $total_amount = $this->calculateTotal($data['products']);
        
        $order_number = 'ORD-' . date('Ymd') . '-' . rand(1000, 9999);
        $status = 'pending';
        
        $sql = "INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, customer_address, products, total_amount, notes, status) 
                VALUES ('$order_number', '$customer_name', '$customer_phone', '$customer_email', '$customer_address', '$products', '$total_amount', '$notes', '$status')";
        
        if ($this->db->query($sql)) {
            $order_id = $this->db->getConnection()->insert_id;
            
            // Send WhatsApp notification (simulasi)
            $this->sendWhatsAppNotification($order_number, $customer_name, $customer_phone, $total_amount);
            
            json_response([
                'order_id' => $order_id,
                'order_number' => $order_number,
                'whatsapp_link' => $this->generateWhatsAppLink($customer_phone, $order_number)
            ], 201, 'Order created successfully');
        } else {
            json_error('Failed to create order: ' . $this->db->getError());
        }
    }
    
    private function calculateTotal($products) {
        $total = 0;
        foreach ($products as $product) {
            $price = floatval(str_replace(['Rp', '.', ','], '', $product['price']));
            $quantity = intval($product['quantity'] ?? 1);
            $total += $price * $quantity;
        }
        return $total;
    }
    
    private function sendWhatsAppNotification($orderNumber, $customerName, $customerPhone, $totalAmount) {
        // Simulasi mengirim notifikasi WhatsApp
        $message = "🛍️ *New Order Received!*\n\n";
        $message .= "Order Number: *$orderNumber*\n";
        $message .= "Customer: *$customerName*\n";
        $message .= "Phone: *$customerPhone*\n";
        $message .= "Total Amount: *Rp " . number_format($totalAmount, 0, ',', '.') . "*\n\n";
        $message .= "Please process this order immediately.";
        
        // Dalam implementasi real, ini akan connect ke WhatsApp API
        error_log("WhatsApp Notification: " . $message);
        
        return true;
    }
    
    private function generateWhatsAppLink($phone, $orderNumber) {
        $message = "Halo, saya sudah melakukan pemesanan dengan nomor order *$orderNumber*. Bagaimana proses selanjutnya?";
        $encodedMessage = urlencode($message);
        return "https://wa.me/62" . ltrim($phone, '0') . "?text=$encodedMessage";
    }
    
    // GET all orders (admin)
    public function getOrders() {
        $sql = "SELECT * FROM orders ORDER BY created_at DESC";
        $result = $this->db->query($sql);
        
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = [
                'id' => (int)$row['id'],
                'order_number' => $row['order_number'],
                'customer_name' => $row['customer_name'],
                'customer_phone' => $row['customer_phone'],
                'total_amount' => $row['total_amount'],
                'status' => $row['status'],
                'created_at' => $row['created_at']
            ];
        }
        
        json_response($orders);
    }
}

// Handle requests
$ordersAPI = new OrdersAPI();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $ordersAPI->getOrders();
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $ordersAPI->createOrder($input);
        break;
        
    default:
        json_error('Method not allowed', 405);
}
?>