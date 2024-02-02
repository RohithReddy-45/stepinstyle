const mongoose = require('mongoose');

const generateRandomId = () => {
  const timestamp = Date.now().toString(36);
  const id = timestamp.slice(-6).toUpperCase();
  return id;
};

const { Schema } = mongoose;

const orderSchema = new Schema({
  id: { type: String, unique: true },
  address: { type: String, select: false },
  customer: { type: String },
  phone: { type: String, select: false },
  position: { type: String, select: false },
  estimatedDelivery: { type: Date },
  priority: { type: Boolean, required: true },
  priorityPrice: { type: Number },
  cart: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
  orderPrice: { type: Number },
});

orderSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = generateRandomId();
  }

  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  if (!this.estimatedDelivery) {
    this.estimatedDelivery = new Date(
      this.createdAt.getTime() + 1000 * 60 * 60,
    );
  }

  const totalCartPrice = this.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  this.orderPrice = totalCartPrice;

  this.priorityPrice = this.priority ? totalCartPrice * 0.2 : 0;

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
