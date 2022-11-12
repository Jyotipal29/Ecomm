import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useAuth } from "../context/auth/authContext";
// import { logoutCall } from "../context/apiCalls";
import { CartProvider, useCart } from "../context/cart/cartContext";
import { useWish } from "../context/wishlist/wishContext";
import { useProduct } from "../context/product/productContext";

// const Container = styled.div`
//   height: 60px;
// `;
// const Wrapper = styled.div`
//   padding: 10px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
// `;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
// `;
// const SearchContainer = styled.div`
//   border: 0.5px solid lightgrey;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;
// const Input = styled.input`
//   border: none;
// `;
// const Right = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;
// const MenuItem = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
// `;
// const Center = styled.div`
//   flex: 1;
//   text-align: center;
// `;
// const Logo = styled.h1`
//   font-weight: bold;
// `;
// const Button = styled.button`
//   width: 20%;
//   border: none;
//   padding: 5px 10px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
// `;
const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding-left: 25px;
  padding-right: 25px;
`;

const Nav = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  color: #3b82f6;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  cursor: pointer;
`;
const NavItems = styled.ul`
  display: flex;
  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    left: 0px;
    display: block;
    background-color: #3b82f6;
    width: 100%;
    padding: 10px 20px;
  }
`;
const NavItem = styled.ul`
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  :hover {
    color: #3b82f6;
  }
  @media (max-width: 768px) {
    margin: 10px;
    color: white;
    :hover {
      color: white;
    }
  }
`;
const Button = styled.button``;
const Menu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    color: #3b82f6;
    font-weight: bold;
  }
`;

const Navbar = ({ cat }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { productState, productDispatch } = useProduct();
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
  return <div>navbar</div>;
};

export default Navbar;
