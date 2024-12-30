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
  const selectedItems = cart.filter(item => item.checked);
  const subtotal = selectedItems.reduce((total, item) => total + (item.product.price * item.count), 0);
  const shipping = selectedItems.length > 0 ? 29.99 : 0;
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

  const handleToggleCheck = (productId) => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      dispatch(updateCartItem(productId, { checked: !item.checked }));
    }
  };

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Sepetim ({totalItems} Ürün)</h1>

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
          <div className="grid grid-cols-1 gap-8">
            {/* Ürün Tablosu */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={cart.length > 0 && cart.every(item => item.checked)}
                        onChange={() => {
                          const allChecked = cart.every(item => item.checked);
                          cart.forEach(item => {
                            dispatch(updateCartItem(item.product.id, { checked: !allChecked }));
                          });
                        }}
                        className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ürün
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satıcı
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adet
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kargo
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Sil</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggleCheck(item.product.id)}
                          className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-20 w-20">
                            <img
                              src={item.product.image || item.product.thumbnail}
                              alt={item.product.name}
                              className="h-20 w-20 object-cover rounded"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Beden: {item.product.size || 'Standart'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.product.seller || 'Satıcı'}</div>
                        <div className="text-xs text-gray-500">
                          {item.product.rating && (
                            <span className="flex items-center">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <span key={index} className={index < Math.round(item.product.rating) ? "text-yellow-400" : "text-gray-300"}>
                                  ★
                                </span>
                              ))}
                              <span className="ml-1">{item.product.rating.toFixed(1)}</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border rounded w-fit">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 border-x">{item.count}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#23A6F0]">
                          {(item.product.price * item.count).toFixed(2)} TL
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          Kargo Bedava
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Seçili Ürünlerin Toplamı */}
            {selectedItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Seçili Ürünler ({selectedItems.length})</span>
                    <span>{subtotal.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Kargo</span>
                    <span>{shipping.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                    <span>Toplam</span>
                    <span className="text-[#23A6F0]">{total.toFixed(2)} TL</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="block w-full bg-[#23A6F0] text-white text-center py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors"
                  >
                    Seçili Ürünleri Satın Al
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default CartPage;
