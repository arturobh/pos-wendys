# POS Wendy's - Backend API Reference

## Table of Contents
1. [Server Configuration](#server-configuration)
2. [Database Models](#database-models)
3. [API Routes](#api-routes)
4. [Controllers](#controllers)
5. [Error Handling](#error-handling)
6. [Database Configuration](#database-configuration)

## Server Configuration

### Server Class (`backend/controllers/server.js`)

The main server class that initializes the Express application and configures middleware.

**Constructor:**
```javascript
constructor() {
  this.app = express();
  this.port = process.env.PORT;
  this.cors;
  this.middlewares();
  this.routes();
}
```

**Key Methods:**

#### `middlewares()`
Configures Express middleware:
- CORS enabled for cross-origin requests
- JSON body parsing
- Static file serving from `public` directory

```javascript
middlewares() {
  // CORS
  this.app.use(cors());
  // Body parser
  this.app.use(express.json());
  // Public folder
  this.app.use(express.static('public'));
}
```

#### `routes()`
Registers API routes:
```javascript
routes() {
  this.app.use('/api/categories', require('../routes/category'));
  this.app.use('/api/products', require('../routes/product'));
  this.app.use('/api/ingredients', require('../routes/ingredient'));
}
```

#### `connectDB()`
Establishes MongoDB connection:
```javascript
async connectDB() {
  await dbConnection();
}
```

#### `initialize()`
Starts the server:
```javascript
initialize() {
  this.app.listen(this.port, () => {
    console.log(`Server listening on port ${this.port}`);
  });
}
```

## Database Models

### Product Model (`backend/models/product.js`)

**Schema Definition:**
```javascript
const productSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    _id: false
  }, {
    validate: {
      validator: function (v) { 
        return v && v.length > 0; 
      }
    },
    required: true,
  }]
});
```

**Example Document:**
```javascript
{
  "_id": ObjectId("..."),
  "type": "burger",
  "name": "Dave's Single",
  "price": 5000,
  "description": "Fresh beef patty with cheese",
  "size": "single",
  "ingredients": [
    {
      "name": "beef",
      "quantity": 1,
      "unit": "patty"
    },
    {
      "name": "cheese",
      "quantity": 1,
      "unit": "slice"
    }
  ]
}
```

### Category Model (`backend/models/category.js`)

**Schema Definition:**
```javascript
const categorySchema = new Schema({
  _id: mongoose.ObjectId,
  categoryName: {
    type: String,
    required: true
  },
  products: [{
    id: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    _id: false
  }, {
    validate: {
      validator: function (v) { 
        return v && v.length > 0; 
      }
    },
    required: true,
  }]
});
```

**Example Document:**
```javascript
{
  "_id": ObjectId("..."),
  "categoryName": "burgers",
  "products": [
    {
      "id": "product_id_1",
      "productName": "Dave's Single"
    },
    {
      "id": "product_id_2",
      "productName": "Dave's Double"
    }
  ]
}
```

### Ingredient Model (`backend/models/ingredient.js`)

**Schema Definition:**
```javascript
const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  isExtra: {
    type: Boolean,
    required: true
  }
});
```

**Example Document:**
```javascript
{
  "_id": ObjectId("..."),
  "name": "cheese",
  "unit": "slice",
  "imagePath": "/imgs/menu/ingredients/cheese.jpg",
  "isExtra": true
}
```

## API Routes

### Categories Routes (`backend/routes/category.js`)

#### GET /api/categories
Retrieves all categories.

**Route Handler:** `categoryGetAll`

**Response:**
```json
[
  {
    "_id": "category_id",
    "categoryName": "burgers",
    "imagePath": "/imgs/menu/burgers/burger_category.jpg",
    "products": [
      {
        "id": "product_id",
        "productName": "Dave's Single"
      }
    ]
  }
]
```

#### GET /api/categories/:id
Retrieves a specific category by ID.

**Route Handler:** `categoryGetOne`

**Parameters:**
- `id` (string): Category ID

**Response:**
```json
{
  "category": {
    "_id": "category_id",
    "categoryName": "burgers",
    "imagePath": "/imgs/menu/burgers/burger_category.jpg"
  }
}
```

#### POST /api/categories
Creates a new category.

**Route Handler:** `categoryPost`

**Request Body:**
```json
{
  "categoryName": "new_category",
  "products": [
    {
      "id": "product_id",
      "productName": "Product Name"
    }
  ]
}
```

**Response:**
```json
{
  "msg": "saved_category_object"
}
```

### Products Routes (`backend/routes/product.js`)

#### GET /api/products/byCategory/:categoryName
Retrieves all products in a specific category.

**Route Handler:** `productsGetByCategory`

**Parameters:**
- `categoryName` (string): Name of the category

**Response:**
```json
[
  {
    "_id": "product_id",
    "type": "burger",
    "name": "Dave's Single",
    "price": 5000,
    "description": "Fresh beef patty with cheese",
    "size": "single",
    "ingredients": [
      {
        "name": "beef",
        "quantity": 1,
        "unit": "patty"
      }
    ]
  }
]
```

#### GET /api/products/:id
Retrieves a specific product by ID.

**Route Handler:** `productGetOne`

**Parameters:**
- `id` (string): Product ID

**Response:**
```json
{
  "_id": "product_id",
  "type": "burger",
  "name": "Dave's Single",
  "price": 5000,
  "description": "Fresh beef patty with cheese",
  "size": "single",
  "ingredients": [
    {
      "name": "beef",
      "quantity": 1,
      "unit": "patty"
    }
  ]
}
```

#### POST /api/products/:id
Creates a new product (Note: This endpoint has a bug in the current implementation).

**Route Handler:** `productPost`

**Parameters:**
- `id` (string): Product ID

**Request Body:**
```json
{
  "categoryName": "burgers",
  "products": [
    {
      "id": "product_id",
      "productName": "Product Name"
    }
  ]
}
```

### Ingredients Routes (`backend/routes/ingredient.js`)

#### GET /api/ingredients
Retrieves all extra ingredients.

**Route Handler:** `ingredientsGetExtra`

**Response:**
```json
[
  {
    "_id": "ingredient_id",
    "name": "cheese",
    "unit": "slice",
    "imagePath": "/imgs/menu/ingredients/cheese.jpg",
    "isExtra": true
  }
]
```

#### GET /api/ingredients/:id
Retrieves a specific ingredient by ID.

**Route Handler:** `ingredientGetOne`

**Parameters:**
- `id` (string): Ingredient ID

**Response:**
```json
{
  "_id": "ingredient_id",
  "name": "cheese",
  "unit": "slice",
  "imagePath": "/imgs/menu/ingredients/cheese.jpg",
  "isExtra": true
}
```

#### POST /api/ingredients/:id
Creates a new ingredient.

**Route Handler:** `ingredientPost`

**Parameters:**
- `id` (string): Ingredient ID

**Request Body:**
```json
{
  "name": "bacon",
  "unit": "slice",
  "imagePath": "/imgs/menu/ingredients/bacon.jpg",
  "isExtra": true
}
```

**Response:**
```json
{
  "msg": "saved_ingredient_object"
}
```

## Controllers

### Category Controller (`backend/controllers/category.js`)

#### `categoryGetAll(req, res)`
Retrieves all categories from the database.

```javascript
const categoryGetAll = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};
```

#### `categoryGetOne(req, res)`
Retrieves a specific category by ID.

```javascript
const categoryGetOne = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  res.status(200).json({
    category
  });
};
```

#### `categoryPost(req, res)`
Creates a new category.

```javascript
const categoryPost = async (req, res) => {
  const { categoryName, products } = req.body;
  const category = new Category({
    categoryName, products
  });

  const respon = await category.save();

  res.status(200).json({
    msg: respon
  });
};
```

### Product Controller (`backend/controllers/products.js`)

#### `productsGetByCategory(req, res)`
Retrieves all products in a specific category.

```javascript
const productsGetByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const products = await Product.find({ 'type': categoryName });
  res.status(200).json(products);
};
```

#### `productGetOne(req, res)`
Retrieves a specific product by ID.

```javascript
const productGetOne = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
};
```

#### `productPost(req, res)`
Creates a new product (Note: This function has a bug - it creates a Category instead of a Product).

```javascript
const productPost = async (req, res) => {
  const { categoryName, products } = req.body;
  const category = new Category({  // BUG: Should be Product
    categoryName, products
  });

  const respon = await category.save();

  res.status(200).json({
    msg: respon
  });
};
```

### Ingredient Controller (`backend/controllers/ingredient.js`)

#### `ingredientsGetExtra(req, res)`
Retrieves all extra ingredients.

```javascript
const ingredientsGetExtra = async (req, res) => {
  const ingredients = await Ingredient.find({ 'isExtra': true });
  res.status(200).json(ingredients);
};
```

#### `ingredientGetOne(req, res)`
Retrieves a specific ingredient by ID.

```javascript
const ingredientGetOne = async (req, res) => {
  const { id } = req.params;
  const ingredient = await Ingredient.findById(id);
  res.status(200).json(ingredient);
};
```

#### `ingredientPost(req, res)`
Creates a new ingredient.

```javascript
const ingredientPost = async (req, res) => {
  const { name, unit, imagePath, isExtra } = req.body;
  const ingredient = new Ingredient({
    name, unit, imagePath, isExtra
  });

  const respon = await ingredient.save();

  res.status(200).json({
    msg: respon
  });
};
```

## Error Handling

### Current Error Handling
The current implementation has minimal error handling. Most controllers don't include try-catch blocks, which means errors will be passed to Express's default error handler.

### Recommended Error Handling Pattern
```javascript
const controllerFunction = async (req, res) => {
  try {
    // Controller logic here
    const result = await Model.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
```

### Common Error Scenarios
1. **Database Connection Errors**: MongoDB connection failures
2. **Validation Errors**: Mongoose schema validation failures
3. **Not Found Errors**: Invalid IDs or missing documents
4. **Duplicate Key Errors**: Unique constraint violations

## Database Configuration

### Database Config (`backend/database/config.js`)

The database configuration file should contain:

```javascript
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pos-wendys', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  dbConnection
};
```

### Environment Variables
Required environment variables:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/pos-wendys
```

### Database Indexes
Recommended indexes for better performance:

```javascript
// Product model indexes
productSchema.index({ type: 1 });
productSchema.index({ name: 1 });

// Category model indexes
categorySchema.index({ categoryName: 1 });

// Ingredient model indexes
ingredientSchema.index({ isExtra: 1 });
ingredientSchema.index({ name: 1 });
```

## API Testing Examples

### Using cURL

#### Get All Categories
```bash
curl -X GET http://localhost:3001/api/categories
```

#### Get Products by Category
```bash
curl -X GET http://localhost:3001/api/products/byCategory/burgers
```

#### Get Single Product
```bash
curl -X GET http://localhost:3001/api/products/product_id_here
```

#### Create New Category
```bash
curl -X POST http://localhost:3001/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "desserts",
    "products": [
      {
        "id": "frosty_id",
        "productName": "Chocolate Frosty"
      }
    ]
  }'
```

### Using JavaScript/Fetch

#### Get All Categories
```javascript
const response = await fetch('http://localhost:3001/api/categories');
const categories = await response.json();
console.log(categories);
```

#### Get Products by Category
```javascript
const response = await fetch('http://localhost:3001/api/products/byCategory/burgers');
const products = await response.json();
console.log(products);
```

#### Create New Ingredient
```javascript
const response = await fetch('http://localhost:3001/api/ingredients/new_id', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'bacon',
    unit: 'slice',
    imagePath: '/imgs/menu/ingredients/bacon.jpg',
    isExtra: true
  })
});

const result = await response.json();
console.log(result);
```

## Known Issues and Recommendations

### Current Issues
1. **Product POST endpoint bug**: Creates Category instead of Product
2. **Missing error handling**: No try-catch blocks in controllers
3. **No input validation**: Missing request body validation
4. **No authentication**: No security measures implemented
5. **No rate limiting**: No protection against abuse

### Recommended Improvements
1. **Add proper error handling** to all controllers
2. **Implement input validation** using libraries like Joi or express-validator
3. **Add authentication middleware** for protected routes
4. **Implement rate limiting** to prevent abuse
5. **Add API documentation** using Swagger/OpenAPI
6. **Add logging** for better debugging and monitoring
7. **Implement proper CORS configuration** for production
8. **Add database connection pooling** for better performance

This backend API reference provides comprehensive documentation for all backend components, including server configuration, database models, API routes, controllers, and recommendations for improvements.
