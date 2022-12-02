const CartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_CART":
      const item = action.payload;
      const existItem = state.cart?.find((x) => x._id === item._id);
      const cart = existItem
        ? state.cart?.map((x) => (x._id === existItem._id ? item : x))
        : [...state.cart, item];
      return {
        ...state,
        cart,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart?.filter(
          (item) => item.product !== action.payload.product
        ),
      };
    case "GET_WISHLIST":
      return {
        ...state,
        wish: action.payload,
      };
    case "ADD_WISHLIST":
      const itemw = action.payload;
      const existItemw = state.wish?.find((x) => x.product === itemw.product);
      const wish = existItemw
        ? state.wish.map((x) => (x.product === existItemw.product ? itemw : x))
        : [...state.wish, itemw];

      return {
        ...state,
        wish,
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wish: state.wish?.filter((c) => c.product !== action.payload.product),
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
        isAuth: false,
        token: null,
        shippingAddress: {},
      };
    case "INC_QTY":
      return {
        ...state,
        cart: state.cart.map((it) => it._id === action.payload._id ? {...it, qty:it.qty+1}:it) 
      };
    case "DEC_QTY":
      return {
        ...state,
        cart: state.cart.map((it) =>
          it._id === action.payload._id ? { ...it, qty: it.qty - 1 } : it
        ),
      };
    default:
      return state;
  }
};
export default CartReducer;
// state.cart.map((c) =>
          // c.id === action.payload._id ? { ...c, qty: c.qty + 1 } : c
        // ),



        // state.cart.map((c) =>
          // c.id === action.payload._id ? { ...c, qty: c.qty - 1 } : c
        // ),