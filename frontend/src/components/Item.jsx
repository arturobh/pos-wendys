import React, { useState } from "react";
import daves from '../assets/imgs/menu/burgers/daves_1.png';

function Item({id, name, img, description, onClickCallback}){

  name = name.toUpperCase();
    return (
      <div className="item-wrap"
      onClick={() => {
        onClickCallback(id);
      }}>
        <img className="img-product" src={img}></img>
        <h1 className="h6">{name}</h1>
        <p className="item-desc">{description}</p>
      </div>
    )
}

export default Item;

