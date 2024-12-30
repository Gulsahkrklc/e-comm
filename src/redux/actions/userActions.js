// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

// Action Creators
export const setUser = (user) => ({
  type: 'SET_USER', // clientReducer'daki action type ile eşleştirdik
  payload: user,
});

export const clearUser = () => ({
  type: 'SET_USER', // user null olarak set ediyoruz
  payload: null,
});
