// pages/api/addProduct.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key for insert
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    title,
    description,
    original_price,
    current_price,
    discount,
    image_url,
    affiliate_link,
    tag
  } = req.body;

  // Validation
  if (!title || !description || !original_price || !current_price || !discount || !image_url || !affiliate_link || !tag) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{
      title,
      description,
      original_price,
      current_price,
      discount,
      image_url,
      affiliate_link,
      tag
    }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Product added successfully', data });
}