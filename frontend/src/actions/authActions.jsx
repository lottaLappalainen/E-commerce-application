import axios from '../axiosConfig'; 
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';

export const FETCH_USER_STATUS = 'FETCH_USER_STATUS';

export const fetchUserStatus = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/check-status');
    console.log(response);
    dispatch({
      type: FETCH_USER_STATUS,
      payload: response.data.user, 
    });
  } catch (error) {
    console.error('Error checking authentication status:', error);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/login', userData); 
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw error;
    }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/logout'); 
    dispatch({ type: LOGOUT_USER });
    return response.data;
  } catch (error) {
    console.error('Error checking authentication status:', error);
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/register', userData); 
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
