import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const BookCard = (props) => {
    return(
        <Card>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/BookMock.png'} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.genre}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;