import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { api } from "../constants/api";
import { getProducts } from "../context/product/productAction";
import { useProduct } from "../context/product/productContext";
import { useCart } from "../context/cart/cartContext";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat }) => {
  const { error, setError } = useCart();
  const {
    productState: { products, sort, byFastDelivery, searchQuery },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${api}/products`);
        productDispatch({ type: "GET_PRODUCTS", payload: data });
      } catch (error) {
        setError(error);
      }
    };
    getProducts();
  }, []);

  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <Container>
      {transformProducts() &&
        transformProducts().map((item) => {
          return <Product item={item} key={item._id} />;
        })}
    </Container>
  );
};

export default Products;
