import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";
import {getExtraIngredients, getOneIngredient} from '../services/ingredientServices';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item3 from './Item3';
const backendURL = 'http://localhost:3001';

function ExtraIngredientsOption({options, changePrice, checkboxCallback, selected = []}){

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const ingredientsLoad = async () => {
            let list = await getExtraIngredients();
            setIngredients(list);
        }
        ingredientsLoad();
      },[])


    let rendered = [];
    let rows = [];

    ingredients.map(ingredient => {
      let isChecked = false;
      if(selected.length>0){
        selected.forEach(extra => {
          if(Object.keys(extra)[0]===ingredient.name){
            isChecked=true;
          }
        });
      }
        rows.push(
        <Col>
        <Item3
        key={ingredient._id}
        type='ingredients'
        defCheck={isChecked}
        name={ingredient.name}
        size={ingredient.extraPrice}
        img={backendURL+ingredient.imagePath}
        checkboxCallback={checkboxCallback}
        />
        </Col>
        )
    })
    rendered.push(<Row lg={4}>{rows}</Row>);

    return (
      <div class="item-wrap">
            <div className="mb-3 align-items-center">
                <h1>Agregue ingredientes extra (opcional)</h1>
            {rendered}
        </div>
      </div>
    )
}

export default ExtraIngredientsOption;
