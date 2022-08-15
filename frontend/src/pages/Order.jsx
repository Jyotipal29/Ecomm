import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";

import { useCart } from "../context/cart/cartContext";
import { useNavigate } from "react-router";

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

const Order = () => {
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const {
    state: { cart, shippingAddress },
    dispatch,
  } = useCart();

  console.log(shippingAddress);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const orderHandler = () => {
    dispatch({ type: "ORDER_DONE" });
    navigate("/products");
  };
  return (
    <div>
      <div>
        <h2>Shipping</h2>
        <p>
          <strong>Name:</strong>
          {shippingAddress.fullName} <br />
          <strong>Address:</strong>
          {shippingAddress.address},{shippingAddress.city},
          {shippingAddress.postalCode},{shippingAddress.country}
        </p>
      </div>
      <div>
        <h2>Payment</h2>
        <p>
          <strong>Method:</strong>
          {shippingAddress.paymentMethodName}
        </p>
      </div>
      <div>
        <h2>Order Items</h2>
        <Info>
          {cart.map((product) => (
            <Product>
              <ProductDetail>
                <Image src={product.imageUrl} />
                <Details>
                  <ProductName>
                    <b>Product:</b>
                    {product.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b>
                    {product.product}
                  </ProductId>
                  <ProductColor />
                  <ProductSize>
                    <b>Size:</b> s
                  </ProductSize>
                  {console.log(product, "product")}
                  {/* <Select
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.product,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(product.InStock).keys()].map((x) => (
                      <Option key={x + 1}>{x + 1}</Option>
                    ))}
                  </Select> */}
                  {/* <ProductAmount>{product.qty}</ProductAmount> */}
                  {/* <Button onClick={() => removeHandle(product.product)}>
                    remove from CART
                  </Button> */}
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  ${product.price * product.qty}
                  <ProductPrice></ProductPrice>
                </ProductAmountContainer>
              </PriceDetail>
            </Product>
          ))}
          <Hr />
        </Info>
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
          <Button disabled={cart.length === 0} onClick={orderHandler}>
            place order
          </Button>
          {/* </StripeCheckout> */}
        </Summary>
      </div>
    </div>
  );
};

export default Order;
