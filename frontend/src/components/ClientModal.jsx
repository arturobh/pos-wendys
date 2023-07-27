import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function ClientModal(props){

    const [nameInput, setNameInput] = useState('');

    function checkName(){
         if(nameInput.length < 3){
            return true;
         }else{
            return false;
         }

    }
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div>
                <h4 className="text-center">Ingrese el nombre del cliente</h4>
            </div>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className='text-center'
                size="lg"
                type="text"
                placeholder="Nombre"
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
            disabled = {checkName() ? true : false}
            
            onClick={ () =>{ 
                        props.onHide(nameInput);
                    }}>Continuar</Button>
          </Modal.Footer>
        </Modal>
      );
    }

export default ClientModal;