import axios from '../axiosConfig';
import { setNotification } from '../actions/notificationActions'; 

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const DELETE_USER = 'DELETE_USER';
export const MODIFY_USER = 'MODIFY_USER';

const createAsyncAction = (type, requestFunction) => async (dispatch, ...args) => {
    dispatch(setNotification({ message: `Processing ${type.toLowerCase()}...`, stateType: 'user', requestStatus: 'loading' }));
    try {
        const response = await requestFunction(...args);
        dispatch({ type: `${type}_SUCCESS`, payload: response.data });
        dispatch(setNotification({ message: `${type} processed successfully!`, stateType: 'user', requestStatus: 'success' }));
    } catch (error) {
        dispatch({ type: `${type}_FAILURE`, payload: error.message });
        dispatch(setNotification({ message: `Failed to process ${type.toLowerCase()}`, stateType: 'user', requestStatus: 'error' }));
    }
};

export const fetchUsers = () => createAsyncAction(FETCH_USERS, () => axios.get('http://localhost:3001/api/users'));

export const fetchUser = (userId) => createAsyncAction(FETCH_USER, () => axios.get(`http://localhost:3001/api/users/${userId}`));

export const deleteUser = (userId) => createAsyncAction(DELETE_USER, () => axios.delete(`http://localhost:3001/api/users/${userId}`));

export const modifyUser = (userData, userId) => createAsyncAction(MODIFY_USER, () => axios.put(`http://localhost:3001/api/users/${userId}`, userData));
