import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    MODIFY_USER_REQUEST,
    MODIFY_USER_SUCCESS,
    MODIFY_USER_FAILURE,
  } from '../actions/usersActions';
  
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
      case DELETE_USER_REQUEST:
      case MODIFY_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
          error: null,
        };
      case FETCH_USERS_FAILURE:
      case DELETE_USER_FAILURE:
      case MODIFY_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_USER_SUCCESS:
      case MODIFY_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  