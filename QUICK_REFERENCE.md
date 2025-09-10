# POS Wendy's - Quick Reference Guide

## 🚀 Quick Start

### Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📋 Common Tasks

### Adding a New Product
1. **Backend**: Add product to MongoDB
```javascript
// Example product document
{
  type: "burger",
  name: "New Burger",
  price: 6000,
  description: "Delicious new burger",
  size: "single",
  ingredients: [
    { name: "beef", quantity: 1, unit: "patty" }
  ]
}
```

2. **Frontend**: Product will automatically appear in the appropriate category

### Adding a New Category
1. **Backend**: Add category to MongoDB
```javascript
// Example category document
{
  categoryName: "desserts",
  imagePath: "/imgs/menu/desserts/category.jpg",
  products: [
    { id: "product_id", productName: "Product Name" }
  ]
}
```

2. **Frontend**: Category will appear in the category selection panel

### Adding Extra Ingredients
1. **Backend**: Add ingredient to MongoDB
```javascript
// Example ingredient document
{
  name: "bacon",
  unit: "strip",
  imagePath: "/imgs/menu/ingredients/bacon.jpg",
  isExtra: true
}
```

2. **Frontend**: Ingredient will appear in the extra ingredients section

## 🔧 API Endpoints Quick Reference

### Categories
```bash
# Get all categories
GET /api/categories

# Get specific category
GET /api/categories/:id

# Create category
POST /api/categories
```

### Products
```bash
# Get products by category
GET /api/products/byCategory/:categoryName

# Get specific product
GET /api/products/:id

# Create product (has bug - creates category instead)
POST /api/products/:id
```

### Ingredients
```bash
# Get all extra ingredients
GET /api/ingredients

# Get specific ingredient
GET /api/ingredients/:id

# Create ingredient
POST /api/ingredients/:id
```

## 🧩 Component Props Quick Reference

### Main Components
```jsx
// Header
<Header client="John Doe" orderNumber="01" orderButton={advanceOrder} />

// Category
<Category id="cat_id" name="burgers" image="url" handleClick={onClick} />

// Products
<Products products={products} addToOrder={sendItemToOrder} />

// Order
<Order items={orderItems} functions={orderItemFunctions} />
```

### Modal Components
```jsx
// Product Modal
<ProductModal 
  productData={productData} 
  show={show} 
  addToOrder={addToOrder} 
  onHide={onHide} 
/>

// Edit Modal
<EditModal 
  id={id} 
  editData={editData} 
  show={show} 
  editToOrder={editToOrder} 
  onHide={onHide} 
/>

// Client Modal
<ClientModal show={show} onHide={onHide} />

// Payment Modal
<PaymentModal 
  orderItems={orderItems} 
  orderNumber={orderNumber} 
  clientName={clientName} 
  show={show} 
  onHide={onHide} 
/>
```

## 📊 Data Structures

### Order Item Structure
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
    { "cheese": 500 },
    { "bacon": 800 }
  ]
};
```

### Product Structure
```javascript
const product = {
  _id: "product_id",
  type: "burger",
  name: "Dave's Single", 
  price: 5000,
  description: "Fresh beef patty with cheese",
  size: "single",
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

## 🎯 Key Functions

### App.js Functions
```javascript
// Add item to order
function sendItemToOrder(item) {
  item = setSubTotal(item);
  setOrderItems((prev) => [...prev, item]);
}

// Calculate subtotal
function setSubTotal(item) {
  let subtotal = item.price;
  if (item.isCombo) subtotal += 1000;
  if (item.extras.length > 0) {
    item.extras.forEach(extra => {
      subtotal += Object.values(extra)[0];
    });
  }
  return { ...item, subTotal: subtotal };
}

// Edit order item
function editFunction(id) {
  setEditModalShow(true);
  let itemToEdit = orderItems[id];
  setEditData(itemToEdit);
  setEditId(id);
  setEditProductSelected(true);
}

// Remove order item
function removeFunction(id) {
  setOrderItems((prevArray) =>
    prevArray.filter((item, index) => id !== index)
  );
}

// Advance order number
function advanceOrder() {
  setOrderNumber((prev) => {
    prev = parseInt(prev);
    if (prev === 99) {
      prev = 0;
    } else {
      prev++;
    }
    prev = prev < 10 ? '0' + prev.toString() : prev.toString();
    return prev;
  });
}
```

## 🔍 Service Functions

### Product Services
```javascript
// Get products by category
const products = await getProducts('burgers');

// Get single product
const product = await getOneProduct('product_id');
```

### Category Services
```javascript
// Get category by ID
const category = await getCategory('category_id');
```

### Ingredient Services
```javascript
// Get all extra ingredients
const ingredients = await getExtraIngredients();

// Get single ingredient
const ingredient = await getOneIngredient('ingredient_id');
```

## 🎨 Styling Classes

### Key CSS Classes
```css
/* Order styling */
.order-container
.order-header
.order-body
.order-item-wrap
.order-item-title
.order-item-price
.order-item-remove-button
.order-footer
.order-footer-totals
.order-footer-button

/* Product styling */
.img-wrap
.product-modal-options
.img-modal

/* Button styling */
.order-pay-button
.order-item-remove-button

/* Modal styling */
.form-control-lg
```

## 🐛 Common Issues & Solutions

### Backend Issues
1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in .env file

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process: `lsof -ti:3001 | xargs kill`

3. **CORS Errors**
   - Ensure CORS is enabled in server.js
   - Check frontend URL configuration

### Frontend Issues
1. **API Connection Failed**
   - Verify backend is running on port 3001
   - Check backendURL in service files

2. **Images Not Loading**
   - Ensure images exist in backend/public/imgs/
   - Check image paths in database

3. **Modal Not Opening**
   - Check show state is true
   - Verify onHide function is properly defined

## 📝 Development Tips

### Adding New Features
1. **Backend**: Add controller → Add route → Test with Postman
2. **Frontend**: Add service function → Update component → Test integration

### Debugging
1. **Backend**: Use console.log in controllers
2. **Frontend**: Use React DevTools and browser console
3. **Database**: Use MongoDB Compass for data inspection

### Performance
1. **Images**: Optimize image sizes
2. **API**: Add pagination for large datasets
3. **Frontend**: Use React.memo for expensive components

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/pos-wendys
```

### Frontend
```javascript
// In service files
const backendURL = 'http://localhost:3001';
```

## 📚 Documentation Files

- [README.md](README.md) - Main project documentation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference
- [COMPONENT_DOCUMENTATION.md](COMPONENT_DOCUMENTATION.md) - React components guide
- [BACKEND_API_REFERENCE.md](BACKEND_API_REFERENCE.md) - Backend-specific docs
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - This file

## 🚨 Known Issues

1. **Product POST endpoint bug**: Creates Category instead of Product
2. **Missing error handling**: No try-catch blocks in controllers
3. **No input validation**: Missing request body validation
4. **No authentication**: No security measures implemented

## 💡 Future Improvements

1. Add proper error handling
2. Implement input validation
3. Add authentication/authorization
4. Add unit tests
5. Implement real-time updates
6. Add order history
7. Add reporting features
8. Implement payment processing integration
