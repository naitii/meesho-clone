require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB Connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.log('❌ MONGODB_URI not found in environment variables');
  console.log('📝 Please check your .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB!');
  process.exit(0);
})
.catch(err => {
  console.log('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
