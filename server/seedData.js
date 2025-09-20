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
  },

  // Fashion - Women
  {
    name: "Women's Pink Georgette Saree",
    description: "Elegant pink georgette saree for special occasions",
    price: 849,
    imageUrl: "https://placehold.co/400x400/f8f8f8/E4007C?text=Saree",
    category: "Fashion"
  },
  {
    name: "Women's Cotton Kurti",
    description: "Comfortable cotton kurti for daily wear",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Kurti",
    category: "Fashion"
  },
  {
    name: "Designer Handbag",
    description: "Stylish handbag perfect for office and parties",
    price: 1299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Handbag",
    category: "Fashion"
  },
  {
    name: "Women's Jeans",
    description: "Classic blue denim jeans for casual wear",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/4169E1?text=Jeans",
    category: "Fashion"
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with beautiful patterns",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFD700?text=Scarf",
    category: "Fashion"
  },
  {
    name: "Women's Sandals",
    description: "Comfortable leather sandals for summer",
    price: 699,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Sandals",
    category: "Fashion"
  },

  // Fashion - Men
  {
    name: "Men's Cotton Check Shirt",
    description: "Comfortable cotton shirt with check pattern",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Shirt",
    category: "Fashion"
  },
  {
    name: "Men's Formal Trousers",
    description: "Professional formal trousers for office wear",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/2F4F4F?text=Trousers",
    category: "Fashion"
  },
  {
    name: "Men's Leather Belt",
    description: "Genuine leather belt with classic buckle",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Belt",
    category: "Fashion"
  },
  {
    name: "Men's Sports Shoes",
    description: "Comfortable sports shoes for running and gym",
    price: 1199,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Sports+Shoes",
    category: "Fashion"
  },
  {
    name: "Men's Polo T-Shirt",
    description: "Classic polo t-shirt in various colors",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF6347?text=Polo",
    category: "Fashion"
  },

  // Grocery
  {
    name: "Amul Gold Milk - 1L",
    description: "Fresh whole milk 1 liter pack",
    price: 68,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Milk",
    category: "Grocery"
  },
  {
    name: "Dairy Milk Silk Oreo",
    description: "Delicious chocolate bar with oreo pieces",
    price: 140,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Chocolate",
    category: "Grocery"
  },
  {
    name: "Basmati Rice 1kg",
    description: "Premium basmati rice for daily cooking",
    price: 89,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFF8DC?text=Rice",
    category: "Grocery"
  },
  {
    name: "Olive Oil 500ml",
    description: "Extra virgin olive oil for healthy cooking",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/808000?text=Olive+Oil",
    category: "Grocery"
  },
  {
    name: "Fresh Bananas 1kg",
    description: "Fresh yellow bananas rich in potassium",
    price: 45,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFFF00?text=Bananas",
    category: "Grocery"
  },
  {
    name: "Bread Loaf",
    description: "Fresh whole wheat bread loaf",
    price: 35,
    imageUrl: "https://placehold.co/400x400/f8f8f8/F5DEB3?text=Bread",
    category: "Grocery"
  },
  {
    name: "Eggs - 12 pieces",
    description: "Fresh farm eggs, 12 pieces pack",
    price: 60,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFF8DC?text=Eggs",
    category: "Grocery"
  },
  {
    name: "Maggi Noodles 2-Minute",
    description: "Instant noodles ready in 2 minutes",
    price: 12,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFA500?text=Maggi",
    category: "Grocery"
  },

  // Home & Living
  {
    name: "Designer Wall Clock",
    description: "Modern wall clock for home decoration",
    price: 799,
    imageUrl: "https://placehold.co/400x400/f8f8f8/000?text=Clock",
    category: "Home"
  },
  {
    name: "LED Bulb 9W",
    description: "Energy efficient LED bulb with warm white light",
    price: 99,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFFF00?text=LED+Bulb",
    category: "Home"
  },
  {
    name: "Cotton Bed Sheet Set",
    description: "Soft cotton bed sheet set for single bed",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Bed+Sheet",
    category: "Home"
  },
  {
    name: "Kitchen Knife Set",
    description: "Professional stainless steel knife set",
    price: 899,
    imageUrl: "https://placehold.co/400x400/f8f8f8/C0C0C0?text=Knife+Set",
    category: "Home"
  },
  {
    name: "Plant Pot Set",
    description: "Ceramic plant pots for indoor gardening",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8FBC8F?text=Plant+Pot",
    category: "Home"
  },
  {
    name: "Bath Towel Set",
    description: "Soft and absorbent bath towel set",
    price: 499,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Towel",
    category: "Home"
  },

  // Beauty & Health
  {
    name: "Face Wash - Oily Skin",
    description: "Gentle face wash for oily and combination skin",
    price: 199,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFB6C1?text=Face+Wash",
    category: "Beauty"
  },
  {
    name: "Moisturizing Cream",
    description: "24-hour moisturizing cream for all skin types",
    price: 299,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFB6C1?text=Moisturizer",
    category: "Beauty"
  },
  {
    name: "Lip Balm Set",
    description: "Set of 3 flavored lip balms",
    price: 149,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FF69B4?text=Lip+Balm",
    category: "Beauty"
  },
  {
    name: "Hair Oil - Coconut",
    description: "Pure coconut hair oil for healthy hair",
    price: 89,
    imageUrl: "https://placehold.co/400x400/f8f8f8/8B4513?text=Hair+Oil",
    category: "Beauty"
  },
  {
    name: "Shampoo - Anti Dandruff",
    description: "Anti-dandruff shampoo for healthy scalp",
    price: 179,
    imageUrl: "https://placehold.co/400x400/f8f8f8/87CEEB?text=Shampoo",
    category: "Beauty"
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
    name: "Educational Toy Set",
    description: "Learning toys for kids aged 3-6 years",
    price: 599,
    imageUrl: "https://placehold.co/400x400/f8f8f8/FFD700?text=Kids+Toy",
    category: "Kids"
  },
  {
    name: "Kids School Bag",
    description: "Colorful school bag with multiple compartments",
    price: 399,
    imageUrl: "https://placehold.co/400x400/f8f8f8/32CD32?text=School+Bag",
    category: "Kids"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Seller.deleteMany({});
    await Product.deleteMany({});
    await Inventory.deleteMany({});
    console.log('Cleared existing data');

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
        product: products[0]._id, // boAt Airdopes
        seller: sellers[0]._id, // Vijay Electronics
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[8]._id, // Saree
        seller: sellers[1]._id, // Roopali Sarees
        quantity: 8,
        isExpress: true,
        deliveryTime_mins: 60
      },
      {
        product: products[15]._id, // Milk
        seller: sellers[2]._id, // Ankit General Store
        quantity: 25,
        isExpress: true,
        deliveryTime_mins: 25
      },
      {
        product: products[1]._id, // Charger
        seller: sellers[0]._id, // Vijay Electronics
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 30
      },
      {
        product: products[2]._id, // Memory Card
        seller: sellers[0]._id, // Vijay Electronics
        quantity: 20,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[16]._id, // Chocolate
        seller: sellers[2]._id, // Ankit General Store
        quantity: 50,
        isExpress: true,
        deliveryTime_mins: 20
      },

      // Delhi Express Products
      {
        product: products[3]._id, // Samsung Galaxy Buds
        seller: sellers[3]._id, // Delhi Tech Hub
        quantity: 18,
        isExpress: true,
        deliveryTime_mins: 35
      },
      {
        product: products[9]._id, // Women's Kurti
        seller: sellers[4]._id, // Fashion Forward
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[17]._id, // Basmati Rice
        seller: sellers[5]._id, // Quick Mart Delhi
        quantity: 30,
        isExpress: true,
        deliveryTime_mins: 30
      },
      {
        product: products[4]._id, // iPhone Cable
        seller: sellers[3]._id, // Delhi Tech Hub
        quantity: 25,
        isExpress: true,
        deliveryTime_mins: 25
      },
      {
        product: products[10]._id, // Handbag
        seller: sellers[4]._id, // Fashion Forward
        quantity: 8,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[18]._id, // Olive Oil
        seller: sellers[5]._id, // Quick Mart Delhi
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 40
      },

      // Mumbai Express Products
      {
        product: products[5]._id, // Bluetooth Speaker
        seller: sellers[6]._id, // Mumbai Electronics
        quantity: 10,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[11]._id, // Women's Jeans
        seller: sellers[7]._id, // Style Studio Mumbai
        quantity: 15,
        isExpress: true,
        deliveryTime_mins: 55
      },
      {
        product: products[19]._id, // Fresh Bananas
        seller: sellers[8]._id, // Mumbai Grocery Plus
        quantity: 40,
        isExpress: true,
        deliveryTime_mins: 20
      },
      {
        product: products[6]._id, // Power Bank
        seller: sellers[6]._id, // Mumbai Electronics
        quantity: 20,
        isExpress: true,
        deliveryTime_mins: 35
      },
      {
        product: products[12]._id, // Silk Scarf
        seller: sellers[7]._id, // Style Studio Mumbai
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[20]._id, // Bread Loaf
        seller: sellers[8]._id, // Mumbai Grocery Plus
        quantity: 35,
        isExpress: true,
        deliveryTime_mins: 15
      },

      // Bangalore Express Products
      {
        product: products[7]._id, // Wireless Mouse
        seller: sellers[9]._id, // Tech City Electronics
        quantity: 22,
        isExpress: true,
        deliveryTime_mins: 30
      },
      {
        product: products[13]._id, // Men's Formal Trousers
        seller: sellers[10]._id, // Bangalore Fashion
        quantity: 18,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[21]._id, // Eggs
        seller: sellers[11]._id, // Quick Store Bangalore
        quantity: 50,
        isExpress: true,
        deliveryTime_mins: 25
      },
      {
        product: products[0]._id, // boAt Airdopes (also in Bangalore)
        seller: sellers[9]._id, // Tech City Electronics
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[14]._id, // Women's Sandals
        seller: sellers[10]._id, // Bangalore Fashion
        quantity: 10,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[22]._id, // Maggi Noodles
        seller: sellers[11]._id, // Quick Store Bangalore
        quantity: 100,
        isExpress: true,
        deliveryTime_mins: 15
      },

      // Chennai Express Products
      {
        product: products[0]._id, // boAt Airdopes
        seller: sellers[12]._id, // Chennai Electronics Hub
        quantity: 14,
        isExpress: true,
        deliveryTime_mins: 35
      },
      {
        product: products[9]._id, // Women's Kurti
        seller: sellers[13]._id, // Chennai Fashion Store
        quantity: 10,
        isExpress: true,
        deliveryTime_mins: 45
      },
      {
        product: products[15]._id, // Milk
        seller: sellers[14]._id, // Chennai Quick Mart
        quantity: 20,
        isExpress: true,
        deliveryTime_mins: 30
      },

      // Pune Express Products
      {
        product: products[3]._id, // Samsung Galaxy Buds
        seller: sellers[15]._id, // Pune Tech Store
        quantity: 16,
        isExpress: true,
        deliveryTime_mins: 40
      },
      {
        product: products[11]._id, // Women's Jeans
        seller: sellers[16]._id, // Pune Fashion Hub
        quantity: 12,
        isExpress: true,
        deliveryTime_mins: 50
      },
      {
        product: products[17]._id, // Basmati Rice
        seller: sellers[17]._id, // Pune Grocery Plus
        quantity: 25,
        isExpress: true,
        deliveryTime_mins: 35
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
