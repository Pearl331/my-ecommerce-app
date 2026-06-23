const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerceDB')
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

// Schema with explicit shippingDetails object
const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  shippingDetails: {
    name: String,
    email: String,
    address: String
  },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log("Order Saved:", req.body);
    res.status(201).send({ message: "Order placed and saved to Database!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error saving order" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));