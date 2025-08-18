# Drive - File Upload and Storage System
 
A Node.js application for file upload, storage, and management with user authentication.

## Features

- User registration and login with JWT authentication
- File upload to Cloudinary cloud storage
- File management (view, delete)
- Secure file access (users can only see their own files)
- Modern responsive UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/drive
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

5. Start the application:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /user/register` - User registration
- `POST /user/login` - User login
- `GET /user/logout` - User logout

### File Management
- `POST /upload` - Upload a file (requires authentication)
- `GET /upload/files` - Get user's files (requires authentication)
- `DELETE /upload/:fileId` - Delete a file (requires authentication)

## Project Structure

```
Drive/
├── app.js                 # Main application file
├── config/               # Configuration files
│   ├── cloudinary.js     # Cloudinary configuration
│   ├── db.js            # Database connection
│   └── upload.js        # Upload configuration
├── controllers/          # Route controllers
│   └── uploadController.js
├── middleware/           # Custom middleware
│   ├── authMiddleware.js # Authentication middleware
│   └── uploadMiddleware.js # File upload middleware
├── models/              # Database models
│   ├── files.model.js   # File model
│   └── user.model.js    # User model
├── routes/              # Route definitions
│   ├── index.routes.js  # Main routes
│   ├── upload.routes.js # Upload routes
│   └── user.routes.js   # User routes
├── views/               # EJS templates
│   ├── home.ejs         # Home page
│   ├── index.ejs        # Index page
│   ├── login.ejs        # Login page
│   └── register.ejs     # Registration page
└── uploads/             # Temporary file storage
```

## Usage

1. Register a new account at `/user/register`
2. Login at `/user/login`
3. Access the home page at `/home` to upload and manage files
4. Files are automatically uploaded to Cloudinary and stored in MongoDB
5. Users can only see and manage their own files

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- File ownership verification
- Input validation and sanitization
- Secure file upload with type and size restrictions

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **File Upload**: Multer
- **Frontend**: EJS, Tailwind CSS
- **Validation**: express-validator
