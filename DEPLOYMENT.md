# Meesho Clone - Deployment Guide

This guide will help you deploy your Meesho clone to production.

## Prerequisites

1. **MongoDB Atlas Account** - For database hosting
2. **GitHub Account** - For code repository
3. **Vercel Account** - For frontend hosting (free)
4. **Railway Account** - For backend hosting (free tier available)

## Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/meesho-clone?retryWrites=true&w=majority`)

## Step 2: Backend Deployment (Railway)

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Create a new project
4. Connect your GitHub repository
5. Select the `server` folder as the root directory
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (Railway will set this automatically)
   - `NODE_ENV`: production
7. Deploy the backend
8. Note down the backend URL (e.g., `https://your-app.railway.app`)

## Step 3: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Set the root directory to `client`
5. Add environment variables:
   - `REACT_APP_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app`)
6. Deploy the frontend
7. Note down the frontend URL (e.g., `https://your-app.vercel.app`)

## Step 4: Update Frontend API Configuration

Update the frontend to use the production API URL:

1. In `client/src/App.jsx`, find all `axios.get('/api/...')` calls
2. Replace them with `axios.get('${process.env.REACT_APP_API_URL}/api/...')`
3. Or create a base URL configuration

## Step 5: Database Seeding

After deployment, you need to seed your production database:

1. SSH into your Railway backend or use Railway's console
2. Run: `node seedData.js`
3. This will populate your database with sample products

## Step 6: Testing

1. Visit your Vercel frontend URL
2. Test all functionality:
   - Browse products
   - Filter by categories
   - Add items to cart
   - View product details
   - Test Meesho Express section

## Environment Variables Summary

### Backend (Railway)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/meesho-clone?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.railway.app
```

## Troubleshooting

1. **CORS Issues**: Make sure your backend CORS is configured to allow your frontend domain
2. **API Calls Failing**: Check that `REACT_APP_API_URL` is correctly set
3. **Database Connection**: Verify your MongoDB Atlas connection string and IP whitelist
4. **Build Failures**: Check that all dependencies are in package.json

## Cost

- **MongoDB Atlas**: Free tier (512MB storage)
- **Vercel**: Free tier (unlimited static sites)
- **Railway**: Free tier (500 hours/month)

Total cost: **$0/month** for small to medium usage!

## Next Steps

1. Set up custom domain (optional)
2. Configure SSL certificates (handled automatically)
3. Set up monitoring and logging
4. Implement user authentication
5. Add payment processing
6. Scale as needed

## Support

If you encounter any issues:
1. Check the deployment logs in Railway/Vercel
2. Verify environment variables are set correctly
3. Test API endpoints directly using tools like Postman
4. Check MongoDB Atlas connection and database status
