"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift, Sparkles, CheckCircle } from "lucide-react"
import { newsletterService } from "@/lib/newsletterService"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError("")

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Add subscriber to service
      const subscriberId = newsletterService.addSubscriber(email, "homepage")

      if (subscriberId) {
        setIsSubscribed(true)
        setEmail("")
        console.log(`✅ Newsletter subscription successful: ${email}`)

        // Reset after 4 seconds
        setTimeout(() => {
          setIsSubscribed(false)
        }, 4000)
      } else {
        throw new Error("Subscription failed. Please try again.")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Subscription failed"
      setError(errorMessage)
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700 rounded-2xl p-8 md:p-12 shadow-xl neon-glow relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 animate-float">
              <Sparkles className="h-6 w-6 text-orange-400" />
            </div>
            <div className="absolute bottom-4 left-4 animate-float-delayed">
              <Gift className="h-8 w-8 text-yellow-400" />
            </div>

            <div className="relative z-10">
              {!isSubscribed ? (
                <div className="text-center space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 dark:border-orange-700">
                      <Mail className="h-4 w-4" />
                      <span>Exclusive Offers</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                      Get{" "}
                      <span className="text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
                        20% Off
                      </span>{" "}
                      Your First Order!
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                      Join our newsletter and be the first to know about new arrivals, exclusive deals, and style tips.
                      Plus, get an instant 20% discount on your first purchase!
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full flex items-center justify-center">
                        <Gift className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-800 dark:text-white">Exclusive Deals</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Member-only discounts</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-full flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-800 dark:text-white">New Arrivals</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">First access to trends</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-800 dark:text-white">Style Tips</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Fashion advice & guides</div>
                      </div>
                    </div>
                  </div>

                  {/* Signup Form */}
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 border-orange-200 dark:border-orange-700 focus:border-orange-400 focus:ring-orange-400"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 neon-glow transform hover:scale-105 transition-all duration-300"
                      >
                        {isLoading ? "Subscribing..." : "Get 20% Off"}
                      </Button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
                        {error}
                      </div>
                    )}
                  </form>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mt-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full shadow-lg"></div>
                      <span>Unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full shadow-lg"></div>
                      <span>10K+ subscribers</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome to StyleStore!</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for subscribing! Check your email for your 20% discount code.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      🎉 Your discount code is on its way! Start shopping and save 20% on your first order.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
