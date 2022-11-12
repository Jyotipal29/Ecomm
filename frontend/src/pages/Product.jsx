import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { api } from "../constants/api";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart } from "../context/cart/cartAction";
import { useCart } from "../context/cart/cartContext";
import { useAuth } from "../context/auth/authContext";
import { useWish } from "../context/wishlist/wishContext";
import { useProduct } from "../context/product/productContext";
// import axios from "axios";
// import { api } from "../constants/api";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Product = () => {
  const location = useLocation();
  const {
    dispatch,
    isAuth,
    token,
    error,
    setError,
    state: { cart, wish },
  } = useCart();
  // console.log(isAuth);
  const {
    productState: { product },
    productDispatch,
  } = useProduct();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${api}/products/find/${id}`);
        // console.log("159", data);
        productDispatch({ type: "GET_SINGLE_PRODUCT", payload: data });
        localStorage.setItem("product", JSON.stringify(product));
      } catch (error) {
        setError(error);
      }
    };
    getProduct();
  }, [id]);

  const handleCart = async ({ _id, qty, price, imageUrl }) => {
    try {
      if (isAuth) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `${api}/carts/add`,
          {
            cartItems: {
              product: _id,
              price: price,
              qty: qty,
              imageUrl: imageUrl,
            },
          },
          config
        );
        dispatch({ type: "ADD_CART", payload: data });
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleWish = async ({ _id, price, qty, imageUrl }) => {
    console.log(_id, price, qty, imageUrl, "product");

    if (isAuth) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${api}/wish/add`,
        {
          wishItems: {
            product: _id,
            price: price,
            qty: qty,
            imageUrl: imageUrl,
          },
        },
        config
      );
      dispatch({ type: "ADD_WISHLIST", payload: data });
      console.log(data, "data");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      {error && <div>{error}</div>}
      {product && (
        <Wrapper>
          <ImgContainer>
            <Image src={product.imageUrl} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.name}</Title>
            <Desc>{product.description}</Desc>
            <Price>{product.price}</Price>
            {product.fastDelivery ? (
              <Desc>Fast Delivery</Desc>
            ) : (
              <Desc>4 days Delivery</Desc>
            )}

            <AmountContainer>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={product.qty === product.InStock}
              >
                +
              </button>
              <Amount>{quantity}</Amount>

              <button
                onClick={() => setQuantity(quantity - 1)}
                disabled={product.qty === 1}
              >
                -
              </button>
            </AmountContainer>
            <AddContainer>
              <Button
                onClick={() => handleCart(product)}
                disabled={product.qty === product.InStock}
              >
                {!product.InStock ? "Out of stock" : " ADD TO CART"}
              </Button>
              <Button onClick={() => handleWish(product)}>
                ADD TO wishlist
              </Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Footer />
    </Container>
  );
};

export default Product;
