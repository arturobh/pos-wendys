import axios from "axios";
import icons from './icons';
import './App.css';
import Products from './components/Products'
import { useEffect, useState } from 'react';
import Category from './components/Category';
import Header from './components/Header';
import Order from './components/Order'
import OrderFooter from "./components/OrderFooter";
import ClientModal  from './components/ClientModal'
import 'bootstrap/dist/css/bootstrap.min.css';
import {getProducts} from './services/productServices';
import {getCategory} from './services/categoryServices';
import EditModal from "./components/EditModal";
import PaymentModal from "./components/PaymentModal";
import Toast from 'react-bootstrap/Toast';
const backendURL = 'http://localhost:3001';




function App() {

const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [categoryProducts, setCategoryProducts] = useState([]);
const [orderItems, setOrderItems] = useState([]);
const [clientName, setClientName] = useState('');
const [orderNumber, setOrderNumber] = useState('90');
const [totalPrice, setTotalPrice] = useState(0);

const [clientModalShow, setClientModalShow] = useState(true);
const [editModalShow, setEditModalShow] = useState(false);
const [editProductSelected, setEditProductSelected] = useState(false);
const [editData, setEditData] = useState([]);
const [editId, setEditId] = useState(false);

const [paymentModalShow, setPaymentModalShow] = useState(false);
const [toastShow, setToastShow] = useState(false);



function editFunction(id){
  setEditModalShow(true);
  let itemToEdit = orderItems[id];
  setEditData(itemToEdit);
  setEditId(id);
  setEditProductSelected(true);
  
}

function removeFunction(id){

  setOrderItems((prevArray) =>
      prevArray.filter((item, index) => id!==index)
    )
}

const orderItemFunctions = {
  editFunction, removeFunction
}

function advanceOrder(){
  setOrderNumber((prev) => {
    prev = parseInt(prev);
    if(prev === 99){
      prev = 0;
    }else{
      prev++;
    }
    prev = prev < 10 ? '0'+prev.toString() : prev.toString();
    return prev;
  });
}

function setSubTotal(item){

  let subtotal=0;
  subtotal+= item.price;

  if(item.isCombo){
    subtotal+=1000;
  }

  if(item.extras.length>0){
    item.extras.forEach(extra => {
      
      subtotal+=Object.values(extra)[0];
    });
  }
  return {
    ...item,
    subTotal : subtotal
  }
}

function editToOrder(item, id){
  item = setSubTotal(item);
  let updatedOrderItems = orderItems;
  updatedOrderItems[id] = item;
  setOrderItems(updatedOrderItems);
}

function sendItemToOrder(item){

  item = setSubTotal(item);
  setOrderItems((prev) => [...prev, item])
}

async function onClick(id) {
  let category = await getCategory(id);
  setSelectedCategory(category.category);
}


function onSubmitCallback(name) {
  setClientModalShow(false);
  setClientName(name.toUpperCase());
}

const productsLoad = async () => {
  let products = await getProducts(selectedCategory.categoryName);
  setCategoryProducts(products);
}

useEffect(() => {
  const dataLoad = async () => {
    const response = await (
      await axios.get(backendURL+'/api/categories')
    );

    setCategories(response.data);
    if(response.data.length > 0 && selectedCategory===''){
      setSelectedCategory(response.data[0]);
    };
  };

  dataLoad();
  productsLoad();
},[selectedCategory])

  return (

    <div className='App'>

    <ClientModal
        show={clientModalShow}
        onHide={onSubmitCallback}
      />

      {/* Header */}
      <Header
      client={clientName}
      orderNumber={orderNumber}
      orderButton={advanceOrder}/>

      {/* Body */}
      <div className='App-body'>
        
        {/* Order */}
        <div className='order-container'>
          <div className='d-flex align-items-center order-header'>
            <img src={icons.bag} className="order-logo" alt="logo" />
            <p className='fs-2'>ORDEN {orderNumber}</p>
          </div>
          <Order
            items={orderItems}
            functions={orderItemFunctions}
          />

        <Toast onClose={() => setToastShow(false)} show={toastShow} delay={2000} autohide bg='warning'>
          <Toast.Header>
            <img
              src={icons.wendys}
              className="rounded me-2 toast-img"
              alt=""
            />
            <strong className="me-auto">No hay nada en la orden :(</strong>
          </Toast.Header>
        </Toast>

          <OrderFooter
            orderItems={orderItems}
            handlePay={()=>{
              orderItems.length > 0 ? setPaymentModalShow(true) : setToastShow(true);
            }}
          />
        </div>

        {/* Selection */}
        <div className='selection-container'>

          {/* Categories */}
          <div className='App-categories'>
            {categories.map((cat) => (
              <Category
              id={cat._id}
              name={cat.categoryName}
              image={backendURL+cat.imagePath}
              handleClick={onClick}
              />
            ))}
          </div>
          
          {/* Products */}
          <div className='App-products'>
            <Products
            products={categoryProducts}
            addToOrder={sendItemToOrder}
            />
          </div>

        </div>

      </div>
      {editProductSelected &&
      <EditModal
      id={editId}
      editData={editData}
      show={editModalShow}
      editToOrder={editToOrder}
      onHide={() => {
          setEditModalShow(false);
          setEditId(false);
          setEditProductSelected(false);
      }}
  />
}

      <PaymentModal
        orderItems={orderItems}
        orderNumber={orderNumber}
        clientName={clientName}
        show={paymentModalShow}
        onHide={() => {
          setPaymentModalShow(false);

        }}/>
    </div>
  );

}


export default App;
