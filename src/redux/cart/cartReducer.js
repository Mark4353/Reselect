import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const book = action.payload;
      const existingBook = state.find(item => item.id === book.id);
      if (!existingBook) {
        state.push(book);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;