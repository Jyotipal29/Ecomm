import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/cart/cartContext";
import "./cart.css";
import FadeLoader from "react-spinners/FadeLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import api from "../../utils/api";
import { useCart as useCartHook } from "../../hooks/cart";

const Cart = () => {
  const {
    state: { cart, user },
    dispatch,
  } = useCart();
  const { loading, fetchData } = useCartHook(dispatch);

  const navigate = useNavigate();

  // console.log(cart, "cart");
  const [total, setTotal] = useState(0);

  useEffect(() => {
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
    const { data } = await api.delete(`/carts/${id}`);
    console.log(data, "data");

    dispatch({ type: "REMOVE_FROM_CART", payload: data });
    toast.success("removed");
  };
  const incQtyHandler = (item) => {
    // console.log(item.qty, "item");

    dispatch({ type: "INC_QTY", payload: item });
  };
  const decQtyHandler = (item) => {
    // console.log(item.qty, "item");
    dispatch({ type: "DEC_QTY", payload: item });
  };

  return (
    <div className="cart-container">
      {loading ? (
        <div className="loader">
          <FadeLoader
            color="#3b82f6"
            height={50}
            margin={50}
            width={2}
            loading={loading}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <>
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
                      <img src={item.imageUrl} alt="" />
                      <div className="cart-product-details">
                        <h3>{item.brand}</h3>
                        <small>{item.price}</small>
                        <br />
                        <a onClick={() => removeHandler(item.product)}>
                          remove
                        </a>
                      </div>
                    </div>
                  </td>

                  <td>
                    <button
                      disabled={item.qty >= item.InStock}
                      onClick={() => incQtyHandler(item)}
                    >
                      +
                    </button>
                    <small>{item.qty}</small>
                    <button
                      disabled={item.qty === 1}
                      onClick={() => decQtyHandler(item)}
                    >
                      -
                    </button>
                  </td>
                  <td>{item.price * item.qty}</td>
                </tr>
              ))}
          </table>
          {cart.length > 0 && (
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
                <button
                  className="check-out-btn"
                  onClick={() => navigate("/address")}
                >
                  checkout
                </button>
              </table>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
