import axios from 'axios'; // axios import

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
export const SET_PRODUCT_LOADING = 'SET_PRODUCT_LOADING';

// Thunk action to fetch products using axios
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('LOADING'));

  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.filter) queryParams.append('filter', params.filter);
    if (params.limit) queryParams.append('limit', params.limit || 25);
    queryParams.append('offset', params.offset || 0);

    const url = `https://workintech-fe-ecommerce.onrender.com/products?${queryParams}`;
    const response = await axios.get(url);
    console.log(response.data); // Log the API response

    if (response.status === 200) {
      dispatch(setFetchState('SUCCESS'));
      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
    } else {
      dispatch(setFetchState('FAILED'));
      dispatch(setProductList([]));
      dispatch(setTotal(0));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState('FAILED'));
    dispatch(setProductList([]));
    dispatch(setTotal(0));
  }
};

export const fetchProductDetail = (productId) => async (dispatch) => {
  dispatch({ type: SET_PRODUCT_LOADING, payload: true });

  try {
    const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products/${productId}`);
    dispatch({ type: SET_SELECTED_PRODUCT, payload: response.data });
  } catch (error) {
    console.error('Error fetching product details:', error);
  } finally {
    dispatch({ type: SET_PRODUCT_LOADING, payload: false });
  }
};

// Action creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});