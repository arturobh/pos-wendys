import logo from './logo.svg';
import icons from './icons';
import {colors} from './assets/styles/styleGuide';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState("Let’s Make A (Meal) Deal")
  return (
    <div className="App">
      <div className="App-header">
        <img src={icons.wendys} className="App-logo" alt="logo" />
        <img src={icons.client} className="App-logo" alt="logo" />
        <p className='text-7xl font-introBold'>MANUEL</p>
        <img src={icons.bag} className="App-logo" alt="logo" />
        <p className='text-7xl font-introBold'>ORDEN #03</p>
      </div>

      <div className='App-order'>
        <h1>nav h1</h1>
      </div>
      

      <div className='App-products'> 
        <h1>main h1</h1>
      </div>

      <div className='App-footer'>
        <h1>footer h2</h1>
      </div>
    </div>
  );
}

export default App;
