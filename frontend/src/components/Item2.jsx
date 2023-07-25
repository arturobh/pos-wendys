import React, { useState } from "react";
import daves from '../assets/imgs/menu/burgers/daves_1.png';

function Item({name}){
    return (
        <div class="group relative">
        <div class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={daves} alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"></img>
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h1 class="text-lg font-intro text-gray-700">
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0"
                onClick={() => {
                    console.log("lol?");
                    fetch('http://localhost:3001/api/categories')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.categories[1].categoryName)
                        console.log("aaa")
                    })
                    .catch(error => {
                        // Handle the error
                    });
                  }}
                ></span>
                {name}
              </a>
            </h1>
          </div>
          <p class="text-lg font-introBold text-gray-900">$4.550</p>
        </div>
      </div>
    )
}

export default Item;

