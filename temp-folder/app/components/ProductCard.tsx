'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  Heart,
  Star,
  ShoppingCart,
  ImageIcon,
} from 'lucide-react';
import type { Product } from '@/lib/firebase';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({
  product,
  onProductClick,
  viewMode = 'grid',
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleBuyNowClick = () => {
    onProductClick(product.id);
    window.open(product.affiliate_link, '_blank');
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setImageLoading(false);
  };

  const discountPercentage = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

  const averageRating = 4.5 + Math.random() * 0.5; // Mock rating between 4.5-5.0

  // Fallback image component
  const ImageFallback = ({ className }: { className: string }) => (
    <div
      className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}
    >
      <div className="text-center">
        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
        <p className="text-xs text-gray-500 px-2">{product.name}</p>
      </div>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="relative md:w-48 h-48 md:h-auto overflow-hidden bg-gray-100">
            {imageError ? (
              <ImageFallback className="w-full h-full" />
            ) : (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <img
                  src={
                    product.image_url ||
                    '/placeholder.svg?height=200&width=200&text=Product'
                  }
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              </>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-600 text-white font-bold">
                  -{discountPercentage}%
                </Badge>
              </div>
            )}

            {/* Tags */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-semibold bg-white/90 text-gray-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({averageRating.toFixed(1)})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  {product.original_price && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.original_price}
                    </span>
                  )}
                </div>
              </div>

              {/* Like Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className="ml-4"
              >
                <Heart
                  className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleBuyNowClick}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-700 overflow-hidden hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 group neon-glow">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageError ? (
          <ImageFallback className="w-full h-full" />
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <img
              src={
                product.image_url ||
                '/placeholder.svg?height=400&width=400&text=Product'
              }
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        )}

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.tags.slice(0, 2).map((tag, index) => (
            <Badge
              key={index}
              className={`text-xs font-semibold shadow-lg ${
                tag === 'New' || tag === 'New Arrival'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : tag === 'Best Seller' || tag === 'Bestseller'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : tag === 'Trending'
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                      : tag === 'Limited' || tag === 'Limited Offer'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : tag === 'Hot Deal'
                          ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                          : tag === 'Premium'
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-lg neon-glow">
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
          />
        </Button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({averageRating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
            ${product.price}
          </span>
          {product.original_price && (
            <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
              ${product.original_price}
            </span>
          )}
        </div>

        {/* Buy Now Button */}
        <Button
          onClick={handleBuyNowClick}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 neon-glow transform hover:scale-105"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>

        {/* Social Proof */}
        <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
          {product.clicks} people viewed this
        </div>
      </div>
    </div>
  );
}
