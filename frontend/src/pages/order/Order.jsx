import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";
import "./order.css";
import { useCart } from "../../context/cart/cartContext";
import { useNavigate } from "react-router";

const Order = () => {
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const {
    state: { cart, shippingAddress },
    dispatch,
  } = useCart();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const orderHandler = () => {
    dispatch({ type: "ORDER_DONE" });
    navigate("/products");
  };
  return (
    <div className="order-container">
      <div className="order-address-container">
        <h2 className="order-heading">Shipping</h2>

        <p className="order-name">
          {/* <strong>Name:</strong> */}
          {shippingAddress?.fullName}
        </p>
        <p className="order-address">
          {/* <strong>Address:</strong> */}
          {shippingAddress?.address},{shippingAddress.city},
          {shippingAddress.postalCode},{shippingAddress.country}
        </p>
        <button onClick={() => navigate("/address")}>change</button>
      </div>
      {/* <div>
        <h2>Payment</h2>
        <p>
          <strong>Method:</strong>
          {shippingAddress.paymentMethodName}
        </p>
      </div> */}
      <div className="order-products-container">
        <h2>Order Items</h2>
        <div>
          {cart?.map((item) => (
            <tr>
              <td>
                <div className="cart-info">
                  <img src={item.imageUrl} />
                  <div className="cart-product-details">
                    <h3>{item.brand}</h3>
                    <small>{item.price}</small>
                  </div>
                </div>
              </td>

              <td>{item.price * item.qty}</td>
            </tr>
          ))}
        </div>
        <div>
          <h2>ORDER SUMMARY</h2>
        </div>
      </div>
    </div>
  );
};

export default Order;
