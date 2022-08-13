const ProductReducer = (productState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "GET_SINGLE_PRODUCT":
      return {
        product: action.payload,
      };
    case "SORT_BY_PRICE":
      return { ...productState, sort: action.payload };

    case "FILTER_BY_DELIVERY":
      return { ...productState, byFastDelivery: !productState.byFastDelivery };
    case "FILTER_BY_SEARCH":
      return { ...productState, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        byFastDelivery: false,
        searchQuery: "",
      };
    default:
      return productState;
  }
};
export default ProductReducer;
