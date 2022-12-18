const expressAsyncHandler = require("express-async-handler");
const Cart = require("../model/cartModel");

const getCart = expressAsyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.user._id });
    if (carts) {
      res.status(201).json({ carts });
    }
  } catch (error) {
    res.status(401).json({ message: "cart not there" });
  }
  
});

const addToCart = expressAsyncHandler(async (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart already exist then update the qty
      const product = req.body.cartItems.product;
      console.log(product, "product");
      const item = cart.cartItems.find((c) => c.product == product);
      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                qty: item.qty + req.body.cartItems.qty,
              },
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      }

      //   res.status(200).json({ message: cart });
    } else {
      //if cart not there then createv one cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
});

const removeFromCart = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id) {
    Cart.updateOne(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: id,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ product: id });
      }
    });
  }
});

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
