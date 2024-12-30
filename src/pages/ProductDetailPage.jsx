import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchProductDetail } from '../redux/actions/productActions';
import { Spinner } from '../components/ui/Spinner';
import BestsellerProducts from '../components/BestsellerProduct'; // Bestseller Products import
import PageContent from '@/layout/PageContent';
import Description from '@/components/Description';
import IconList from '@/components/IconCard';

function ProductDetails({ selectedProduct, isLoading, fetchProductDetail }) {
  const { productId } = useParams();
  const history = useHistory();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (productId) {
      fetchProductDetail(productId);
    }
  }, [fetchProductDetail, productId]);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!selectedProduct || Object.keys(selectedProduct).length === 0) {
    return (
      <PageContent>
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button
            onClick={() => history.push('/shop')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Shop
          </button>
        </div>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        {/* Geri Dön Butonu */}
        <button
          onClick={() => history.goBack()}
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
        >
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol Taraf: Resim Galerisi */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden relative">
              <img
                src={selectedProduct.images?.[currentImage]?.url || '/placeholder-image.jpg'}
                alt={selectedProduct.name || 'Product Image'}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="flex mt-4 gap-2">
              {selectedProduct.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-16 h-16 border rounded-md overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image?.url || '/placeholder-image.jpg'}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sağ Taraf: Ürün Detayları */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(Math.round(selectedProduct.rating || 0))}
                {"☆".repeat(5 - Math.round(selectedProduct.rating || 0))}
              </span>
              <span className="text-gray-600">({(selectedProduct.rating || 0).toFixed(1)})</span>
            </div>
            <p className="text-gray-700">{selectedProduct.description}</p>
            <div className="text-2xl font-bold text-gray-900">
              ${(selectedProduct.price || 0).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">
              Availability: <span className="font-medium text-green-600">{selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </p>

            {/* Renk Geçişleri */}
            <div className="flex gap-4 my-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full hover:ring-2 ring-blue-300 cursor-pointer"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full hover:ring-2 ring-green-300 cursor-pointer"></div>
              <div className="w-6 h-6 bg-orange-500 rounded-full hover:ring-2 ring-orange-300 cursor-pointer"></div>
              <div className="w-6 h-6 bg-black rounded-full hover:ring-2 ring-gray-300 cursor-pointer"></div>
            </div>

            {/* Select Options ve İkonlar */}
            <div className="flex items-center space-x-4 mt-6">
              {/* Select Options Butonu */}
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                disabled={selectedProduct.stock === 0}
              >
                Select Options
              </button>

              {/* İkonlar */}
              <div className="flex items-center space-x-3">
                {/* Kalp İkonu */}
                <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.828l1.318-1.51a4.5 4.5 0 116.364 6.364L12 21.243l-7.682-8.36a4.5 4.5 0 010-6.364z" />
                  </svg>
                </button>
                {/* Alışveriş Sepeti İkonu */}
                <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-2 13H5L3 3zm3 13a3 3 0 100 6 3 3 0 000-6zm10 0a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </button>
                {/* Göz İkonu */}
                <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9 0c0 4.418-7.582 8-9 8s-9-3.582-9-8 7.582-8 9-8 9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Description />
        <BestsellerProducts />
        <IconList />
      </div>
    </PageContent>
  );
}

const mapStateToProps = (state) => ({
  selectedProduct: state.product.selectedProduct,
  isLoading: state.product.isLoading,
});

const mapDispatchToProps = {
  fetchProductDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
