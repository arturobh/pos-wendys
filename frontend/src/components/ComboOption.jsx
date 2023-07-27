import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";
import {getProducts, getOneProduct} from '../services/productServices';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from './Item';
import Item2 from './Item2';
import DrinkSizeOption from '../components/DrinkSizeOption';
import { Container } from 'react-bootstrap';
const backendURL = 'http://localhost:3001';

function ComboOption({defCheck=false, defaultDrinkName=null ,defaultDrinkSize, defaultExtraSize, price, onClickCallback}){

    const [isCombo, setIsCombo] = useState(defCheck);
    const [drinksList, setDrinksList] = useState([]);
    const [extrasList, setExtrasList] = useState([]);
    const [drinksSizeList, setDrinksSizeList] = useState([]);

    let renderedDrinks = [];
    let rowDrinks = [];

    let renderedExtras = [];
    let rowExtras = [];

    function handleChildClick(data){
        onClickCallback(data,true);

    }

    useEffect(() => {
        const productsLoad = async () => {
            let drinks = await getProducts('drink');
            let extras = await getOneProduct('64908b680c39df27ddf1f164');
    
            setDrinksList(drinks);
            setExtrasList(extras.options);
            setDrinksSizeList(drinks[0].options);
        }
        productsLoad();
      },[])

      drinksList.map(drink => {
        let isChecked = false;
        if(defaultDrinkName!==null){
            isChecked = 
            defaultDrinkName === drink.name ? true : false;
        }
        rowDrinks.push(
        <Col>
        <Item2
        key={drink._id}
        type='drinkName'
        defCheck={isChecked}
        name={drink.name}
        description={drink.description}
        img={backendURL+drink.imagePath}
        onClickCallback={handleChildClick}
        />
        </Col>
        )
    })
    renderedDrinks.push(<Row lg={4}>{rowDrinks}</Row>);
    
    extrasList.map(extra => {
        rowExtras.push(
        <Col>
        <Item2
        key={extra.name}
        type='extraName'
        name={extra.name}
        defaultSize={defaultExtraSize}
        size={extra.size}
        img={backendURL+extra.imagePath}
        onClickCallback={handleChildClick}
        />
        </Col>
        )
    })
    renderedExtras.push(<Row lg={4}>{rowExtras}</Row>);

    return (
      <div className="item-wrap">
            <div className="mb-3 align-items-center">
                <h1>Seleccione el formato</h1>
                <Form.Check
                    className='form-control-lg'
                    inline
                    id='individual'
                    defaultChecked= {!isCombo}
                    label=
                    <div className="combo-wrap">
                        INDIVIDUAL
                        <p className='fade alert alert-warning show'>{price}</p>
                    </div>

                    name='isCombo'
                    value={false}
                    type='radio'
                    onClick={ (e) =>{ 

                        setIsCombo(false);

                        const data = {
                            key: e.target.name,
                            value : false
                        }

                        onClickCallback(data);
                    }}
                 />
                 <Form.Check
                    className='form-control-lg'
                    inline
                    id='combo'
                    defaultChecked= {isCombo}
                    label=<div className="combo-wrap">
                    COMBO
                    <p className='fade alert alert-warning show'>{price+1000} (+1000)</p>
                </div>
                    name='isCombo'
                    value={true}
                    type='radio'
                    onClick={ (e) =>{ 

                        setIsCombo(true);

                        const data = {
                            key: e.target.name,
                            value : true
                        }
                        onClickCallback(data);
                    }}
                 />
                 {isCombo &&
                 <Container>
                    <Row>
                        <h1>Seleccione la bebida</h1>
                        {renderedDrinks}
                    </Row>
                    <Row>
                        <DrinkSizeOption
                            defaultSize={defaultDrinkSize}
                            options={drinksSizeList}
                            onClickCallback={handleChildClick}
                        />
                    </Row>
                    <Row>
                        <h1>Seleccione el tamaño de las papas</h1>
                        {renderedExtras}
                    </Row>
                 </Container>
                    
                }
        </div>
      </div>
    )
}

export default ComboOption;
