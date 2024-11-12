const express = require('express');
const router = express.Router();
const User = require('../models/user');
const PurchaseHistory = require('../models/purchasehistory');
const axios = require('axios');

// Register a new user
router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Record user purchase
router.post('/purchase', async (req, res) => {
  const { userId, products, amount } = req.body;

  const purchase = new PurchaseHistory({
    userId,
    products,
    totalAmount: amount
  });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Add to user's purchase history
    user.purchaseHistory.push(...products.map(product => ({ productId: product })));
    await user.save();
    await purchase.save();
    res.status(201).json({ message: 'Purchase recorded' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get recommendations for user
router.get('/recommendations/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    const purchaseHistory = user.purchaseHistory.map(purchase => purchase.productId);
    
    const response = await axios.post('http://localhost:5000/recommend', { cart: purchaseHistory });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
