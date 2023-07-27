import React, { useState } from "react";
import OrderItem from "./OrderItem";
import OrderFooter from "./OrderFooter";
import icons from '../icons';


function Order({items, functions }) {

  const {editFunction, removeFunction} = functions; 
  
    return (
        
        <div className="order-body">
          <div className="order-list">
            {items.map((item, index) => (
              <OrderItem
                id={index}
                key={index}
                data={item}
                onDblClick={editFunction}
                removeBtn={removeFunction}
              />
            ))}
          </div>
        </div>
    );
  }
  
  export default Order;