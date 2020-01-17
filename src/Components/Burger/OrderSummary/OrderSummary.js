import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('OrderSummary will update');
        
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(el => {
        return (
            <li key={el}><span style={{textTransform: 'capitalize'}}>{el}</span>: {this.props.ingredients[el]}</li>
        )
    })
    return (
        <Aux>
            <h3>Your order</h3>
            <p>Your ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
        </Aux>
    )
    }

}

export default OrderSummary;