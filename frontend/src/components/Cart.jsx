import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../actions/orderActions';
import { setNotification } from '../actions/notificationActions'; 

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector(state => state.auth);
  const userRole = user?.role || (user && user.user.role) || 'guest';

  const handleUpdateQuantity = (id, quantity) => {
    const newQuantity = +quantity;

    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
      dispatch(setNotification({ message: 'Item removed from cart successfully!', stateType: 'cart', requestStatus: 'success' }));
    } else {
      dispatch(updateQuantity(id, newQuantity));
      dispatch(setNotification({ message: 'Quantity updated successfully!', stateType: 'cart', requestStatus: 'success' }));
    }
  };

  const handleClearCart = () => {
      dispatch(clearCart());
      dispatch(setNotification({ message: 'Cart cleared successfully!', stateType: 'cart', requestStatus: 'success' }));
    }

  const handleOrder = async () => {
    if (userRole === 'guest') {
      navigateTo('/login'); 
    }
    try {
      const items = cartItems.map(item => ({
        product: { 
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description
        },
        quantity: item.quantity
      }));
      console.log(items)
  
      dispatch(setNotification({ message: 'Placing order...', stateType: 'order', requestStatus: 'loading' }));

      dispatch(addOrder({ items }));
  
      handleClearCart();
      dispatch(setNotification({ message: 'Order placed successfully!', stateType: 'order', requestStatus: 'success' }));
    } catch (error) {
      dispatch(setNotification({ message: 'Error placing order!', stateType: 'order', requestStatus: 'error' }));
    }
  };

  return (
    <div data-testid="main-container">
      {cartItems.length === 0 ? (
        <div data-testid="empty-container">No items in the cart</div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} data-testid={`list-item-${item.id}-container`}>
              <h3 data-testid="name-value">{item.name}</h3>
              <p data-testid="price-value">{item.price}</p>
              <p data-testid="quantity-value">{item.quantity}</p>
              <button data-testid="reduce" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>Reduce</button>
              <button data-testid="add" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>Add</button>
            </div>
          ))}
          <button data-testid="submit" onClick={handleOrder}>Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
