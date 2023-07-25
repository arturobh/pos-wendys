import axios from "axios";
import logo from './logo.svg';
import icons from './icons';
import {colors} from './assets/styles/styleGuide';
import './App.css';
import Products from './components/Products'
import Item from './components/Item'
import { useEffect, useState } from 'react';
import daves from './daves_x1.png';
import Category from './components/Category';
import Header from './components/Header';
import ClientModal  from './components/ClientModal'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getAllCategories} from './services/initialLoad';
import {getProducts} from './services/productServices';
import {getCategory} from './services/categoryServices';
const backendURL = 'http://localhost:3001';




function App() {

const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [categoryProducts, setCategoryProducts] = useState([]);
const [orderItems, setOrderItems] = useState([]);
const [clientName, setClientName] = useState('');
const [orderNumber, setOrderNumber] = useState('90');

const [clientModalShow, setClientModalShow] = useState(true);

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
          Order
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
            />
          </div>

        </div>

      </div>
      
    </div>
  );

}


export default App;
