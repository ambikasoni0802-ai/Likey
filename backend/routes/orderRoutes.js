const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Naya order place karo - login user
router.post('/', protect, async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress, phone } = req.body;

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount,
      shippingAddress,
      phone
    });

    res.status(201).json({ message: 'Order place ho gaya', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apne khud ke orders dekho - login user
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sabhi orders dekho (kisne kya order kiya) - sirf admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email phone').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Order ka status update karo (pending/shipped/delivered) - sirf admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
