const mongoose = require('mongoose');
const config = require('./config');
const Seller = require('./models/Seller');
const Product = require('./models/Product');
const Inventory = require('./models/Inventory');

// Sample data
const sampleSellers = [
  // Roorkee Sellers
  {
    name: "Vijay Electronics",
    city: "Roorkee",
    address: "123 Main Street, Roorkee",
    rating: 4.5
  },
  {
    name: "Roopali Sarees",
    city: "Roorkee",
    address: "456 Fashion Lane, Roorkee",
    rating: 4.2
  },
  {
    name: "Ankit General Store",
    city: "Roorkee",
    address: "789 Market Road, Roorkee",
    rating: 4.0
  },
  // Delhi Sellers
  {
    name: "Delhi Tech Hub",
    city: "Delhi",
    address: "Connaught Place, New Delhi",
    rating: 4.7
  },
  {
    name: "Fashion Forward",
    city: "Delhi",
    address: "Karol Bagh, New Delhi",
    rating: 4.3
  },
  {
    name: "Quick Mart Delhi",
    city: "Delhi",
    address: "Lajpat Nagar, New Delhi",
    rating: 4.1
  },
  // Mumbai Sellers
  {
    name: "Mumbai Electronics",
    city: "Mumbai",
    address: "Andheri West, Mumbai",
    rating: 4.6
  },
  {
    name: "Style Studio Mumbai",
    city: "Mumbai",
    address: "Bandra West, Mumbai",
    rating: 4.4
  },
  {
    name: "Mumbai Grocery Plus",
    city: "Mumbai",
    address: "Powai, Mumbai",
    rating: 4.2
  },
  // Bangalore Sellers
  {
    name: "Tech City Electronics",
    city: "Bangalore",
    address: "Koramangala, Bangalore",
    rating: 4.8
  },
  {
    name: "Bangalore Fashion",
    city: "Bangalore",
    address: "MG Road, Bangalore",
    rating: 4.5
  },
  {
    name: "Quick Store Bangalore",
    city: "Bangalore",
    address: "Indiranagar, Bangalore",
    rating: 4.3
  },
  // Chennai Sellers
  {
    name: "Chennai Electronics Hub",
    city: "Chennai",
    address: "T. Nagar, Chennai",
    rating: 4.4
  },
  {
    name: "Chennai Fashion Store",
    city: "Chennai",
    address: "Pondy Bazaar, Chennai",
    rating: 4.2
  },
  {
    name: "Chennai Quick Mart",
    city: "Chennai",
    address: "Anna Nagar, Chennai",
    rating: 4.1
  },
  // Pune Sellers
  {
    name: "Pune Tech Store",
    city: "Pune",
    address: "Koregaon Park, Pune",
    rating: 4.6
  },
  {
    name: "Pune Fashion Hub",
    city: "Pune",
    address: "FC Road, Pune",
    rating: 4.3
  },
  {
    name: "Pune Grocery Plus",
    city: "Pune",
    address: "Baner, Pune",
    rating: 4.0
  }
];

const sampleProducts = [
  // Women Ethnic
  {
    name: "Women's Pink Georgette Saree",
    description: "Elegant pink georgette saree for special occasions",
    price: 849,
    imageUrl: "https://placehold.co/400x400/f8f8f8/E4007C?text=Saree",
    category: "Women Ethnic"
  },
  {
    name: "Women's Cotton Kurti",
    description: "Comfortable cotton kurti for daily wear",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Kurti",
    category: "Women Ethnic"
  },
  {
    name: "Designer Lehenga Set",
    description: "Beautiful lehenga choli set for festivals",
    price: 2499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/E4007C?text=Lehenga",
    category: "Women Ethnic"
  },
  {
    name: "Silk Dupatta",
    description: "Elegant silk dupatta with intricate work",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFD700?text=Dupatta",
    category: "Women Ethnic"
  },
  {
    name: "Anarkali Suit",
    description: "Stylish anarkali suit for special occasions",
    price: 1299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Anarkali",
    category: "Women Ethnic"
  },

  // Women Western
  {
    name: "Women's Jeans",
    description: "Classic blue denim jeans for casual wear",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/4169E1?text=Jeans",
    category: "Women Western"
  },
  {
    name: "Women's T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF6347?text=T-Shirt",
    category: "Women Western"
  },
  {
    name: "Women's Summer Dress",
    description: "Light and breezy summer dress",
    price: 699,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFB6C1?text=Dress",
    category: "Women Western"
  },
  {
    name: "Women's Blouse",
    description: "Stylish blouse for office and casual wear",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Blouse",
    category: "Women Western"
  },
  {
    name: "Women's Crop Top",
    description: "Trendy crop top for casual outings",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Crop+Top",
    category: "Women Western"
  },

  // Men
  {
    name: "Men's Cotton Check Shirt",
    description: "Comfortable cotton shirt with check pattern",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Shirt",
    category: "Men"
  },
  {
    name: "Men's Formal Trousers",
    description: "Professional formal trousers for office wear",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/2F4F4F?text=Trousers",
    category: "Men"
  },
  {
    name: "Men's Polo T-Shirt",
    description: "Classic polo t-shirt in various colors",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF6347?text=Polo",
    category: "Men"
  },
  {
    name: "Men's Sports Shoes",
    description: "Comfortable sports shoes for running and gym",
    price: 1199,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Sports+Shoes",
    category: "Men"
  },
  {
    name: "Men's Casual Shirt",
    description: "Relaxed fit casual shirt for everyday wear",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/4169E1?text=Casual+Shirt",
    category: "Men"
  },

  // Kids
  {
    name: "Kids T-Shirt Set",
    description: "Pack of 3 colorful t-shirts for kids",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Kids+T-Shirt",
    category: "Kids"
  },
  {
    name: "Kids School Uniform",
    description: "Complete school uniform set for kids",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/4169E1?text=Uniform",
    category: "Kids"
  },
  {
    name: "Kids Denim Jeans",
    description: "Durable denim jeans for active kids",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Kids+Jeans",
    category: "Kids"
  },
  {
    name: "Kids Party Dress",
    description: "Beautiful party dress for special occasions",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFB6C1?text=Party+Dress",
    category: "Kids"
  },
  {
    name: "Kids Winter Jacket",
    description: "Warm winter jacket for cold weather",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Winter+Jacket",
    category: "Kids"
  },

  // Home & Kitchen
  {
    name: "Designer Wall Clock",
    description: "Modern wall clock for home decoration",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Clock",
    category: "Home & Kitchen"
  },
  {
    name: "LED Bulb 9W",
    description: "Energy efficient LED bulb with warm white light",
    price: 99,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFFF00?text=LED+Bulb",
    category: "Home & Kitchen"
  },
  {
    name: "Cotton Bed Sheet Set",
    description: "Soft cotton bed sheet set for single bed",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Bed+Sheet",
    category: "Home & Kitchen"
  },
  {
    name: "Kitchen Knife Set",
    description: "Professional stainless steel knife set",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/C0C0C0?text=Knife+Set",
    category: "Home & Kitchen"
  },
  {
    name: "Plant Pot Set",
    description: "Ceramic plant pots for indoor gardening",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8FBC8F?text=Plant+Pot",
    category: "Home & Kitchen"
  },
  {
    name: "Bath Towel Set",
    description: "Soft and absorbent bath towel set",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Towel",
    category: "Home & Kitchen"
  },

  // Beauty & Health
  {
    name: "Face Wash - Oily Skin",
    description: "Gentle face wash for oily and combination skin",
    price: 199,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFB6C1?text=Face+Wash",
    category: "Beauty & Health"
  },
  {
    name: "Moisturizing Cream",
    description: "24-hour moisturizing cream for all skin types",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFB6C1?text=Moisturizer",
    category: "Beauty & Health"
  },
  {
    name: "Lip Balm Set",
    description: "Set of 3 flavored lip balms",
    price: 149,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Lip+Balm",
    category: "Beauty & Health"
  },
  {
    name: "Hair Oil - Coconut",
    description: "Pure coconut hair oil for healthy hair",
    price: 89,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Hair+Oil",
    category: "Beauty & Health"
  },
  {
    name: "Shampoo - Anti Dandruff",
    description: "Anti-dandruff shampoo for healthy scalp",
    price: 179,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Shampoo",
    category: "Beauty & Health"
  },

  // Jewellery & Accessories
  {
    name: "Gold Plated Earrings",
    description: "Elegant gold plated earrings for special occasions",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFD700?text=Earrings",
    category: "Jewellery & Accessories"
  },
  {
    name: "Silver Chain Necklace",
    description: "Beautiful silver chain necklace",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/C0C0C0?text=Necklace",
    category: "Jewellery & Accessories"
  },
  {
    name: "Designer Handbag",
    description: "Stylish handbag perfect for office and parties",
    price: 1299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Handbag",
    category: "Jewellery & Accessories"
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple compartments",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Wallet",
    category: "Jewellery & Accessories"
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with beautiful patterns",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFD700?text=Scarf",
    category: "Jewellery & Accessories"
  },

  // Bags & Footwear
  {
    name: "Women's Sandals",
    description: "Comfortable leather sandals for summer",
    price: 699,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Sandals",
    category: "Bags & Footwear"
  },
  {
    name: "Men's Leather Belt",
    description: "Genuine leather belt with classic buckle",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Belt",
    category: "Bags & Footwear"
  },
  {
    name: "Kids School Bag",
    description: "Colorful school bag with multiple compartments",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/32CD32?text=School+Bag",
    category: "Bags & Footwear"
  },
  {
    name: "Women's Heels",
    description: "Elegant high heels for formal occasions",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Heels",
    category: "Bags & Footwear"
  },
  {
    name: "Men's Formal Shoes",
    description: "Professional formal shoes for office wear",
    price: 1299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Formal+Shoes",
    category: "Bags & Footwear"
  },

  // Electronics
  {
    name: "boAt Airdopes 131 Pro",
    description: "Wireless earbuds with active noise cancellation",
    price: 1099,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Airdopes",
    category: "Electronics"
  },
  {
    name: "USB-C Fast Charger 20W",
    description: "Fast charging adapter for mobile devices",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Charger",
    category: "Electronics"
  },
  {
    name: "SanDisk 128GB Memory Card",
    description: "High-speed microSD card for cameras and phones",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Memory+Card",
    category: "Electronics"
  },
  {
    name: "Samsung Galaxy Buds",
    description: "Premium wireless earbuds with crystal clear sound",
    price: 1299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Galaxy+Buds",
    category: "Electronics"
  },
  {
    name: "iPhone Lightning Cable",
    description: "Durable lightning cable for iPhone charging",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Lightning+Cable",
    category: "Electronics"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable wireless speaker with deep bass",
    price: 1599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Speaker",
    category: "Electronics"
  },
  {
    name: "Power Bank 10000mAh",
    description: "High capacity portable charger for all devices",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Power+Bank",
    category: "Electronics"
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse for laptops and desktops",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Mouse",
    category: "Electronics"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Insert sellers
    const sellers = await Seller.insertMany(sampleSellers);
    console.log('Inserted sellers');

    // Insert products
    const products = await Product.insertMany(sampleProducts);
    console.log('Inserted products');

    // Create inventory items for express products across all cities
    const inventoryItems = [
      // Roorkee Express Products
      {
        product: products[0]._id, // Women's Pink Georgette Saree
        seller: sellers[1]._id, // Roopali Sarees
        quantity: 8,
        isExpress: true,
        deliveryTime_mins: 60
      },
      {
        product: products[1]._id, // Women's Cotton Kurti
        seller: sellers[1]._id, // Roopali Sarees
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[20]._id, // Men's Cotton Check Shirt
        seller: sellers[0]._id, // Vijay Electronics
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[25]._id, // Kids T-Shirt Set
        seller: sellers[2]._id, // Ankit General Store
        quantity: 20,
        isExpress: true,
        deliveryTime_mins: 30
      },
      {
        product: products[30]._id, // Designer Wall Clock
        seller: sellers[2]._id, // Ankit General Store
        quantity: 10,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[35]._id, // Face Wash
        seller: sellers[2]._id, // Ankit General Store
        quantity: 25,
        isExpress: true,
        deliveryTime_mins: 25
      },

      // Delhi Express Products
      {
        product: products[40]._id, // Gold Plated Earrings
        seller: sellers[4]._id, // Fashion Forward
        quantity: 8,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[36]._id, // Women's Sandals
        seller: sellers[4]._id, // Fashion Forward
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[41]._id, // boAt Airdopes
        seller: sellers[3]._id, // Delhi Tech Hub
        quantity: 18,
        isExpress: true,
        deliveryTime_mins: 35
      },
      {
        product: products[42]._id, // USB-C Fast Charger
        seller: sellers[3]._id, // Delhi Tech Hub
        quantity: 25,
        isExpress: true,
        deliveryTime_mins: 25
      },
      {
        product: products[2]._id, // Designer Lehenga Set
        seller: sellers[4]._id, // Fashion Forward
        quantity: 6,
        isExpress: true,
        deliveryTime_mins: 60
      },
      {
        product: products[9]._id, // Women's Summer Dress
        seller: sellers[4]._id, // Fashion Forward
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 40
      },

      // Mumbai Express Products
      {
        product: products[43]._id, // SanDisk Memory Card
        seller: sellers[6]._id, // Mumbai Electronics
        quantity: 20,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[8]._id, // Women's Jeans
        seller: sellers[7]._id, // Style Studio Mumbai
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 55
      },
      {
        product: products[28]._id, // Kids Winter Jacket
        seller: sellers[8]._id, // Mumbai Grocery Plus
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[44]._id, // Samsung Galaxy Buds
        seller: sellers[6]._id, // Mumbai Electronics
        quantity: 16,
        isExpress: true,
        deliveryTime_mins: 35
      },
      {
        product: products[13]._id, // Women's Crop Top
        seller: sellers[7]._id, // Style Studio Mumbai
        quantity: 18,
        isExpress: true,
        deliveryTime_mins: 30
      },
      {
        product: products[33]._id, // Bath Towel Set
        seller: sellers[8]._id, // Mumbai Grocery Plus
        quantity: 22,
        isExpress: true,
        deliveryTime_mins: 25
      },

      // Bangalore Express Products
      {
        product: products[48]._id, // Wireless Mouse
        seller: sellers[9]._id, // Tech City Electronics
        quantity: 22,
        isExpress: true,
        deliveryTime_mins: 30
      },
      {
        product: products[21]._id, // Men's Formal Trousers
        seller: sellers[10]._id, // Bangalore Fashion
        quantity: 18,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[26]._id, // Kids School Uniform
        seller: sellers[11]._id, // Quick Store Bangalore
        quantity: 25,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[41]._id, // boAt Airdopes (also in Bangalore)
        seller: sellers[9]._id, // Tech City Electronics
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[36]._id, // Women's Sandals
        seller: sellers[10]._id, // Bangalore Fashion
        quantity: 10,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[32]._id, // Plant Pot Set
        seller: sellers[11]._id, // Quick Store Bangalore
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 35
      },

      // Chennai Express Products
      {
        product: products[41]._id, // boAt Airdopes
        seller: sellers[12]._id, // Chennai Electronics Hub
        quantity: 14,
        isExpress: true,
        deliveryTime_mins: 35
      },
      {
        product: products[1]._id, // Women's Cotton Kurti
        seller: sellers[13]._id, // Chennai Fashion Store
        quantity: 10,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[24]._id, // Kids Party Dress
        seller: sellers[14]._id, // Chennai Quick Mart
        quantity: 8,
        isExpress: true,
        deliveryTime_mins: 50
      },

      // Pune Express Products
      {
        product: products[44]._id, // Samsung Galaxy Buds
        seller: sellers[15]._id, // Pune Tech Store
        quantity: 16,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[8]._id, // Women's Jeans
        seller: sellers[16]._id, // Pune Fashion Hub
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[31]._id, // LED Bulb
        seller: sellers[17]._id, // Pune Grocery Plus
        quantity: 30,
        isExpress: true,
        deliveryTime_mins: 25
      }
    ];

    await Inventory.insertMany(inventoryItems);
    console.log('Inserted inventory items');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
