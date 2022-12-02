import styled from "styled-components";
import axios from "axios";
import "./auth.css";
import { Link } from "react-router-dom";
import { api } from "../../constants/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/cart/cartContext";

const Register = () => {
  const { dispatch, isAuth, setIsAuth, error, setError } = useCart();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}/auth/register`, {
        username,
        email,
        password,
      });
      const token = data.token;
      dispatch({ type: "REGISTER", payload: data });

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", token);

        setIsAuth("true");
      }
    } catch (error) {
      setError(error);
    }

    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-heading">CREATE AN ACCOUNT</h2>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form">
          <div className="auth-form-control">
            <small>Name</small>
            <input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="auth-form-control">
           
          </div> */}
          <button className="auth-btn" type="submit" onClick={handleRegister}>
            Register
          </button>
          <button
            className="auth-btn-sec"
            type="submit"
            onClick={handleRegister}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              already have an account ? login
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
