import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART } from '../actions/cartActions';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return { ...state, items: updatedItems };
      } else {
        const updatedItems = [...state.items, newItem];
        return { ...state, items: updatedItems };
      }
    case REMOVE_FROM_CART:
      const productIdToRemove = action.payload;
      const filteredItems = state.items.filter(item => item.id !== productIdToRemove);
      return { ...state, items: filteredItems };
    case UPDATE_QUANTITY:
      const { productId, quantity } = action.payload;
      const updatedItems = state.items.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
         return item;
      });
      return { ...state, items: updatedItems };
    case CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

export default cartReducer;