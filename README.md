# Bhutan Travel Website Clone

A modern travel website for Bhutan tours built with Next.js, MongoDB, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Tour Management**: Full CRUD operations for tours
- **Content Management**: Admin panel for managing home page content
- **Image Upload**: Cloudinary integration for image management
- **Secure Authentication**: JWT-based admin authentication
- **Database**: MongoDB with Mongoose ODM

## Setup

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bhutan-travel-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key_here
```

4. Set up the database:
```bash
# Create admin user
node scripts/create-admin.js

# Seed tours (optional)
node scripts/seed-tours.js
```

5. Run the development server:
```bash
npm run dev
```

## Authentication

The admin panel uses JWT (JSON Web Tokens) for secure authentication:

- **Login**: `/admin` - Email and password authentication
- **Token Storage**: JWT tokens are stored in localStorage
- **Token Expiry**: Tokens expire after 24 hours
- **Protected Routes**: All admin API routes require valid JWT tokens

### Admin Credentials

Default admin credentials (created by the setup script):
- **Email**: `admin@holidaykosh.com`
- **Password**: `admin123`

**Important**: Change the default password after first login for security.

## API Routes

### Admin Routes (Protected)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/verify` - Verify JWT token
- `POST /api/admin/password` - Change admin password
- `GET /api/admin/password` - Get admin email

### Tour Routes
- `GET /api/tours` - Get all tours
- `POST /api/tours` - Create new tour
- `GET /api/tours/[slug]` - Get tour by slug
- `PUT /api/tours/[slug]` - Update tour
- `DELETE /api/tours/[slug]` - Delete tour

### Content Routes
- `GET /api/content` - Get home page content
- `PUT /api/content` - Update home page content

### Upload Routes
- `POST /api/upload` - Upload images to Cloudinary

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/            # API routes
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   ├── models/        # MongoDB models
│   └── tours/         # Tour pages
├── public/            # Static assets
└── scripts/          # Database setup scripts
```

## Technologies Used

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Icons**: Heroicons

## Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for production use
- **Environment Variables**: Sensitive data stored in environment variables

## Deployment

The application can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

Make sure to:
1. Set up environment variables in your hosting platform
2. Configure MongoDB connection for production
3. Set up Cloudinary for image uploads
4. Use a strong JWT secret in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
