import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../redux/actions/productActions';
import PageContent from '../layout/PageContent';
import IconList from '../components/IconCard';
import BestsellerProducts from '../components/BestsellerProduct';

function ProductDetails({ selectedProduct, isLoading, fetchProductDetail }) {
  const { productId } = useParams();

  useEffect(() => {
    fetchProductDetail(productId);
  }, [fetchProductDetail, productId]);

  if (isLoading) return <div>Loading...</div>;
  if (!selectedProduct) return <div>Product not found.</div>;

  return (
    <div>
      <PageContent />
      <div className="text-center mb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{selectedProduct.name}</h1>
          <p className="text-gray-600">{selectedProduct.description}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-4">
        <button onClick={() => window.history.back()} className="mb-4 p-2 bg-gray-200 rounded">
          Back
        </button>
        <div className="md:flex md:gap-8">
          <div className="md:w-1/2">
            <img
              src={selectedProduct.images[0]?.url}
              alt={selectedProduct.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-2xl font-bold mb-4">${selectedProduct.price}</p>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{selectedProduct.rating}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <BestsellerProducts />
      <IconList />
      <PageContent />
    </div>
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
