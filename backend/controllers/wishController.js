const expressAsyncHandler = require("express-async-handler");
const Wish = require("../model/wishModel");

const getWish = expressAsyncHandler(async (req, res) => {
  const wishs = await Wish.find({ user: req.user._id });
  if (wishs) {
    res.status(201).json({ wishs });
  } else {
    res.status(401).json({ error: "wish does not exixts" });
  }
});

const addToWish = expressAsyncHandler(async (req, res) => {
  Wish.findOne({ user: req.user._id }).exec((error, wish) => {
    if (error) return res.status(400).json({ error });
    if (wish) {
      //if cart already exist then update the qty
      const product = req.body.wishItems.product;
      console.log(product, "product");
      const item = wish.wishItems.find((c) => c.product == product);
      if (item) {
        Wish.findOneAndUpdate(
          { user: req.user._id, "wishItems.product": product },
          {
            $set: {
              "wishItems.$": {
                ...req.body.wishItems,
                qty: item.qty + req.body.wishItems.qty,
              },
            },
          }
        ).exec((error, _wish) => {
          if (error) return res.status(400).json({ error });
          if (_wish) {
            return res.status(201).json({ wish: _wish });
          }
        });
      } else {
        Wish.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              wishItems: req.body.wishItems,
            },
          }
        ).exec((error, _wish) => {
          if (error) return res.status(400).json({ error });
          if (_wish) {
            return res.status(201).json({ wish: _wish });
          }
        });
      }

      //   res.status(200).json({ message: cart });
    } else {
      //if cart not there then createv one cart
      const wish = new Wish({
        user: req.user._id,
        wishItems: req.body.wishItems,
      });
      wish.save((error, wish) => {
        if (error) return res.status(400).json({ error });
        if (wish) {
          return res.status(201).json({ wish });
        }
      });
    }
  });
});

const removeFromWish = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id) {
    Wish.updateOne(
      { user: req.user._id },
      {
        $pull: {
          wishItems: {
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
  getWish,
  addToWish,
  removeFromWish,
};
