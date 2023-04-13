import logo from './logo.svg';
import icons from './icons';
import {colors} from './assets/styles/styleGuide';
import './App.css';
import { useEffect, useState } from 'react';
import daves from './assets/imgs/menu/burgers/daves_1.png';

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
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-introBold tracking-tight text-gray-900">HAMBURGUESAS</h2>
  
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div class="group relative">
          <div class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src={daves} alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"></img>
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h1 class="text-lg font-intro text-gray-700">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  DAVE'S
                </a>
              </h1>
            </div>
            <p class="text-lg font-introBold text-gray-900">$4.550</p>
          </div>
        </div>
      </div>
    </div>
      </div>

      <div className='App-footer'>
        <h1>footer h2</h1>
      </div>
    </div>
  );
}

export default App;
