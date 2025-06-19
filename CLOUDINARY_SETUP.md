# Cloudinary Setup Guide

## 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your Credentials

After signing up, you'll find your credentials in your Cloudinary Dashboard:

1. Go to your Dashboard
2. Look for the "Account Details" section
3. Copy the following values:
   - Cloud Name
   - API Key
   - API Secret

## 3. Add to Environment Variables

Create a `.env.local` file in your project root and add:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 4. Features

The Cloudinary integration provides:

- **Drag & Drop Upload**: Simply drag images into the upload area
- **Click to Upload**: Click to select files from your computer
- **Image Optimization**: Automatic resizing and compression
- **Secure URLs**: HTTPS URLs for all uploaded images
- **Folder Organization**: Images are stored in a "bhutan-tours" folder
- **Manual URL Entry**: You can still paste image URLs manually

## 5. Usage

1. Go to Admin Panel → Create/Edit Tour
2. Use the image upload area to:
   - Drag and drop images
   - Click to browse files
   - Paste image URLs manually
3. Images are automatically uploaded to Cloudinary
4. The optimized URL is saved with your tour

## 6. Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- 25,000 transformations per month

This should be more than enough for a travel website! 