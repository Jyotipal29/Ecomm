import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { api } from "../constants/api";
import { getProducts } from "../context/product/productAction";
import { useProduct } from "../context/product/productContext";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat }) => {
  const {
    productState: { products, sort, byFastDelivery, searchQuery },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    const getProducts = async (cat) => {
      console.log("28", cat);
      try {
        const { data } = await axios.get(`${api}/products`);
        productDispatch({ type: "GET_PRODUCTS", payload: data });
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

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
          console.log(item);
          return <Product item={item} key={item._id} />;
        })}
    </Container>
  );
};

export default Products;
