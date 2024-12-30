import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../redux/actions/shoppingCartActions';

const CartDropdown = () => {
  const cart = useSelector(state => state.shoppingCart.cart);
  const dispatch = useDispatch();
  
  const totalItems = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.count), 0);

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
    <div className="relative group">
      <button className="flex items-center gap-2 p-2">
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-gray-700">Sepetim</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Sepetim ({totalItems} Ürün)</h3>
          
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Sepetiniz boş</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 max-h-[400px] overflow-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.product.image || item.product.thumbnail}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Beden: {item.product.size || 'Standart'}</span>
                        <span className="mx-2">Adet: {item.count}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.count}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[#23A6F0] font-semibold mt-2">
                        {(item.product.price * item.count).toFixed(2)} TL
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Toplam:</span>
                  <span className="font-semibold text-[#23A6F0]">{totalPrice.toFixed(2)} TL</span>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    className="flex-1 px-4 py-2 border border-[#23A6F0] text-[#23A6F0] text-center rounded hover:bg-gray-50 transition-colors"
                  >
                    Sepete Git
                  </Link>
                  <Link
                    to="/checkout"
                    className="flex-1 px-4 py-2 bg-[#23A6F0] text-white text-center rounded hover:bg-blue-600 transition-colors"
                  >
                    Siparişi Tamamla
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
