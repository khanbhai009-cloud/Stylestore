"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Upload, ImageIcon, CheckCircle, AlertCircle } from "lucide-react"
import { productService, storageService } from "@/lib/firebaseService"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const categories = [
  { value: "watches", label: "Watches" },
  { value: "pants", label: "Pants" },
  { value: "jeans", label: "Jeans" },
  { value: "kurta", label: "Kurta" },
  { value: "health-fitness", label: "Health & Fitness" },
  { value: "beauty", label: "Beauty" },
]

const availableTags = ["New", "Best Seller", "Limited Offer", "Premium", "Hot Deal", "Trending"]

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    image_url: "",
    category: "watches",
    tags: [] as string[],
    affiliate_link: "",
    discount_type: "percentage" as "percentage" | "amount",
    discount_value: "",
  })
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error("Product name is required")
      }
      if (!formData.description.trim()) {
        throw new Error("Product description is required")
      }
      if (!formData.price || Number.parseFloat(formData.price) <= 0) {
        throw new Error("Valid price is required")
      }
      if (!formData.affiliate_link.trim()) {
        throw new Error("Affiliate link is required")
      }

      let imageUrl = formData.image_url

      // Upload image if file is selected
      if (imageFile) {
        setImageUploading(true)
        console.log("Uploading image file:", imageFile.name)

        try {
          const uploadedUrl = await storageService.uploadProductImage(imageFile)
          if (uploadedUrl) {
            imageUrl = uploadedUrl
            console.log("Image uploaded successfully:", uploadedUrl)
          } else {
            console.warn("Image upload returned null, using placeholder")
            imageUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(formData.name)}`
          }
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError)
          // Use placeholder if upload fails
          imageUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(formData.name)}`
        }
        setImageUploading(false)
      }

      // If no image provided, use placeholder
      if (!imageUrl) {
        imageUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(formData.name)}`
      }

      // Calculate discount
      let discountPercentage = 0
      let discountAmount = 0

      if (formData.discount_value) {
        if (formData.discount_type === "percentage") {
          discountPercentage = Number.parseFloat(formData.discount_value)
          if (formData.original_price) {
            discountAmount = (Number.parseFloat(formData.original_price) * discountPercentage) / 100
          }
        } else {
          discountAmount = Number.parseFloat(formData.discount_value)
          if (formData.original_price) {
            discountPercentage = (discountAmount / Number.parseFloat(formData.original_price)) * 100
          }
        }
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        original_price: formData.original_price ? Number.parseFloat(formData.original_price) : undefined,
        image_url: imageUrl,
        category: formData.category as "watches" | "pants" | "jeans" | "kurta" | "health-fitness" | "beauty",
        tags: formData.tags,
        affiliate_link: formData.affiliate_link.trim(),
        clicks: 0,
        is_active: true,
        discount_percentage: Math.round(discountPercentage),
        discount_amount: discountAmount,
      }

      console.log("Adding product with data:", productData)

      const productId = await productService.addProduct(productData)

      if (productId) {
        setSuccess(true)
        console.log("✅ Product added successfully:", productData.name, "ID:", productId)

        // Show success message briefly
        setTimeout(() => {
          onSuccess()
          onClose()
          resetForm()
          setSuccess(false)
        }, 2000)
      } else {
        throw new Error("Failed to add product - no ID returned")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to add product"
      setError(errorMessage)
    } finally {
      setLoading(false)
      setImageUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      original_price: "",
      image_url: "",
      category: "watches",
      tags: [],
      affiliate_link: "",
      discount_type: "percentage",
      discount_value: "",
    })
    setImageFile(null)
    setImagePreview("")
    setError("")
  }

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image file size must be less than 5MB")
        return
      }

      setImageFile(file)
      setError("")

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setFormData((prev) => ({ ...prev, image_url: previewUrl }))

      console.log("Image file selected:", file.name, "Size:", (file.size / 1024 / 1024).toFixed(2) + "MB")
    }
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData((prev) => ({ ...prev, image_url: url }))
    setImageFile(null)
    setImagePreview("")
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image_url: "" }))
    setImageFile(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview("")
    }
  }

  if (!isOpen) return null

  // Success state
  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Product Added Successfully!</h3>
            <p className="text-gray-600 mb-4">"{formData.name}" has been added and is now visible on the homepage.</p>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-800">
                ✅ Product is live on homepage
                <br />✅ Available in admin panel
                <br />✅ Ready for customers to view
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Add New Product</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-800 font-medium">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Title *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter product name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                    required
                    disabled={loading}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Enter product description"
                    rows={4}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <div>
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {formData.image_url || imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview || formData.image_url || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg mx-auto"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=200&width=200&text=Image+Error"
                          }}
                        />
                        <Button type="button" variant="outline" onClick={removeImage} disabled={loading}>
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={loading}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("image-upload")?.click()}
                            disabled={imageUploading || loading}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {imageUploading ? "Uploading..." : "Upload Image"}
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">or</p>
                        <Input
                          type="url"
                          value={formData.image_url}
                          onChange={handleImageUrlChange}
                          placeholder="Enter image URL"
                          disabled={loading}
                        />
                        <p className="text-xs text-gray-400">Max file size: 5MB. Supported: JPG, PNG, GIF</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Current Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="0.00"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price ($)</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  placeholder="0.00"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount</Label>
                <div className="flex space-x-2">
                  <select
                    value={formData.discount_type}
                    onChange={(e) =>
                      setFormData({ ...formData, discount_type: e.target.value as "percentage" | "amount" })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                    disabled={loading}
                  >
                    <option value="percentage">%</option>
                    <option value="amount">$</option>
                  </select>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.discount_value}
                    onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                    placeholder="0"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Product Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant={formData.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagToggle(tag)}
                    disabled={loading}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Affiliate Link */}
            <div>
              <Label htmlFor="affiliate_link">Affiliate Link *</Label>
              <Input
                id="affiliate_link"
                type="url"
                value={formData.affiliate_link}
                onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                required
                placeholder="https://example.com/product"
                disabled={loading}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button type="submit" disabled={loading || imageUploading} className="flex-1">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Adding Product...</span>
                  </div>
                ) : (
                  "Add Product & Show on Homepage"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
