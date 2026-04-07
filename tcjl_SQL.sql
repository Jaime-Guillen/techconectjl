-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS techconectjl_db;
USE techconectjl_db;

-- 1. Tabla de Usuarios
-- Almacena la información de los clientes y administradores [cite: 46, 52]
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    displayName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photoUrl VARCHAR(2048),
    address TEXT,
    phone VARCHAR(20),
    isAdmin BOOLEAN DEFAULT FALSE
);

-- 2. Tabla de Productos
-- Basado en el catálogo de móviles reacondicionados [cite: 25, 48]
CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Uso de Decimal para precisión de moneda [cite: 31]
    `condition` ENUM('Grado A', 'Grado B', 'Grado C') NOT NULL, -- Basado en estándares de la empresa 
    stockQuantity INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    brand VARCHAR(100), -- Ejemplo: Apple, Samsung [cite: 48]
    category VARCHAR(100) DEFAULT 'Smartphones'
);

-- 3. Tabla de Imágenes de Producto
-- Relación 1:N con Product para galerías de fotos [cite: 49, 64]
CREATE TABLE ProductImage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    imageUrl VARCHAR(2048) NOT NULL,
    displayOrder INT DEFAULT 0,
    altText VARCHAR(255),
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
);

-- 4. Tabla de Pedidos
-- Gestiona el proceso de compra y estado del pedido [cite: 50, 64]
CREATE TABLE `Order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalAmount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pendiente', -- Ejemplo: Pago aceptado, Enviado 
    shippingAddress TEXT,
    billingAddress TEXT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE SET NULL
);

-- 5. Tabla de Ítems del Pedido
-- Tabla intermedia para desglosar qué productos hay en cada pedido [cite: 43, 64]
CREATE TABLE OrderItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    productId INT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES `Order`(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE RESTRICT
);