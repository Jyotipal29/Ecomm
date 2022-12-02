//import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductList from "./pages/productlist/ProductList";
import Cart from "./pages/cart/Cart";
import Wish from "./pages/wishlist/Wish";
import Home from "./pages/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
import PageNotFound from "./pages/PageNotFound";
import Address from "./pages/Address";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<ProductList />} />
            <Route exact path="/products/:id" element={<ProductDetails />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/wishlist" element={<Wish />} />
            <Route exact path="/address" element={<Address />} />
            <Route exact path="/order" element={<Order />} />

            {/* <Route exact path="/profile" element={<Profile />} /> */}
          </Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
