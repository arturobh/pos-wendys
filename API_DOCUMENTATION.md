# POS Wendy's - API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Backend API Endpoints](#backend-api-endpoints)
3. [Frontend Services](#frontend-services)
4. [React Components](#react-components)
5. [Data Models](#data-models)
6. [Usage Examples](#usage-examples)

## Overview

The POS Wendy's system is a full-stack application built with:
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Frontend**: React.js with Bootstrap
- **Database**: MongoDB

The system provides a complete point-of-sale solution for Wendy's restaurants, including menu management, order processing, and payment handling.

## Backend API Endpoints

### Base URL
```
http://localhost:3001
```

### Categories API

#### GET /api/categories
Retrieves all available categories.

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

### Products API

#### GET /api/products/byCategory/:categoryName
Retrieves all products in a specific category.

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
    "imagePath": "/imgs/menu/burgers/daves_single.jpg",
    "options": [
      {
        "size": "1",
        "price": 5000,
        "imagePath": "/imgs/menu/burgers/daves_single.jpg"
      }
    ],
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
  "imagePath": "/imgs/menu/burgers/daves_single.jpg",
  "options": [
    {
      "size": "1",
      "price": 5000,
      "imagePath": "/imgs/menu/burgers/daves_single.jpg"
    }
  ],
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

### Ingredients API

#### GET /api/ingredients
Retrieves all extra ingredients.

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

**Request Body:**
```json
{
  "name": "bacon",
  "unit": "slice",
  "imagePath": "/imgs/menu/ingredients/bacon.jpg",
  "isExtra": true
}
```

## Frontend Services

### Product Services (`src/services/productServices.js`)

#### `getProducts(categoryName)`
Fetches all products for a specific category.

**Parameters:**
- `categoryName` (string): Name of the category

**Returns:** Promise<Array>
```javascript
import { getProducts } from './services/productServices';

const products = await getProducts('burgers');
console.log(products); // Array of product objects
```

#### `getOneProduct(id)`
Fetches a single product by ID.

**Parameters:**
- `id` (string): Product ID

**Returns:** Promise<Object>
```javascript
import { getOneProduct } from './services/productServices';

const product = await getOneProduct('product_id');
console.log(product); // Product object
```

### Category Services (`src/services/categoryServices.js`)

#### `getCategory(id)`
Fetches a specific category by ID.

**Parameters:**
- `id` (string): Category ID

**Returns:** Promise<Object>
```javascript
import { getCategory } from './services/categoryServices';

const category = await getCategory('category_id');
console.log(category); // Category object
```

### Ingredient Services (`src/services/ingredientServices.js`)

#### `getExtraIngredients()`
Fetches all extra ingredients.

**Returns:** Promise<Array>
```javascript
import { getExtraIngredients } from './services/ingredientServices';

const ingredients = await getExtraIngredients();
console.log(ingredients); // Array of ingredient objects
```

#### `getOneIngredient(id)`
Fetches a specific ingredient by ID.

**Parameters:**
- `id` (string): Ingredient ID

**Returns:** Promise<Object>
```javascript
import { getOneIngredient } from './services/ingredientServices';

const ingredient = await getOneIngredient('ingredient_id');
console.log(ingredient); // Ingredient object
```

## React Components

### Main App Component (`src/App.js`)

The main application component that manages the overall state and coordinates between different parts of the POS system.

**Key State Variables:**
- `categories`: Array of available categories
- `selectedCategory`: Currently selected category
- `categoryProducts`: Products in the selected category
- `orderItems`: Items in the current order
- `clientName`: Name of the current client
- `orderNumber`: Current order number
- `totalPrice`: Total price of the order

**Key Functions:**
- `onClick(id)`: Handles category selection
- `sendItemToOrder(item)`: Adds item to the order
- `editFunction(id)`: Opens edit modal for an order item
- `removeFunction(id)`: Removes item from order
- `advanceOrder()`: Increments order number

### Header Component (`src/components/Header.jsx`)

Displays the application header with client name and order number.

**Props:**
- `client` (string): Client name
- `orderNumber` (string): Current order number (default: 'XX')
- `orderButton` (function): Function to advance order number

**Usage:**
```jsx
<Header
  client="John Doe"
  orderNumber="01"
  orderButton={advanceOrder}
/>
```

### Category Component (`src/components/Category.jsx`)

Displays a category card with image and name.

**Props:**
- `id` (string): Category ID
- `name` (string): Category name
- `image` (string): Image URL
- `handleClick` (function): Click handler function

**Usage:**
```jsx
<Category
  id="category_id"
  name="burgers"
  image="http://localhost:3001/imgs/menu/burgers/burger_category.jpg"
  handleClick={onClick}
/>
```

### Products Component (`src/components/Products.jsx`)

Displays a grid of products for the selected category.

**Props:**
- `products` (array): Array of product objects
- `addToOrder` (function): Function to add product to order

**Usage:**
```jsx
<Products
  products={categoryProducts}
  addToOrder={sendItemToOrder}
/>
```

### ProductModal Component (`src/components/ProductModal.jsx`)

Modal for customizing and adding products to the order.

**Props:**
- `productData` (object): Product data object
- `show` (boolean): Modal visibility
- `addToOrder` (function): Function to add customized product to order
- `onHide` (function): Function to close modal

**Product Data Structure:**
```javascript
const productData = {
  _id: "product_id",
  type: "burger",
  name: "Dave's Single",
  price: 5000,
  description: "Fresh beef patty with cheese",
  imagePath: "/imgs/menu/burgers/daves_single.jpg",
  options: [
    {
      size: "1",
      price: 5000,
      imagePath: "/imgs/menu/burgers/daves_single.jpg"
    }
  ],
  ingredients: [
    {
      name: "beef",
      quantity: 1,
      unit: "patty"
    }
  ]
};
```

**Usage:**
```jsx
<ProductModal
  productData={productData}
  show={productModalShow}
  addToOrder={sendItemToOrder}
  onHide={() => setProductModalShow(false)}
/>
```

### Order Component (`src/components/Order.jsx`)

Displays the current order items.

**Props:**
- `items` (array): Array of order items
- `functions` (object): Object containing edit and remove functions

**Functions Object:**
```javascript
const orderItemFunctions = {
  editFunction: (id) => { /* edit logic */ },
  removeFunction: (id) => { /* remove logic */ }
};
```

**Usage:**
```jsx
<Order
  items={orderItems}
  functions={orderItemFunctions}
/>
```

### OrderItem Component (`src/components/OrderItem.jsx`)

Displays individual order items with edit and remove functionality.

**Props:**
- `id` (number): Item index in the order
- `data` (object): Order item data
- `onDblClick` (function): Double-click handler for editing
- `removeBtn` (function): Remove button handler

**Order Item Data Structure:**
```javascript
const orderItem = {
  name: "dave's single",
  type: "burger",
  size: "1",
  price: 5000,
  isCombo: true,
  subTotal: 6000,
  combo: {
    drinkName: "coke",
    drinkSizeStandard: "2",
    drinkSizeSelected: "2",
    extraName: "medium",
    extraSizeStandard: "2",
    extraSizeSelected: "2"
  },
  extras: [
    { "cheese": 500 }
  ]
};
```

**Usage:**
```jsx
<OrderItem
  id={0}
  data={orderItem}
  onDblClick={editFunction}
  removeBtn={removeFunction}
/>
```

### OrderFooter Component (`src/components/OrderFooter.jsx`)

Displays order totals and payment button.

**Props:**
- `orderItems` (array): Array of order items
- `handlePay` (function): Payment handler function

**Usage:**
```jsx
<OrderFooter
  orderItems={orderItems}
  handlePay={() => setPaymentModalShow(true)}
/>
```

### ClientModal Component (`src/components/ClientModal.jsx`)

Modal for entering client name at the start of a new order.

**Props:**
- `show` (boolean): Modal visibility
- `onHide` (function): Function called when modal is closed with client name

**Usage:**
```jsx
<ClientModal
  show={clientModalShow}
  onHide={(name) => setClientName(name)}
/>
```

### EditModal Component (`src/components/EditModal.jsx`)

Modal for editing existing order items.

**Props:**
- `id` (number): Item index to edit
- `editData` (object): Current item data
- `show` (boolean): Modal visibility
- `editToOrder` (function): Function to save edited item
- `onHide` (function): Function to close modal

**Usage:**
```jsx
<EditModal
  id={editId}
  editData={editData}
  show={editModalShow}
  editToOrder={editToOrder}
  onHide={() => setEditModalShow(false)}
/>
```

### PaymentModal Component (`src/components/PaymentModal.jsx`)

Modal for displaying order summary and processing payment.

**Props:**
- `orderItems` (array): Array of order items
- `orderNumber` (string): Order number
- `clientName` (string): Client name
- `show` (boolean): Modal visibility
- `onHide` (function): Function to close modal

**Usage:**
```jsx
<PaymentModal
  orderItems={orderItems}
  orderNumber={orderNumber}
  clientName={clientName}
  show={paymentModalShow}
  onHide={() => setPaymentModalShow(false)}
/>
```

## Data Models

### Product Model (`backend/models/product.js`)

```javascript
{
  type: String,           // Product type (burger, chicken, drink, etc.)
  name: String,           // Product name
  price: Number,          // Base price
  description: String,    // Product description
  size: String,           // Default size
  ingredients: [          // Array of ingredients
    {
      name: String,       // Ingredient name
      quantity: Number,   // Quantity needed
      unit: String        // Unit of measurement
    }
  ]
}
```

### Category Model (`backend/models/category.js`)

```javascript
{
  _id: ObjectId,          // Category ID
  categoryName: String,   // Category name
  products: [             // Array of products in category
    {
      id: String,         // Product ID reference
      productName: String // Product name
    }
  ]
}
```

### Ingredient Model (`backend/models/ingredient.js`)

```javascript
{
  name: String,           // Ingredient name
  unit: String,           // Unit of measurement
  imagePath: String,      // Image path
  isExtra: Boolean        // Whether it's an extra ingredient
}
```

## Usage Examples

### Complete Order Flow Example

```javascript
// 1. Initialize the app
const [categories, setCategories] = useState([]);
const [orderItems, setOrderItems] = useState([]);
const [clientName, setClientName] = useState('');

// 2. Load categories
useEffect(() => {
  const loadCategories = async () => {
    const response = await axios.get('http://localhost:3001/api/categories');
    setCategories(response.data);
  };
  loadCategories();
}, []);

// 3. Select category and load products
const handleCategoryClick = async (categoryId) => {
  const category = await getCategory(categoryId);
  const products = await getProducts(category.categoryName);
  setCategoryProducts(products);
};

// 4. Add item to order
const addItemToOrder = (item) => {
  const itemWithSubtotal = calculateSubtotal(item);
  setOrderItems(prev => [...prev, itemWithSubtotal]);
};

// 5. Calculate subtotal
const calculateSubtotal = (item) => {
  let subtotal = item.price;
  
  if (item.isCombo) {
    subtotal += 1000; // Combo upcharge
  }
  
  if (item.extras.length > 0) {
    item.extras.forEach(extra => {
      subtotal += Object.values(extra)[0];
    });
  }
  
  return { ...item, subTotal: subtotal };
};

// 6. Process payment
const processPayment = () => {
  const total = orderItems.reduce((sum, item) => sum + item.subTotal, 0);
  console.log(`Processing payment for ${clientName}: $${total}`);
  // Payment processing logic here
};
```

### Customizing a Product Example

```javascript
// Product customization data structure
const customizedProduct = {
  name: "dave's single",
  type: "burger",
  size: "2", // Double
  price: 7000,
  isCombo: true,
  combo: {
    drinkName: "coke",
    drinkSizeStandard: "2",
    drinkSizeSelected: "2",
    extraName: "large",
    extraSizeStandard: "2",
    extraSizeSelected: "3"
  },
  extras: [
    { "cheese": 500 },
    { "bacon": 800 }
  ]
};

// Add to order
addItemToOrder(customizedProduct);
```

### Error Handling Example

```javascript
// Service function with error handling
export async function getProducts(categoryName) {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/products/byCategory/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on error
  }
}
```

This documentation provides a comprehensive overview of all public APIs, functions, and components in the POS Wendy's system. Each section includes detailed descriptions, parameter specifications, return values, and practical usage examples.
