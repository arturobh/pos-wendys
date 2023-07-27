import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrderCopy from "./OrderCopy";
import OrderFooterCopy from "./OrderFooterCopy";
import icons from '../icons';


function PaymentModal(props){

    return (
        <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        fullscreen= {true}
      >
      <Form className='form-control-lg'>
        <Modal.Header closeButton>
          <Modal.Title  id="contained-modal-title-vcenter">
            <h2>PAGO</h2>
          </Modal.Title>
        </Modal.Header>
        <div className="payment-container">
            <Modal.Body >
                <Container>
                    <div className='order-copy-container'>
                        <div className='d-flex align-items-center justify-content-evenly order-header'>
                            <div className="d-flex align-items-center">
                                <img src={icons.bag} className="order-logo" alt="logo" />
                                <p className='fs-3'>ORDEN {props.orderNumber}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={icons.client} className="order-logo" alt="logo" />
                                <p className='fs-3'>{props.clientName}</p>
                            </div>
                        </div>
                        <OrderCopy
                            items={props.orderItems}
                        />
                        <OrderFooterCopy
                            orderItems={props.orderItems}
                        />
                    </div>
                </Container>
            </Modal.Body>
        </div>
        <Modal.Footer>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default PaymentModal;