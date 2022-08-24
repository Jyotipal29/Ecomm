import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { api } from "../constants/api";
import styled from "styled-components";
import { useCart } from "../context/cart/cartContext";
import { login } from "../redux/apiCalls";
// import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/auth/authContext";
// import { loginCall } from "../context/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const { dispatch, isAuth, setIsAuth, token, setToken, error, setError } =
    useCart();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${api}/auth/login`, {
        username,
        password,
      });
      // const user = res.data;
      // console.log("user login", user);
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
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {error && <div>{error}</div>}
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link to="/register">Register</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
