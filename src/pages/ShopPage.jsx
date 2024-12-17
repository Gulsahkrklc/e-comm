import React, { useState } from 'react';

const products = [
    { id: 1, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop1.jpeg' },
    { id: 2, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop2.jpeg' },
    { id: 3, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop3.jpeg' },
    { id: 4, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop4.jpeg' },
    { id: 5, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop5.jpeg' },
    { id: 6, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop6.jpeg' },
    { id: 7, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop7.jpeg' },
    { id: 8, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop8.jpeg' },
    { id: 9, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop9.jpeg' },
    { id: 10, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop10.jpeg' },
    { id: 11, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop11.jpeg' },
    { id: 12, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop12.jpeg' },
    { id: 13, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop12.jpeg' },
    { id: 14, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop12.jpeg' },
    { id: 12, title: 'Graphic Design', department: 'English Department', price: '$16.48', salePrice: '$6.48', colors: ['blue', 'green', 'orange', 'red'], imageUrl: '/images/shop12.jpeg' },
    
];

const ITEMS_PER_PAGE =12; // Desktop için 8 ürün gösterilecek

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

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop</h2>

            {/* Ürün Listesi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedProducts.map(product => (
                    <div key={product.id} className="border rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    {/* Resim kısmı */}
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-72 object-cover object-top rounded-t-lg" // Tailwind sınıfları
                    />
                    {/* Bilgi kısmı */}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.department}</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-500 line-through">{product.price}</span>
                            <span className="text-green-500 font-bold">{product.salePrice}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`w-4 h-4 rounded-full bg-${color}-500`}
                                ></div>
                            ))}
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
                    className={`px-4 py-2 border ${currentPage === 1 ? 'text-gray-400' : 'text-black'} rounded-l-lg`}
                >
                    First
                </button>
                <span className="px-4 py-2 border-t border-b">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border ${currentPage === totalPages ? 'text-gray-400' : 'text-black'} rounded-r-lg`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ShopPage;
