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
    state: { cart, wish },
  } = useCart();
  const {
    productState: { product },
    productDispatch,
  } = useProduct();
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
  console.log(product, "product");
  return (
    <div className="single-product-container">
      <div className="single-product-card">
        <img src={product.imageUrl} className="single-product-img" />
        <div className="single-product-info">
          <h4 className="single-product-name">{product.name}</h4>
          <p className="single-product-desc">{product.description}</p>
          <p className="single-product-price">Rs.{product.price}</p>

          <div className="single-product-btn">
            <button className="pr-cart-btn">Add to cart</button>
            <button className="pr-wish-btn">Add to wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
