// import axios from "axios";
// import { api } from "../../constants/api";
// export const getProducts = async (cat, dispatch) => {
//   try {
//     const res = await axios.get(
//       cat ? `${api}/products?category=${cat}` : `${api}/products`
//     );
//     const a = res.data;
//     const b = [...a];
//     console.log(b);
//     dispatch({
//       type: "GET_PRODUCT",
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
