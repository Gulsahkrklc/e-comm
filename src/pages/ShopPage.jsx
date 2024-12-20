import React, { useState } from "react";

import PageContent from "../layout/PageContent"; // Ana içerik sarmalayıcı bileşeni

const products = [
  { id: 1, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop1.jpeg" },
  { id: 2, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop2.jpeg" },
  { id: 3, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop3.jpeg" },
  { id: 4, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop4.jpeg" },
  { id: 5, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop5.jpeg" },
  { id: 6, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop6.jpeg" },
  { id: 7, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop7.jpeg" },
  { id: 8, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop8.jpeg" },
  { id: 9, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop9.jpeg" },
  { id: 10, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop10.jpeg" },
  { id: 11, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop11.jpeg" },
  { id: 12, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop12.jpeg" },
  { id: 13, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop1.jpeg" },
  { id: 14, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop2.jpeg" },
  { id: 15, title: "Graphic Design", department: "English Department", price: "$16.48", salePrice: "$6.48", colors: ["blue", "green", "orange", "red"], imageUrl: "/images/shop3.jpeg" },
];

const categories = [
  { name: "CLOTHS", items: 5, imageUrl: "/images/cloths1.png" },
  { name: "CLOTHS", items: 5, imageUrl: "/images/cloths2.png" },
  { name: "CLOTHS", items: 5, imageUrl: "/images/cloths3.png" },
  { name: "CLOTHS", items: 5, imageUrl: "/images/cloths4.png" },
  { name: "CLOTHS", items: 5, imageUrl: "/images/cloths5.png" },
];

const ITEMS_PER_PAGE = 8;

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Popularity");

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Sort logic can be added here based on e.target.value
  };

  return (
    <div>
      <PageContent>
        {/* Sayfa Başlığı ve Yönlendirme */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Shop</h2>
            <nav className="text-sm text-gray-500">
              <a href="/" className="hover:underline">Home</a> / <span className="text-gray-700">Shop</span>
            </nav>
          </div>
        </div>

        {/* Üst Kategori Bölümü */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-40 object-top object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold text-center">
                    {category.name} <br /> {category.items} Items
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Filtreleme Kısmı */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-700">Showing all {products.length} results</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Views:</span>
                <button className="border px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h4m0 0V4m0 2v2M4 18h4m0 0v2m0-2v-2m6-10h4m0 0V4m0 2v2M10 18h4m0 0v2m0-2v-2M4 12h16m0 0H4m0 0v2m16-2v-2" />
                  </svg>
                </button>
                <button className="border px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="border px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                <option value="Popularity">Popularity</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
              <button className="border px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Filter</button>
            </div>
          </div>

          {/* Ürün Listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-72 object-cover object-top rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.department}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 line-through">{product.price}</span>
                    <span className="text-green-500 font-bold">{product.salePrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sayfalama */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white text-black"} rounded-l-lg`}
            >
              First
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"} hover:bg-blue-100`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-white text-black"} rounded-r-lg`}
            >
              Next
            </button>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default ShopPage;

