import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../actions/orderActions';
import { setNotification } from '../actions/notificationActions'; 

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]); 

  return (
    <div data-testid="main-container"> 
      {orders.length === 0 ? (
        <div data-testid="empty-container">No orders found</div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} data-testid={`list-item-${order.id}-container`}>
              <p data-testid={`id-value`}>{order.id}</p>
              <a href={`/orders/${order.id}`} data-testid={`inspect-${order.id}-link`}>
                Inspect Order
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
