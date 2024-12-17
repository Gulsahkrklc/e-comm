import axios from 'axios';

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    axios.post('/login', { email, password })
      .then((response) => {
        const token = response.data.token;
        const user = response.data.user;

        if (rememberMe) {
          localStorage.setItem('token', token);
        }

        dispatch({ type: 'LOGIN_SUCCESS', user });
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_FAILURE', error });
      });
  };
};

export const setUser  = (user) => {
  return {
    type: 'SET_USER',
    user,
  };
};