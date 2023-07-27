import Form from 'react-bootstrap/Form';
import React, { useState } from "react";

function DrinkSizeOption({defaultSize, options, onClickCallback}){
    return (
      <div class="item-wrap">
            <div className="mb-3 align-items-center">
                <h1>Seleccione el tamaño de la bebida</h1>
            {options.map((option) => (
                <Form.Check
                    className='form-control-lg'
                    inline
                    id={option.name}
                    key={option.name}
                    defaultChecked= {option.size===defaultSize}
                    label={option.name.toUpperCase()}
                    name='drinkSizeSelected'
                    value={option.size}
                    type='radio'
                    onClick={ (e) =>{ 
                        const data = {
                            key: e.target.name,
                            value : e.target.value
                        }
                        console.log(data)
                        onClickCallback(data);
                    }}
                 />
            ))}
        </div>
      </div>
    )
}

export default DrinkSizeOption;
