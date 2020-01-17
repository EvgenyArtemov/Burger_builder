import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png';
import classes from './logo.module.scss';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="burger logo"/>
        </div>
    )
}


export default logo;