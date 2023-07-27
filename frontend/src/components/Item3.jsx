import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import daves from '../assets/imgs/menu/burgers/daves_1.png';

function Item3({defCheck, type, name, img, size, checkboxCallback}){

  name = name.toUpperCase();

    const [isChecked, setIsChecked] = useState(defCheck)

    return (
      <Form.Check
        className='form-control-lg'
        inline
        id={name}
        key={name}
        checked={isChecked}
        name={type}
        value={name}
        size={size}
        type='checkbox'
        label=
          <div className="combo-wrap">
            <img className="img-ingredient" src={img}></img>
            <h1 className="h6">{name}</h1>
            <p className='fade alert alert-warning show'>{size}</p>
          </div>
          onClick={(e)=>{

              const data = {
                [e.target.value.toLowerCase()]: e.target.size
              }
              setIsChecked(!isChecked);
            checkboxCallback(data, e.target.checked);
          }}
        />
    )

}




export default Item3;

