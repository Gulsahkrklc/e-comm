import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
};

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    setAuthToken(token);
    const response = await axiosInstance.get('/verify');
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    clearAuth();
    return null;
  }
};
