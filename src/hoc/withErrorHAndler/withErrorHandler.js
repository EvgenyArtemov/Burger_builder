import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedElement, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor(){
            super();
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorHandler = () => {
            this.setState({error: null})
        }

        render() {
            return(
                <Aux>
                <Modal show={this.state.error}
                       close={this.errorHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedElement {...this.props} />
            </Aux>
            )
        }
    } 
}


export default withErrorHandler;