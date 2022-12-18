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
      console.log(data, "data 29");
      const dataM = data.wishs[0].wishItems;
      // const dataM = data.carts[0].cartItems;

      dispatch({ type: "GET_WISHLIST", payload: dataM });
    };
    fetchVideo();
  }, []);
  const removeHandler = async (id) => {
    console.log(id, "wish");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`${api}/wish/${id}`, config);
    console.log(data, "data");

    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data });
  };
  // console.log(wish, "wish");
  const addToCart = async ({
    product,
    brand,
    imageUrl,
    price,
    qty,
    InStock,
  }) => {
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
              product: product,
              price: price,
              imageUrl: imageUrl,
              brand: brand,
              InStock: InStock,
              qty: qty,
            },
          },
          config
        );
        dispatch({ type: "ADD_CART", payload: data });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="wish-container">
      {wish &&
        wish.map((item) => (
          <div className="product-card">
            <img src={item.imageUrl} className="product-img" />
            <div
              className="remove-wish"
              onClick={() => removeHandler(item.product)}
            >
              x
            </div>
            <div className="wish-texts">
              <p className="product-brand">{item.brand}</p>
              <p className="product-price">{item.price}</p>
            </div>

            <button className="cart-btn" onClick={() => addToCart(item)}>
              move to cart
            </button>
          </div>
        ))}
    </div>
  );
};

export default Wish;
