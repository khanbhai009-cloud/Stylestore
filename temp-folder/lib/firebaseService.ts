import {
  getFirebaseDb,
  isFirebaseAvailable,
  type Product,
  type User,
  type SiteAnalytics,
} from './firebase';
import { productStore } from './productStore';
import { StorageService } from './storageService';

// Mock data fallback for when Firebase is not available
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Smart Watch',
    price: 299.99,
    original_price: 399.99,
    image_url: '/smart-watch.png',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    category: 'watches',
    tags: ['New', 'Best Seller'],
    affiliate_link: 'https://example.com/product1',
    clicks: 156,
    is_active: true,
    discount_percentage: 25,
    discount_amount: 100,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Classic Denim Jeans',
    price: 79.99,
    original_price: 119.99,
    image_url: '/denim-jeans.png',
    description: 'Premium quality denim jeans with perfect fit and comfort',
    category: 'jeans',
    tags: ['Limited Offer'],
    affiliate_link: 'https://example.com/product2',
    clicks: 89,
    is_active: true,
    discount_percentage: 33,
    discount_amount: 40,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Elegant Cotton Kurta',
    price: 45.99,
    original_price: 69.99,
    image_url: '/cotton-kurta.png',
    description: 'Traditional cotton kurta with modern design and comfort',
    category: 'kurta',
    tags: ['New'],
    affiliate_link: 'https://example.com/product3',
    clicks: 67,
    is_active: true,
    discount_percentage: 34,
    discount_amount: 24,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Formal Dress Pants',
    price: 89.99,
    original_price: 129.99,
    image_url: '/dress-pants.png',
    description:
      'Professional dress pants perfect for office and formal events',
    category: 'pants',
    tags: ['Best Seller'],
    affiliate_link: 'https://example.com/product4',
    clicks: 134,
    is_active: true,
    discount_percentage: 31,
    discount_amount: 40,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 39.99,
    original_price: 59.99,
    image_url: '/yoga-mat.png',
    description: 'Non-slip premium yoga mat for all your fitness needs',
    category: 'health-fitness',
    tags: ['Limited Offer'],
    affiliate_link: 'https://example.com/product5',
    clicks: 203,
    is_active: true,
    discount_percentage: 33,
    discount_amount: 20,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Luxury Face Cream',
    price: 149.99,
    original_price: 199.99,
    image_url: '/face-cream.png',
    description: 'Anti-aging luxury face cream with natural ingredients',
    category: 'beauty',
    tags: ['New', 'Best Seller'],
    affiliate_link: 'https://example.com/product6',
    clicks: 98,
    is_active: true,
    discount_percentage: 25,
    discount_amount: 50,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Protein Powder',
    price: 59.99,
    original_price: 79.99,
    image_url: '/protein-powder.png',
    description: 'High-quality whey protein for muscle building and recovery',
    category: 'health-fitness',
    tags: ['Best Seller'],
    affiliate_link: 'https://example.com/product7',
    clicks: 176,
    is_active: true,
    discount_percentage: 25,
    discount_amount: 20,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Vintage Leather Watch',
    price: 199.99,
    original_price: 299.99,
    image_url: '/leather-watch.png',
    description: 'Classic vintage leather watch with automatic movement',
    category: 'watches',
    tags: ['Limited Offer'],
    affiliate_link: 'https://example.com/product8',
    clicks: 145,
    is_active: true,
    discount_percentage: 33,
    discount_amount: 100,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Product Services
export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    return productStore.getProducts();
  },

  // Get product by ID
  async getProduct(id: string): Promise<Product | null> {
    return productStore.getProduct(id);
  },

  // Add new product with enhanced error handling
  async addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
    try {
      console.log('🔄 Adding product:', product.name);

      // Validate required fields
      if (!product.name?.trim()) {
        throw new Error('Product name is required');
      }
      if (!product.description?.trim()) {
        throw new Error('Product description is required');
      }
      if (!product.price || product.price <= 0) {
        throw new Error('Valid price is required');
      }
      if (!product.affiliate_link?.trim()) {
        throw new Error('Affiliate link is required');
      }

      // Ensure image URL exists
      if (!product.image_url) {
        product.image_url = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name)}`;
      }

      // Try Firebase first if available
      if (isFirebaseAvailable()) {
        try {
          const db = getFirebaseDb();
          if (db) {
            const { collection, addDoc, serverTimestamp } = await import(
              'firebase/firestore'
            );

            const docRef = await addDoc(collection(db, 'products'), {
              ...product,
              created_at: serverTimestamp(),
              updated_at: serverTimestamp(),
            });

            // Also add to local store for immediate display
            const localId = productStore.addProduct({
              ...product,
              id: docRef.id,
            });

            console.log('✅ Product added to both Firebase and local store');
            return docRef.id;
          }
        } catch (error) {
          console.error('Firebase add failed, using local store:', error);
        }
      }

      // Fallback to local store
      const localId = productStore.addProduct(product);
      console.log('✅ Product added to local store (demo mode)');
      return localId;
    } catch (error) {
      console.error('❌ Error adding product:', error);
      throw error; // Re-throw to be handled by the UI
    }
  },

  // Update product
  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      // Try Firebase first if available
      if (isFirebaseAvailable()) {
        try {
          const db = getFirebaseDb();
          if (db) {
            const { doc, updateDoc, serverTimestamp } = await import(
              'firebase/firestore'
            );

            const docRef = doc(db, 'products', id);
            await updateDoc(docRef, {
              ...updates,
              updated_at: serverTimestamp(),
            });

            // Also update local store
            productStore.updateProduct(id, updates);
            console.log('✅ Product updated in both Firebase and local store');
            return true;
          }
        } catch (error) {
          console.error('Firebase update failed, using local store:', error);
        }
      }

      // Fallback to local store
      const success = productStore.updateProduct(id, updates);
      console.log('✅ Product updated in local store (demo mode)');
      return success;
    } catch (error) {
      console.error('❌ Error updating product:', error);
      return false;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    try {
      // Try Firebase first if available
      if (isFirebaseAvailable()) {
        try {
          const db = getFirebaseDb();
          if (db) {
            const { doc, deleteDoc } = await import('firebase/firestore');

            await deleteDoc(doc(db, 'products', id));

            // Also delete from local store
            productStore.deleteProduct(id);
            console.log(
              '✅ Product deleted from both Firebase and local store'
            );
            return true;
          }
        } catch (error) {
          console.error('Firebase delete failed, using local store:', error);
        }
      }

      // Fallback to local store
      const success = productStore.deleteProduct(id);
      console.log('✅ Product deleted from local store (demo mode)');
      return success;
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      return false;
    }
  },

  // Increment product clicks
  async incrementClicks(id: string): Promise<boolean> {
    // Always update local store for immediate feedback
    const success = productStore.incrementClicks(id);

    // Try Firebase in background if available
    if (isFirebaseAvailable()) {
      try {
        const db = getFirebaseDb();
        if (db) {
          const { doc, updateDoc, increment } = await import(
            'firebase/firestore'
          );
          const docRef = doc(db, 'products', id);
          await updateDoc(docRef, {
            clicks: increment(1),
            updated_at: new Date(),
          });
          console.log('✅ Click count updated in Firebase');
        }
      } catch (error) {
        console.error(
          'Firebase click update failed (local store still updated):',
          error
        );
      }
    }

    return success;
  },

  // Subscribe to product changes
  subscribe(callback: (products: Product[]) => void): () => void {
    return productStore.subscribe(callback);
  },

  // Get product statistics
  getStats() {
    return productStore.getStats();
  },
};

// User Services
export const userService = {
  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    // Check for the updated admin email
    if (email === 'akk116636@gmail.com') {
      return {
        id: 'admin-1',
        email: 'akk116636@gmail.com',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    return null;
  },

  // Add new user (Firebase only)
  async addUser(user: Omit<User, 'id'>): Promise<string | null> {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not available for adding user');
      return null;
    }

    try {
      const db = getFirebaseDb();
      if (!db) return null;

      const { collection, addDoc, serverTimestamp } = await import(
        'firebase/firestore'
      );

      const docRef = await addDoc(collection(db, 'users'), {
        ...user,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding user:', error);
      return null;
    }
  },

  // Get all users
  async getUsers(): Promise<User[]> {
    return [
      {
        id: 'admin-1',
        email: 'akk116636@gmail.com',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  },
};

// Analytics Services
export const analyticsService = {
  // Track product click
  async trackClick(
    productId: string,
    userIp: string,
    userAgent: string
  ): Promise<boolean> {
    console.log(`Mock: Tracking click for product ${productId}`);
    return true;
  },

  // Get site analytics
  async getSiteAnalytics(): Promise<SiteAnalytics | null> {
    const stats = productStore.getStats();
    return {
      id: 'mock',
      total_visitors: 1247,
      total_clicks: stats.totalClicks,
      date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };
  },

  // Update site analytics
  async updateSiteAnalytics(
    totalVisitors: number,
    totalClicks: number
  ): Promise<boolean> {
    console.log('Mock: Updating site analytics');
    return true;
  },
};

// Enhanced Storage Services
export const storageService = {
  // Upload product image with multiple strategies
  uploadProductImage: StorageService.uploadProductImage,

  // Delete image
  deleteImage: StorageService.deleteImage,

  // Validate image file
  validateImageFile: StorageService.validateImageFile,

  // Compress image
  compressImage: StorageService.compressImage,
};

// Real-time listeners
export const realtimeService = {
  // Listen to products changes
  onProductsChange(callback: (products: Product[]) => void) {
    // Use the product store subscription
    return productStore.subscribe(callback);
  },

  // Listen to analytics changes
  onAnalyticsChange(callback: (analytics: SiteAnalytics | null) => void) {
    // Return mock analytics immediately
    callback({
      id: 'mock',
      total_visitors: 1247,
      total_clicks: productStore.getStats().totalClicks,
      date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    });
    // Return a dummy unsubscribe function
    return () => {
      console.log('Mock: Unsubscribing from analytics');
    };
  },
};
