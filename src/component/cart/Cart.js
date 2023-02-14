import React from 'react';
import api from '../../util/api';
import CartItem from './CartItem';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: null
        }
        this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
    }
    
    calculateCartTotal() {
        let total = 0;
        this.state.cart.items.map(item => total += item.price * item.quantity);
        return total.toFixed(2);
    }

    handleItemQuantityChange(e) {
        let newItemQuantity = e.target.value;
        console.log(newItemQuantity);
        let itemId = e.target.getAttribute("itemId");
        console.log(itemId);
        api.put('cart/items/' + itemId, null, {
            params: {
                quantity: newItemQuantity
            }
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                cart: res.data
            })
        })
        .catch(err => {
            console.log('Error:', err);
        })
    }

    componentDidMount() {
        api.get('cart')
        .then(res => {
            if (res.status === 200) {
                this.setState({
                    cart: res.data
                });
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        })
    }

    render() {
        if (this.state.cart == null) {
            return <h4>Your cart is empty</h4>
        }
        return(
            <div>
                <h4>Cart</h4>
                {this.state.cart.items.map(cartItem => {
                    return (
                        <CartItem cartItem={cartItem} handleItemQuantityChange={this.handleItemQuantityChange}/>
                    );
                })}
                <h5>Total: {this.calculateCartTotal()}$</h5>
                <Button as={NavLink} to="/" variant="outline-secondary">Back to catalog</Button>
                <Button variant="warning">Checkout</Button>
            </div>
        );
    }
}

export default Cart; 