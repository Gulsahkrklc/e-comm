import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchProductDetail } from '../redux/actions/productActions';
import { Spinner } from '../components/ui/Spinner';

function ProductDetails({ selectedProduct, isLoading, fetchProductDetail }) {
  const { productId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchProductDetail(productId);
  }, [fetchProductDetail, productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!selectedProduct) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => history.goBack()}
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={selectedProduct.images[0]?.url}
              alt={selectedProduct.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
          <p className="text-gray-700">{selectedProduct.description}</p>
          <div className="text-2xl font-bold text-gray-900">${selectedProduct.price.toFixed(2)}</div>
          <button className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
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
