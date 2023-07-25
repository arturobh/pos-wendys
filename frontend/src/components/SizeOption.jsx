import Form from 'react-bootstrap/Form';
import React, { useState } from "react";

function SizeOption({type, options, onClickCallback}){

    const [optionsArray, setOptionsArray] = useState(options)

    return (
      <div class="item-wrap">
            <div key={`inline-radio`} className="mb-3 align-items-center">
                <h1>Seleccione el tamaño</h1>
            {optionsArray.map((option) => (
                <Form.Check
                    className='form-control-lg'
                    inline
                    key={option}
                    label={option.name.toUpperCase()}
                    name='size'
                    value={option.size}
                    type='radio'
                    onClick={ () =>{ 
                        onClickCallback(option.imagePath);
                    }}
                 />
            ))}
        </div>
      </div>
    )
}

export default SizeOption;
