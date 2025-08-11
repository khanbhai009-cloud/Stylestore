"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { supabase, type Product } from "@/lib/supabaseClient"

interface EditProductModalProps {
  product: Product | null
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

export default function EditProductModal({ product, isOpen, onClose, onSuccess }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    image_url: "",
    category: "watches",
    tags: "",
    affiliate_link: "",
    is_active: true,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || "",
        image_url: product.image_url,
        category: product.category,
        tags: product.tags.join(", "),
        affiliate_link: product.affiliate_link,
        is_active: product.is_active,
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          original_price: formData.original_price ? Number.parseFloat(formData.original_price) : null,
          image_url: formData.image_url,
          category: formData.category as "watches" | "pants" | "jeans" | "kurta" | "health-fitness" | "beauty",
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          affiliate_link: formData.affiliate_link,
          is_active: formData.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id)

      if (error) throw error

      alert("Product updated successfully!")
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product!")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Edit Product</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price ($)</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="New, Best Seller, Popular"
              />
            </div>

            <div>
              <Label htmlFor="affiliate_link">Affiliate Link</Label>
              <Input
                id="affiliate_link"
                type="url"
                value={formData.affiliate_link}
                onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="is_active">Product is active</Label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Updating..." : "Update Product"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
