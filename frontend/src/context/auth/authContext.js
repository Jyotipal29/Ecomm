// import { createContext, useContext, useReducer, useState } from "react";
// import AuthReducer from "./authReducer";
// const authContext = createContext();
// export const useAuth = () => {
//   return useContext(authContext);
// };

// const initialValue = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   // user: null,
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, initialValue);
//   const [token, setToken] = useState(localStorage.getItem("token") || " ");
//   const [isAuth, setIsAuth] = useState(
//     JSON.parse(localStorage.getItem("isAuth")) || false
//   );
//   return (
//     <authContext.Provider
//       value={{ state, dispatch, setToken, token, isAuth, setIsAuth }}
//     >
//       {children}
//     </authContext.Provider>
//   );
// };
