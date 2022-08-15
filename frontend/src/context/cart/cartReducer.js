const CartReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "REGISTER":
      return {
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "ADD_CART":
      const item = action.payload;
      const existItem = state.cart?.find((x) => x.product === item.product);
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
    case "ADD_WISH":
      const itemw = action.payload;
      const existItemw = state.wish.find((x) => x.product === itemw);
      if (existItemw) {
        return {
          ...state,
          wish: state.wish.map((x) =>
            x.product === existItemw.product ? itemw : x
          ),
        };
      } else {
        return {
          ...state,
          wish: [...state.wish, itemw],
        };
      }
    case "REMOVE_FROM_WISH":
      return {
        ...state,
        wish: state.wish.filter((c) => c.product._id !== action.payload),
      };
    case "SAVE_ADDRESS":
      return {
        ...state,
        shippingAddress: {
          ...state.shippingAddress,
          shippingAddress: action.payload,
        },
      };
    case "ORDER_DONE":
      return {
        ...state,
        cart: [],
        shippingAddress: {
          // ...state.shippingAddress,
          // shippingAddress: action.payload,
        },
      };
    case "INC_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload._id ? { ...c, qty: c.qty + 1 } : c
        ),
      };
    case "DEC_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload._id ? { ...c, qty: c.qty - 1 } : c
        ),
      };
    default:
      return state;
  }
};
export default CartReducer;
