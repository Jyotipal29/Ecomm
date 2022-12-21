import React from "react";
import "./wish.css";
import api from "../../utils/api";

import { useCart } from "../../context/cart/cartContext";
import { useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useWishList } from "../../hooks/wish";

const Wish = () => {
  const {
    state: { wish, user },
    dispatch,
    isAuth,
    setError,
  } = useCart();
  const { loading, fetchData } = useWishList(dispatch);

  useEffect(() => {
    fetchData();
  }, []);
  const removeHandler = async (id) => {
    const { data } = await api.delete(`/wish/${id}`);
    console.log(data, "data");

    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data });
    toast.success("removed");
  };
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
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await api.post(
          `/carts/add`,
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
