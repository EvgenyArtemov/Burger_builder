import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHAndler/withErrorHandler';
import ContactData from '../Checkout/ContactData/ContactData';
import Axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        console.log(this.props)
        Axios.get('https://react-burger-builder-a17e0.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        });
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
        .map(ingKey => {
            return ingredients[ingKey]
        })
        .reduce((acc, cur) => acc+cur);
        this.setState({purchasable: sum > 0 ? true : false})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    closeHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Evgeny",
        //         age: 29
        //     },
        //     email: 'box@gmail.com',
        //     delivery: '60'
        // } 
        // Axios.post('orders.json', order)
        // .then(response => {
        //     this.setState({loading: false, purchasing: false})
        // })
        // .catch(error => {
        //     this.setState({loading: false, purchasing: false})
        // });

    let queryParams = [];

    for(let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }

    queryParams.push('price' + this.state.totalPrice)

    let queryString = queryParams.join('&');

    this.props.history.push({
        pathname: "/checkout",
        search: '?' + queryString
    });
}

    render() {

        let disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;

        let burger = <Spinner />;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    isDisabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            cancel={this.closeHandler}
            continue={this.purchaseContinueHandler}
            price={this.state.totalPrice} />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} close={this.closeHandler}>
                    {orderSummary}
                </ Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, Axios);