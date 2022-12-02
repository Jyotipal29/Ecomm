import React, { useEffect } from "react";
import Products from "../product/Products";
import "./list.css";
import { useProduct } from "../../context/product/productContext";
import axios from "axios";
import { api } from "../../constants/api";
import { useCart } from "../../context/cart/cartContext";

const ProductList = () => {
  const {
    productState: { products, sort, byFastDelivery, searchQuery },
    productDispatch,
  } = useProduct();
  const { error, setError } = useCart();
  console.log(products, "products");
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
              Sort
            </option>
            <option value="highToLow">High to low</option>
            <option value="lowToHigh">low to high</option>
          </select>
          <select className="prod-filter-select">
            <option disabled selected>
              filter
            </option>
            <option value="FILTER_BY_DELIVERY">Fast delivery</option>
            <option value="FILTER_BY_STOCK">In stock</option>
          </select>

          {/* <button
            class="btn-clear"
            onClick={() =>
              productDispatch({
                type: "CLEAR_FILTERS",
              })
            }
          >
            clear
          </button> */}
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
