import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "../auth/authContext";
import CartReducer from "./cartReducer";
const cartContext = createContext();
export const useCart = () => {
  return useContext(cartContext);
};

export const CartProvider = ({ children }) => {
  const {
    state: { user },
  } = useAuth();
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || []);
  const [state, dispatch] = useReducer(CartReducer, {
    cart: cartFromLocalStorage,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart, user]);

  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};
