import React, { Component } from 'react'
import $ from "jquery"
import { connect } from 'react-redux'
import { closeModel, closeLoanCanelModal,loanModalRejectOpen } from "../actions/model";
import { createLeads, getLeads } from "../actions/user";
import { openLeadProfileModel } from "../actions/model"
import { Modal, Button, Form } from "react-bootstrap"
import { openLoanCanelModal } from "../actions/model"
import { Scrollbar } from "react-scrollbars-custom";
// import {LoanCancellationModal} from "../model/loan-cancelation.component"

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
    invoiceBtn: true,
    showcancelmodal:true,
};

class CancellationRequest extends Component {

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

      closeCancelModel = () => {

        this.props.dispatch(closeLoanCanelModal())
      }
      
      handleReject = () => {
        console.log('handle click');
        this.props.dispatch(loanModalRejectOpen());
      }

    render() {
        const { isLoading, userMessage,orderSummary, showLoanCancelRequestModal } = this.props
        console.log('user msg',userMessage);
        return (
            <>
            {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''}
            {/* Modal */}
            <div className="modal right fade myModal" id="myModal6" role="dialog">
            {userMessage !== undefined && userMessage.data && userMessage.data.length > 0 &&
                                    (
                                      userMessage.data.map((item, index) => (

                <div className="modal-dialog" key={index}>
                {/* Modal content*/}
                <form  className="f_height">
                <div className="modal-content">
                    
                    <div className="modelbg_1 modal-header">
                        <button type="button" className="abs_close close" id='close_loan_cancel'  data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                        <div className='row justify-content-between align-items-start mb-4'>
                            <div className='col-sm-7'>
                                <h5 className="modal-title fz24">{orderSummary && orderSummary.customer_name?orderSummary.customer_name:''}</h5>
                                <p>{orderSummary.plan ? orderSummary.plan.application__c:'-'}</p>
                            </div>
                            <div>
                                {/* <button className='p-2'><i className="fa fa-pencil" aria-hidden="true"></i></button> */}
                                    <button type='button' className='p-2 ml-2'  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <i className="fas fa-times"  style={{float:'right',paddingRight:'5px'}}></i>
                                        <a className="dropdown-item" style={{cursor:'pointer'}} >Raise Query</a>
                                        <a className="dropdown-item" style={{cursor:'pointer'}} onClick={this.closeCancelModel}>Initiate Cancellation</a>
                                    </div>
                            </div>
                            
                        </div>

                        <div className='row'>
                            <div className='col-sm-4'>
                            Order Value
                                <span className="icontext">
                                    <i className="fas fa-rupee-sign"></i> 
                                    <span className="amtdetails">{orderSummary.order_value && orderSummary.order_value!=null?orderSummary.order_value:'0'}</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                            Payment Date
                                <span className="icontext">
                                    <span className="amtdetails">{orderSummary.payment_date && orderSummary.payment_date!=null?orderSummary.payment_date:'-'}</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                                UTR No.
                                <span className="icontext">
                                <i className=""></i> 
                                <span className="amtdetails">{orderSummary.utr_num && orderSummary.utr_num!=null?orderSummary.utr_num:'-'}</span>
                            </span>
                            </div>
                        </div>
                        
                    </div>


                    <div id="" className="modal-body pt-0 px-0">

                    <Scrollbar>
                      <div className='v-scroll_st px-3'>  
                        <div className='order_summery_wrapper px-3 pt-5'>

                                    <div className='shadow rounded-20 py-4'>
                                        <div className='row align-items-center mb-4'>
                                            <div className='col-sm-8 d-flex align-items-center'>
                                                <h4 className='cpp_title px-4'> Order Summary</h4> <span className='dl_d'>Delivered on 31/01/22</span>
                                            </div>
                                            <div className='col-sm-4'>
                                                <span className='smi'>AM99-9912-1122-WUCK</span>
                                            </div> 
                                        </div>
                                        <div className='row px-4'>
                                            <div className='col-lg-9'>
                                                <div className='row'>
                                                    <div className='col-lg-3'>
                                                    { orderSummary.product_image && <img src={orderSummary.product_image} alt="product" className='img-fluid'/>}
                                                    </div>
                                                    <div className='col-lg-9 pro_description'>
                                                        <h5>{orderSummary.product_name && orderSummary.product_name!=null?orderSummary.product_name:'-'}</h5>
                                                        <p>{orderSummary.product_description && orderSummary.product_description!=null?orderSummary.product_description:''}</p>
                                                        <span>{orderSummary.product_sku && orderSummary.product_sku!=null? `SKU: ${orderSummary.product_sku}`:'-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-3'>
                                                <p className='price__ color_DarkCerulean font-weight-bold'>{orderSummary.product_price && orderSummary.product_price!=null ? `₹ ${orderSummary.product_price}`:'-'}</p>
                                            </div>
                                        </div>
                                        <div className='row  px-4'>
                                            <div className='col-sm-12 d-flex justify-content-end'>
                                                <div className='th'>
                                                    <button 
                                                        type='button' 
                                                        className='dd___ position_top'
                                                        onClick={this.stToggle}
                                                    >
                                                            <img src="images/wc-next.png" alt="drop-down" className={!this.state.active? "rotate180" :"rotate90"}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='shadow rounded-20 bt-dot py-4'>
                                        {!this.state.active?
                                            <div className='table__ px-4'>
                                                <div className='row'>
                                                    <div className='col-sm-3'>
                                                        <div className='th'>Tenure</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.plan.net_tenure__c ?`${orderSummary.plan.net_tenure__c} months`:'-'}</div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className='th'>APR (p.a.)</div>
                                                        <div className='td'>{orderSummary.plan  && orderSummary.plan.interest_rate_apr__c ?`${orderSummary.plan.interest_rate_apr__c}%`:'-'}</div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className='th'>EMI Amount</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.plan.emi_amount__c ?`₹ ${orderSummary.plan.emi_amount__c}`:'-'}</div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className='th'>EMI Start Date</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.first_emi_date__c ? orderSummary.first_emi_date__c:'-'}</div>
                                                    </div>
                                                </div>
                                            

                                                <div className='row'>
                                                    <div className='col-sm-6'>
                                                        <div className='th'>Moratorium Tenure</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.moratorium_duration__c ?orderSummary.moratorium_duration__c:'-'}</div>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='th'>Subvention Amount</div>
                                                        <div className='td'>{orderSummary.disbursalDet && orderSummary.disbursalDet.length>0 && orderSummary.disbursalDet[0].subvention_fixed_amount__c ?orderSummary.disbursalDet[0].subvention_fixed_amount__c:'-'}</div>
                                                    </div>
                                                </div>
                                                
                                            </div>:null
                                        }
                                    
                                    {
                                        this.state.invoiceBtn ?  
                                        <div className='d-flex justify-content-end px-3 mb-3'>
                                        <button 
                                            type='button' 
                                            className='btn_style color_NavyBlue'
                                            onClick={this.stInvoice}
                                        >
                                            <img
                                                className=""
                                                src="images/icons/download_blue.png"
                                            />
                                            Invoice
                                        </button>
                                        </div> : null
                                    }
                                </div>
                        </div>
                        <div className="row mt-5 pr-4">
                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                            <Button style={{cursor:'pointer'}}className="border-0 mr-4 btn cancel" onClick={this.handleReject}>Reject</Button>
                            <Button 
                                className="btn btn-default_"
                                // as={LoanCancellationModal}
                                onClick={this.closeCancelModel}                             
                            >Approve</Button>
                            </div>
                         </div>
                        </div>  
                        </Scrollbar>
                        </div>
                    </div>
                </form>
                </div>
                                      )
                                      ))
                                }
            </div>
            {/*Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { cancellation_request_show,showLoanCancelRequestModal } = state.model;
    const { isLoading, user_id } = state.auth;
    const { userMessage,orderSummary } = state.user;
    return {
        cancellation_request_show,
        user_id,
        userMessage,
        isLoading,
        orderSummary,
        showLoanCancelRequestModal,
    };
  }

export default connect(mapStateToProps)(CancellationRequest)
