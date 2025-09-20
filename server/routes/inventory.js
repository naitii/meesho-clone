const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// PUT /api/inventory/update
router.put('/update', async (req, res) => {
  try {
    const { sellerId, productId, newQuantity } = req.body;

    if (!sellerId || !productId || newQuantity === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const inventory = await Inventory.findOneAndUpdate(
      { seller: sellerId, product: productId },
      { quantity: newQuantity },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory updated successfully', inventory });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
