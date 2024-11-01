import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setNotification } from '../actions/notificationActions';
import { addToCart } from '../actions/cartActions';
import { deleteProduct } from '../actions/productActions';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector(state => state.auth);
  const userRole = user?.role || (user && user.user.role) || 'guest';
  const product = useSelector(state => state.products.product);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(setNotification({ message: 'Item added to cart successfully!', stateType: 'cart', requestStatus: 'success' }));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    navigateTo('/products');
  };

  return (
    <div data-testid="inspect-container">
      <div>
        <h2 data-testid="name-value">{product.name}</h2>
        <p data-testid="description-value">{product.description}</p>
        <p data-testid="price-value">{product.price}</p>
        {userRole === 'admin' ? (
          <div>
            <button data-testid="modify" onClick={() => navigateTo(`/products/${productId}/modify`)}>Modify</button>
            <button data-testid="delete" onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <button data-testid="add" onClick={() => handleAddToCart()}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
