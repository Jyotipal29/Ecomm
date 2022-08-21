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
import { useWish } from "../context/wishlist/wishContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../constants/api";
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

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Cart = () => {
  // const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const {
    state: { cart, wish },
    dispatch,
    isAuth,
    setIsAuth,
    error,
    setError,
    token,
  } = useCart();

  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${api}/carts/`, config);
      const dataM = data.carts[0].cartItems;
      console.log(dataM);
      dispatch({ type: "GET_CART", payload: dataM });
    };
    fetchData();
  }, []);

  console.log(cart, "cart");
  useEffect(() => {
    if (cart) {
      setTotal(
        cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
      );
    }
  }, [cart]);
  // console.log("157", wish);

  const removeHandle = async (id) => {
    // console.log("168", id);

    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    // localStorage.setItem("cart", JSON.stringify(cartVal));
  };

  const checkoutHandler = () => {
    navigate("/address");
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              keep shoping
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist ({wish && wish.length})</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item) => (
              <Product>
                {/* {console.log(product.product, "226")} */}
                <ProductDetail>
                  <Image src={item.imageUrl} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {item.name}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {item._id}
                    </ProductId>
                    <ProductColor />
                    <ProductSize>
                      <b>Size:</b> s
                    </ProductSize>
                    <p>{item.qty}</p>
                    {/* {console.log(product.product._id, "242")} */}
                    {/* <Button onClick={() => removeHandle(product.product._id)}>
                    remove from wishlist
                  </Button> */}
                    {/* <Button onClick={() => handleMoveToCart(product.product)}>
                      MOVE TO CART
                    </Button> */}

                    {/* <Button onClick={() => removeHandle(product.product)}>
                      remove from CART
                    </Button> */}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <AddIcon onClick={(id) => incHandle(product._id)} /> */}
                    {/* <ProductAmount>{product.qty}</ProductAmount> */}
                    {/* <RemoveIcon onClick={(id) => decHandle(product._id)} /> */}
                  </ProductAmountContainer>
                  <ProductPrice>{item.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              {/* <SummaryItem> 
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>${total}</SummaryItemPrice>
              </SummaryItem>
              {/* <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description="your total is "
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            > */}
              <Button disabled={cart.length === 0} onClick={checkoutHandler}>
                CHECKOUT NOW
              </Button>
              {/* </StripeCheckout> */}
            </Summary>
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
