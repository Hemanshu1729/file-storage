# Deploying Drive App to Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Cloud database setup
3. **Cloudinary**: Cloud file storage setup
4. **GitHub Repository**: Your code should be in a Git repository

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions

## Step 2: Set up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/drive
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
6. Deploy!

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables when prompted

## Step 4: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions



## Important Notes

1. **File Uploads**: Vercel has a 4.5MB payload limit. For larger files, consider using direct Cloudinary uploads from the frontend.

2. **Database**: MongoDB Atlas free tier includes 512MB storage and shared clusters.

3. **Environment Variables**: Never commit sensitive information to your repository. Always use environment variables.

4. **CORS**: If you're calling the API from a different domain, you may need to configure CORS.

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check your connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify database user credentials

2. **File Upload Fails**
   - Check Cloudinary credentials
   - Verify file size limits
   - Check network connectivity

3. **JWT Authentication Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify cookie settings

### Getting Help:

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Atlas Documentation: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- Cloudinary Documentation: [cloudinary.com/documentation](https://cloudinary.com/documentation)

## Post-Deployment

1. Test user registration and login
2. Test file upload functionality
3. Monitor application logs in Vercel dashboard
4. Set up monitoring and alerts if needed
