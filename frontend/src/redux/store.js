import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";
import orderReducer from '../reducers/orderReducer';
import authReducer from "../reducers/authReducer";
import notificationReducer from "../reducers/notificationReducer";
import usersReducer from "../reducers/usersReducer";

import { composeWithDevTools } from "@redux-devtools/extension";

export const reducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer, 
  notification: notificationReducer,
  users: usersReducer,
});


export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
