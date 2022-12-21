import { useState } from "react";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/cart/cartContext";
import api from "../../utils/api";

const Login = () => {
  const { dispatch, isAuth, setIsAuth } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/auth/login`, {
        email,
        password,
      });

      const token = data.token;
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log(isAuth);
      toast.success("logged in successfuly");

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);

      setTimeout(() => {
        setError("");
      }, 5000);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-heading">Log IN</h2>
        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form">
          <div className="auth-form-control">
            <small>Email</small>
            <input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form-control">
            <small>Password</small>
            <input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" type="submit" onClick={handleClick}>
            LOGIN
          </button>
          <button className="auth-btn-sec">
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {" "}
              dont have an accout ? Register
            </Link>
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
