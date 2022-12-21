import { useState } from "react";
import api from "../utils/api";

export function useCart(dispatch) {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    async fetchData() {
      setLoading(true);
      const { data } = await api.get("/carts");

      if (data.carts.length > 0) {
        const dataM = data.carts[0].cartItems;
        console.log(dataM);
        dispatch({ type: "GET_CART", payload: dataM });
      }
      setLoading(false);
    },
  };
}
