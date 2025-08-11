import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing! Check your .env file');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Recommended for Next.js
  },
});

// Types
export type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at?: string;
  is_active?: boolean;
};

// 1. Fetch All Products
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
};

// 2. Add New Product
export const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      ...product,
      id: crypto.randomUUID(), // Auto-generate ID
      created_at: new Date().toISOString(),
    })
    .select();

  if (error) throw new Error(`Add failed: ${error.message}`);
  return data[0];
};

// 3. Update Product
export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw new Error(`Update failed: ${error.message}`);
  return data[0];
};

// 4. Delete Product
export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Delete failed: ${error.message}`);
};

// 5. Image Upload (Storage)
export const uploadImage = async (file: File, bucket = 'products'): Promise<string> => {
  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw new Error(`Upload failed: ${error.message}`);
  return data.path;
};

// 6. Get Image URL
export const getImageUrl = (path: string, bucket = 'products') => {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
};

// 7. Health Check
export const checkConnection = async () => {
  const { error } = await supabase
    .from('products')
    .select('id')
    .limit(1);

  return !error;
};