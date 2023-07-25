import SizeOption from './SizeOption';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {getOneProduct} from '../services/productServices';
const backendURL = 'http://localhost:3001';

function ProductModal(props){
  props.productData.name = props.productData.name.toUpperCase();

  const [showImage, setShowImage] = useState(backendURL+props.productData.imagePath);

  function handleClick(imgPath){
    setShowImage(backendURL+imgPath);
  }

    return (
        <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header  closeButton>
        <Modal.Title bsPrefix='text-center' id="contained-modal-title-vcenter">
          <h1>{props.productData.name}</h1>
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
              <Form className='form-control-lg'>
              <SizeOption
                type={props.productData.type}
                options={props.productData.options}
                onClickCallback={handleClick}/>
              </Form>
              </Row>
            </Col>
          </Row>
      </Modal.Body>


      <Modal.Footer>
        <Button onClick={props.onHide}>Añadir a la orden</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default ProductModal;