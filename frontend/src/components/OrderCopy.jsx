import React, { useState } from "react";
import OrderItemCopy from "./OrderItemCopy";

function OrderCopy({items }) {

    return (
        
        <div className="order-copy-body">
          <div className="order-list">
            {items.map((item, index) => (
              <OrderItemCopy
                id={index}
                key={index}
                data={item}
              />
            ))}
          </div>
        </div>
    );
  }
  
  export default OrderCopy;