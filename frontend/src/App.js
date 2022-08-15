//import { BrowserRouter as Router, Route, Routes } from "react-router";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
// import { useAuth } from "./context/auth/authContext";
import WishList from "./pages/wishList";
import PageNotFound from "./pages/PageNotFound";
import Address from "./pages/Address";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import { useCart } from "./context/cart/cartContext";
function App() {
  // const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/products/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/wishList" element={<WishList />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/profile" element={<Profile />} /> */}

          <Route exact path="/address" element={<Address />} />
          <Route exact path="/order" element={<Order />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      ;
    </Router>
  );
}

export default App;
