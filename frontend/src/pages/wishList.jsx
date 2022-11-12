import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useCart } from "../context/cart/cartContext";
import { removeFromCart } from "../context/cart/cartAction";
import { useAuth } from "../context/auth/authContext";
import axios from "axios";
import { api } from "../constants/api";
import { useWish } from "../context/wishlist/wishContext";
import { useEffect, useState } from "react";
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const WishList = () => {
  const [moveToCart, setMovedToCart] = useState(false);

  const {
    state: { cart, wish, user },
    dispatch,
    token,
    isAuth,
    error,
    setError,
  } = useCart();
  console.log(wish, "wish");
  useEffect(() => {
    const fetchVideo = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${api}/wish/`, config);
      const dataM = data.wishs[0].wishItems;

      console.log(dataM, "wishdata");
      dispatch({ type: "GET_WISHLIST", payload: dataM });
    };
    fetchVideo();
  }, []);
  const removeHandle = async (id) => {
    // console.log(id, "id");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`${api}/wish/${id}`, config);
    console.log(data, "data");

    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data });
  };
  const handleMoveToCart = async ({ _id, price, imageUrl, qty }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
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
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      {error && <div>{error}</div>}

      {wish && (
        <Wrapper>
          <Title>YOUR WishList</Title>
          <Top>
            <TopButton>keep shoping</TopButton>
            <TopTexts>
              <TopText>Shopping Bag(2)</TopText>
              <TopText>Your cart ({cart && cart.length})</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {wish &&
                wish.map((product) => (
                  <Product>
                    <ProductDetail>
                      <Image src={product.imageUrl} />
                      <Details>
                        <ProductName>
                          <b>Product:</b>
                          {product.product}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b>
                          {product._id}
                        </ProductId>
                        <ProductColor />
                        <ProductSize>
                          <b>Size:</b> s
                        </ProductSize>
                        <p>{product.qty}</p>
                        <div>
                          <Button onClick={() => removeHandle(product.product)}>
                            remove from wishlist
                          </Button>
                          <br />
                          <Button onClick={() => handleMoveToCart(product)}>
                            MOVE TO CART
                          </Button>
                        </div>
                      </Details>
                    </ProductDetail>

                    <PriceDetail>
                      <ProductAmountContainer></ProductAmountContainer>
                      <ProductPrice>{product.price}</ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}
              <Hr />
            </Info>
            {/* <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$5</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description="your total is "
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary> */}
          </Bottom>
        </Wrapper>
      )}
      <Footer />
    </Container>
  );
};

export default WishList;
