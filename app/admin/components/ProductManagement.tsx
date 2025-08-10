"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Product } from "@/lib/supabase"
import AddProductModal from "./AddProductModal"
import EditProductModal from "./EditProductModal"

interface ProductManagementProps {
  products: Product[]
  onProductsChange: () => void
  onDeleteProduct: (productId: string) => void
}

export default function ProductManagement({ products, onProductsChange, onDeleteProduct }: ProductManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleAddProduct = () => {
    setShowAddModal(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Products Management</CardTitle>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Clicks</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.description.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 capitalize">{product.category}</td>
                    <td className="p-2">
                      <div>
                        <p className="font-semibold">${product.price}</p>
                        {product.original_price && (
                          <p className="text-sm text-gray-500 line-through">${product.original_price}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-2">{product.clicks}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <>
        <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={onProductsChange} />

        <EditProductModal
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={onProductsChange}
        />
      </>
    </>
  )
}
