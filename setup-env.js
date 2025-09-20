const fs = require('fs');
const path = require('path');

// Create .env file from example if it doesn't exist
const envExamplePath = path.join(__dirname, 'server', 'env.example');
const envPath = path.join(__dirname, 'server', '.env');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from env.example');
    console.log('📝 Please review and update the .env file with your configuration');
  } else {
    console.log('❌ env.example file not found');
  }
} else {
  console.log('ℹ️  .env file already exists');
}

console.log('\n🚀 Setup complete! You can now:');
console.log('1. Review server/.env file');
console.log('2. Update MongoDB URI if needed');
console.log('3. Run: npm run install-all');
console.log('4. Run: cd server && node seedData.js');
console.log('5. Run: npm run dev');
