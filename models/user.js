const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("./product");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, minlength: 5 },
  isGoldMember: { type: Boolean, default: false },
  shoppingCart: { type: [productSchema], default: [] },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = { userSchema, User, validateUser };
