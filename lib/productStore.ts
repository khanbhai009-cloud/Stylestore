import type { Product } from "./firebase"

// Add these lines RIGHT AFTER IMPORTS ▼
const getLocalStorageProducts = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : null;
  }
  return null;
};

const setLocalStorageProducts = (products: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(products));
  }
};

// Global product store for demo mode
class ProductStore {
  private products: Product[] = [
    {
      id: "1",
      name: "Premium Smart Watch",
      price: 299.99,
      original_price: 399.99,
      image_url: "/smart-watch.png",
      description: "Advanced fitness tracking with heart rate monitor and GPS",
      category: "watches",
      tags: ["New", "Best Seller"],
      affiliate_link: "https://example.com/product1",
      clicks: 156,
      is_active: true,
      discount_percentage: 25,
      discount_amount: 100,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Classic Denim Jeans",
      price: 79.99,
      original_price: 119.99,
      image_url: "/denim-jeans.png",
      description: "Premium quality denim jeans with perfect fit and comfort",
      category: "jeans",
      tags: ["Limited Offer"],
      affiliate_link: "https://example.com/product2",
      clicks: 89,
      is_active: true,
      discount_percentage: 33,
      discount_amount: 40,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Elegant Cotton Kurta",
      price: 45.99,
      original_price: 69.99,
      image_url: "/cotton-kurta.png",
      description: "Traditional cotton kurta with modern design and comfort",
      category: "kurta",
      tags: ["New"],
      affiliate_link: "https://example.com/product3",
      clicks: 67,
      is_active: true,
      discount_percentage: 34,
      discount_amount: 24,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "4",
      name: "Formal Dress Pants",
      price: 89.99,
      original_price: 129.99,
      image_url: "/dress-pants.png",
      description: "Professional dress pants perfect for office and formal events",
      category: "pants",
      tags: ["Best Seller"],
      affiliate_link: "https://example.com/product4",
      clicks: 134,
      is_active: true,
      discount_percentage: 31,
      discount_amount: 40,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "5",
      name: "Yoga Mat Premium",
      price: 39.99,
      original_price: 59.99,
      image_url: "/yoga-mat.png",
      description: "Non-slip premium yoga mat for all your fitness needs",
      category: "health-fitness",
      tags: ["Limited Offer"],
      affiliate_link: "https://example.com/product5",
      clicks: 203,
      is_active: true,
      discount_percentage: 33,
      discount_amount: 20,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "6",
      name: "Luxury Face Cream",
      price: 149.99,
      original_price: 199.99,
      image_url: "/face-cream.png",
      description: "Anti-aging luxury face cream with natural ingredients",
      category: "beauty",
      tags: ["New", "Best Seller"],
      affiliate_link: "https://example.com/product6",
      clicks: 98,
      is_active: true,
      discount_percentage: 25,
      discount_amount: 50,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "7",
      name: "Protein Powder",
      price: 59.99,
      original_price: 79.99,
      image_url: "/protein-powder.png",
      description: "High-quality whey protein for muscle building and recovery",
      category: "health-fitness",
      tags: ["Best Seller"],
      affiliate_link: "https://example.com/product7",
      clicks: 176,
      is_active: true,
      discount_percentage: 25,
      discount_amount: 20,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "8",
      name: "Vintage Leather Watch",
      price: 199.99,
      original_price: 299.99,
      image_url: "/leather-watch.png",
      description: "Classic vintage leather watch with automatic movement",
      category: "watches",
      tags: ["Limited Offer"],
      affiliate_link: "https://example.com/product8",
      clicks: 145,
      is_active: true,
      discount_percentage: 33,
      discount_amount: 100,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  ]

  // Replace products array with this ▼
products: getLocalStorageProducts() || [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
],
  // Get all products
  getProducts(): Product[] {
    return [...this.products].filter((p) => p.is_active)
  }

  // Get product by ID
  getProduct(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null
  }

  // Add new product
  addProduct(product: Omit<Product, "id">): string {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    this.products.unshift(newProduct) // Add to beginning for visibility
    this.notifyListeners()

    console.log(`✅ Added new product: ${newProduct.name} (ID: ${newProduct.id})`)
    return newProduct.id
  }

  // Update product
  updateProduct(id: string, updates: Partial<Product>): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }

    this.notifyListeners()
    console.log(`✅ Updated product: ${this.products[index].name}`)
setLocalStorageProducts(newProducts);
     return true
  }
// Add this line at the END of addProduct ▼
setLocalStorageProducts(newProducts);

  // Delete product
  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    const deletedProduct = this.products[index]
    this.products.splice(index, 1)
    this.notifyListeners()

    console.log(`✅ Deleted product: ${deletedProduct.name}`)
  setLocalStorageProducts(newProducts);
  return true
  }


  // Increment clicks
  incrementClicks(id: string): boolean {
    const product = this.products.find((p) => p.id === id)
    if (!product) return false

    product.clicks += 1
    this.notifyListeners()

    console.log(`✅ Incremented clicks for: ${product.name} (${product.clicks} total)`)
    return true
  }

  // Subscribe to changes
  subscribe(listener: (products: Product[]) => void): () => void {
    this.listeners.push(listener)

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  // Notify all listeners
  private notifyListeners() {
    const activeProducts = this.getProducts()
    this.listeners.forEach((listener) => {
      try {
        listener(activeProducts)
      } catch (error) {
        console.error("Error notifying product store listener:", error)
      }
    })
  }

  // Get stats
  getStats() {
    const activeProducts = this.getProducts()
    return {
      total: activeProducts.length,
      totalClicks: activeProducts.reduce((sum, p) => sum + p.clicks, 0),
      categories: [...new Set(activeProducts.map((p) => p.category))].length,
      avgPrice: activeProducts.reduce((sum, p) => sum + p.price, 0) / activeProducts.length,
    }
  }
}

// Create singleton instance
export const productStore = new ProductStore()

// Export for easy access
export default productStore
