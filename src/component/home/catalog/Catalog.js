import React from 'react';
import API from '../../../util/api';

import BookCard from './BookCard';

import { CardColumns, Col, Row } from 'react-bootstrap';
import Categories from './categories/Categories';
import PaginationBar from './pagination/PaginationBar';

class Catalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: '',
            books: [],
            pageIndex: 1,
            onPage: 3,
            totalPages: 1
        }
        this.handleCategory = this.handleCategory.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleOnPage = this.handleOnPage.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleCategory(e) {
        const selectedCategory = e.target.value;
        this.updateBooks(selectedCategory, 1, this.state.onPage);
    }

    handlePage(e) {
        const pageIndex = e.target.value;
        this.updateBooks(this.state.selectedCategory, pageIndex, this.state.onPage);
    }

    handleOnPage(e) {
        const onPage = e.target.value;
        this.updateBooks(this.state.selectedCategory, 1, onPage);
    }

    handleAddToCart(e) {
        const id = e.target.value;
        API.post('cart/add', null, {
            params: {
                id
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
        console.log(e.target);
    }

    updateBooks(selectedCategory, pageIndex, onPage) {
        var url = 'catalog/books';
        if (selectedCategory !== '') {
            url = url + '/categories/' + selectedCategory;
        }
        API.get(url, {
            params: {
              pageIndex: pageIndex,
              onPage: onPage
            }
          })
        .then(res => {
            this.setState({
                books: res.data.books,
                selectedCategory: selectedCategory,
                pageIndex: res.data.pageIndex,
                totalPages: res.data.totalPages,
                onPage: onPage
            });
        })
        .catch(err => {
            console.log('Error: ', err);
        })  
    }

    componentDidMount() {
        this.updateBooks(this.state.selectedCategory, this.state.pageIndex, this.state.onPage); 
    }

    render() {
        var bookTable =
            <h5>Nothing found</h5>;
        if (this.state.totalPages > 0) {
            bookTable = 
                <Col>
                    <CardColumns>
                        {this.state.books.map(book => {
                            return (
                                <BookCard key={book.id} book={book} handleAddToCart={this.handleAddToCart}/>
                            )
                        })}
                    </CardColumns>
                    <PaginationBar pageIndex={this.state.pageIndex} totalPages={this.state.totalPages}
                        handlePage={this.handlePage} handleOnPage={this.handleOnPage}/>
                </Col>;
        }
        return(
            <Row>
                <Col sm={12} md={3}>
                    <Categories handleCategory={this.handleCategory} selectedCategory={this.state.selectedCategory}/>
                </Col>
                {bookTable}
            </Row> 
        );
    }
}

export default Catalog;