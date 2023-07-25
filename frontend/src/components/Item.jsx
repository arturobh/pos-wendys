import React, { useState } from "react";
import daves from '../assets/imgs/menu/burgers/daves_1.png';

function Item({id, name, img, description, onClickCallback}){

  name = name.toUpperCase();
    return (
      <div class="item-wrap"
      onClick={() => {
        onClickCallback(id);
      }}>
        <img class="img-product" src={img}></img>
        <h1 class="h6">{name}</h1>
        <p class="item-desc">{description}</p>
      </div>
    )
}

export default Item;

