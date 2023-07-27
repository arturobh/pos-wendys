import SizeOption from './SizeOption';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import {getOneProduct} from '../services/productServices';
import ComboOption from './ComboOption';
import ExtraIngredientsOption from './ExtraIngredientsOption';
const backendURL = 'http://localhost:3001';

function EditModal(props){
  props.editData.data.name = props.editData.data.name.toUpperCase();

  const [showImage, setShowImage] = useState(backendURL+props.editData.data.imagePath);
  const [itemToEdit, setItemToEdit] = useState([]);
  const [formValues, setFormValues] = useState(props.editData);


  function handleSubmit(){
    const required = [];
    let ready = true;
    required.push(formValues.name !== "" ? 1 : 0);
    required.push(formValues.type !== "" ? 1 : 0); 
    required.push(formValues.size !== "" ? 1 : 0); 
    required.push(formValues.price > 0 ? 1 : 0);
    if(formValues.isCombo){
      required.push(formValues.combo.drinkName !== "" ? 1 : 0);
      required.push(formValues.combo.drinkSizeStandard !== "" ? 1 : 0);
      required.push(formValues.combo.drinkSizeSelected !== "" ? 1 : 0);
      required.push(formValues.combo.extraName !== "" ? 1 : 0);
      required.push(formValues.combo.extraSizeStandard !== "" ? 1 : 0);
      required.push(formValues.combo.extraSizeSelected !== "" ? 1 : 0);
    } 

    required.forEach(element => {
      if(element===0){
        ready = false;
        console.log("nono")
      }
    });


    if(ready){
      props.onHide();
      props.editToOrder(formValues, props.id);
    }
  }

  function handleChangeImage(imgPath){
      setShowImage(backendURL+imgPath);
  }


  function handleChangePrice(price){
    setFormValues (prev => {
      return { 
        ...prev, 
            price
    }
    })
}

  function handleChange(data, insideCombo){
    const {key, value} = data;
    console.log(data);

    if(typeof(value) === 'boolean'){
      if(!value){
        setFormValues(prev => {
          return {
            ...prev,
            combo : {
              drinkName: "",
              drinkSizeStandard: "2",
              drinkSizeSelected: "",
              extraName: "",
              extraSizeStandard: "2",
              extraSizeSelected: ""
            }
          }
        })
      }  
    }

    if(insideCombo){
      setFormValues (prev => {
        return { 
          ...prev, 
          combo: {
              ...prev.combo,
              [key]: value
          } 
      }
      })

    }else{
      setFormValues (prev => {
        return {
          ...prev,
          [key]: value
        };
      })
    }
  }

  function handleCheck(value, isChecked){

    if(isChecked){
      let updated = formValues.extras;
      updated.push(value);

      setFormValues (prev => {
        return { 
          ...prev,
          extras : updated
      }
      })
    }else{
      let updated = formValues.extras;
      const index = updated.indexOf(value);
      updated.splice(index, 1);

      setFormValues (prev => {

        return { 
          ...prev, 
          extras : updated
      }
      })
    }
  }

  function haveComboOption(type){

    const dict = {
      "burger" : true,
      "chicken" : true,
      "drink" : false,
      "extras" : false,
      "frosty" : false
    }

    for(var key in dict) {
      var value = dict[key];
        return type === key ? true : false;
    }
  }

    return (
        <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
    <Form className='form-control-lg'>
      <Modal.Header  closeButton>
        <Modal.Title bsPrefix='text-center' id="contained-modal-title-vcenter">
          <h1>{props.editData.data.name}</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <Row className='row-height'>
            {/* Columna Imagen */}
            <Col xs={3}>
              <h4></h4>
              <img
                className="img-modal"
                src={showImage}
                >
              </img>
            </Col>

            {/* Columna Opciones */}
            <Col className='product-modal-options' xs={9}>

              <Row>
                <SizeOption
                  defaultSize={formValues.size}
                  options={props.editData.data.options}
                  changeImage={handleChangeImage}
                  changePrice={handleChangePrice}
                  onClickCallback={handleChange}
                />
              </Row>

                <Row>
                  {haveComboOption(props.editData.data.type) &&
                    <ComboOption
                      defCheck={props.editData.isCombo}
                      defaultDrinkName={formValues.combo.drinkName}
                      defaultDrinkSize={formValues.combo.drinkSizeSelected==='' ? formValues.combo.drinkSizeStandard :formValues.combo.drinkSizeSelected}
                      defaultExtraSize={formValues.combo.extraSizeSelected==='' ? formValues.combo.extraSizeStandard : formValues.combo.extraSizeSelected}
                      price={formValues.price}
                      onClickCallback={handleChange}
                      /> 
                  }
                </Row>
                <Row>
                  {/* extra ingredients row */}
                  {haveComboOption(props.editData.data.type) &&
                  <ExtraIngredientsOption
                    selected={props.editData.extras}
                    checkboxCallback={handleCheck}
                    />
                  }
                </Row>
            </Col>
          </Row>
      </Modal.Body>


      <Modal.Footer>
        <Button 
        variant="warning" 
        onClick={handleSubmit}>Modificar</Button>
      </Modal.Footer>
      </Form>
    </Modal>
    );
}

export default EditModal;