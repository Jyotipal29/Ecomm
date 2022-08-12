import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "../auth/authContext";
import WishReducer from "./wishReducer";
const wishContext = createContext();
export const useWish = () => {
  return useContext(wishContext);
};

export const WishProvider = ({ children }) => {
  const wishFromLocalStorage = JSON.parse(localStorage.getItem("wish") || []);
  const [state, wishDispatch] = useReducer(WishReducer, {
    wish: wishFromLocalStorage,
  });

  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(state.cart));
  //   }, [state.cart]);

  return (
    <wishContext.Provider value={{ state, wishDispatch }}>
      {children}
    </wishContext.Provider>
  );
};
