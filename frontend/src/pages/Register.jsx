import styled from "styled-components";
import axios from "axios";
import { api } from "../constants/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/cart/cartContext";
// import { useAuth } from "../context/auth/authContext";
// import { registerCall } from "../context/apiCalls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const { dispatch, isAuth, setIsAuth, error, setError } = useCart();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}/auth/register`, {
        username,
        email,
        password,
      });
      // const user = res.data;
      const token = data.token;
      // console.log("77", user, token);
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
    console.log("register done", { username, email, password });

    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {error && <div>{error}</div>}
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
