import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import remove from '../delete.svg'
import remove2 from '../delete1.svg'


function OrderItemCopy({data}) {

    data.name = capitalizeFirst(data.name);
    
    function capitalizeFirst(string){
      const cap = string.charAt(0).toUpperCase();
      string = cap+string.substring(1,string.length);
      return string;
    }

    function lowerCaseFirst(string){
      const cap = string.charAt(0).toLowerCase();
      string = cap+string.substring(1,string.length);
      return string;
    }

    function getTitleComplement(sizeNumber, type, isCombo){
      
      let option;
      let result;

      const dict = {
        "burger" : true,
        "chicken" : true,
        "drink" : false,
        "extras" : false,
        "frosty" : false
      }

      for(var key in dict) {
        var value = dict[key];
          if(type === key){ option = value};
      }

      if(option){
        switch (sizeNumber) {
          case '1': result ='Single'
            break;
          case '2': result ='Double'
            break;
          case '3': result ='Triple'
            break;
          default: result ='Single'
            break;
        }
          if(isCombo){
            result+=' COMBO';
          }

      }else{
        switch (sizeNumber) {
          case '1':
            return result ='Small'
            break;
          case '2':
            return result ='Medium'
            break;
          case '3':
            return result ='Large'
            break;
          default: result ='Single'
            break;
        }
      }
      return result;
    }

    return (
          <div className="order-item-wrap">
            <Row>
            <Col className="d-flex align-items-center justify-content-start order-item-title">
                <h4 className="h5">
                  {`${data.name} ${getTitleComplement(data.size, data.type, data.isCombo)}`}
                </h4>
              </Col>
              <Col 
              xs={2}
              className="d-flex align-items-center justify-content-end order-item-price">
                <h4 className="h5">
                  ${data.price}
                </h4>
              </Col>
              <Col 
              xs={1}
              className="d-flex align-items-center justify-content-end order-item-price">
              </Col>
            </Row>

            {data.isCombo &&
              <div>
                <Row>
                  <p className="order-item-detail fs-5">{`${capitalizeFirst(data.combo.drinkName)} ${lowerCaseFirst(getTitleComplement(data.combo.drinkSizeSelected, 'drink'))}`}</p>
              </Row>
              <Row>
                  <p className="order-item-detail fs-5">{`Fries ${data.combo.extraName}`}</p>
              </Row>
              </div>      
            }
            {data.extras.length>0 &&
              <div>
              {data.extras.map((extra, index) => (
              <Row>
                <Col className="d-flex align-items-center justify-content-start order-item-detail">
                  <p className="fs-5">{`Extra ${capitalizeFirst(Object.keys(extra)[0])}`}</p>
                </Col>
                <Col 
                xs={3}
                className="d-flex align-items-center justify-content-start order-item-detail">
                  <h4 className="h5">${Object.values(extra)[0]}</h4>
                </Col>
              </Row>
              ))}


              </div>      
            }
            <Row>
              <Col 
              xs={{ span: 2, offset: 9 }}
              className="d-flex align-items-center justify-content-end order-item-price">
                <h4 className="h4 fw-bold">${data.subTotal}</h4>
              </Col>
            </Row>
          </div>
    );
  }
  
  export default OrderItemCopy;