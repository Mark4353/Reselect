import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      cartAdapter.addOne(state, action.payload);
    },
    removeFromCart: (state, action) => {
      cartAdapter.removeOne(state, action.payload);
    },
    clearCart: state => {
      cartAdapter.removeAll(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;