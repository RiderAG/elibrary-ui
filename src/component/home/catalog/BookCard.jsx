import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const BookCard = (props) => {
    return(
        <Card>
            <Card.Img variant="top" src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.genre}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;