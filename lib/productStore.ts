import { supabase } from "./firebase";
import type { Product } from "./types";

class ProductStore {
  private products: Product[] = [];
  private listeners: ((products: Product[]) => void)[] = [];

  constructor() {
    this.initialize();
  }

  private async initialize() {
    await this.loadProducts();
  }

  private async loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      this.products = data || [];
      this.notifyListeners();
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback to empty array
      this.products = [];
    }
  }

  async getProducts(): Promise<Product[]> {
    if (this.products.length === 0) {
      await this.loadProducts();
    }
    return [...this.products].filter((p) => p.is_active);
  }

  async getProduct(id: string): Promise<Product | null> {
    if (this.products.length === 0) {
      await this.loadProducts();
    }
    return this.products.find((p) => p.id === id) || null;
  }

  async addProduct(product: Omit<Product, "id">): Promise<string> {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      clicks: 0,
    };

    try {
      const { error } = await supabase
        .from('products')
        .insert(newProduct);

      if (error) throw error;

      await this.loadProducts();
      return newProduct.id;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await this.loadProducts();
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await this.loadProducts();
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }

  async incrementClicks(id: string): Promise<boolean> {
    try {
      const product = await this.getProduct(id);
      if (!product) return false;

      const { error } = await supabase
        .from('products')
        .update({ clicks: product.clicks + 1 })
        .eq('id', id);

      if (error) throw error;

      await this.loadProducts();
      return true;
    } catch (error) {
      console.error("Error incrementing clicks:", error);
      return false;
    }
  }

  subscribe(listener: (products: Product[]) => void): () => void {
    this.listeners.push(listener);
    // Call immediately with current data
    listener(this.products.filter(p => p.is_active));
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    const activeProducts = this.products.filter((p) => p.is_active);
    this.listeners.forEach((listener) => {
      try {
        listener(activeProducts);
      } catch (error) {
        console.error("Error notifying product store listener:", error);
      }
    });
  }

  async getStats() {
    const activeProducts = await this.getProducts();
    return {
      total: activeProducts.length,
      totalClicks: activeProducts.reduce((sum, p) => sum + p.clicks, 0),
      categories: [...new Set(activeProducts.map((p) => p.category))].length,
      avgPrice: activeProducts.reduce((sum, p) => sum + p.price, 0) / activeProducts.length,
    };
  }
}

export const productStore = new ProductStore();
export default productStore;