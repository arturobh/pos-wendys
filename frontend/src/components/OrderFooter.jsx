import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import money from '../money.svg'
import icons from '../icons';


function OrderFooter({ orderItems, handlePay }) {

    let total=0;

    orderItems.forEach(item => {
      total+=item.subTotal;
    });

    let iva = Math.round(total*0.19);
    let neto = total-iva;
  
    return (
      <div className="order-footer">

          <div className="order-footer-totals">
            <div className="footer-col">
              <h1 className="h2">TOTAL</h1>
              <h1 className="h2">{total}</h1>
            </div>
            <div className="footer-col">
              <h3 className="h4">IVA</h3>
              <h3 className="h4">{iva}</h3>
            </div>
            <div className="footer-col">
              <h3 className="h4">NETO</h3>
              <h3 className="h4">{neto}</h3>
             </div>
        </div>
        <div className="order-footer-button">
          <Button
          onClick={handlePay}
          className="order-pay-button"
          variant="success"><img src={money}></img>PAGAR</Button>
          </div>
      </div>
    );
  }
  
  export default OrderFooter;