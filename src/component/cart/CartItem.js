import React from 'react';

import { Card, Row, Col, Button, Image, FormControl } from 'react-bootstrap';
import BinLogo from '../../bin.svg';

const CartItem = (props) => {
    const item = props.cartItem;
    return(
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src={process.env.PUBLIC_URL + '/BookMock.png'} fluid rounded/>
                    </Col>
                    <Col xs={6} md={3}>
                        <h5>{item.name}</h5>
                    </Col>
                    <Col xs={9} md={3} className="text-right">
                        <FormControl type="number" min="1" defaultValue={item.quantity} 
                                    onChange={props.handleItemQuantityChange} size="sm"
                                    itemId={item.id}/>
                        x {item.price.toFixed(2)} = <b>{(item.quantity * item.price).toFixed(2)}$</b>
                    </Col>
                    <Col xs={3} md={2} className="text-right">
                        <Button variant="outline-danger" size="sm"><Image src={BinLogo} height="25px"/></Button>                
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
} 

export default CartItem;