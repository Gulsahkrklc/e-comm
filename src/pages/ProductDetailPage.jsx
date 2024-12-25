import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, ChevronRight } from 'lucide-react';

const ProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <img
              src="/placeholder.svg"
              alt="Product"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Thumbnail 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Thumbnail 2"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <h1 className="text-3xl font-medium">Floating Phone</h1>
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-500 ml-2">10 Reviews</span>
          </div>
          <div className="space-y-4">
            <p className="text-2xl font-bold">$1,139.33</p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Availability:</span>
              <span className="text-blue-500">In Stock</span>
            </p>
          </div>
          <p className="text-gray-500">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.
          </p>
          <div className="flex gap-2">
            {['#23A6F0', '#2DC071', '#E77C40', '#252B42'].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex-1">
              Select Options
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50">
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="border-b mb-8">
          <div className="flex gap-8">
            <button 
              className={`pb-4 font-medium relative ${
                activeTab === 'description' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <button 
              className={`pb-4 font-medium ${
                activeTab === 'additional' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Information
            </button>
            <button 
              className={`pb-4 font-medium ${
                activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (0)
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {activeTab === 'description' && (
            <>
              <div>
                <h2 className="text-2xl font-medium mb-4">the quick fox jumps over</h2>
                <p className="text-gray-500 mb-8">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.
                </p>
                <p className="text-gray-500">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-medium mb-4">the quick fox jumps over</h2>
                <ul className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-500">
                      <ChevronRight className="w-5 h-5" />
                      the quick fox jumps over the lazy dog
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          
          {activeTab === 'additional' && (
            <p className="text-gray-500">
              Additional information content goes here.
            </p>
          )}
          
          {activeTab === 'reviews' && (
            <p className="text-gray-500">
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;