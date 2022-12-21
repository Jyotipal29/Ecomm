import React, { useEffect, useState } from "react";
import Products from "../product/Products";
import "./list.css";
import api from "../../utils/api";

import { useProduct } from "../../context/product/productContext";
import { useCart } from "../../context/cart/cartContext";
import { categories } from "../../data";
import FadeLoader from "react-spinners/FadeLoader";

const ProductList = () => {
  const [loading, setLoading] = useState(false);

  const {
    productState: { products, sort, byBrand, searchQuery },
    productDispatch,
  } = useProduct();
  const { setError } = useCart();
  console.log(byBrand, "by brand");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products`);
        productDispatch({ type: "GET_PRODUCTS", payload: data });
        setLoading(false);
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
          {loading ? (
            <div className="loader">
              <FadeLoader
                color="#3b82f6"
                height={50}
                margin={50}
                width={2}
                loading={loading}
              />
            </div>
          ) : (
            transformProducts() &&
            transformProducts().map((item) => {
              return <Products item={item} key={item._id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
