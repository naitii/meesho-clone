const fs = require('fs');
const path = require('path');

console.log('🚀 Quick MongoDB Setup');
console.log('====================');
console.log('');
console.log('Choose your option:');
console.log('');
console.log('1. MongoDB Atlas (Cloud - Recommended)');
console.log('   - Go to https://www.mongodb.com/atlas');
console.log('   - Create free account');
console.log('   - Get connection string');
console.log('   - Update .env file');
console.log('');
console.log('2. Local MongoDB (Simple)');
console.log('   - Install MongoDB locally');
console.log('   - Update .env file to use local connection');
console.log('');
console.log('3. Use existing Atlas connection');
console.log('   - If you already have Atlas, just update .env file');
console.log('');

// Check if .env exists
const envPath = path.join(__dirname, 'server', '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  console.log('📝 Please update MONGODB_URI in server/.env file');
} else {
  console.log('❌ .env file not found');
  console.log('📝 Please create server/.env file first');
}

console.log('');
console.log('After updating .env file, run: npm run seed');
