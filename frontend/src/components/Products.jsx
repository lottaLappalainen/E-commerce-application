import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct, addProduct, fetchProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { setNotification } from '../actions/notificationActions';
import ProductForm from './ProductForm';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.auth);
  const userRole = user.role;
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(setNotification({ message: 'Item added to cart successfully!', stateType: 'cart', requestStatus: 'success' }));
  };

  const handleModify = (productId) => {
    navigate(`/products/${productId}/modify`);
  };

  const handleInspect = async (productId) => {
    await dispatch(fetchProduct(productId));
    navigate(`/products/${productId}`);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleFormSubmit = async (formData) => {
    try {
      await dispatch(addProduct(formData));
      dispatch(setNotification({ message: 'Product added successfully!', stateType: 'product', requestStatus: 'success' }));
      setIsFormVisible(false);
    } catch (error) {
      dispatch(setNotification({ message: 'Failed to add product. Please try again later.', stateType: 'product', requestStatus: 'error' }));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div data-testid="main-container">
      {products.length === 0 ? (
        <div data-testid="empty-container">No products available</div>
      ) : (
        <ul className="product-list">
          {products.products.map(product => (
            <div key={product.id} data-testid={`list-item-${product.id}-container`}>
              <h3 data-testid={`name-value`}>{product.name}</h3>
              <p data-testid={`price-value`}>{product.price}</p>
              <button data-testid={`inspect-${product.id}-link`} onClick={() => handleInspect(product.id)}>Inspect</button>
              {userRole === 'admin' ? (
                <div>
                  <button data-testid="modify" onClick={() => handleModify(product.id)}>Modify</button>
                  <button data-testid="delete" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              ) : (
                <button data-testid="add" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              )}
            </div>
          ))}
        </ul>
      )}

      {userRole === 'admin' && (
        <button onClick={() => setIsFormVisible(!isFormVisible)}>Add Product</button>
      )}
      
      {isFormVisible && userRole === 'admin' && (
        <ProductForm onSubmit={handleFormSubmit} onCancel={() => setIsFormVisible(false)} />
      )}
    </div>
  );
};

export default Products;
