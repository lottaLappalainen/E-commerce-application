import axios from '../axiosConfig';
import { setNotification } from '../actions/notificationActions'; 

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(setNotification({ message: 'Deleting product...', stateType: 'product', requestStatus: 'loading' }));
  dispatch(deleteProductRequest());
  try {
    await axios.delete(`http://localhost:3001/api/products/${productId}`);
    dispatch(deleteProductSuccess());
    dispatch(fetchProducts()); 
    dispatch(setNotification({ message: 'Product deleted successfully!', stateType: 'product', requestStatus: 'success' }));
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
    dispatch(setNotification({ message: 'Failed to delete product. Please try again later.', stateType: 'product', requestStatus: 'error' }));
  }
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch(setNotification({ message: 'Adding product...', stateType: 'product', requestStatus: 'loading' }));
  dispatch(addProductRequest());
  try {
    const response = await axios.post('http://localhost:3001/api/products', productData);
    const newProduct = response.data;
    dispatch(addProductSuccess(newProduct));
    dispatch(setNotification({ message: 'Product added successfully!', stateType: 'product', requestStatus: 'success' }));
    return newProduct;
  } catch (error) {
    dispatch(addProductFailure(error.message));
    dispatch(setNotification({ message: 'Failed to add product. Please try again later.', stateType: 'product', requestStatus: 'error' }));
    throw error;
  }
};

export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setNotification({ message: 'Fetching product details...', stateType: 'product', requestStatus: 'loading' }));
  dispatch(fetchProductRequest());
  
  try {
    const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
    dispatch(fetchProductSuccess(response.data));
    dispatch(setNotification({ message: 'Product details fetched successfully!', stateType: 'product', requestStatus: 'success' }));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
    dispatch(setNotification({ message: 'Failed to fetch product details.', stateType: 'product', requestStatus: 'error' }));
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(setNotification({ message: 'Getting products...', stateType: 'product', requestStatus: 'loading' }));
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get('http://localhost:3001/api/products');
    dispatch(fetchProductsSuccess(response.data)); 
    dispatch(setNotification({ message: 'Products fetched successfully!', stateType: 'product', requestStatus: 'success' }));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
    dispatch(setNotification({ message: 'Error fetching products.', stateType: 'product', requestStatus: 'error' }));
  }
};
