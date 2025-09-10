# POS Wendy's - Point of Sale System

A comprehensive point-of-sale system built for Wendy's restaurants, featuring a modern React frontend and Node.js backend with MongoDB database.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

POS Wendy's is a full-featured point-of-sale system designed specifically for Wendy's restaurants. The system provides an intuitive interface for cashiers to manage orders, customize menu items, process payments, and track sales. Built with modern web technologies, it offers a responsive design that works seamlessly across different devices.

### Key Capabilities
- **Menu Management**: Browse categories and products with real-time updates
- **Order Customization**: Customize products with sizes, combos, and extra ingredients
- **Order Management**: Add, edit, and remove items from orders
- **Payment Processing**: Calculate totals with tax and process payments
- **Client Management**: Track orders by client name
- **Order Numbering**: Automatic order number generation and tracking

## ✨ Features

### Frontend Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live order updates and price calculations
- **Modal-based UI**: Intuitive product customization and order management
- **Toast Notifications**: User feedback for actions and errors
- **Bootstrap Styling**: Professional and consistent UI components

### Backend Features
- **RESTful API**: Clean and consistent API endpoints
- **MongoDB Integration**: Scalable document-based database
- **Static File Serving**: Efficient image and asset delivery
- **CORS Support**: Cross-origin request handling
- **Modular Architecture**: Organized controllers and routes

### Business Features
- **Multi-category Menu**: Burgers, chicken, drinks, sides, and desserts
- **Combo Meals**: Automatic combo pricing and customization
- **Extra Ingredients**: Add-ons with individual pricing
- **Tax Calculation**: Automatic IVA (19%) calculation
- **Order History**: Track orders by number and client

## 🛠 Technology Stack

### Frontend
- **React 18.2.0**: Modern UI library with hooks
- **Bootstrap 5.3.0**: CSS framework for responsive design
- **React Bootstrap 2.8.0**: React components for Bootstrap
- **Axios 1.4.0**: HTTP client for API communication

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js 4.18.2**: Web application framework
- **MongoDB**: NoSQL document database
- **Mongoose 7.4.0**: MongoDB object modeling
- **CORS 2.8.5**: Cross-origin resource sharing

### Development Tools
- **Nodemon**: Development server with auto-restart
- **React Scripts**: Build and development tools
- **Git**: Version control system

## 📁 Project Structure

```
pos-wendys/
├── backend/
│   ├── controllers/          # API route handlers
│   │   ├── category.js      # Category operations
│   │   ├── ingredient.js    # Ingredient operations
│   │   ├── products.js      # Product operations
│   │   └── server.js        # Server configuration
│   ├── database/
│   │   └── config.js        # Database connection
│   ├── models/              # MongoDB schemas
│   │   ├── category.js      # Category model
│   │   ├── ingredient.js    # Ingredient model
│   │   ├── product.js       # Product model
│   │   └── ...              # Other models
│   ├── routes/              # API routes
│   │   ├── category.js      # Category routes
│   │   ├── ingredient.js    # Ingredient routes
│   │   └── product.js       # Product routes
│   ├── public/              # Static files
│   │   └── imgs/           # Menu images
│   ├── app.js              # Application entry point
│   └── package.json        # Backend dependencies
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Category.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   └── ...
│   │   ├── services/       # API service functions
│   │   │   ├── categoryServices.js
│   │   │   ├── productServices.js
│   │   │   └── ingredientServices.js
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Application entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pos-wendys/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/pos-wendys
   ```

4. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## ⚙️ Configuration

### Backend Configuration

#### Environment Variables
```env
PORT=3001                    # Server port
MONGODB_URI=mongodb://localhost:27017/pos-wendys  # Database connection string
```

#### Database Configuration
The system uses MongoDB with the following collections:
- `categories`: Menu categories (burgers, chicken, drinks, etc.)
- `products`: Individual menu items
- `ingredients`: Extra ingredients and add-ons

### Frontend Configuration

#### API Endpoint Configuration
The frontend is configured to connect to the backend API at `http://localhost:3001`. This can be modified in the service files:

```javascript
// In src/services/*.js files
const backendURL = 'http://localhost:3001';
```

## 📖 Usage

### Starting the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

3. **Open the application**
   Navigate to http://localhost:3000 in your browser

### Basic Workflow

1. **Client Setup**: Enter client name when prompted
2. **Category Selection**: Click on a category to view products
3. **Product Customization**: Click on a product to customize size, combo options, and extras
4. **Order Management**: Review order items, edit or remove as needed
5. **Payment Processing**: Click "PAGAR" to view order summary and process payment

### Order Management

#### Adding Items
1. Select a category from the left panel
2. Click on a product to open customization modal
3. Choose size, combo options, and extra ingredients
4. Click "Añadir a la orden" to add to order

#### Editing Items
1. Double-click on an order item to open edit modal
2. Modify size, combo options, or extras
3. Click "Modificar" to save changes

#### Removing Items
1. Click the red "X" button next to any order item
2. Item will be immediately removed from the order

## 📚 API Documentation

For detailed API documentation, see:
- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [Backend API Reference](BACKEND_API_REFERENCE.md) - Backend-specific documentation

### Quick API Reference

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get specific category
- `POST /api/categories` - Create new category

#### Products
- `GET /api/products/byCategory/:categoryName` - Get products by category
- `GET /api/products/:id` - Get specific product
- `POST /api/products/:id` - Create new product

#### Ingredients
- `GET /api/ingredients` - Get all extra ingredients
- `GET /api/ingredients/:id` - Get specific ingredient
- `POST /api/ingredients/:id` - Create new ingredient

## 🧩 Component Documentation

For detailed component documentation, see:
- [Component Documentation](COMPONENT_DOCUMENTATION.md) - Complete component reference

### Key Components

#### Main Components
- **App**: Main application component with state management
- **Header**: Application header with client and order info
- **Category**: Category selection cards
- **Products**: Product grid display
- **Order**: Order management interface

#### Modal Components
- **ProductModal**: Product customization interface
- **EditModal**: Order item editing interface
- **ClientModal**: Client name input
- **PaymentModal**: Payment processing interface

## 🗄️ Database Schema

### Categories Collection
```javascript
{
  _id: ObjectId,
  categoryName: String,        // "burgers", "chicken", etc.
  imagePath: String,           // "/imgs/menu/burgers/category.jpg"
  products: [{
    id: String,                // Product reference ID
    productName: String        // Product name
  }]
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  type: String,                // "burger", "chicken", "drink", etc.
  name: String,                // "Dave's Single"
  price: Number,               // Base price
  description: String,         // Product description
  size: String,                // Default size
  ingredients: [{
    name: String,              // "beef", "cheese", etc.
    quantity: Number,          // Amount needed
    unit: String               // "patty", "slice", etc.
  }]
}
```

### Ingredients Collection
```javascript
{
  _id: ObjectId,
  name: String,                // "cheese", "bacon", etc.
  unit: String,                // "slice", "strip", etc.
  imagePath: String,           // "/imgs/menu/ingredients/cheese.jpg"
  isExtra: Boolean             // true for extra ingredients
}
```

## 🔧 Development

### Development Scripts

#### Backend
```bash
npm start          # Start development server with nodemon
npm test           # Run tests (not implemented)
```

#### Frontend
```bash
npm start          # Start development server
npm build          # Build for production
npm test           # Run tests
npm eject          # Eject from Create React App
```

### Code Structure

#### Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Models**: Define database schemas and validation
- **Routes**: Define API endpoints and middleware
- **Database**: Connection and configuration

#### Frontend Architecture
- **Components**: Reusable UI components
- **Services**: API communication functions
- **State Management**: React hooks for state
- **Styling**: Bootstrap and custom CSS

### Adding New Features

#### Adding a New Product Type
1. Update the product model if needed
2. Add new category to the database
3. Create product documents
4. Update frontend components if needed

#### Adding New API Endpoints
1. Create controller function
2. Add route definition
3. Update frontend services
4. Test the integration

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

#### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a web server
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure production MongoDB URI
- Set up proper CORS for production domain
- Configure static file serving

### Recommended Production Setup
- Use PM2 for process management
- Set up Nginx as reverse proxy
- Configure SSL certificates
- Set up MongoDB replica set
- Implement proper logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation files
- Review the API and component documentation

## 🔄 Version History

- **v1.0.0** - Initial release with basic POS functionality
- Core features: Menu browsing, order management, payment processing
- Technology stack: React, Node.js, MongoDB

---

**Note**: This is a demonstration project. For production use, additional security measures, error handling, and testing should be implemented.
