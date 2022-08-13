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
  const {
    state: { cart },
    dispatch,
  } = useCart();

  const { isAuth, setIsAuth } = useAuth();
  const {
    state: { wish },
    wishDispatch,
  } = useWish();
  console.log("167", wish);
  console.log(wish);
  const incHandle = (id) => {
    dispatch({ type: "INC_QTY", payload: id });
  };
  const decHandle = (id) => {
    dispatch({ type: "DEC_QTY", payload: id });
  };
  const removeHandle = (id) => {
    console.log(id, "176");
    wishDispatch({ type: "REMOVE_FROM_WISH", payload: id });
  };

  // const handleCart = async (id) => {
  //   try {
  //     if (isAuth) {
  //       const { data } = await axios.get(`${api}/products/find/${id}`);
  //       // console.log(data);
  //       dispatch({
  //         type: "ADD_CART",
  //         payload: {
  //           product: data._id,
  //           name: data.name,
  //           imageUrl: data.imageUrl,
  //           price: data.price,
  //           // qty,
  //         },
  //       });
  //       localStorage.setItem("cart", JSON.stringify(cart));
  //     } else {
  //       // navigate("/login");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleMoveToCart = (id) => {
  //   wishDispatch({ type: "MOVE_TO_CART", payload: id });
  // };
  return (
    <Container>
      <Announcement />
      <Navbar />

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
                  {console.log(product.product, "226")}
                  <ProductDetail>
                    <Image src={product.imageUrl} />
                    <Details>
                      <ProductName>
                        <b>Product:</b>
                        {product.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b>
                        {product.product._id}
                      </ProductId>
                      <ProductColor />
                      <ProductSize>
                        <b>Size:</b> s
                      </ProductSize>
                      {console.log(product.product._id, "242")}
                      <Button onClick={() => removeHandle(product.product._id)}>
                        remove from wishlist
                      </Button>
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
      <Footer />
    </Container>
  );
};

export default WishList;
