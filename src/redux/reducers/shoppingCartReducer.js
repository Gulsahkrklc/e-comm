import { 
  ADD_TO_CART, 
  UPDATE_CART_ITEM, 
  REMOVE_FROM_CART,
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS
} from '../actions/shoppingCartActions';

const initialState = {
  cart: [],
  payment: null,
  address: null,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.cart.findIndex(
        item => item.product.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Ürün zaten sepette varsa count'u artır
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              count: item.count + 1
            };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedCart
        };
      } else {
        // Yeni ürün ekle
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              count: 1,
              checked: true,
              product: action.payload
            }
          ]
        };
      }
    }

    case UPDATE_CART_ITEM: {
      const { productId, changes } = action.payload;
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === productId
            ? { ...item, ...changes }
            : item
        )
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case SET_CART:
      return { 
        ...state, 
        cart: action.payload 
      };

    case SET_PAYMENT:
      return { 
        ...state, 
        payment: action.payload 
      };

    case SET_ADDRESS:
      return { 
        ...state, 
        address: action.payload 
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;