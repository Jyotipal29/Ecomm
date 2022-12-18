import React, { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { useAuth } from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart/cartContext";

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
    <div
      style={{
        backgroundColor: "#eee",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
        height: "60vh",
      }}
    >
      <h1> Shipping Address</h1>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          style={{
            padding: "10px",
            margin: "0px 20px",
          }}
          type="text"
          placeholder="full name"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          style={{
            padding: "10px",
            margin: "0px 20px",
          }}
          type="text"
          placeholder="Address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          style={{
            padding: "10px",
            margin: "0px 20px",
          }}
          type="text"
          placeholder="City"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          style={{
            padding: "10px",
            margin: "0px 20px",
          }}
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          style={{
            padding: "10px",
            margin: "0px 20px",
          }}
          type="text"
          placeholder="Country"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        />
        <span
          style={{
            backgroundColor: "blue",
            margin: "0px 20px",
            backgroundColor: "blue",
            color: "white",
            fontSize: "20px",
            display: "flex",
            gap: "20px",
          }}
        >
          <input
            type="radio"
            value={paymentMethodName}
            label="PayPal"
            checked={paymentMethodName === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label>Paypal</label>
        </span>

        <button
          style={{
            // padding: "10px",
            margin: "0px 20px",
            backgroundColor: "black",
            color: "white",
            fontSize: "30px",
          }}
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Address;
