import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useCart } from "../../context/cart/cartContext";
import { useCart as useCartHook } from "../../hooks/cart";
import { useWishList } from "../../hooks/wish";
const Navbar = ({ cat }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const {
    state: { user, wish, cart },
    dispatch,
  } = useCart();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("isAuth", false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  console.log(wish, cart, "wish and cart");
  const { fetchData: fetchCart } = useCartHook(dispatch);
  const { fetchData: fetchWishList } = useWishList(dispatch);
  useEffect(() => {
    fetchCart();
    fetchWishList();
  }, []);

  return (
    <div className="nav-container">
      <div className="nav-nav">
        <div className="nav-logo">
          <Link to="/" style={{ color: "inherit" }}>
            ShopIt
          </Link>
        </div>
        <ul className={openMenu ? "nav-pills-mobile" : "nav-pills"}>
          <Link to="/products" style={{ color: "inherit" }}>
            <li> Products</li>
          </Link>
          {user ? (
            <>
              <Link to="/cart" style={{ color: "inherit" }}>
                <li>
                  <ShoppingCartIcon />
                  <small>{cart?.length}</small>
                </li>
              </Link>
              <Link to="/wishlist" style={{ color: "inherit" }}>
                <li>
                  <FavoriteBorderOutlinedIcon />
                  <small>{wish?.length}</small>
                </li>
              </Link>

              <li onClick={handleLogout}>
                <LogoutOutlinedIcon />
                <label>{user.username}</label>
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
