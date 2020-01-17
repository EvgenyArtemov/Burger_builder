import React from 'react';
import classes from './DrawerToggle.module.scss';

const drawerToggle = (props) => {
    return (
        <div 
        className={classes.DrawerToggle} 
        onClick={props.clicked}>
            <div className={classes.line}></div>
            <div className={classes.line}></div>
            <div className={classes.line}></div>
        </div>
    )
}


export default drawerToggle;