import React from "react";

export default function BestsellerProducts() {
  const products = [
    {
      id: 1,
      image: "/images/bestseller-1.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 2,
      image: "/images/bestseller-2.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 3,
      image: "/images/bestseller-3.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 4,
      image: "/images/bestseller-4.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 5,
      image: "/images/bestseller-5.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 6,
      image: "/images/bestseller-6.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 7,
      image: "/images/bestseller-1.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
    {
      id: 8,
      image: "/images/bestseller-2.jpeg",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: 16.48,
      salePrice: 6.48,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">BESTSELLER PRODUCTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="aspect-square relative mb-4 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.department}</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-green-600">
                ${product.salePrice.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
