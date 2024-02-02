const express = require('express');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/menu').get(productController.getAllProducts);

// .post(productController.createProduct);

router.route('/order').post(orderController.createOrder);

router
  .route('/order/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder);

module.exports = router;
