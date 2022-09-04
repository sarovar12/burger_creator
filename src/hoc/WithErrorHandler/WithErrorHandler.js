import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxi";
const withErrorHandler =( WrappedComponent, axios )=>{
   
    return class extends Component { 
        state={
            error:null,
        }
        UNSAFE_componentWillMount(){
            this.requestInceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            this.responseInceptor= axios.interceptors.response.use(null,error=>{
                this.setState({error:error})
        
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInceptor);
            
            axios.interceptors.request.eject(this.responseInceptor);
        }
        
        errorConfirmedHandler =()=>{
            this.setState({error:null})
        }
        render(){
              return(
                <Aux>
                <Modal
                modalClosed={this.errorConfirmedHandler}
                 show={this.state.error}>

                    {this.state.error?this.state.error.message:null}
                </Modal>
               <WrappedComponent {...this.props}/>
               </Aux>

              );
        }
        
}}
export default withErrorHandler;