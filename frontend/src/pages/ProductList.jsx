import React, { useState } from "react";
import Announcement from "../components/Announcement";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router";

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
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Newest");
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products :</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled selected>
              color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              size
            </Option>
            <Option>l</Option>
            <Option>xl</Option>
            <Option>xxl</Option>
            <Option>xxxl</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>sort products :</FilterText>
          <Select onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(asc)</Option>
            <Option value="desc">price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default ProductList;
