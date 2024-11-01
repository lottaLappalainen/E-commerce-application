import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
        dispatch(setNotification({ message: 'Order found successfully!', stateType: 'order', requestStatus: 'success' }));
      } catch (error) {
        setError(error.message);
        setLoading(false);
        dispatch(setNotification({ message: 'Error while getting order.', stateType: 'order', requestStatus: 'error' }));
      }
    };

    fetchOrder();
  }, [dispatch, orderId]);

  useEffect(() => {
    if (loading) {
      dispatch(setNotification({ message: 'Getting order...', stateType: 'order', requestStatus: 'loading' }));
    }
  }, [dispatch, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <>
        <p>Error: {error}</p>
      </>
    );
  }

  return (
    <div data-testid="inspect-container">
      <div>
        <h2>Order Details</h2>
        <p>Order ID: {order.id}</p>
        <h3>Items:</h3>
        <ul>
          {order.items.map(({ product, quantity }) => (
            <li key={product.id} data-testid={`list-item-${product.id}-container`}>
              <p data-testid={`name-value`}>{product.name}</p>
              <p data-testid={`quantity-value`}>Quantity: {quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
