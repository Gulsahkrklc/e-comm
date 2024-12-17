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
];

const ITEMS_PER_PAGE = 8;

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const categories = [
    { name: "CLOTHS", imageUrl: "/images/shop1.jpeg" },
    { name: "CLOTHS", imageUrl: "/images/shop1.jpeg" },
    { name: "CLOTHS", imageUrl: "/images/shop1.jpeg" },
    { name: "CLOTHS", imageUrl: "/images/shop1.jpeg" },
    { name: "CLOTHS", imageUrl: "/images/shop1.jpeg" },
  ];

  return (
    <div>
      
      
      <PageContent>
        {/* Üst Kategori Bölümü */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
  {categories.map((category, index) => (
    <div
      key={index}
      className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
    >
      {/* Arka plan resmi */}
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-32 object-cover"
      />
      {/* Üstüne gelen içerik */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <p className="text-white text-xl font-semibold text-center">
          {category.name} <br /> 5 Items
        </p>
      </div>
    </div>
  ))}
</div>

          {/* Ürün Listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg shadow-md hover:shadow-lg transition duration-300">
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
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 border ${currentPage === 1 ? "text-gray-400" : "text-black"} rounded-l-lg`}
            >
              Previous
            </button>
            <span className="px-4 py-2 border-t border-b">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border ${currentPage === totalPages ? "text-gray-400" : "text-black"} rounded-r-lg`}
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

