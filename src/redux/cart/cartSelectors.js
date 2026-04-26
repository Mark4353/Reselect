import { createSelector } from 'reselect';

export const getCartItems = state => state.cart;

export const getCartCount = createSelector([getCartItems], cartItems => cartItems.length);

export const getCartTotal = createSelector([getCartItems], cartItems =>
  cartItems.reduce((sum, item) => sum + (item.price || 0), 0),
);
