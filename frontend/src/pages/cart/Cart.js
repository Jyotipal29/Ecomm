import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/cart/cartContext";
import axios from "axios";
import { api } from "../../constants/api";
import "./cart.css";
const Cart = () => {
  const [movedToWish, setMovedToWish] = useState(false);
  const navigate = useNavigate();
  const {
    state: { cart, wish },
    dispatch,
    isAuth,
    setIsAuth,
    error,
    setError,
    token,
  } = useCart();
  console.log(cart, "cart");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${api}/carts/`, config);
      console.log(data, "data");
      const dataM = data.carts[0].cartItems;
      console.log(dataM);
      dispatch({ type: "GET_CART", payload: dataM });
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (cart) {
      setTotal(
        cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
      );
    }
  }, [cart]);
  const removeHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`${api}/carts/${id}`, config);
    console.log(data, "data");

    dispatch({ type: "REMOVE_FROM_CART", payload: data });
  };
  const incQtyHandler = (item) => {
    console.log(item.qty, "item");

    dispatch({ type: "INC_QTY", payload: item });
  };
  const decQtyHandler = (item) => {
    console.log(item.qty, "item");
    dispatch({ type: "DEC_QTY", payload: item });
  };

  return (
    <div className="cart-container">
      <table>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Subtottal</th>
        </tr>

        {cart &&
          cart.map((item) => (
            <tr>
              <td>
                <div className="cart-info">
                  <img src={item.imageUrl} />
                  <div className="cart-product-details">
                    <p>{item.name}</p>
                    <small>{item.price}</small>
                    <br />
                    <a onClick={() => removeHandler(item.product)}>remove</a>
                  </div>
                </div>
              </td>

              <td>
                <button onClick={() => incQtyHandler(item)}>+</button>
                <small>{item.qty}</small>
                <button onClick={() => decQtyHandler(item)}>-</button>
              </td>
              <td>{item.price * item.qty}</td>
            </tr>
          ))}
      </table>
      <div className="cart-total-price">
        <table>
          <tr>
            <td>Subtotal</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>30</td>
          </tr>
          <tr>
            <td>total</td>
            <td>{total + 30}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Cart;
