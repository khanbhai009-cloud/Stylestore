"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  image_url: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false })

      if (error) {
        console.error("Error fetching products:", error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-20">No products found.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => {
        const discountedPrice = product.discount
          ? product.price - (product.price * product.discount) / 100
          : product.price

        return (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            {product.discount ? (
              <p className="mt-2 text-red-500">
                <span className="line-through text-gray-400 mr-2">
                  ${product.price.toFixed(2)}
                </span>
                ${discountedPrice.toFixed(2)} (-{product.discount}%)
              </p>
            ) : (
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}