import { configureStore } from '@reduxjs/toolkit';
import  cartSlice  from './CartReducer';
import ProductSlice from './ProductSlice';

const Store = configureStore({
  reducer: {
    cart: cartSlice,
    product: ProductSlice,
  },
});

export default Store;