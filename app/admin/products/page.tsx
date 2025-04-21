"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; // ✅ import Image properly

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", image: "" });

  const fetchProducts = async () => {
    const res = await axios.get("/api/admin/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) return;
    await axios.post("/api/admin/products", newProduct);
    setNewProduct({ title: "", price: "", image: "" });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await axios.delete(`/api/admin/products?id=${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gold-500">Manage Products</h1>

      {/* Add New Product Form */}
      <div className="flex flex-col gap-4 mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="p-2 border rounded bg-black text-white"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-2 border rounded bg-black text-white"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="p-2 border rounded bg-black text-white"
        />
        <button
          onClick={addProduct}
          className="bg-gold-500 hover:bg-yellow-400 text-black font-bold py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border border-gold-500 bg-black p-4 rounded-xl shadow-lg">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-lg font-bold text-white">{p.title}</h2>
            <p className="text-gold-500">${p.price}</p>
            <button
              onClick={() => deleteProduct(p._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
