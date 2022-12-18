import React, { useEffect } from "react";
import Products from "../product/Products";
import "./list.css";
import { useProduct } from "../../context/product/productContext";
import axios from "axios";
import { api } from "../../constants/api";
import { useCart } from "../../context/cart/cartContext";
import { categories } from "../../data";
const ProductList = () => {
  const {
    productState: { products, sort, byBrand, searchQuery },
    productDispatch,
  } = useProduct();
  const { error, setError } = useCart();
  console.log(byBrand, "by brand");

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

    if (byBrand) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.brand.includes(byBrand)
      );
    }
    // if (byFastDelivery) {
    //   sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    // }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.description.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="prod-small-container">
      <div className="prod-container">
        <div className="prod-filter-row">
          <div className="prod-filter-search">
            <input
              placeholder="search"
              className="prod-filter-input"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="prod-filter-row">
          <div>
            <label className="filter-label">Sort:</label>
            <select
              className="prod-filter-select"
              onChange={(e) =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: e.target.value,
                })
              }
            >
              <option disabled selected>
                Price
              </option>
              <option value="highToLow">High to low</option>
              <option value="lowToHigh">low to high</option>
            </select>
          </div>
          <div>
            <label className="filter-label">Filter:</label>
            <select
              className="prod-filter-select"
              onClick={(e) => {
                console.log(e.target.value);
                productDispatch({
                  type: "FILTER_BY_BRAND",
                  payload: e.target.value,
                });
              }}
            >
              <option value="">All</option>
              {categories?.map((item) => (
                <option value={item.cat}>{item.cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="product-row">
          {transformProducts() &&
            transformProducts().map((item) => {
              return <Products item={item} key={item._id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
