"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", image: "" });

  const fetchProducts = async () => {
    const res = await axios.get("/api/admin/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
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
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

      <div className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="p-2 border rounded"
        />
        <button
          onClick={addProduct}
          className="bg-gold-500 hover:bg-yellow-400 text-black font-bold py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <img src={p.image} alt={p.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-lg font-bold">{p.title}</h2>
            <p>${p.price}</p>
            <button
              onClick={() => deleteProduct(p._id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}