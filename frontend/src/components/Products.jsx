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
  console.log("17", cat);
  // const [products, setProducts] = useState([]);
  const {
    productState: { products, sort, byStock, byFastDelivery, searchQuery },
    productDispatch,
  } = useProduct();
  console.log("23", products);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async (cat) => {
      console.log("28", cat);
      try {
        const { data } = await axios.get(
          // cat ? `${api}/products?category=${cat}` :
          `${api}/products`
        );
        console.log("33", data);
        productDispatch({ type: "GET_PRODUCTS", payload: data });
        localStorage.setItem("products", JSON.stringify(products));
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  console.log("41", cat);

  // const transformProducts = () => {
  //   // let sortedProducts = products;
  //   if (sort) {
  //     sortedProducts = sortedProducts.sort((a, b) =>
  //       sort === "lowToHigh" ? a.price - b.price : b.price - a.price
  //     );
  //   }

  //   if (!byStock) {
  //     sortedProducts = sortedProducts.filter((prod) => prod.inStock);
  //   }

  //   if (byFastDelivery) {
  //     sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
  //   }
  //   if (searchQuery) {
  //     sortedProducts = sortedProducts.filter((prod) =>
  //       prod.name.toLowerCase().includes(searchQuery)
  //     );
  //   }

  //   return sortedProducts;
  // };

  return (
    <Container>
      {
        // cat &&
        products.map((item) => {
          console.log(item);
          return <Product item={item} key={item._id} />;
        })
      }
    </Container>
  );
};

export default Products;
