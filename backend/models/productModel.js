const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  stars: { type: Number, required: true },
  reviews: { type: Number, required: true },
  soldOut: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
