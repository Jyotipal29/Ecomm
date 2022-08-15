import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useAuth } from "../context/auth/authContext";
// import { logoutCall } from "../context/apiCalls";
import { useCart } from "../context/cart/cartContext";
import { useWish } from "../context/wishlist/wishContext";
import { useProduct } from "../context/product/productContext";

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
const Navbar = ({ cat }) => {
  const { productState, productDispatch } = useProduct();
  const navigate = useNavigate();
  const {
    state: { user,wish },
    dispatch,
  } = useCart();

  // console.log("77", user);
  // const {
  //   state: { cart },
  // } = useCart();
  // const {
  //   state: { wish },
  // } = useWish();
  // console.log(cart);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("isAuth", false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              EN
            </Link>
          </Language>
          <SearchContainer>
            <Input
              type="search"
              placeholder="Search a product..."
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
            <SearchOutlinedIcon style={{ color: "gary", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>ShopCart</Logo>
        </Center>

        <Right>
          {user ? (
            <>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2>{user.username}</h2>
              </Link>

              <Button onClick={handleLogout}>logout</Button>
            </>
          ) : (
            <>
              {/* <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  REGISTER
                </Link>
              </MenuItem> */}
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
            >0
              <ShoppingCartIcon />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/wishList"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {wish.length}
              <FavoriteBorderOutlinedIcon />
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
