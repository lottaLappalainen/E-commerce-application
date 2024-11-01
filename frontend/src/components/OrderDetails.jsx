import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../actions/orderActions';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(state => state.orders.order);

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
