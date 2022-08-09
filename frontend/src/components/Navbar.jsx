import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
`;
const Button = styled.button`
  width: 20%;
  border: none;
  padding: 5px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const qty = useSelector((state) => state.cart.qty);
  // console.log(qty);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchOutlinedIcon style={{ color: "gary", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>ShopCart</Logo>
          </Link>
        </Center>

        <Right>
          {user ? (
            <>
              <MenuItem>{user.user.username}</MenuItem>
              <Button onClick={handleLogout}>logout</Button>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          )}

          <MenuItem>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {qty}
              <ShoppingCartIcon />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
