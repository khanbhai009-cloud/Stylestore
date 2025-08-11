"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminAddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const discountedPrice = discount
      ? (Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)
      : price;

    const { data, error } = await supabase.from("products").insert([
      {
        title,
        description,
        price: Number(price),
        discount: Number(discount) || 0,
        discounted_price: Number(discountedPrice),
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("❌ Error adding product.");
    } else {
      setMessage("✅ Product added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setImageUrl("");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin - Add Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={3}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Discount % (optional)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}