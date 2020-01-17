import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from '../Layout/Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        sideDrawerShow: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({sideDrawerShow: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return ({sideDrawerShow: !prevState.sideDrawerShow})
            
        })
    }

    render (){
        return (
            <Aux>
                <Toolbar drawerClick={this.sideDrawerOpenHandler} />
                <SideDrawer show={this.state.sideDrawerShow} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

export default Layout;