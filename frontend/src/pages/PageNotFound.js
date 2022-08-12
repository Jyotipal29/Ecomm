import React from "react";
import { useLocation } from "react-router";

const PageNotFound = () => {
  const location = useLocation();
  const url = location.pathname;
  return (
    <div>
      <h1>404</h1>
      <p>page not found at {url} </p>
    </div>
  );
};

export default PageNotFound;
