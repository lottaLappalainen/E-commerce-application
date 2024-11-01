import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../actions/orderActions';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(state => state.orders.order);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderDetails = async () => {
        await dispatch(fetchOrder(orderId)); 
        setLoading(false); 
    };
    getOrderDetails(); 
  }, [dispatch, orderId]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div data-testid="inspect-container">
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
  );
};

export default OrderDetails;
