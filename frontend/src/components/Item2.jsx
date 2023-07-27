import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import daves from '../assets/imgs/menu/burgers/daves_1.png';

function Item2({defCheck, defaultSize='99', size, type, name, img, description, onClickCallback}){

  name = name.toUpperCase();

  const [isChecked, setIsChecked] = useState(defCheck)

    return (
      <Form.Check
        className='form-control-lg'
        inline
        id={name}
        key={name}
        name={type}
        value={name}
        size={size}
        defaultChecked={defaultSize===size || defCheck}
        type='radio'
        label=
          <div class="combo-wrap"
 >
            <img class="img-product" src={img}></img>
            <h1 class="h6">{name}</h1>
            <p class="item-desc">{description}</p>
          </div>

          onClick= { (e) =>{ 
            const data = {
            key: e.target.name,
            value : e.target.value.toLowerCase()
          }
              if(e.target.name==='extraName'){
                const size = {
                  key: 'extraSizeSelected',
                  value : e.target.size
                }
                onClickCallback(size);
              };
            setIsChecked(!isChecked);
            onClickCallback(data);
          }}
        />
    )

}




export default Item2;

