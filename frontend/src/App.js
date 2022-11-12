//import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProductList from "./pages/productlist/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/cart/Cart";
import Wish from "./pages/wishlist/Wish";
import Home from "./pages/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
// import { useAuth } from "./context/auth/authContext";
// import WishList from "./pages/wishList";
import PageNotFound from "./pages/PageNotFound";
import Address from "./pages/Address";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import { useCart } from "./context/cart/cartContext";
import Navbar from "./components/navbar/Navbar";
function App() {
  // const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/wishlist" element={<Wish />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/profile" element={<Profile />} /> */}

          <Route exact path="/address" element={<Address />} />
          <Route exact path="/order" element={<Order />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />;
    </Router>
  );
}

export default App;
