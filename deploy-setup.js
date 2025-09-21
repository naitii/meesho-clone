#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Meesho Clone - Deployment Setup');
console.log('=====================================\n');

// Check if we're in the right directory
if (!fs.existsSync('client') || !fs.existsSync('server')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

console.log('✅ Project structure looks good\n');

// Check if build exists
if (fs.existsSync('client/build')) {
  console.log('✅ Frontend build exists');
} else {
  console.log('❌ Frontend build not found. Run: cd client && npm run build');
}

// Check if server has all required files
const serverFiles = ['package.json', 'index.js', 'Procfile'];
const missingFiles = serverFiles.filter(file => !fs.existsSync(`server/${file}`));

if (missingFiles.length === 0) {
  console.log('✅ Backend files are ready');
} else {
  console.log(`❌ Missing backend files: ${missingFiles.join(', ')}`);
}

console.log('\n📋 Next Steps:');
console.log('1. Set up MongoDB Atlas database');
console.log('2. Deploy backend to Railway:');
console.log('   - Go to https://railway.app');
console.log('   - Connect GitHub repository');
console.log('   - Select server folder as root');
console.log('   - Add MONGODB_URI environment variable');
console.log('3. Deploy frontend to Vercel:');
console.log('   - Go to https://vercel.com');
console.log('   - Connect GitHub repository');
console.log('   - Select client folder as root');
console.log('   - Add REACT_APP_API_URL environment variable');
console.log('4. Seed the production database');
console.log('5. Test the deployed application');

console.log('\n📖 For detailed instructions, see DEPLOYMENT.md');
console.log('\n🎉 Happy deploying!');
