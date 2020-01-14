import React from 'react';
import Aux from '../../hoc/Aux';
import classes from '../Layout/Layout.module.scss';

const layout = (props) => (

    <Aux>
        <div>ToolBar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
    
)

export default layout;