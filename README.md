# Meesho Clone with Meesho Express

A full-stack e-commerce application that replicates the Meesho website with an integrated "Meesho Express" feature for ultra-fast local delivery.

## Features

- **Pixel-perfect Meesho UI/UX**: Responsive design matching the original Meesho website
- **Meesho Express**: Ultra-fast local delivery with real-time inventory tracking
- **Geo-fencing**: Products filtered by city for local delivery
- **Real-time Inventory**: Live stock management for express products
- **Seller Management**: Individual seller stores and profiles
- **Order Management**: Complete order processing with inventory updates

## Technology Stack

### Frontend
- React 18 with Hooks
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- RESTful API design

## Project Structure

```
meesho-clone/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles with Tailwind
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   │   ├── Seller.js
│   │   ├── Product.js
│   │   ├── Inventory.js
│   │   └── Order.js
│   ├── routes/            # API routes
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── inventory.js
│   ├── index.js           # Server entry point
│   ├── seedData.js        # Database seeding script
│   └── package.json
└── package.json           # Root package.json
```

## Database Schema

### Seller Schema
- `name`: Seller name (e.g., "Vijay Electronics")
- `city`: Seller city (indexed for geo-fencing)
- `address`: Physical address
- `rating`: Seller rating (0-5)

### Product Schema
- `name`: Product name
- `description`: Product description
- `price`: Product price
- `imageUrl`: Product image URL
- `category`: Product category

### Inventory Schema
- `product`: Reference to Product
- `seller`: Reference to Seller
- `quantity`: Available stock
- `isExpress`: Boolean flag for express products
- `deliveryTime_mins`: Delivery time in minutes

## API Endpoints

### Products
- `GET /api/products/express?city=<city>` - Get express products for a city
- `GET /api/products/standard` - Get standard products

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:userId` - Get user orders

### Inventory
- `PUT /api/inventory/update` - Update inventory quantity

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `server/config.js` if needed

3. **Seed the database:**
   ```bash
   cd server
   node seedData.js
   ```

4. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) servers.

### Individual Server Commands

**Backend only:**
```bash
cd server
npm run dev
```

**Frontend only:**
```bash
cd client
npm start
```

## Sample Data

The application comes with pre-populated sample data including:

### Express Products (Roorkee)
- boAt Airdopes 131 Pro (45 mins delivery)
- Women's Pink Georgette Saree (60 mins delivery)
- Amul Gold Milk - 1L (25 mins delivery)
- USB-C Fast Charger 20W (30 mins delivery)
- SanDisk 128GB Memory Card (40 mins delivery)
- Dairy Milk Silk Oreo (20 mins delivery)

### Sellers
- Vijay Electronics (Electronics)
- Roopali Sarees (Fashion)
- Ankit General Store (Grocery)

## Key Features Implementation

### Geo-fencing Logic
The express products are filtered by city using MongoDB queries:
1. Find all sellers in the specified city
2. Query inventory for products from local sellers
3. Return only in-stock express products

### Real-time Inventory
- Inventory quantities are decremented on order creation
- Atomic transactions ensure data consistency
- Stock verification before order processing

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Pixel-perfect replication of Meesho's design
- Smooth animations and hover effects

## Usage

1. **Home Page**: Browse standard products with ratings and reviews
2. **Meesho Express**: View ultra-fast delivery products with delivery times
3. **Seller Stores**: Click on seller names to view their individual stores
4. **Search**: Use the search bar to find products (UI ready, functionality can be extended)

## Future Enhancements

- User authentication and profiles
- Shopping cart functionality
- Payment integration
- Real-time notifications
- Advanced search and filtering
- Product reviews and ratings
- Order tracking system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development purposes.
