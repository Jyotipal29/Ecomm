import React, { useState } from "react";
import Announcement from "../components/Announcement";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router";
import { useProduct } from "../context/product/productContext";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
`;
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  console.log("35", cat);
  const {
    productState: { byStock, byFastDelivery, sort },
    productDispatch,
  } = useProduct();
  // const [filters, setFilters] = useState({});
  // const [sort, setSort] = useState("Newest");
  // const handleFilters = (e) => {
  //   const value = e.target.value;
  //   setFilters({
  //     ...filters,
  //     [e.target.name]: value,
  //   });
  // };
  // const handleSort = (e) => {
  //   setSort(e.target.value);
  // };
  return (
    <Container>
      <Announcement />
      <Navbar cat={cat} />
      <Title>{cat}</Title>
      <FilterContainer>
        <FilterText>Filter products :</FilterText>
        <span>
          <input
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
          asc
        </span>
        <span>
          <input
            inline
            label="Descending"
            name="group1"
            type="radio"
            id={`inline-2`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
          />
          dsc
        </span>

        <span>
          <input
            inline
            label="Fast Delivery Only"
            name="group1"
            type="checkbox"
            id={`inline-4`}
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
          delevery
        </span>
        <Button
          variant="light"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear Filters
        </Button>
      </FilterContainer>
      <Products cat={cat} />
      <Footer />
    </Container>
  );
};

export default ProductList;
