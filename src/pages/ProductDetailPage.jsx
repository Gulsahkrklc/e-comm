import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { fetchProductDetail } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/shoppingCartActions';
import { Spinner } from '../components/ui/Spinner';
import BestsellerProducts from '../components/BestsellerProduct';
import PageContent from '@/layout/PageContent';
import Description from '@/components/Description';
import IconList from '@/components/IconCard';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';

function ProductDetailPage({ selectedProduct, isLoading, fetchProductDetail }) {
  const { gender, categoryName, categoryId, productNameSlug, productId } = useParams();
  const history = useHistory();
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      fetchProductDetail(productId);
    }
  }, [fetchProductDetail, productId]);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Ürünü sepete eklerken image'i de ekleyelim
      const productWithImage = {
        ...selectedProduct,
        image: selectedProduct.images?.[0] || selectedProduct.image || selectedProduct.thumbnail
      };
      dispatch(addToCart(productWithImage));
      toast.success('Ürün sepete eklendi!');
    }
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
          <h2 className="text-2xl font-bold mb-4">Ürün bulunamadı</h2>
          <button
            onClick={() => history.push('/shop')}
            className="bg-[#23A6F0] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Mağazaya Dön
          </button>
        </div>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Anasayfa</Link>
          <span className="text-gray-400">/</span>
          <Link to="/shop" className="text-gray-600 hover:text-gray-900">Mağaza</Link>
          <span className="text-gray-400">/</span>
          <Link to={`/shop/${gender}`} className="text-gray-600 hover:text-gray-900">{gender}</Link>
          <span className="text-gray-400">/</span>
          <Link to={`/shop/${gender}/${categoryName}`} className="text-gray-600 hover:text-gray-900">{categoryName}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{selectedProduct.name}</span>
        </div>

        {/* Geri Dön Butonu */}
        <button
          onClick={() => history.goBack()}
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
        >
          Geri Dön
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol Taraf: Resim Galerisi */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name || 'Ürün Görseli'}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="flex mt-4 gap-2">
              <button
                onClick={() => handleImageChange(0)}
                className={`w-16 h-16 border rounded-md overflow-hidden ring-2 ring-[#23A6F0]`}
              >
                <img
                  src={selectedProduct.image}
                  alt={`Ürün Görseli`}
                  className="w-full h-full object-cover"
                />
              </button>
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
            <div className="text-2xl font-bold text-[#23A6F0]">
              {(selectedProduct.price || 0).toFixed(2)} TL
            </div>
            <p className="text-sm text-gray-600">
              Stok Durumu: <span className="font-medium text-green-600">{selectedProduct.stock > 0 ? 'Stokta Var' : 'Stokta Yok'}</span>
            </p>

            {/* Select Options ve İkonlar */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {/* Select Options Butonu */}
                <button
                  className="bg-[#23A6F0] text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  Seçenekler
                </button>

                {/* İkonlar */}
                <div className="flex items-center gap-3">
                  {/* Kalp İkonu */}
                  <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  {/* Alışveriş Sepeti İkonu */}
                  <button 
                    onClick={handleAddToCart}
                    className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                  </button>
                  {/* Göz İkonu */}
                  <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sepete Ekle Butonu */}
              <button 
                onClick={handleAddToCart}
                className="bg-[#23A6F0] text-white py-[15px] px-[40px] rounded-[5px] hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Sepete Ekle
              </button>
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

export default connect(mapStateToProps, { fetchProductDetail })(ProductDetailPage);
