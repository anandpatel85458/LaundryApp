import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({...action.payload,quantity:0});
    },
    incrementQty: (state, action) => {
        const presentItem = state.product.find(
            item => item.id === action.payload.id,
          );
          presentItem.quantity++;
    },
    decrementQty:(state,action)=>
    {
        const presentItem = state.product.find(
            item => item.id === action.payload.id,
          );
          if (presentItem.quantity === 1) {
            presentItem.quantity = 0;
            const removeItem = state.product.filter(
              item => item.id !== action.payload.id,
            );
            state.cart = removeItem;
          } else {
            presentItem.quantity--;
          }
    }
  },
});

export const {getProducts,incrementQty,decrementQty} = productSlice.actions;

export default productSlice.reducer;
