// ModifyProduct.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions';
import axios from '../axiosConfig';

const ModifyProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  // Fetch product details and populate the form
  useEffect(() => {
    const fetchProductDetails = async () => {
    dispatch(setNotification({ message: 'Getting product...', stateType: 'product', requestStatus: 'loading' }));
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
        const product = response.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
        });
        dispatch(setNotification({ message: 'Product found succesfuly!', stateType: 'product', requestStatus: 'success' }));
      } catch (error) {
        dispatch(setNotification({ message: 'Error getting product.', stateType: 'product', requestStatus: 'error' }));
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setNotification({ message: 'Updating product...', stateType: 'product', requestStatus: 'loading' }));
    try {
      const response = await axios.put(`http://localhost:3001/api/products/${productId}`, formData);
      dispatch(setNotification({ message: 'Updated product succesfuly!', stateType: 'product', requestStatus: 'success' }));
      navigateTo('/products');
    } catch (error) {
        dispatch(setNotification({ message: 'Error updating the product', stateType: 'product', requestStatus: 'error' }));
    }
  };

  const handleCancel = () => {
    navigateTo('/products');
  };

  return (
    <div data-testid="form-container">
      <h2>Modify Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            data-testid="description-input"
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            data-testid="price-input"
            required
          />
        </div>
        <button type="submit" data-testid="submit">Submit</button>
        <button type="button" onClick={handleCancel} data-testid="cancel">Cancel</button>
      </form>
    </div>
  );
};

export default ModifyProduct;
