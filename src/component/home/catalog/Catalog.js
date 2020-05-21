import React from 'react';
import API from '../../../util/api';

import BookCard from './BookCard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Catalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookCards: []
        }
    }

    componentDidMount() {
        API.get('catalog')
        .then(res => {
            this.setState({bookCards: res.data});
        })
        .catch(err => {
            console.log('Error: ', err);
        })
    }

    render() {
        return(
            <Row>
                {this.state.bookCards.map(book => {
                    return (
                        <Col key={book.name} lg={3} md={4} sm={6}>
                            <BookCard name={book.name} genre={book.genre}/>
                        </Col>
                    )
                })}
            </Row>
        );
    }
}

export default Catalog;