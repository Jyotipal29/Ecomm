import React from "react";
import Product from "../product/Products";
import "./wish.css";
import axios from "axios";
import { api } from "../../constants/api";
import { useCart } from "../../context/cart/cartContext";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const Wish = () => {
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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
      setLoading(false);
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
    toast.success("removed");
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
        toast.success("added to cart");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="wish-container">
      {loading ? (
        <div className="loader">
          <FadeLoader
            color="#3b82f6"
            height={50}
            margin={50}
            width={2}
            loading={loading}
          />
        </div>
      ) : (
        <>
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
                  <p className="product-price">{item.description}</p>
                  <p className="product-price">Rs.{item.price}</p>
                </div>

                <button className="cart-btn" onClick={() => addToCart(item)}>
                  move to cart
                </button>
              </div>
            ))}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Wish;
