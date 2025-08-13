-- Insert sample products
INSERT INTO products (name, description, price, original_price, image_url, category, tags, affiliate_link, clicks, discount_percentage, discount_amount) VALUES
('Stylish Cotton T-Shirt', 'Comfortable cotton t-shirt perfect for daily wear', 599.00, 899.00, '/plain-cotton-tee.png', 'tops', '{"New", "Best Seller"}', 'https://example.com/product1', 45, NULL, NULL),
('Denim Jeans', 'Premium quality denim jeans with perfect fit', 1299.00, 1799.00, '/denim-jeans.png', 'bottoms', '{"Popular"}', 'https://example.com/product2', 32, NULL, NULL),
('Leather Wallet', 'Genuine leather wallet with multiple card slots', 799.00, 1199.00, '/leather-wallet.png', 'accessories', '{"Premium"}', 'https://example.com/product3', 28, NULL, NULL),
('Summer Dress', 'Light and breezy summer dress for hot days', 899.00, 1299.00, '/woman-in-floral-summer-dress.png', 'tops', '{"New", "Summer Special"}', 'https://example.com/product4', 67, NULL, NULL),
('Sports Shoes', 'Comfortable sports shoes for running and gym', 1599.00, 2299.00, '/diverse-sports-shoes.png', 'accessories', '{"Best Seller", "Sports"}', 'https://example.com/product5', 89, NULL, NULL),
('Casual Shorts', 'Comfortable casual shorts for everyday wear', 499.00, 799.00, '/casual-shorts.png', 'bottoms', '{"Comfort"}', 'https://example.com/product6', 23, NULL, NULL),
('Premium Smart Watch', 'Advanced fitness tracking with heart rate monitor and GPS', 299.99, 399.99, '/smart-watch.png', 'watches', '{"New", "Best Seller"}', 'https://example.com/product1', 156, 25, 100.00),
('Classic Denim Jeans', 'Premium quality denim jeans with perfect fit and comfort', 79.99, 119.99, '/denim-jeans.png', 'jeans', '{"Limited Offer"}', 'https://example.com/product2', 89, 33, 40.00),
('Elegant Cotton Kurta', 'Traditional cotton kurta with modern design and comfort', 45.99, 69.99, '/cotton-kurta.png', 'kurta', '{"New"}', 'https://example.com/product3', 67, 34, 24.00),
('Formal Dress Pants', 'Professional dress pants perfect for office and formal events', 89.99, 129.99, '/dress-pants.png', 'pants', '{"Best Seller"}', 'https://example.com/product4', 134, 31, 40.00),
('Yoga Mat Premium', 'Non-slip premium yoga mat for all your fitness needs', 39.99, 59.99, '/yoga-mat.png', 'health-fitness', '{"Limited Offer"}', 'https://example.com/product5', 203, 33, 20.00),
('Luxury Face Cream', 'Anti-aging luxury face cream with natural ingredients', 149.99, 199.99, '/face-cream.png', 'beauty', '{"New", "Best Seller"}', 'https://example.com/product6', 98, 25, 50.00),
('Protein Powder', 'High-quality whey protein for muscle building and recovery', 59.99, 79.99, '/protein-powder.png', 'health-fitness', '{"Best Seller"}', 'https://example.com/product7', 176, 25, 20.00),
('Vintage Leather Watch', 'Classic vintage leather watch with automatic movement', 199.99, 299.99, '/leather-watch.png', 'watches', '{"Limited Offer"}', 'https://example.com/product8', 145, 33, 100.00)
ON CONFLICT DO NOTHING;

-- Insert admin user (password: admin123 - hashed)
INSERT INTO users (email, password_hash, role) VALUES
('admin@gmail.com', '$2b$10$rOzJqQqQqQqQgQgQgQgQgOzJqQqQgQgQgQgQgQgQgOzJqQgQgQgQgQ', 'admin')
ON CONFLICT (email) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role;

-- Insert initial site analytics
INSERT INTO site_analytics (total_visitors, total_clicks) VALUES (1247, 1168)
ON CONFLICT DO NOTHING;

-- Insert some sample click tracking data
INSERT INTO click_tracking (product_id, user_ip, user_agent) 
SELECT 
  p.id,
  '192.168.1.' || (RANDOM() * 255)::INTEGER,
  'Mozilla/5.0 (compatible; Demo Browser)'
FROM products p, generate_series(1, (RANDOM() * p.clicks)::INTEGER)
ON CONFLICT DO NOTHING;
