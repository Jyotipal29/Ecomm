const CartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_CART":
      const item = action.payload;
      const existItem = state.cart?.find((x) => x.product === item.product);
      const cart = existItem
        ? state.cart?.map((x) => (x.product === existItem.product ? item : x))
        : [...state.cart, item];
      return {
        ...state,
        cart,
      };

    case "REMOVE_FROM_CART":
      const cartVal = state.cart?.filter((c) => c.product !== action.payload);
      localStorage.setItem("cart", JSON.stringify(cartVal));

      return {
        ...state,
        cart: cartVal,
      };
    case "ADD_WISH":
      const itemw = action.payload;
      const existItemw = state.wish?.find((x) => x.product === itemw.product);
      const wish = existItemw
        ? state.wish.map((x) => (x.product === existItemw.product ? itemw : x))
        : [...state.wish, itemw];
      localStorage.setItem("wish", JSON.stringify(wish));

      return {
        ...state,
        wish,
      };
    case "REMOVE_FROM_WISH":
      const wishVal = state.wish?.filter(
        (c) => c.product._id !== action.payload
      );
      localStorage.setItem("wish", JSON.stringify(wishVal));

      return {
        ...state,
        wish: wishVal,
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
        shippingAddress: {},
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        cart: [],
        wish: [],
        shippingAddress: {},
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
