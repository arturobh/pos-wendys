# POS Wendy's - Component Documentation

## Table of Contents
1. [Component Overview](#component-overview)
2. [Main App Component](#main-app-component)
3. [UI Components](#ui-components)
4. [Modal Components](#modal-components)
5. [Order Management Components](#order-management-components)
6. [Utility Components](#utility-components)
7. [Component Props Reference](#component-props-reference)

## Component Overview

The POS Wendy's frontend is built with React and uses Bootstrap for styling. The component architecture follows a hierarchical structure with the main App component managing global state and coordinating between different sections of the application.

### Component Hierarchy
```
App
├── ClientModal
├── Header
├── Order
│   ├── OrderItem
│   └── OrderFooter
├── Category (multiple instances)
├── Products
│   ├── Item
│   └── ProductModal
│       ├── SizeOption
│       ├── ComboOption
│       └── ExtraIngredientsOption
├── EditModal
└── PaymentModal
    ├── OrderCopy
    └── OrderFooterCopy
```

## Main App Component

### App.js

The main application component that orchestrates the entire POS system.

**Location:** `src/App.js`

**Key Responsibilities:**
- State management for the entire application
- API communication coordination
- Order management logic
- Modal state control

**State Variables:**
```javascript
// Category and product management
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [categoryProducts, setCategoryProducts] = useState([]);

// Order management
const [orderItems, setOrderItems] = useState([]);
const [clientName, setClientName] = useState('');
const [orderNumber, setOrderNumber] = useState('90');
const [totalPrice, setTotalPrice] = useState(0);

// Modal states
const [clientModalShow, setClientModalShow] = useState(true);
const [editModalShow, setEditModalShow] = useState(false);
const [paymentModalShow, setPaymentModalShow] = useState(false);
const [toastShow, setToastShow] = useState(false);

// Edit functionality
const [editProductSelected, setEditProductSelected] = useState(false);
const [editData, setEditData] = useState([]);
const [editId, setEditId] = useState(false);
```

**Key Functions:**

#### `onClick(id)`
Handles category selection and loads products for the selected category.

```javascript
async function onClick(id) {
  let category = await getCategory(id);
  setSelectedCategory(category.category);
}
```

#### `sendItemToOrder(item)`
Adds a customized item to the current order.

```javascript
function sendItemToOrder(item) {
  item = setSubTotal(item);
  setOrderItems((prev) => [...prev, item]);
}
```

#### `setSubTotal(item)`
Calculates the subtotal for an order item including combo upcharges and extras.

```javascript
function setSubTotal(item) {
  let subtotal = 0;
  subtotal += item.price;

  if (item.isCombo) {
    subtotal += 1000; // Combo upcharge
  }

  if (item.extras.length > 0) {
    item.extras.forEach(extra => {
      subtotal += Object.values(extra)[0];
    });
  }
  
  return {
    ...item,
    subTotal: subtotal
  };
}
```

#### `editFunction(id)`
Opens the edit modal for a specific order item.

```javascript
function editFunction(id) {
  setEditModalShow(true);
  let itemToEdit = orderItems[id];
  setEditData(itemToEdit);
  setEditId(id);
  setEditProductSelected(true);
}
```

#### `removeFunction(id)`
Removes an item from the current order.

```javascript
function removeFunction(id) {
  setOrderItems((prevArray) =>
    prevArray.filter((item, index) => id !== index)
  );
}
```

#### `advanceOrder()`
Increments the order number (cycles from 99 to 00).

```javascript
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

## UI Components

### Header Component

**Location:** `src/components/Header.jsx`

Displays the application header with Wendy's logo, client name, and order number.

**Props:**
- `client` (string): Client name to display
- `orderNumber` (string): Current order number (default: 'XX')
- `orderButton` (function): Function to advance order number

**Features:**
- Displays Wendy's logo
- Shows client name in uppercase
- Shows current order number
- Hidden button for order advancement

**Usage Example:**
```jsx
<Header
  client="John Doe"
  orderNumber="01"
  orderButton={advanceOrder}
/>
```

### Category Component

**Location:** `src/components/Category.jsx`

Displays a clickable category card with image and name.

**Props:**
- `id` (string): Unique category identifier
- `name` (string): Category name (displayed in uppercase)
- `image` (string): URL to category image
- `handleClick` (function): Click handler that receives the category ID

**Features:**
- Clickable category card
- Image display with hover effects
- Uppercase text formatting
- Responsive design

**Usage Example:**
```jsx
<Category
  id="category_123"
  name="burgers"
  image="http://localhost:3001/imgs/menu/burgers/burger_category.jpg"
  handleClick={onClick}
/>
```

### Products Component

**Location:** `src/components/Products.jsx`

Displays a grid of products for the selected category.

**Props:**
- `products` (array): Array of product objects
- `addToOrder` (function): Function to add product to order

**Features:**
- Responsive grid layout (4 columns on large screens)
- Product modal integration
- Dynamic product loading
- Error handling for missing products

**State Management:**
```javascript
const [productModalShow, setProductModalShow] = useState(false);
const [productSelected, setProductSelected] = useState(false);
const [productData, setProductData] = useState([]);
```

**Key Functions:**

#### `handleClickedItem(id)`
Opens the product modal for customization.

```javascript
async function handleClickedItem(id) {
  setProductModalShow(true);
  const productdata = await getOneProduct(id);
  setProductData(productdata);
  setProductSelected(true);
}
```

**Usage Example:**
```jsx
<Products
  products={categoryProducts}
  addToOrder={sendItemToOrder}
/>
```

### Item Component

**Location:** `src/components/Item.jsx`

Individual product item display component.

**Props:**
- `id` (string): Product ID
- `name` (string): Product name
- `description` (string): Product description
- `img` (string): Product image URL
- `onClickCallback` (function): Click handler function

**Features:**
- Product image display
- Product name and description
- Click-to-customize functionality
- Hover effects

## Modal Components

### ProductModal Component

**Location:** `src/components/ProductModal.jsx`

Complex modal for customizing products before adding to order.

**Props:**
- `productData` (object): Complete product data
- `show` (boolean): Modal visibility state
- `addToOrder` (function): Function to add customized product
- `onHide` (function): Function to close modal

**Features:**
- Product image display
- Size selection with price updates
- Combo option toggle
- Extra ingredients selection
- Form validation
- Dynamic image updates based on selections

**State Management:**
```javascript
const [showImage, setShowImage] = useState(backendURL + props.productData.imagePath);
const [itemToAdd, setItemToAdd] = useState([]);
const [formValues, setFormValues] = useState({
  data: props.productData,
  name: props.productData.name.toLowerCase(),
  type: props.productData.type,
  size: props.productData.options[0].size,
  price: props.productData.options[0].price,
  extras: [],
  isCombo: false,
  subTotal: 0,
  combo: {
    drinkName: "",
    drinkSizeStandard: "2",
    drinkSizeSelected: "2",
    extraName: "medium",
    extraSizeStandard: "2",
    extraSizeSelected: "2"
  }
});
```

**Key Functions:**

#### `handleSubmit()`
Validates form and adds product to order.

```javascript
function handleSubmit() {
  const required = [];
  let ready = true;
  
  // Validation logic
  required.push(formValues.name !== "" ? 1 : 0);
  required.push(formValues.type !== "" ? 1 : 0);
  required.push(formValues.size !== "" ? 1 : 0);
  required.push(formValues.price > 0 ? 1 : 0);
  
  if (formValues.isCombo) {
    required.push(formValues.combo.drinkName !== "" ? 1 : 0);
    // Additional combo validation...
  }

  required.forEach(element => {
    if (element === 0) {
      ready = false;
    }
  });

  if (ready) {
    props.onHide();
    props.addToOrder(formValues);
  }
}
```

#### `handleChange(data, insideCombo)`
Handles form field changes and updates state.

```javascript
function handleChange(data, insideCombo) {
  const { key, value } = data;

  if (insideCombo) {
    setFormValues(prev => ({
      ...prev,
      combo: {
        ...prev.combo,
        [key]: value
      }
    }));
  } else {
    setFormValues(prev => ({
      ...prev,
      [key]: value
    }));
  }
}
```

**Usage Example:**
```jsx
<ProductModal
  productData={productData}
  show={productModalShow}
  addToOrder={sendItemToOrder}
  onHide={() => setProductModalShow(false)}
/>
```

### EditModal Component

**Location:** `src/components/EditModal.jsx`

Modal for editing existing order items.

**Props:**
- `id` (number): Index of item to edit
- `editData` (object): Current item data
- `show` (boolean): Modal visibility state
- `editToOrder` (function): Function to save edited item
- `onHide` (function): Function to close modal

**Features:**
- Pre-populated form with current item data
- Same customization options as ProductModal
- Update existing order item
- Form validation

**Usage Example:**
```jsx
<EditModal
  id={editId}
  editData={editData}
  show={editModalShow}
  editToOrder={editToOrder}
  onHide={() => setEditModalShow(false)}
/>
```

### ClientModal Component

**Location:** `src/components/ClientModal.jsx`

Simple modal for entering client name at order start.

**Props:**
- `show` (boolean): Modal visibility state
- `onHide` (function): Function called with client name

**Features:**
- Client name input validation (minimum 3 characters)
- Auto-focus on input field
- Static backdrop (cannot close by clicking outside)
- Disabled submit button until valid input

**State Management:**
```javascript
const [nameInput, setNameInput] = useState('');
```

**Validation Function:**
```javascript
function checkName() {
  if (nameInput.length < 3) {
    return true; // Disabled
  } else {
    return false; // Enabled
  }
}
```

**Usage Example:**
```jsx
<ClientModal
  show={clientModalShow}
  onHide={(name) => {
    setClientModalShow(false);
    setClientName(name.toUpperCase());
  }}
/>
```

### PaymentModal Component

**Location:** `src/components/PaymentModal.jsx`

Full-screen modal displaying order summary for payment processing.

**Props:**
- `orderItems` (array): Array of order items
- `orderNumber` (string): Order number
- `clientName` (string): Client name
- `show` (boolean): Modal visibility state
- `onHide` (function): Function to close modal

**Features:**
- Full-screen display
- Order summary with all items
- Client and order number display
- Static backdrop
- Print-ready layout

**Usage Example:**
```jsx
<PaymentModal
  orderItems={orderItems}
  orderNumber={orderNumber}
  clientName={clientName}
  show={paymentModalShow}
  onHide={() => setPaymentModalShow(false)}
/>
```

## Order Management Components

### Order Component

**Location:** `src/components/Order.jsx`

Container component for displaying order items.

**Props:**
- `items` (array): Array of order items
- `functions` (object): Object containing edit and remove functions

**Features:**
- Scrollable order list
- Integration with OrderItem components
- Function delegation to child components

**Usage Example:**
```jsx
<Order
  items={orderItems}
  functions={orderItemFunctions}
/>
```

### OrderItem Component

**Location:** `src/components/OrderItem.jsx`

Individual order item display with edit and remove functionality.

**Props:**
- `id` (number): Item index in order array
- `data` (object): Order item data
- `onDblClick` (function): Double-click handler for editing
- `removeBtn` (function): Remove button handler

**Features:**
- Double-click to edit
- Remove button with confirmation
- Detailed item display including combo and extras
- Price calculation display
- Responsive layout

**Key Functions:**

#### `getTitleComplement(sizeNumber, type, isCombo)`
Generates appropriate size/combo text for display.

```javascript
function getTitleComplement(sizeNumber, type, isCombo) {
  let option;
  let result;

  const dict = {
    "burger": true,
    "chicken": true,
    "drink": false,
    "extras": false,
    "frosty": false
  };

  for (var key in dict) {
    var value = dict[key];
    if (type === key) { option = value; }
  }

  if (option) {
    switch (sizeNumber) {
      case '1': result = 'Single'; break;
      case '2': result = 'Double'; break;
      case '3': result = 'Triple'; break;
      default: result = 'Single'; break;
    }
    if (isCombo) {
      result += ' COMBO';
    }
  } else {
    switch (sizeNumber) {
      case '1': return result = 'Small'; break;
      case '2': return result = 'Medium'; break;
      case '3': return result = 'Large'; break;
      default: result = 'Single'; break;
    }
  }
  return result;
}
```

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
    { "cheese": 500 },
    { "bacon": 800 }
  ]
};
```

**Usage Example:**
```jsx
<OrderItem
  id={0}
  data={orderItem}
  onDblClick={editFunction}
  removeBtn={removeFunction}
/>
```

### OrderFooter Component

**Location:** `src/components/OrderFooter.jsx`

Displays order totals and payment button.

**Props:**
- `orderItems` (array): Array of order items
- `handlePay` (function): Payment handler function

**Features:**
- Automatic total calculation
- Tax calculation (19% IVA)
- Net amount calculation
- Payment button with icon
- Responsive layout

**Calculation Logic:**
```javascript
let total = 0;
orderItems.forEach(item => {
  total += item.subTotal;
});

let iva = Math.round(total * 0.19);
let neto = total - iva;
```

**Usage Example:**
```jsx
<OrderFooter
  orderItems={orderItems}
  handlePay={() => {
    orderItems.length > 0 ? setPaymentModalShow(true) : setToastShow(true);
  }}
/>
```

## Utility Components

### SizeOption Component

**Location:** `src/components/SizeOption.jsx`

Handles size selection for products.

**Props:**
- `defaultSize` (string): Default selected size
- `options` (array): Available size options
- `changeImage` (function): Function to update product image
- `changePrice` (function): Function to update price
- `onClickCallback` (function): General change handler

### ComboOption Component

**Location:** `src/components/ComboOption.jsx`

Handles combo meal options.

**Props:**
- `defaultDrinkSize` (string): Default drink size
- `defaultExtraSize` (string): Default extra size
- `price` (number): Base price
- `onClickCallback` (function): Change handler

### ExtraIngredientsOption Component

**Location:** `src/components/ExtraIngredientsOption.jsx`

Handles extra ingredient selection.

**Props:**
- `checkboxCallback` (function): Function to handle ingredient selection
- `selected` (array): Currently selected ingredients (for edit mode)

## Component Props Reference

### Common Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| `show` | boolean | Modal visibility state | Yes (for modals) |
| `onHide` | function | Function to close modal | Yes (for modals) |
| `id` | string/number | Unique identifier | Yes (for items) |
| `data` | object | Component data | Yes (for data components) |

### Event Handler Props

| Prop | Type | Description | Parameters |
|------|------|-------------|------------|
| `onClick` | function | Click handler | event object |
| `onDblClick` | function | Double-click handler | event object |
| `handleClick` | function | Custom click handler | id parameter |
| `onClickCallback` | function | Generic callback | data object |

### Data Props

| Prop | Type | Description | Example |
|------|------|-------------|---------|
| `products` | array | Array of product objects | `[{id, name, price, ...}]` |
| `orderItems` | array | Array of order items | `[{name, price, subTotal, ...}]` |
| `categories` | array | Array of categories | `[{id, name, image}]` |
| `productData` | object | Complete product data | `{name, type, options, ...}` |

This comprehensive component documentation provides detailed information about each React component in the POS Wendy's system, including their props, functionality, and usage examples.
