'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { productService } from '@/lib/firebaseService';
import type { Product } from '@/lib/firebase';
import { Filter, Grid, List } from 'lucide-react';

const categories = [
  { name: 'All Products', value: 'all' },
  { name: 'Watches', value: 'watches' },
  { name: 'Pants', value: 'pants' },
  { name: 'Jeans', value: 'jeans' },
  { name: 'Kurta', value: 'kurta' },
  { name: 'Health & Fitness', value: 'health-fitness' },
  { name: 'Beauty', value: 'beauty' },
];

const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Newest First', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-low' },
  { name: 'Price: High to Low', value: 'price-high' },
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

<<<<<<< HEAD
    // Subscribe to real-time product updates
    useEffect(() => {
  const fetchProducts = async () => {
    const products = await productService.getProducts();
    setProducts(products);
  };

  fetchProducts();

  // Subscribe to real-time product updates
  const unsubscribe = productService.subscribe((updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  });

  return () => {
    if (unsubscribe && typeof unsubscribe === "function") {
      unsubscribe();
    }
  };
}, []);
=======
  useEffect(() => {
    fetchProducts();

    // Subscribe to real-time product updates
    const unsubscribe = productService.subscribe((updatedProducts) => {
      setProducts(updatedProducts);
    });

    return () => {
      unsubscribe();
    };
  }, []);
>>>>>>> 04c852e (Fix code style and small errors)

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'popular':
      default:
        filtered = [...filtered].sort((a, b) => b.clicks - a.clicks);
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (productId: string) => {
    try {
      await productService.incrementClicks(productId);
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discover Your Perfect Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of fashion essentials, each piece
            selected to bring joy and style to your wardrobe.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={
                    selectedCategory === category.value ? 'default' : 'outline'
                  }
                  onClick={() => setSelectedCategory(category.value)}
                  className="text-sm"
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">
                    (
                    {
                      products.filter(
                        (p) =>
                          category.value === 'all' ||
                          p.category === category.value
                      ).length
                    }
                    )
                  </span>
                </Button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
<<<<<<< HEAD
              <div className="text-6xl mb-4">馃攳</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
=======
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
>>>>>>> 04c852e (Fix code style and small errors)
              <p className="text-muted-foreground mb-6">
                We couldn't find any products in this category. Try browsing all
                products or check back later.
              </p>
              <Button onClick={() => setSelectedCategory('all')}>
                View All Products
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
