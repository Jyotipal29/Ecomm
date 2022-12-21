import React from "react";
import "./product.css";
import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useCart } from "../../context/cart/cartContext";
import api from "../../utils/api";

const Products = ({ item }) => {
  const {
    state: { user },

    setError,
    dispatch,
  } = useCart();
  const handleCart = async (item) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.post(
        `/carts/add`,
        {
          cartItems: {
            product: item._id,
            price: item.price,
            imageUrl: item.imageUrl,
            brand: item.brand,
            qty: item.qty,
            InStock: item.InStock,
          },
        },
        config
      );
      dispatch({ type: "ADD_CART", payload: data });
      toast.success("added to cart!");

      console.log(data, "data");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  const handleWish = async (item) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.post(
        `/wish/add`,
        {
          wishItems: {
            product: item._id,
            price: item.price,
            imageUrl: item.imageUrl,
            brand: item.brand,
            InStock: item.InStock,
            qty: item.qty,
          },
        },
        config
      );
      dispatch({ type: "ADD_WISHLIST", payload: data });
      toast.success("added to wishlist");
    } catch (error) {
      toast.error("something went wrong");
    }

    // console.log(data, "data");
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
        <div className="product-texts">
          <p className="product-brand">{item.brand}</p>

          <p className="product-desc">{item.description}</p>
          <p className="product-price"> Rs.{item.price}</p>
        </div>

        <button className="cart-btn" onClick={() => handleCart(item)}>
          Add to cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
