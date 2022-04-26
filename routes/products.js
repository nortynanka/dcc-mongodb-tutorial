const Product = require("../models/product");
const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();

// ENDPOINTS //
router.post("/", async (req,res) => {
    try {
        let newProduct = await new Product(req.body);
        await newProduct.save();
        return res.status(201).send(newProduct);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;