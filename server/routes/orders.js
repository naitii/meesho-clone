const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// POST /api/orders/create
router.post('/create', async (req, res) => {
  const session = await Order.startSession();
  
  try {
    await session.withTransaction(async () => {
      const { userId, items, shippingAddress } = req.body;

      if (!userId || !items || !shippingAddress) {
        throw new Error('Missing required fields');
      }

      // Verify stock for all items
      for (const item of items) {
        const inventory = await Inventory.findOne({
          product: item.productId,
          seller: item.sellerId,
          quantity: { $gte: item.quantity }
        }).session(session);

        if (!inventory) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }
      }

      // Calculate total amount
      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findById(item.productId).session(session);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
          product: item.productId,
          seller: item.sellerId,
          quantity: item.quantity,
          price: product.price
        });

        // Decrement inventory
        await Inventory.updateOne(
          { product: item.productId, seller: item.sellerId },
          { $inc: { quantity: -item.quantity } }
        ).session(session);
      }

      // Create order
      const order = new Order({
        userId,
        items: orderItems,
        shippingAddress,
        totalAmount,
        isExpress: true // All orders through this endpoint are express
      });

      await order.save({ session });
      res.json({ message: 'Order created successfully', orderId: order._id });
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message });
  } finally {
    await session.endSession();
  }
});

// GET /api/orders/:userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate('items.product')
      .populate('items.seller')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
