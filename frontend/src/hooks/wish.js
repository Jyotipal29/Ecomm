import { useState } from "react";
import api from "../utils/api";

export function useWishList(dispatch) {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    async fetchData() {
      setLoading(true);
      const { data } = await api.get("/wish");

      if (data.wishs.length > 0) {
        const dataM = data.wishs[0].wishItems;
        console.log(dataM);
        dispatch({ type: "GET_WISHLIST", payload: dataM });
      }
      setLoading(false);
    },
  };
}
