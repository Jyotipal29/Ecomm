import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants/api";
import { useCart } from "../../context/cart/cartContext";

const Login = () => {
  const { dispatch, isAuth, setIsAuth, token, setToken, error, setError } =
    useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}/auth/login`, {
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
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-heading">Log IN</h2>
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
    </div>
  );
};

export default Login;
