import React, { Component } from 'react'
import $ from "jquery"
import { connect } from 'react-redux'
import { closeModel } from "../actions/model";
import { createLeads, getLeads } from "../actions/user";
import { openLeadProfileModel } from "../actions/model"
import { Modal, Button, Form } from "react-bootstrap"
import { openLoanCanelModal } from "../actions/model"
import { Scrollbar } from "react-scrollbars-custom";

const initialState = {
    mobile: '',
    first_name:'',
    last_name:'',
    email:'',
    product: '',
    product_price:'',
    loan_amount:'',
    isValid: true,
    errorMsg: '',
    isSuccess: '',
    successMsg: '',
    onBoarding: 0,
    active: false, 
    invoiceBtn: true
};

class ApprovalModel extends Component {

    constructor() {
        super()
        this.state = initialState;
       
        this.testRef = React.createRef();
    }

    

    componentDidUpdate(prevProps)
    {
        if(prevProps.cancellation_request_show !== this.props.cancellation_request_show)
        {
            this.setState(initialState);
        }

        $('.dd___').click(function(){
            
            $(".table__").hide();
        })
    }


    closeModel = () => {
        this.props.dispatch(closeModel())
    }


    openLoanCancel = () =>{
        
        this.props.dispatch(openLoanCanelModal());
    }

      scrollToBottom = () =>{
        var objDiv = document.getElementById("create-lead");
        objDiv.scrollTop = objDiv.scrollHeight;
      }

      stToggle = () =>{
        this.setState({ active: !this.state.active });
        this.setState({ invoiceBtn: !this.state.invoiceBtn });
      }
      stInvoice = () =>{
        this.setState({ active: true });
        this.setState({ invoiceBtn: false });
      }
      

     

    render() {
        const { isLoading, products } = this.props
        return (
            <>
            {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''}
            {/* Modal */}
            <div className="modal right fade myModal" id="myModa2" role="dialog">
                <div className="modal-dialog">
                {/* Modal content*/}
                <form  className="f_height">
                <div className="modal-content">
                    
                    <div className="modelbg_1 modal-header">
                        <button type="button" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                        <div className="row">
                            <div className="col-sm-12">
                        <div className="fullrow float-left mb-3">
                        <div className="leftpart float-left">
                            <div className="namearea float-left pr-4">
                            <Modal.Title> Sharma</Modal.Title>
                            <span className="d-block appnum">AE - 00000000</span>
                            </div>
                            <div className="statusbtn float-left">
                                <span className="btn btn-sm btn-blue radius-20">APPROVED</span>
                            </div>
                        </div>
                        <div className="rightpart float-right">
                            <i className="fas fa-pen"></i>
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <span className="icontext"><i className="fas fa-phone-alt"></i>000000</span>
                                <span className="icontext"><i className="fas fa-envelope"></i>aaaaaaaaaaaaaa</span>
                            </div>
                            <div className="col-sm-4">
                               <span className="icontext"><i className="fas fa-credit-card"></i> aaaaa</span>
                               <span className="icontext"><i className="fas fa-cube"></i> aaaaaa</span>
                            </div>
                            <div className="col-sm-4">
                                <span className="icontext"><i className="fas fa-rupee-sign"></i> <span className="amtdetails">Loan Amount<b><i className="fas fa-rupee-sign"></i> 0000</b></span></span>
                            </div>
                        </div>
                        </div>
                        </div>

                        {/* <div className='row justify-content-between align-items-start mb-4'>
                            <div className='col-sm-7'>
                                <h5 className="modal-title fz24">Sneha Sharma 666666</h5>
                                <p>AI656236423</p>
                            </div>
                        <div className='col-sm-5 d-flex justify-content-end'>
                        <button className=''><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                        </div>
                            
                        </div>

                        <div className='row'>
                            <div className='col-sm-4'>
                            Order Value
                                <span className="icontext">
                                    <i className="fas fa-rupee-sign"></i> 
                                    <span className="amtdetails">Loan Amount</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                            Payment Date
                                <span className="icontext">
                                    <i className="fas fa-rupee-sign"></i> 
                                    <span className="amtdetails">Loan Amount</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                                UTR No.
                                <span className="icontext">
                                <i className="fas fa-rupee-sign"></i> 
                                <span className="amtdetails">Loan Amount</span>
                            </span>
                            </div>
                        </div> */}
                        
                    </div>


                    <div id="" className="modal-body pt-0 px-0">
                  
                    <Scrollbar>
                      <div className='v-scroll_st px-4'>  
                            <div className='mb-5 pb-5'>
                                <div className="col-sm-12 mt-4 mb-5 form-group clearfix">
                                
                                        <ul className="timeliner">
                                            <li className="complete">
                                                <span className="leadTitle">Application</span>
                                            </li>
                                            <li className='inProgress'>
                                                <span className="leadTitle">Document</span>
                                            </li>
                                            <li>
                                                <span className="leadTitle">Payment Plan</span>
                                            </li>
                                            <li>
                                                <span className="leadTitle">Repayment</span>
                                            </li>
                                        </ul>
                                </div>

                                <div className='p-lg-5 p-4 shadow rounded mb-4'>
                                    <div className='row align-items-center'>
                                        <div className='col-3'>
                                            <img src="images/icons/thumbsup.png"></img>
                                        </div>
                                        <div className='col-9'>
                                            <p>Sit back &amp; relax till customer completes bank details verification!</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-right pt-4'>Customer didn't receive the link? 
                                <button className='links'>Send Again</button></p>
                            </div>

                            <div className='text-right'>
                                <button className='proceed-btn'><img src="images/loadinfo2.gif"></img> Waiting for customer to proceed...</button>
                            </div>
                        </div>  
                        </Scrollbar>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            {/*Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { cancellation_request_show } = state.model;
    const { isLoading, user_id } = state.auth;
    const { products } = state.user;
    return {
        cancellation_request_show,
        user_id,
        products,
        isLoading,
    };
  }

export default connect(mapStateToProps)(ApprovalModel)