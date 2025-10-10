    -- Create database
    CREATE DATABASE IF NOT EXISTS perfume_website;
    USE perfume_website;

    -- Products table
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        image VARCHAR(500),
        category VARCHAR(100) NOT NULL,
        best_seller BOOLEAN DEFAULT FALSE,
        notes JSON,
        stock INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Orders table
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_address TEXT,
        products JSON NOT NULL,
        total_amount DECIMAL(12,2) NOT NULL,
        notes TEXT,
        status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Admin users table
    CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Insert sample products
    INSERT INTO products (name, description, price, original_price, image, category, best_seller, notes, stock) VALUES
    ('Chanel No. 5', 'Parfum legendaris dengan aroma bunga yang elegan dan timeless', 1250000, 1600000, '/images/perfumes/chanel-no5.jpg', 'Floral', 1, '["Bergamot", "Ylang-Ylang", "Sandalwood"]', 10),
    ('Dior Sauvage', 'Aroma segar dan maskulin dengan sentuhan amberwood', 1100000, 1400000, '/images/perfumes/dior-sauvage.jpg', 'Woody', 1, '["Pepper", "Lavender", "Amberwood"]', 15),
    ('Tom Ford Noir', 'Parfum sophisticated dengan aroma oriental yang misterius', 2500000, 3000000, '/images/perfumes/tomford-noir.jpg', 'Oriental', 1, '["Bergamot", "Vanilla", "Patchouli"]', 8);

    -- Insert admin user (password: admin123)
    INSERT INTO admin_users (username, password_hash, full_name, email) VALUES
    ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@luxuryperfume.com');
