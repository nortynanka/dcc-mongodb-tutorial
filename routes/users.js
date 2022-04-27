const express = require("express");
const { User, validateUser } = require("../models/user");
const { Product, validateProduct } = require("../models/product");
const router = express.Router();

// ENDPOINTS //
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(`Body for user not valid! ${error}`);

    let newUser = await new User(req.body);
    await newUser.save();

    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    if (!users) return res.status(400).send(`No users in this collection.`);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.post("/:userId/shoppingcart/:productId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).send(`User with ID ${req.params.userId}!`);

    let product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(400)
        .send(`Product with ID ${req.params.productId} does not exist!`);

    user.shoppingCart.push(product);
    await user.save();
    return res.send(user.shoppingCart);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.put("/:userId/shoppingcart/:productId", async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error)
      return res.status(400).send(`Body for product not valid! ${error}`);

    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with ID ${req.params.userId} does not exist!`);

    const product = user.shoppingCart.id(req.params.productId);
    if (!product)
      return res
        .status(400)
        .send(`The product does not exist in the shopping cart!`);
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.price = req.body.price;

    await user.save();
    return res.send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.delete("/:userId/shoppingcart/:productId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with ID ${req.params.userId} does not exist!`);

    let product = user.shoppingCart.id(req.params.productId);
    if (!product)
      return res
        .status(400)
        .send(`The product does not exist in the shopping cart!`);

    product = await product.remove();
    await user.save();
    return res.send(product);
  } catch {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
