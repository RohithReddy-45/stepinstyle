const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

exports.createOrder = catchAsync(async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  });
});

exports.getOrder = catchAsync(async (req, res) => {
  const features = new ApiFeatures(
    Order.findOne({ id: req.params.id }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields();

  const order = await features.query;
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res) => {
  const currentOrder = await Order.findOne({ id: req.params.id });

  if ('priority' in req.body && req.body.priority) {
    const totalCartPrice = currentOrder.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    req.body.priorityPrice = totalCartPrice * 0.2;
  }

  await Order.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
  });
});
