-- Update products table to include discount field
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_percentage INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10,2) DEFAULT 0;

-- Update categories to match new requirements
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check 
CHECK (category IN ('watches', 'pants', 'jeans', 'kurta', 'health-fitness', 'beauty'));

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create storage policy for product images
CREATE POLICY "Anyone can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can update product images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can delete product images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

-- Update admin user email
UPDATE users SET email = 'admin@gmail.com' WHERE role = 'admin';

-- Create function to get click analytics
CREATE OR REPLACE FUNCTION get_product_analytics()
RETURNS TABLE (
  product_id UUID,
  product_name TEXT,
  total_clicks BIGINT,
  category TEXT,
  price DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    COALESCE(COUNT(ct.id), 0) as total_clicks,
    p.category,
    p.price
  FROM products p
  LEFT JOIN click_tracking ct ON p.id = ct.product_id
  GROUP BY p.id, p.name, p.category, p.price
  ORDER BY total_clicks DESC;
END;
$$ LANGUAGE plpgsql;
