import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { Navigate } from "react-router";
import "./order.css";
import { useCart } from "../../context/cart/cartContext";
import { useNavigate } from "react-router";

const Order = () => {
  const [total, setTotal] = useState();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const {
    state: { shippingAddress },
    dispatch,
    isAuth,
    setIsAuth,
    error,
    setError,
    token,
  } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${api}/carts/`, config);
      // console.log(data, "data");
      const dataM = data.carts[0].cartItems;
      console.log(dataM);
      setCartData(dataM);
      // dispatch({ type: "GET_CART", payload: dataM });
    };
    fetchData();
  }, []);

  console.log(shippingAddress, "shippingAdde");
  useEffect(() => {
    setTotal(
      cartData.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cartData]);

  const orderHandler = () => {
    dispatch({ type: "ORDER_DONE" });
    navigate("/products");
  };
  return (
    <div className="order-container">
      <div className="order-address-container">
        <h3 className="order-heading">Shipping</h3>

        <p className="order-name">
          {/* <strong>Name:</strong> */}
          {shippingAddress?.fullName}
        </p>
        <p className="order-address">
          {/* <strong>Address:</strong> */}
          {shippingAddress?.address},{shippingAddress?.city},
          {shippingAddress?.postalCode},{shippingAddress?.country}
        </p>
        {/* <button onClick={() => navigate("/address")}>change</button> */}
      </div>

      <div className="order-products-container">
        <h2 className="order-heading">Order Items</h2>
        <div>
          {cartData?.map((item) => (
            <div className="or-pr-con">
              <div className="or-pr">
                <img src={item.imageUrl} className="or-pr-img" />
                <div>
                  <h3>{item.brand}</h3>
                  <small className="or-it">{item.price}</small>
                </div>
              </div>

              <div className="or-it">qty:{item.qty}</div>

              <div className="or-it">{item.price * item.qty}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="order-heading">ORDER SUMMARY</h3>
          <div className="or-sum">
            <p className="total">total</p>
            <p className="total-price">{total}</p>
          </div>
        </div>
      </div>
      <button className="or-sum-btn" onClick={orderHandler}>
        Order
      </button>
    </div>
  );
};

export default Order;
