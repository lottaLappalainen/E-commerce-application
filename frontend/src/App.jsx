import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "./components/Navbar";
import Cart from './components/Cart';
import RegisterForm from "./components/RegisterForm";
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import Notification from './components/Notification';
import { dataTestIds} from "./tests/constants/components.js";
import Orders from './components/Orders.jsx';
import HomePage from './components/HomePage';
import OrderDetails from './components/OrderDetails';
import ModifyProduct from './components/ModifyProduct';
import ProductDetails from './components/ProductDetails';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import UserModify from './components/UserModify';


const App = () => {
  const notification = useSelector(state => state.notification);

  return (
    <div data-testid={dataTestIds.app}>
      <Navbar data-testid="navbar-container" />
      <div data-testid={notification ? dataTestIds.containerId.notification : dataTestIds.containerId.empty}>
        {notification && (
          <Notification/>
        )}

      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/products/:productId/modify" element={<ModifyProduct />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetails />} />
        <Route path="/users/:userId/modify" element={<UserModify />} />
      </Routes>
    </div>
  );
};

export default App;
