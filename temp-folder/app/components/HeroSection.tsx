'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart, Sparkles, ShoppingBag } from 'lucide-react';

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900/20">
      {/* Neon Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Heart className="h-6 w-6 text-orange-400 drop-shadow-lg" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <Star className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float">
        <Sparkles className="h-5 w-5 text-orange-500 drop-shadow-lg" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-600 dark:text-orange-400 px-6 py-3 rounded-full text-sm font-medium border border-orange-200 dark:border-orange-700 neon-glow">
              <Sparkles className="h-4 w-4" />
              <span>Amazing Products Available</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-800 dark:text-white">
                  StyleStore
                </span>
                <span className="block text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text neon-text">
                  Where Every Purchase
                </span>
                <span className="block text-transparent bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text neon-text">
                  is a Blessing!
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Discover amazing fashion finds at unbeatable prices. From trendy
                tops to stylish accessories, find your perfect look and embrace
                the blessing of great style.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  10K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Happy Customers
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  500+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Products
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  4.9★
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Rating
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold neon-glow transform hover:scale-105 transition-all duration-300"
                onClick={scrollToProducts}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 border-orange-400 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 neon-border bg-transparent"
                onClick={scrollToProducts}
              >
                Browse Collection
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-lg"></div>
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full shadow-lg"></div>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Welcome Message */}
          <div className="relative">
            {/* Main Welcome Card */}
            <div className="relative bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl neon-glow border border-orange-200 dark:border-orange-700 overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-orange-400/10 animate-pulse"></div>

              {/* Floating Particles */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div
                className="absolute top-8 right-8 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className="absolute bottom-6 left-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: '1s' }}
              ></div>
              <div
                className="absolute bottom-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: '1.5s' }}
              ></div>

              <div className="relative z-10 text-center space-y-6">
                {/* Welcome Icon */}
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg neon-glow animate-pulse">
                  <Heart className="h-10 w-10 text-white animate-pulse" />
                </div>

                {/* Animated Welcome Text */}
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0s' }}
                    >
                      W
                    </span>
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0.1s' }}
                    >
                      e
                    </span>
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0.2s' }}
                    >
                      l
                    </span>
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0.3s' }}
                    >
                      c
                    </span>
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0.4s' }}
                    >
                      o
                    </span>
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0.5s' }}
                    >
                      m
                    </span>
                    <span
                      className="inline-block animate-bounce text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text"
                      style={{ animationDelay: '0.6s' }}
                    >
                      e
                    </span>
                  </h2>

                  <p className="text-lg text-gray-700 dark:text-gray-300 animate-fade-in">
                    🎉{' '}
                    <span className="font-semibold">You're Most Welcome!</span>{' '}
                    🎉
                  </p>

                  <div className="space-y-2 animate-slide-up">
                    <p className="text-gray-600 dark:text-gray-400">
                      ✨{' '}
                      <span className="font-medium">
                        Shop with happiness & joy
                      </span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      🛍️{' '}
                      <span className="font-medium">
                        Every purchase is a blessing
                      </span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      💖{' '}
                      <span className="font-medium">
                        Best deals just for you
                      </span>
                    </p>
                  </div>
                </div>

                {/* Animated Emojis */}
                <div className="flex justify-center space-x-4 text-2xl">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0s' }}
                  >
                    🌟
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  >
                    🎊
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  >
                    🎁
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0.6s' }}
                  >
                    💝
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0.8s' }}
                  >
                    🌈
                  </span>
                </div>

                {/* Call to Action */}
                <div className="pt-4">
                  <Button
                    onClick={scrollToProducts}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg neon-glow transform hover:scale-105 transition-all duration-300 animate-pulse"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-spin"></div>
              <div
                className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-spin"
                style={{ animationDirection: 'reverse' }}
              ></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-orange-200 dark:border-orange-700 animate-float">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  Premium Quality
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-orange-200 dark:border-orange-700 animate-float-delayed">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  Made with Love
                </span>
              </div>
            </div>

            {/* Background Glow Effects */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
