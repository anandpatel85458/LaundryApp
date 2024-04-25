// import {combineReducers, createStore} from 'redux';
// import {
//   Decrement_To_cart,
//   Increment_To_cart,
//   product_decrement_qty,
//   product_increment_qty,
//   get_product,
//   increment_quntity,
//   decrement_quntity,
//   increment_tocart,
// } from './Action';

// const initialState = {
//   cart: [],
//   product: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case Increment_To_cart:

//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//       };

//     case Decrement_To_cart:
//       const {itemIdToRemove} = action.payload;
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== itemIdToRemove),
//       };

//       case increment_quntity:
//         return {
//           ...state,
//           cart: state.cart.map(item =>
//             item === action.payload
//               ? { ...state.cartItems[action.payload], quantity: state.cartItems[action.payload].quantity +1 }
//               : item,
//           ),
//         };
  
//       case decrement_quntity:
//         return {
//           ...state,
//           cart: state.cart.map(item =>
//             item=== action.payload
//               ? { ...state.cartItems[action.payload], quantity: Math.max(state.cartItems[action.payload].quantity - 1, 0) }
//               : item,
//           ),
//         };

//     case get_product:
//       return {
//         ...state,
//         product: [...state.product, action.payload],
//       };

//     case product_increment_qty:
//       const {product} = action.productlist
//       console.log("data 3=>",descreasedata);
//       // console.log("lastdata >" , product);
//         return {
//           ...state,
//           product: product
//         };


//     case product_decrement_qty:

//     const {descreasedata} = action.productlist;
//     // console.log("data 3=>",descreasedata);
//       return {
//         ...state,
    
//         product:descreasedata,
//       };

//     default:
//       return state;
//   }
// };

// const Store = createStore(cartReducer);

// export default Store;
