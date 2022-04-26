require("dotenv").config();
const connectDb = require("./db/db");
const express = require("express");
const cors = require("cors");
const app = express();

const products = require("./routes/products");

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", products);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running. Listening on PORT: ${PORT}`);
});
