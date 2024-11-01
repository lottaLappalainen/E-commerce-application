import {
  FETCH_USERS,
  FETCH_USER,
  DELETE_USER,
  MODIFY_USER,
} from '../actions/usersActions';

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case `${FETCH_USERS}_SUCCESS`:
          return {
              ...state,
              loading: false,
              users: action.payload,
          };
      case `${FETCH_USER}_SUCCESS`:
          return {
              ...state,
              loading: false,
              user: action.payload,
          };
      case `${DELETE_USER}_SUCCESS`:
          return {
              ...state,
              loading: false,
              users: state.users.filter(user => user.id !== action.payload.id), 
          };
      case `${MODIFY_USER}_SUCCESS`:
          return {
              ...state,
              loading: false,
              users: state.users.map(user => user.id === action.payload.id ? action.payload : user),
          };
      case `${FETCH_USERS}_FAILURE`:
      case `${FETCH_USER}_FAILURE`:
      case `${DELETE_USER}_FAILURE`:
      case `${MODIFY_USER}_FAILURE`:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export default userReducer;
