import React from 'react';
import classes from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformIng = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])

    if(transformIng.length === 0){
        transformIng = <p>Please add ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIng}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;