"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, ShoppingBag, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSticky, setIsSticky] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = [
    { name: "Watches", value: "watches" },
    { name: "Pants", value: "pants" },
    { name: "Jeans", value: "jeans" },
    { name: "Kurta", value: "kurta" },
    { name: "Health & Fitness", value: "health-fitness" },
    { name: "Beauty", value: "beauty" },
  ]

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      {/* Main Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-orange-200 dark:border-orange-700 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg neon-glow">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 dark:text-white">StyleStore</span>
                <span className="text-xs text-orange-600 dark:text-orange-400 hidden sm:block font-medium">
                  Where Every Purchase is a Blessing!
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={scrollToProducts}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-orange-50 dark:hover:bg-orange-900/20"
                >
                  {category.name}
                </button>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-orange-200 dark:border-orange-700 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden sm:flex hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Admin Link */}
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                >
                  Admin
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-orange-200 dark:border-orange-700">
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-orange-200 dark:border-orange-700 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>

                {/* Mobile Navigation */}
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={scrollToProducts}
                    className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 px-2 rounded-md hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors font-medium text-left"
                  >
                    {category.name}
                  </button>
                ))}

                {/* Mobile Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-orange-200 dark:border-orange-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </Button>
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-400 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
                    >
                      Admin Panel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sticky Search Bar */}
      {isSticky && (
        <div className="fixed top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-orange-200 dark:border-orange-700 z-40 py-2">
          <div className="container mx-auto px-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-orange-200 dark:border-orange-700 focus:border-orange-400 focus:ring-orange-400 neon-glow"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
