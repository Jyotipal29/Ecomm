// const WishReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_WISH":
//       const item = action.payload;
//       const existItem = state.wish.find((x) => x.product === item.product);
//       if (existItem) {
//         return {
//           ...state,
//           wish: state.wish.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           wish: [...state.wish, item],
//         };
//       }
//     case "REMOVE_FROM_WISH":
//       return {
//         ...state,
//         wish: state.wish.filter((c) => c.product._id !== action.payload),
//       };
//     // case "REMOVE_FROM_CART":
//     //   return {
//     //     ...state,
//     //     cart: state.cart.filter((c) => c.product !== action.payload),
//     //   };
//     // case "MOVE_TO_CART":
//     //   return {
//     //     ...state,
//     //     wish: state.wish.filter((item) => item.id !== action.payload),
//     //     cart: [...state.cart, action.payload],
//     //   };
//     // case "INC_QTY":
//     //   return {
//     //     ...state,
//     //     cart: state.cart.map((item) => {
//     //       return item._id === action.payload
//     //         ? { ...item, qty: item.qty + 1 }
//     //         : item;
//     //     }),
//     //   };
//     // case "DEC_QTY":
//     //   return {
//     //     ...state,
//     //     cart: state.cart.map((item) => {
//     //       return item._id === action.payload
//     //         ? { ...item, qty: item.qty - 1 }
//     //         : item;
//     //     }),
//     //   };
//     default:
//       return state;
//   }
// };
// export default WishReducer;
