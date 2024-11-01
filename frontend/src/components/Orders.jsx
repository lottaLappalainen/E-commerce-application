import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchOrder } from '../actions/orderActions';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]); 
  
  const handleInspectOrder = async (orderId) => {
    await dispatch(fetchOrder(orderId));  
    navigate(`/orders/${orderId}`); 
  };

  return (
    <div data-testid="main-container"> 
      {orders.length === 0 ? (
        <div data-testid="empty-container">No orders found</div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} data-testid={`list-item-${order.id}-container`}>
              <p data-testid={`id-value`}>{order.id}</p>
              <button 
                onClick={() => handleInspectOrder(order.id)} 
                data-testid={`inspect-${order.id}-link`}
              >
                Inspect Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
