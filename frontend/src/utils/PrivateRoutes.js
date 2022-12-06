import { Outlet, Navigate } from "react-router";
import React from "react";
import { useCart } from "../context/cart/cartContext";

const PrivateRoutes = () => {
  const {
    state: { user },
  } = useCart();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
