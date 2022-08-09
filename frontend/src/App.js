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
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products/id/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
      ;
    </Router>
  );
}

export default App;
