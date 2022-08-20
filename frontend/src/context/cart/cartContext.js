import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import CartReducer from "./cartReducer";
const cartContext = createContext();
export const useCart = () => {
  return useContext(cartContext);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    user: JSON.parse(localStorage.getItem("user") || null) || [],
    shippingAddress:
      JSON.parse(localStorage.getItem("shippingAddress") || null) || [],
    wish: JSON.parse(localStorage.getItem("wish") || null) || [],
    cart: [],
  });
  const [error, setError] = useState(" ");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  return (
    <cartContext.Provider
      value={{
        state,
        dispatch,
        token,
        setToken,
        isAuth,
        setIsAuth,
        error,
        setError,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
