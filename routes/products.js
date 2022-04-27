const { Product, validateProduct } = require("../models/product");
const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();

// ENDPOINTS //
router.post("/", async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    let newProduct = await new Product(req.body);
    await newProduct.save();

    return res.status(201).send(newProduct);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    if (!products)
      return res.status(400).send(`No products in this collection.`);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.get("/:productId", async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(400)
        .send(`Product with ID ${req.params.productId} does not exist!`);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);
    let product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product)
      return res
        .status(400)
        .send(`Product with ID ${req.params.productId} does not exist!`);
    return res.send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.productId);
    if (!product)
      return res
        .status(400)
        .send(`Product with ID ${req.params.productId} does not exist!`);
    return res.send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
