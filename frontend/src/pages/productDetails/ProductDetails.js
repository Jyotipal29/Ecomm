import React from "react";
import "./Product.css";
import { useEffect } from "react";
import axios from "axios";
import { useProduct } from "../../context/product/productContext";
import { useCart } from "../../context/cart/cartContext";
import { api } from "../../constants/api";
import { useLocation, useNavigate } from "react-router";
const ProductDetails = () => {
  const location = useLocation();
  const {
    dispatch,
    isAuth,
    token,
    error,
    setError,
    state: { cart, wish, user },
  } = useCart();
  const {
    productState: { product },
    productDispatch,
  } = useProduct();
  // console.log(product, "product");
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${api}/products/find/${id}`);
        // console.log("159", data);
        productDispatch({ type: "GET_SINGLE_PRODUCT", payload: data });
        localStorage.setItem("product", JSON.stringify(product));
      } catch (error) {
        setError(error);
      }
    };
    getProduct();
  }, [id]);
  // console.log(product, "product");
  const cartHandler = async (product) => {
    try {
      if (isAuth) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `${api}/carts/add`,
          {
            cartItems: {
              product: product._id,
              price: product.price,
              imageUrl: product.imageUrl,
              brand: product.brand,
              InStock: product.InStock,
              qty: product.qty,
            },
          },
          config
        );
        dispatch({ type: "ADD_CART", payload: data });

        // console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError(error);
    }
  };

  const wishHandler = async (product) => {
    console.log(product, "products in wish");
    if (isAuth) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${api}/wish/add`,
        {
          wishItems: {
            product: product._id,
            price: product.price,
            imageUrl: product.imageUrl,
            InStock: product.InStock,

            brand: product.brand,
            qty: product.qty,
          },
        },
        config
      );
      // console.log(data, "whis data in data");
      dispatch({ type: "ADD_WISHLIST", payload: data });
      // console.log(data, "data");
    } else {
      navigate("/login");
    }
  };
  const plusHandler = (product) => {
    console.log(product, "product");
  };
  const minusHandler = (product) => {
    console.log(product, "product");
  };

  return (
    <div className="single-product-container">
      {product && (
        <>
          <div className="single-product-card">
            <img src={product.imageUrl} className="single-product-img" />
            <div className="single-product-info">
              <p className="single-product-name">{product.brand}</p>
              <p className="single-product-desc">{product.description}</p>
              <p className="single-product-price">Rs.{product.price}</p>

              <div className="single-product-btn">
                <button
                  className="pr-cart-btn"
                  onClick={() => cartHandler(product)}
                >
                  Add to cart
                </button>
                <button
                  className="pr-wish-btn"
                  onClick={() => wishHandler(product)}
                >
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
