import { createContext, useContext, useReducer } from "react";
import ProductReducer from "./productReducer";
const productContext = createContext();
export const useProduct = () => {
  return useContext(productContext);
};

// const initialValue = {
//   product: [],
// };

// const productFromLocalStorage = JSON.parse(
//   localStorage.getItem("product") || []
// );
// const productsFromLocalStorage = JSON.parse(
//   localStorage.getItem("products") || []
// );
export const ProductProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(ProductReducer, {
    products: [],
    product: [],
    searchQuery: "",
    byBrand: " ",
  });
  return (
    <productContext.Provider value={{ productState, productDispatch }}>
      {children}
    </productContext.Provider>
  );
};
