import {configureStore, createSlice} from '@reduxjs/toolkit';


export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  
  },

  reducers: {
    addTocart: (state, action) => {
      const increaseitem = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (increaseitem) {
        increaseitem.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },

    removeFromcart: (state, action) => {
      const removeItem = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeItem;
    },

    Incrementquantity: (state, action) => {
      const presentItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      presentItem.quantity++;
    },

    Descrementquantity: (state, action) => {
      const presentItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (presentItem.quantity === 1) {
        presentItem.quantity = 0;
        const removeItem = state.cart.filter(
          item => item.id !== action.payload.id,
        );
        state.cart = removeItem;
      } else {
        presentItem.quantity--;
      }
    },
  },
});

export const {
  addTocart,
  removeFromcart,
  Incrementquantity,
  Descrementquantity,
} = cartSlice.actions;

export const {getProducts,incrementQty,descrementQty} =cartSlice.actions;


export default cartSlice.reducer;
