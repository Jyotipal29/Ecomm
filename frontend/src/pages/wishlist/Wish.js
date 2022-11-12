import React from "react";
import Product from "../product/Products";
import "./wish.css";
import axios from "axios";
import { api } from "../../constants/api";
import { useCart } from "../../context/cart/cartContext";
import { useEffect, useState } from "react";

const Wish = () => {
  const [moveToCart, setMovedToCart] = useState(false);
  const {
    state: { cart, wish, user },
    dispatch,
    token,
    isAuth,
    error,
    setError,
  } = useCart();

  useEffect(() => {
    const fetchVideo = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${api}/wish/`, config);
      const dataM = data.wishs[0].wishItems;

      console.log(dataM, "wishdata");
      dispatch({ type: "GET_WISHLIST", payload: dataM });
    };
    fetchVideo();
  }, []);

  return (
    <div className="wish-container">
      {wish &&
        wish.map((item) => (
          <div className="product-card">
            <img src={item.imageUrl} className="product-img" />
            <div className="remove-wish">x</div>
            <h3 className="product-brand">{item.name}</h3>
            <p className="product-name">Dress for women</p>
            <h6 className="product-price">{item.price}</h6>

            <button className="cart-btn">move to cart</button>
          </div>
        ))}
    </div>
  );
};

export default Wish;
