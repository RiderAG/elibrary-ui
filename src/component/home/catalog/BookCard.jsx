import React from 'react';

import Card from 'react-bootstrap/Card';
import { Button, Modal, Media, Image, Row, Col } from 'react-bootstrap';

const BookCard = (props)  => {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Card bg="dark" text="white" onClick={handleShow}>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/BookMock.png'} />
            <Card.Body>
                <Card.Title>{props.book.name}</Card.Title>
                <Card.Text>
                    Author: {props.book.author}
                    <br/>
                    Category: {props.book.category}
                </Card.Text>
            </Card.Body>
        </Card>
  
        <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.book.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Media>
                    <Row>
                        <Col sm={6} xs={12}>
                            <Image src={process.env.PUBLIC_URL + '/BookMock.png'} alt="book" width="100%"/>
                        </Col>
                        <Col>
                            <Media.Body>
                                Author: {props.book.author}
                                <br/>
                                Category: {props.book.category}
                                <br/>
                                Publisher: {props.book.publisher}
                                <br/>
                                Year: {props.book.year}
                                <br/>
                                Pages: {props.book.pages}
                                <br/>
                                Price: {props.book.price}
                            </Media.Body>
                        </Col>
                    </Row>
                </Media>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export default BookCard;