import { createSelector } from 'reselect';
import { cartAdapter } from './cartReducer';

const cartSelectors = cartAdapter.getSelectors(state => state.cart);

export const getCartItems = cartSelectors.selectAll;
export const getCartCount = cartSelectors.selectTotal;

export const getCartTotal = createSelector([getCartItems], cartItems =>
  cartItems.reduce((sum, item) => sum + (item.price || 0), 0),
);

