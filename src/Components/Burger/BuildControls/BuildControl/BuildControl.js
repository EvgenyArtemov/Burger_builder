import React from 'react';

import classes from './BuildControl.module.scss';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <p className={classes.Label}>{props.label}</p>
        <button 
        onClick={props.removed} 
        className={classes.Less}
        disabled={props.disabled}
        >Less</button>

        <button 
        onClick={props.added} 
        className={classes.More}
        >More</button>
    </div>
)

export default BuildControl;