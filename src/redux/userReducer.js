const initialState = {
    user: null,
    error: null,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.user, error: null };
      case 'LOGIN_FAILURE':
        return { ...state, error: action.error };
      case 'SET_USER':
        return { ...state, user: action.user, error: null };
      default:
        return state;
    }
  }