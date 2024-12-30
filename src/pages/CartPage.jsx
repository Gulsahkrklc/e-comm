import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItem } from '../redux/actions/shoppingCartActions';
import { Trash2, Minus, Plus } from 'lucide-react';
import PageContent from '@/layout/PageContent';

const CartPage = () => {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((total, item) => total + item.count, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
  const shipping = 29.99; // Sabit kargo ücreti
  const total = subtotal + shipping;

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newCount) => {
    if (newCount > 0) {
      dispatch(updateCartItem(productId, { count: newCount }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Alışveriş Sepeti ({totalItems} Ürün)</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Sepetiniz boş</h2>
            <p className="text-gray-600 mb-8">Sepetinizde henüz ürün bulunmamaktadır.</p>
            <Link
              to="/shop"
              className="inline-block bg-[#23A6F0] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ürün Listesi */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-6 p-4 bg-white rounded-lg shadow">
                    <img
                      src={item.product.images?.[0] || '/placeholder-image.jpg'}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Beden: {item.product.size || 'Standart'}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 border-x">{item.count}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-[#23A6F0]">
                          {(item.product.price * item.count).toFixed(2)} TL
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sipariş Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{subtotal.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span>{shipping.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-3 border-t">
                    <span>Toplam</span>
                    <span className="text-[#23A6F0]">{total.toFixed(2)} TL</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-[#23A6F0] text-white text-center py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors"
                >
                  Ödemeye Geç
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default CartPage;
