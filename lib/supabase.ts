import { createClient } from '@supabase/supabase-js';

// Check for required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is not set. Using demo mode.');
}

if (!supabaseAnonKey) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Using demo mode.');
}

// Create client with fallback for demo mode
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side client for admin operations
export const createServerClient = () => {
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serverKey) {
    console.warn(
      'Server Supabase credentials not configured. Using demo mode.'
    );
    return null;
  }

  return createClient(supabaseUrl, serverKey);
};

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Add better error handling and connection testing
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!supabase) return false;

  try {
    // Set a timeout for the connection test
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout')), 3000)
    );

    const testPromise = supabase
      .from('products')
      .select('count', { count: 'exact', head: true });

    await Promise.race([testPromise, timeoutPromise]);
    return true;
  } catch (error) {
    console.warn('Supabase connection test failed:', error);
    return false;
  }
};

// Add function to check if tables exist with better error handling
export const checkTablesExist = async (): Promise<boolean> => {
  if (!supabase) return false;

  try {
    // Only test the main products table
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Table check timeout')), 3000)
    );

    const testPromise = supabase
      .from('products')
      .select('id', { head: true })
      .limit(1);

    await Promise.race([testPromise, timeoutPromise]);
    return true;
  } catch (error) {
    console.warn('Table existence check failed:', error);
    return false;
  }
};

// Upload image to Supabase Storage
export const uploadProductImage = async (
  file: File
): Promise<string | null> => {
  if (!supabase) return null;

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// Delete image from Supabase Storage
export const deleteProductImage = async (
  imageUrl: string
): Promise<boolean> => {
  if (!supabase || !imageUrl.includes('product-images')) return false;

  try {
    const path = imageUrl.split('/product-images/')[1];
    const { error } = await supabase.storage
      .from('product-images')
      .remove([path]);

    return !error;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Updated types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category:
    | 'watches'
    | 'pants'
    | 'jeans'
    | 'kurta'
    | 'health-fitness'
    | 'beauty';
  tags: string[];
  affiliate_link: string;
  clicks: number;
  is_active: boolean;
  discount_percentage: number;
  discount_amount: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface ClickTracking {
  id: string;
  product_id: string;
  user_ip: string;
  user_agent: string;
  clicked_at: string;
}

export interface SiteAnalytics {
  id: string;
  total_visitors: number;
  total_clicks: number;
  date: string;
  created_at: string;
}

export interface ProductAnalytics {
  product_id: string;
  product_name: string;
  total_clicks: number;
  category: string;
  price: number;
}
