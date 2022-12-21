import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./order.css";
import { useCart } from "../../context/cart/cartContext";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import api from "../../utils/api";

const Order = () => {
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const {
    state: { shippingAddress, cart, user },
    dispatch,
  } = useCart();
  useEffect(() => {
    console.log(shippingAddress);
  }, [cart]);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const orderHandler = async () => {
    const { data } = await api.delete(`/carts/`);
    console.log(data, "delte data");
    dispatch({ type: "ORDER_DONE" });
    toast.success("keep shoping");

    localStorage.removeItem("shippingAddress");
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
          {cart?.map((item) => (
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
      <ToastContainer />
    </div>
  );
};

export default Order;
