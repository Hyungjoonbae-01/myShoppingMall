# JJOA Shopping Mall 🛍️

<div align="center">
  <img src="FE/public/JJOA.png" alt="JJOA Shopping Mall Logo" width="200" height="200">
  <h1>🛍️ JJOA Shopping Mall 🛍️</h1>
  <p><strong>Your Ultimate Shopping Destination</strong></p>
</div>

---

A full-stack e-commerce platform built with React (Frontend) and Node.js/Express (Backend), featuring product management, user authentication, shopping cart, and order processing. 🚀✨

## 🎯 Features

### 🎨 Frontend Features

- **📱 Responsive Design**: Mobile-first approach with Bootstrap styling
- **🛒 Product Catalog**: Browse products by category with pagination
- **🔍 Advanced Filtering**: Search by name, filter by category, and gender
- **🛍️ Shopping Cart**: Add/remove items with real-time updates
- **🔐 User Authentication**: Login/register with role-based access + Google OAuth
- **📦 Order Management**: Track order status and history
- **👨‍💼 Admin Panel**: Product and order management for administrators
- **⚡ Real-time Updates**: Live cart updates and notifications

### ⚙️ Backend Features

- **🌐 RESTful API**: Clean, organized API endpoints
- **🔒 User Authentication**: JWT-based authentication system + Google OAuth integration
- **📊 Product Management**: CRUD operations for products
- **🚚 Order Processing**: Complete order lifecycle management
- **🛒 Shopping Cart**: Persistent cart functionality
- **🗄️ Database Integration**: MongoDB with Mongoose ODM
- **✅ Input Validation**: Request validation and error handling

## 🛠️ Tech Stack

### 🎨 Frontend

- **⚛️ React 18** - Modern React with hooks
- **📦 Redux Toolkit** - State management
- **🛣️ React Router** - Client-side routing
- **🎨 Bootstrap 5** - Responsive UI components
- **✨ FontAwesome** - Icon library
- **📡 Axios** - HTTP client for API calls

### ⚙️ Backend

- **🟢 Node.js** - JavaScript runtime
- **🚀 Express.js** - Web application framework
- **🍃 MongoDB** - NoSQL database
- **🐘 Mongoose** - MongoDB object modeling
- **🔑 JWT** - JSON Web Token authentication
- **🔐 Bcrypt** - Password hashing

## 📁 Project Structure

```
🏪 noona-shopping-mall/
├── 🖥️ BE/                          # Backend
│   ├── 🎮 controller/             # Business logic
│   │   ├── 🔐 auth.controller.js  # Authentication logic
│   │   ├── 🛒 cart.controller.js  # Shopping cart logic
│   │   ├── 📦 order.controller.js # Order processing
│   │   ├── 🎁 product.controller.js # Product management
│   │   └── 👤 user.controller.js  # User management
│   ├── 🗄️ model/                  # Database models
│   │   ├── 🛒 Cart.js            # Cart schema
│   │   ├── 📦 Order.js           # Order schema
│   │   ├── 🎁 Product.js         # Product schema
│   │   └── 👤 User.js            # User schema
│   ├── 🛣️ routes/                 # API routes
│   │   ├── 🔐 auth.api.js        # Auth endpoints
│   │   ├── 🛒 cart.api.js        # Cart endpoints
│   │   ├── 📦 order.api.js       # Order endpoints
│   │   ├── 🎁 product.api.js     # Product endpoints
│   │   └── 👤 user.api.js        # User endpoints
│   ├── 🛠️ utils/                  # Utility functions
│   ├── 🚀 app.js                  # Express app configuration
│   └── 📋 package.json            # Backend dependencies
├── 🎨 FE/                         # Frontend
│   ├── src/
│   │   ├── 🔧 common/            # Shared components
│   │   │   ├── 🧩 component/     # Reusable components
│   │   │   └── 🎨 style/         # Global styles
│   │   ├── 📋 constants/         # App constants
│   │   ├── 📦 features/          # Redux slices
│   │   ├── 📄 page/              # Page components
│   │   │   ├── 👨‍💼 AdminProductPage/    # Admin product management
│   │   │   ├── 🛒 CartPage/            # Shopping cart
│   │   │   ├── 🏠 LandingPage/         # Homepage with products
│   │   │   ├── 🔐 LoginPage/           # User authentication
│   │   │   ├── ✅ OrderCompletePage/   # Order confirmation
│   │   │   ├── 💳 PaymentPage/         # Checkout process
│   │   │   ├── 🎁 ProductDetailPage/   # Individual product view
│   │   │   └── 📝 RegisterPage/        # User registration
│   │   ├── 🛣️ routes/            # Routing configuration
│   │   └── 🛠️ utils/             # Frontend utilities
│   └── 📋 package.json           # Frontend dependencies
└── 📖 README.md                  # This file
```

## 🚀 Getting Started

### 📋 Prerequisites

- 🟢 Node.js (v16 or higher)
- 🍃 MongoDB (v5 or higher)
- 📦 npm or yarn package manager

### ⚙️ Backend Setup

1. **📍 Navigate to backend directory**

   ```bash
   cd BE
   ```

2. **📦 Install dependencies**

   ```bash
   npm install
   ```

3. **🔧 Required Dependencies**

   The following packages will be installed automatically when you run `npm install`:

   **📦 Core Dependencies:**

   ```bash
   npm install express mongoose cors dotenv bcryptjs jsonwebtoken google-auth-library
   ```

   **🛠️ Development Dependencies:**

   ```bash
   npm install --save-dev nodemon
   ```

   **📋 Package Details:**

   - **🚀 express**: Web application framework for Node.js
   - **🐘 mongoose**: MongoDB object modeling for Node.js
   - **🌐 cors**: Cross-Origin Resource Sharing middleware
   - **🔧 dotenv**: Load environment variables from .env file
   - **🔐 bcryptjs**: Password hashing library
   - **🔑 jsonwebtoken**: JWT implementation for authentication
   - **🔓 google-auth-library**: Google OAuth 2.0 authentication
   - **🔄 nodemon**: Auto-restart server during development

4. **📋 Complete package.json Dependencies**

   Your `package.json` dependencies should look like this:

   ```json
   {
     "dependencies": {
       "express": "^4.18.2",
       "mongoose": "^7.5.0",
       "cors": "^2.8.5",
       "dotenv": "^16.3.1",
       "bcryptjs": "^2.4.3",
       "jsonwebtoken": "^9.0.2",
       "google-auth-library": "^9.0.0"
     },
     "devDependencies": {
       "nodemon": "^3.0.1"
     }
   }
   ```

5. **🔄 Alternative Installation Methods**

   **Using Yarn:**

   ```bash
   yarn add express mongoose cors dotenv bcryptjs jsonwebtoken google-auth-library
   yarn add --dev nodemon
   ```

   **Using pnpm:**

   ```bash
   pnpm add express mongoose cors dotenv bcryptjs jsonwebtoken google-auth-library
   pnpm add -D nodemon
   ```

6. **⚙️ Environment Configuration**
   Create a `.env` file in the BE directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/JJOA-shopping-mall
   JWT_SECRET=your-secret-key-here
   PORT=5000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

7. **🚀 Start the server**
   ```bash
   npm start
   ```

### 🎨 Frontend Setup

1. **📍 Navigate to frontend directory**

   ```bash
   cd FE
   ```

2. **📦 Install dependencies**

   ```bash
   npm install
   ```

3. **🚀 Start the development server**

   ```bash
   npm start
   ```

4. **🌐 Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 API Endpoints

### 🔐 Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### 🎁 Products

- `GET /product` - Get all products (with pagination & filtering)
- `POST /product` - Create new product (admin only)
- `PUT /product/:id` - Update product (admin only)
- `DELETE /product/:id` - Delete product (admin only)
- `GET /product/:id` - Get product by ID

### 🛒 Cart

- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove item from cart

### 📦 Orders

- `GET /order` - Get user's orders
- `POST /order` - Create new order
- `PUT /order/:id` - Update order status (admin only)

## 👥 User Roles

### 🛍️ Customer

- 🏪 Browse products
- 🔍 Search and filter products
- 🛒 Add items to cart
- 📦 Place orders
- 📋 View order history

### 👨‍💼 Admin

- ✅ All customer permissions
- 🎁 Manage products (CRUD)
- 📊 View and manage all orders
- 🔄 Update order statuses

## 🎨 Key Features Explained

### 🔍 Product Filtering

- **🏷️ Category-based filtering**: Top, Outwear, Pants, Accessories, Shoes, Beauty, Bags, Underwear
- **👥 Gender filtering**: Men, Women, Kids
- **🔎 Text search**: Search within selected categories
- **📄 Pagination**: Navigate through large product catalogs

### 🛒 Shopping Cart

- **💾 Persistent storage**: Cart items saved to database
- **⚡ Real-time updates**: Live cart count in navigation
- **🔢 Quantity management**: Adjust item quantities
- **💰 Price calculation**: Automatic total calculation

### 📦 Order Processing

- **🔄 Complete workflow**: Cart → Checkout → Payment → Confirmation
- **📊 Status tracking**: Order status updates throughout process
- **📋 Order history**: View past orders and their statuses

## 🔒 Security Features

- **🔑 JWT Authentication**: Secure token-based authentication
- **🔐 Password Hashing**: Bcrypt encryption for user passwords
- **👥 Role-based Access**: Different permissions for customers and admins
- **✅ Input Validation**: Server-side validation for all inputs
- **🛡️ Protected Routes**: Admin-only endpoints properly secured

## 📱 Responsive Design

- **📱 Mobile-first approach**: Optimized for mobile devices
- **🎨 Bootstrap 5**: Modern, responsive UI components
- **📐 Flexible layouts**: Adapts to different screen sizes
- **👆 Touch-friendly**: Optimized for touch interactions

## 🚀 Deployment

### ⚙️ Backend Deployment

- **🚀 Heroku**: Easy deployment with Procfile
- **⚙️ Environment Variables**: Configure production settings
- **🗄️ Database**: Use MongoDB Atlas for production

### 🎨 Frontend Deployment

- **🌐 Netlify**: Simple static site deployment
- **🏗️ Build Process**: Optimized production build
- **⚙️ Environment Configuration**: Set production API endpoints

## 🐛 Troubleshooting

### ❗ Common Issues

1. **🗄️ MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check connection string in `.env` file

2. **🔑 JWT Token Issues**

   - Verify JWT_SECRET is set
   - Check token expiration

3. **🌐 CORS Errors**

   - Ensure backend CORS configuration matches frontend URL
   - Check for typos in API endpoint URLs

4. **🖼️ Product Images Not Loading**

   - Verify Cloudinary configuration
   - Check image URL format in database

5. **🔓 Google OAuth Issues**
   - Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
   - Check Google Cloud Console configuration
   - Ensure redirect URIs are properly configured

## 🙏 Acknowledgments

- 🎨 Bootstrap for responsive UI components
- ✨ FontAwesome for beautiful icons
- 🍃 MongoDB and Mongoose for database management
- ⚛️ React community for excellent documentation and tools
- 🔓 Google for OAuth 2.0 authentication services

---

<div align="center">
  <h2>🛒 Happy Shopping! ✨</h2>
  <p><em>Your one-stop destination for all your shopping needs! 🎉</em></p>
</div>
