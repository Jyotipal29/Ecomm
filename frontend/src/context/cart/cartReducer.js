const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const item = action.payload;
      const existItem = state.cart.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.product !== action.payload),
      };
    case "SAVE_ADDRESS":
      return {
        ...state,
        shippingAddress: {
          ...state.shippingAddress,
          shippingAddress: action.payload,
        },
      };
    case "INC_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload ? { ...state, qty: c.qty + 1 } : c
        ),
      };
    case "DEC_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload ? { ...state, qty: c.qty - 1 } : c
        ),
      };
    default:
      return state;
  }
};
export default CartReducer;
