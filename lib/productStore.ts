import { db } from "./firebase";
import { collection, query, orderBy, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);

      this.products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
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
    const newProduct = {
      ...product,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      clicks: 0,
    };

    try {
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      await this.loadProducts();
      return docRef.id;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        ...updates,
        updated_at: new Date().toISOString()
      });
      await this.loadProducts();
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'products', id));
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

      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, { 
        clicks: product.clicks + 1 
      });
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