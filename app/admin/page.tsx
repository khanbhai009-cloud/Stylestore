"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Package, ShoppingBag, Lock, User, AlertCircle, Mail } from "lucide-react"
import { productService, userService, analyticsService } from "@/lib/firebaseService"
import type { Product, ProductAnalytics } from "@/lib/firebase"
import { signIn, signOut, getCurrentUser, isAdmin } from "@/lib/auth"
import ProductManagement from "./components/ProductManagement"
import AnalyticsDashboard from "./components/AnalyticsDashboard"
import AdminSidebar from "./components/AdminSidebar"
import UsersManagement from "./components/UsersManagement"
import OrdersManagement from "./components/OrdersManagement"
import FinanceManagement from "./components/FinanceManagement"
import NewsletterManagement from "./components/NewsletterManagement"
import DataExporter from "./components/DataExporter"
import { Users } from "lucide-react"
import { newsletterService } from "@/lib/newsletterService"

interface Analytics {
  totalUsers: number
  totalClicks: number
  totalProducts: number
  topProducts: Product[]
  productAnalytics: ProductAnalytics[]
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalClicks: 0,
    totalProducts: 0,
    topProducts: [],
    productAnalytics: [],
  })
  const [newsletterStats, setNewsletterStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0,
    todaySubscribers: 0,
    conversionRate: "0",
  })
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "newsletter" | "analytics" | "users" | "orders" | "marketing" | "finance"
  >("overview")

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser()
    if (user && isAdmin()) {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoginError("")

    try {
      const result = await signIn(email, password)
      if (result.success && result.user?.role === "admin") {
        setIsAuthenticated(true)
        loadData()
        setEmail("")
        setPassword("")
      } else {
        setLoginError("Invalid email or password. Please check your credentials and try again.")
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    setIsAuthenticated(false)
    setEmail("")
    setPassword("")
    setLoginError("")
  }

 const getProducts = async (): Promise<Product[]> {
  try {
    // Check if productStore exists and has getProducts method
    if (productStore && typeof productStore.getProducts === "function") {
      return await productStore.getProducts();
    }
    
    console.error("Product store not available, using mock data");
    return mockProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return mockProducts;
  }
}

      // Fetch users count
      const users = await userService.getUsers()
      const usersCount = users.length

      // Fetch analytics
      const siteAnalytics = await analyticsService.getSiteAnalytics()
      const totalClicks = siteAnalytics?.total_clicks || 0

      // Create analytics from products data
      const analyticsData: ProductAnalytics[] = fetchedProducts.map((p) => ({
        product_id: p.id,
        product_name: p.name,
        total_clicks: p.clicks || 0,
        category: p.category,
        price: p.price,
      }))

      setAnalytics({
        totalUsers: usersCount || 1247,
        totalClicks: totalClicks,
        totalProducts: fetchedProducts.length,
        topProducts: fetchedProducts.slice(0, 5),
        productAnalytics: analyticsData,
      })

      // Load newsletter stats
      const stats = newsletterService.getStats()
      setNewsletterStats(stats)

      console.log("Successfully loaded admin data")
    } catch (error) {
      console.warn("Error loading data:", error)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const success = await productService.deleteProduct(productId)

      if (success) {
        // Refresh data
        loadData()
        alert("Product deleted successfully!")
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product!")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-orange-200 shadow-2xl neon-glow">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-lg neon-glow">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Admin Login</CardTitle>
            <p className="text-gray-600">Access StyleStore Admin Panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">Login Failed</p>
                    <p className="text-sm text-red-700 mt-1">{loginError}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="h-4 w-4 text-orange-500" />
                  <span>Email Address</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-orange-500" />
                  <span>Password</span>
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  disabled={loading}
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 neon-glow transform hover:scale-105 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Access Admin Panel</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lock className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Secure Access</p>
                  <p className="text-sm text-orange-700 mt-1">
                    This admin panel is protected. Only authorized personnel can access the management features.
                  </p>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Need help? Contact the system administrator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Message */}
              <Card className="border-orange-200 neon-glow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                      <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Welcome to StyleStore Admin</h2>
                      <p className="text-gray-600">Manage your store, products, and analytics from here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Eye className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Clicks</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalClicks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalProducts}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Mail className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Newsletter Subscribers</p>
                        <p className="text-2xl font-bold text-gray-900">{newsletterStats.active}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Products */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0"></div>
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">${product.price}</p>
                          <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">{product.clicks}</p>
                          <p className="text-sm text-gray-600">clicks</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <DataExporter products={products} analytics={analytics} />
            </div>
          )}

          {activeTab === "products" && (
            <ProductManagement products={products} onProductsChange={loadData} onDeleteProduct={deleteProduct} />
          )}

          {activeTab === "newsletter" && <NewsletterManagement />}

          {activeTab === "analytics" && <AnalyticsDashboard analytics={analytics} demoMode={false} />}
          {activeTab === "users" && <UsersManagement />}
          {activeTab === "orders" && <OrdersManagement demoMode={false} />}
          {activeTab === "finance" && <FinanceManagement />}
          {activeTab === "marketing" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketing Dashboard</h2>
              <p className="text-gray-600">Coming soon - Campaign management and promotional tools</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
