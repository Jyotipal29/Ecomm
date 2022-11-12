import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useAuth } from "../../context/auth/authContext";
// import { logoutCall } from "../../context/apiCalls";
import { CartProvider, useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishContext";
import { useProduct } from "../../context/product/productContext";

const Navbar = ({ cat }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { productState, productDispatch } = useProduct();
  const navigate = useNavigate();
  const {
    state: { user, wish, cart },
    dispatch,
  } = useCart();
  console.log(user.username);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("isAuth", false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const style = {
    maxHeight: openMenu ? "300px" : "0px",
  };
  return (
    <div className="nav-container">
      <div className="nav-nav">
        <div className="nav-logo">
          <Link to="/" style={{ color: "inherit" }}>
            ShopIt
          </Link>
        </div>
        <ul className="nav-pills" style={style}>
          <Link to="/" style={{ color: "inherit" }}>
            <li>Home</li>
          </Link>

          <Link to="/products" style={{ color: "inherit" }}>
            <li> Products</li>
          </Link>

          {user.username ? (
            <>
              <Link to="/cart" style={{ color: "inherit" }}>
                <li>
                  <ShoppingCartIcon />
                </li>
              </Link>
              <Link to="/wishlist" style={{ color: "inherit" }}>
                <li>
                  <FavoriteBorderOutlinedIcon />
                </li>
              </Link>

              <li onClick={handleLogout}>
                <LogoutOutlinedIcon />
                <p>{user.username}</p>
              </li>
            </>
          ) : (
            <li onClick={handleLogout}>
              <PersonOutlinedIcon />
            </li>
          )}
        </ul>
        <div
          className="menu"
          onClick={() => {
            console.log("clicked", openMenu);
            setOpenMenu(!openMenu);
          }}
        >
          <MenuOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
