-- Flowventory Database Schema
-- PostgreSQL 15+
-- This is a reference schema - actual models are defined in src/backend/db/db_models.py

-- Create Database
CREATE DATABASE flowventory;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    assigned_pages JSON
);

CREATE INDEX idx_users_username ON users(username);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'submitted',
    notes TEXT,
    items JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Shipments Table
CREATE TABLE shipments (
    id SERIAL PRIMARY KEY,
    our_name VARCHAR(255) NOT NULL DEFAULT 'Flowventory',
    our_address TEXT NOT NULL,
    bill_to VARCHAR(255),
    ship_to VARCHAR(255),
    invoice_number VARCHAR(255) UNIQUE NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE,
    ship_via VARCHAR(255),
    order_number VARCHAR(255),
    qty INTEGER NOT NULL,
    item_type VARCHAR(255) NOT NULL,
    item_desc TEXT,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shipments_invoice_number ON shipments(invoice_number);
CREATE INDEX idx_shipments_order_id ON shipments(order_id);

-- Inventory Items Table
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    item_id VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(255),
    description TEXT,
    vendor VARCHAR(255),
    quantity INTEGER DEFAULT 0,
    zone VARCHAR(50),
    aisle VARCHAR(50),
    rack VARCHAR(50),
    shelf VARCHAR(50),
    bin VARCHAR(50),
    storage_location VARCHAR(255),
    category VARCHAR(255),
    weight VARCHAR(100),
    dimensions VARCHAR(100),
    barcode VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending_inspection',
    last_shipment_id INTEGER REFERENCES shipments(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inventory_item_id ON inventory_items(item_id);
CREATE INDEX idx_inventory_sku ON inventory_items(sku);
CREATE INDEX idx_inventory_barcode ON inventory_items(barcode);
CREATE INDEX idx_inventory_status ON inventory_items(status);

-- Packing Slips Table
CREATE TABLE packing_slips (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_url TEXT,
    shipment_id INTEGER REFERENCES shipments(id) ON DELETE CASCADE,
    inventory_item_id INTEGER REFERENCES inventory_items(id) ON DELETE CASCADE,
    uploaded_by INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_packing_slips_shipment_id ON packing_slips(shipment_id);
CREATE INDEX idx_packing_slips_inventory_item_id ON packing_slips(inventory_item_id);
CREATE INDEX idx_packing_slips_uploaded_by ON packing_slips(uploaded_by);

-- Sample Data (Test Users)
INSERT INTO users (username, firstname, role, password, assigned_pages) VALUES
('Preet', 'Preet', 'admin', '$2b$12$hashed_password_here', '["dashboard", "inventory", "stock", "pick", "shipments", "admin"]'),
('Dany', 'Dany', 'engineer', '$2b$12$hashed_password_here', '["dashboard", "inventory", "stock", "pick", "shipments"]'),
('Jack', 'Jack', 'manager', '$2b$12$hashed_password_here', '["dashboard", "inventory", "stock", "pick", "shipments", "orders"]'),
('Carlotta', 'Carlotta', 'admin', '$2b$12$hashed_password_here', '["dashboard", "inventory", "stock", "pick", "shipments", "admin"]'),
('Yana', 'Yana', 'admin', '$2b$12$hashed_password_here', '["dashboard", "inventory", "stock", "pick", "shipments", "admin"]');

-- Comments
COMMENT ON TABLE users IS 'User accounts and authentication';
COMMENT ON TABLE orders IS 'Customer orders';
COMMENT ON TABLE shipments IS 'Shipment tracking and packing slip information';
COMMENT ON TABLE inventory_items IS 'Warehouse inventory items with location tracking';
COMMENT ON TABLE packing_slips IS 'File metadata for uploaded packing slips';

-- Constraints Summary
-- 1. All primary keys are auto-incrementing (SERIAL)
-- 2. Foreign keys enforce referential integrity
-- 3. Unique constraints on username, item_id, barcode, invoice_number
-- 4. Indexes on frequently queried columns
-- 5. ON DELETE CASCADE for packing_slips
-- 6. ON DELETE SET NULL for optional references
