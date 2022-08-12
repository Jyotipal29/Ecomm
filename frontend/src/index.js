import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/auth/authContext";
import { CartProvider } from "./context/cart/cartContext";
import { WishProvider } from "./context/wishlist/wishContext";
import { ProductProvider } from "./context/product/productContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishProvider>
            <App />
          </WishProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
