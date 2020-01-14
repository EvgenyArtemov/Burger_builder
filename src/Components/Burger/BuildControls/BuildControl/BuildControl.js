import React from 'react';

import classes from './BuildControl.module.scss';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <p className={classes.Label}>{props.label}</p>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
)

export default BuildControl;