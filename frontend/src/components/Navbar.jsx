import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions';
import { logoutUser } from '../actions/authActions';

const Navbar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);

  const userRole = user.role 
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1); 

  const handleLogout = async () => {
    try {
      dispatch(setNotification({ message: 'Logging out...', stateType: 'auth', requestStatus: 'loading' }));

      await dispatch(logoutUser());

      dispatch(setNotification({ message: 'Logout successful', stateType: 'auth', requestStatus: 'success' }));

      navigateTo('/login');
    } catch (error) {
      console.error('Error:', error);
      dispatch(setNotification({ message: 'Problem with logging out', stateType: 'auth', requestStatus: 'error' }));
    }
  };

  return (
    <div data-testid="navbar-container">
      <ul>
        <li><Link to="/" data-testid="home-link">Home</Link></li>
        {userRole === 'guest' && (
          <React.Fragment>
            <li><Link to="/products" data-testid="products-link">Products</Link></li>
            <li><Link to="/cart" data-testid="cart-link">Cart</Link></li>
            <li><Link to="/login" data-testid="login-link">Login</Link></li>
            <li><Link to="/register" data-testid="register-link">Register</Link></li>
          </React.Fragment>
        )}
        {userRole === 'customer' && (
          <React.Fragment>
            <li><Link to="/products" data-testid="products-link">Products</Link></li>
            <li><Link to="/orders" data-testid="orders-link">Orders</Link></li>
            <li><Link to="/cart" data-testid="cart-link">Cart</Link></li>
            <li><Link to="#" onClick={handleLogout} data-testid="logout">Logout</Link></li>
          </React.Fragment>
        )}
        {userRole === 'admin' && (
          <React.Fragment>
            <li><Link to="/products" data-testid="products-link">Products</Link></li>
            <li><Link to="/orders" data-testid="orders-link">Orders</Link></li>
            <li><Link to="/users" data-testid="users-link">Users</Link></li>
            <li><Link to="#" onClick={handleLogout} data-testid="logout">Logout</Link></li>
          </React.Fragment>
        )}
      </ul>
      <div data-testid="profile-container">
        {capitalizedRole}
      </div>
    </div>
  );
};

export default Navbar;
