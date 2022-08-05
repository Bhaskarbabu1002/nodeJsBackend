const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const ordersController = require('../controllers/ordersController');

// Handle Incoming GET Requests to orders
router.get('/', ordersController.orders_get_all);

// Handle POST Request to orders
router.post('/', ordersController.orders_create_all);

// Handle Incoming GET Requests with ID to orders
 router.get('/:orderId', ordersController.orders_get_orderId);
 
// Handle DELETE Requests with ID to orders
 router.delete('/:orderId', checkAuth, ordersController.orders_delete_order);

module.exports = router;