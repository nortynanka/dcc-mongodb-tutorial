const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  description: { type: String, required: true, minlength: 2 },
  category: { type: String, required: true, minlength: 2, maxlength: 255 },
  price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now() },
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).required(),
    category: Joi.string().min(2).max(255).required(),
    price: Joi.number().required(),
  });
  return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, validateProduct, productSchema };
