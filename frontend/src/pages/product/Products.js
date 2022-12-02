import React from "react";
import "./product.css";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import { api } from "../../constants/api";
import { useCart } from "../../context/cart/cartContext";
import { useLocation, useNavigate } from "react-router";

const Products = ({ item }) => {
  const navigate = useNavigate();
  const {
    state: { cart, wish },
    isAuth,
    token,
    error,
    setError,
    dispatch,
  } = useCart();
  const handleCart = async (item) => {
    console.log(item._id, "item");
    try {
      if (isAuth) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `${api}/carts/add`,
          {
            cartItems: {
              product: item._id,
              price: item.price,
              imageUrl: item.imageUrl,
              name: item.name,
              qty: item.qty,
            },
          },
          config
        );
        dispatch({ type: "ADD_CART", payload: data });
        toast.success("registered successfully!");

        console.log(data, "data");
      } else {
        navigate("/login");
        toast.error("error accured");
      }
    } catch (error) {
      setError(error);
      toast.error("error accured");
    }
  };
  const handleWish = async (item) => {
    if (isAuth) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${api}/wish/add`,
        {
          wishItems: {
            product: item._id,
            price: item.price,
            imageUrl: item.imageUrl,
            name: item.name,
            qty: item.qty,
          },
        },
        config
      );
      dispatch({ type: "ADD_WISHLIST", payload: data });
      console.log(data, "data");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="product-container">
      <div className="product-card">
        <Link to={`/products/${item._id}`}>
          <img src={item.imageUrl} className="product-img" />
        </Link>
        <div className="product-wish" onClick={() => handleWish(item)}>
          <FavoriteBorderOutlinedIcon />
        </div>

        <h3 className="product-brand">{item.name}</h3>
        <h6 className="product-price"> Rs.{item.price}</h6>

        <button className="cart-btn" onClick={() => handleCart(item)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Products;
