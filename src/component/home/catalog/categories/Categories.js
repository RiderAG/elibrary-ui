import React from 'react';
import API from '../../../../util/api';
import { Button } from 'react-bootstrap';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        API.get('catalog/categories')
        .then(res => {
            this.setState({categories: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className="mb-2">
                <h4>Categories</h4>
                <Button onClick={this.props.handleCategory} value="" variant="warning" block>all</Button>
                {this.state.categories.map(el => {
                    return <Button onClick={this.props.handleCategory} key={el} value={el} variant="outline-dark" block 
                                    active={el === this.props.selectedCategory}>{el}</Button>
                })}
            </div>
        );
    }
}

export default Categories;