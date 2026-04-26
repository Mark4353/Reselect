import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/booksReducer';
import cartReducer, { cartAdapter } from './cart/cartReducer';

const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    const parsed = savedCart ? JSON.parse(savedCart) : null;

    if (!parsed) {
      return cartAdapter.getInitialState();
    }

    if (Array.isArray(parsed)) {
      return cartAdapter.addMany(cartAdapter.getInitialState(), parsed);
    }

    if (parsed.ids && parsed.entities) {
      return parsed;
    }

    return cartAdapter.getInitialState();
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return cartAdapter.getInitialState();
  }
};

const cartLocalStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  
  if (action.type.startsWith('cart/')) {
    try {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
  
  return result;
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cartLocalStorageMiddleware),
});
