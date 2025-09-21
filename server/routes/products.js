const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const Seller = require('../models/Seller');

// GET /api/products/express?city=<user_city>
router.get('/express', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    // Find all sellers in the specified city
    const localSellers = await Seller.find({ city: city });
    const sellerIds = localSellers.map(seller => seller._id);

    // Find all express inventory items for local sellers with quantity > 0
    const expressInventory = await Inventory.find({
      seller: { $in: sellerIds },
      quantity: { $gt: 0 },
      isExpress: true
    })
    .populate('product')
    .populate('seller');

    // Format the response to match the frontend requirements
    const expressProducts = expressInventory.map(item => ({
      id: item._id,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      category: item.product.category,
      deliveryTime: `${item.deliveryTime_mins} mins`,
      seller: item.seller.name,
      sellerId: item.seller._id,
      quantity: item.quantity
    }));

    res.json(expressProducts);
  } catch (error) {
    console.error('Error fetching express products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/standard
router.get('/standard', async (req, res) => {
  try {
    const standardProducts = await Product.find({});
    
    // Format the response
    const formattedProducts = standardProducts.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      rating: 4.2, // Default rating for standard products
      reviews: Math.floor(Math.random() * 2000) + 100 // Random review count
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching standard products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/express-cities
router.get('/express-cities', async (req, res) => {
  try {
    // Get all cities that have express sellers
    const expressCities = await Seller.distinct('city', {});
    
    res.json(expressCities);
  } catch (error) {
    console.error('Error fetching express cities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id - This must be LAST to avoid conflicts with specific routes
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
