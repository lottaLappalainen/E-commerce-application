import axios from '../axiosConfig';
import { setNotification } from '../actions/notificationActions'; 

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const MODIFY_USER_REQUEST = 'MODIFY_USER_REQUEST';
export const MODIFY_USER_SUCCESS = 'MODIFY_USER_SUCCESS';
export const MODIFY_USER_FAILURE = 'MODIFY_USER_FAILURE';

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, payload: user });
export const fetchUserFailure = (error) => ({ type: FETCH_USER_FAILURE, payload: error });

export const deleteUsersRequest = () => ({ type: DELETE_USER_REQUEST });
export const deleteUsersSuccess = () => ({ type: DELETE_USER_SUCCESS });
export const deleteUsersFailure = (error) => ({ type: DELETE_USER_FAILURE, payload: error });

export const modifyUserRequest = () => ({ type: MODIFY_USER_REQUEST });
export const modifyUserSuccess = () => ({ type: MODIFY_USER_SUCCESS });
export const modifyUserFailure = (error) => ({ type: MODIFY_USER_FAILURE, payload: error });

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  dispatch(setNotification({ message: 'Fetching users...', stateType: 'user', requestStatus: 'loading' })); 
  try {
    const response = await axios.get('http://localhost:3001/api/users');
    dispatch(fetchUsersSuccess(response.data));
    dispatch(setNotification({ message: 'Users fetched successfully!', stateType: 'user', requestStatus: 'success' })); 
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
    dispatch(setNotification({ message: 'Error fetching users.', stateType: 'user', requestStatus: 'error' })); 
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  dispatch(fetchUserRequest());
  dispatch(setNotification({ message: 'Fetching user details...', stateType: 'user', requestStatus: 'loading' }));
  try {
    const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
    dispatch(fetchUserSuccess(response.data));
    dispatch(setNotification({ message: 'User details fetched successfully!', stateType: 'user', requestStatus: 'success' }));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
    dispatch(setNotification({ message: 'Error fetching user details.', stateType: 'user', requestStatus: 'error' }));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUsersRequest());
  dispatch(setNotification({ message: 'Deleting user...', stateType: 'user', requestStatus: 'loading' })); 
  try {
    await axios.delete(`http://localhost:3001/api/users/${userId}`);
    dispatch(deleteUsersSuccess());
    dispatch(fetchUsers()); 
    dispatch(setNotification({ message: 'User deleted successfully!', stateType: 'user', requestStatus: 'success' })); 
  } catch (error) {
    dispatch(deleteUsersFailure(error.message));
    dispatch(setNotification({ message: 'Error deleting user.', stateType: 'user', requestStatus: 'error' })); 
  }
};

export const modifyUser = (userData) => async (dispatch) => {
  dispatch(modifyUserRequest());
  dispatch(setNotification({ message: 'Updating user...', stateType: 'user', requestStatus: 'loading' })); 
  try {
    dispatch(modifyUserSuccess());
    dispatch(fetchUsers()); 
    dispatch(setNotification({ message: 'User updated successfully!', stateType: 'user', requestStatus: 'success' })); 
  } catch (error) {
    dispatch(modifyUserFailure(error.message));
    dispatch(setNotification({ message: 'Error updating user.', stateType: 'user', requestStatus: 'error' })); 
  }
};
