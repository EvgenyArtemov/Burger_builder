import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
}


export default NavigationItems;