import React, { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart/cartContext";
import "./address.css";
const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQ":
      return { ...state, loading: true };
    case "CREATE_SUCC":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Address = () => {
  const [{ loading, error }, oDispatch] = useReducer(reducer, {
    loading: false,
    error: " ",
  });

  const {
    state: { shippingAddress },
    dispatch,
  } = useCart();

  const navigate = useNavigate();
  const [paymentMethodName, setPaymentMethod] = useState(
    shippingAddress.paymentMethodName || "PayPal"
  );
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        paymentMethodName,
      },
    });

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        country,
        postalCode,
        paymentMethodName,
      })
    );

    navigate("/order");
  };
  return (
    <div className="address-container">
      <div className="address-wrapper">
        <h2 className="address-heading"> Shipping Address</h2>
        <form onSubmit={submitHandler} className="address-form">
          <div className="address-form-control">
            <input
              type="text"
              placeholder="full name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="address-form-control">
            <input
              type="text"
              placeholder="Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="address-form-control">
            <input
              type="text"
              placeholder="City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="address-form-control">
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="address-form-control">
            <input
              type="text"
              placeholder="Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button className="address-btn" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
