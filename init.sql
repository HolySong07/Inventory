
USE inv_DB;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    description TEXT
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serialNumber INT,
    isNew TINYINT(1),
    photo VARCHAR(255),
    title VARCHAR(255),
    type VARCHAR(100),
    specification TEXT,
    guarantee_start DATETIME,
    guarantee_end DATETIME,
    order_id INT,
    date DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    value DECIMAL(10, 2),
    symbol VARCHAR(10),
    isDefault TINYINT(1),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);