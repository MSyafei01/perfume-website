    <?php
    require_once __DIR__ . '/../../config.php';

    class Database {
        private $host = DB_HOST;
        private $user = DB_USER;
        private $pass = DB_PASS;
        private $dbname = DB_NAME;
        
        private $connection;
        private $error;
        
        public function __construct() {
            $this->connect();
        }
        
        private function connect() {
            $this->connection = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
            
            if ($this->connection->connect_error) {
                $this->error = "Connection failed: " . $this->connection->connect_error;
                return false;
            }
            
            $this->connection->set_charset("utf8mb4");
            return true;
        }
        
        public function getConnection() {
            return $this->connection;
        }
        
        public function query($sql) {
            return $this->connection->query($sql);
        }
        
        public function escape($value) {
            return $this->connection->real_escape_string($value);
        }
        
        public function getError() {
            return $this->error;
        }
        
        public function __destruct() {
            if ($this->connection) {
                $this->connection->close();
            }
        }
    }

    // Helper function untuk response JSON
    function json_response($data = null, $status = 200, $message = 'Success') {
        header('Content-Type: application/json');
        http_response_code($status);
        
        echo json_encode([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], JSON_PRETTY_PRINT);
        exit;
    }

    function json_error($message = 'Error', $status = 400) {
        json_response(null, $status, $message);
    }
    ?>