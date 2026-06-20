'use client';

import { useState } from 'react';
import { addProduct } from './actions';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const formData = new FormData(e.target);
      const file = formData.get('image');

      let imageUrl = '';
      if (file && file.size > 0) {
        const uploadData = new FormData();
        uploadData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error('Upload failed');
        const uploadJson = await uploadRes.json();
        imageUrl = uploadJson.url;
      }

      await addProduct({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        category: formData.get('category'),
        imageUrl,
      });

      setSuccess(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-display mb-8 text-foreground">Add New Product</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Product added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-elegant">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input required name="name" type="text" className="w-full border border-gray-300 p-3 rounded" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea name="description" rows="3" className="w-full border border-gray-300 p-3 rounded"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input required name="price" type="number" step="0.01" className="w-full border border-gray-300 p-3 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input required name="category" type="text" className="w-full border border-gray-300 p-3 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
          <input required name="image" type="file" accept="image/*" className="w-full border border-gray-300 p-3 rounded" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-charcoal hover:bg-maroon text-white font-medium py-3 px-4 rounded transition-colors uppercase tracking-widest text-sm"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
