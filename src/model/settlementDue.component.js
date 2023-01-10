import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModel, closeLoanCanelModal } from "../actions/model";
import { Modal, Button, Form } from "react-bootstrap"
import { Scrollbar } from "react-scrollbars-custom";
import {getSettlement} from '../actions/user';


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
    active: true, 
    invoiceBtn: true
};

class SettlementDue extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.testRef = React.createRef();
    }

    

    componentDidUpdate(prevProps)
    {
        if(prevProps.settlement_due_show !== this.props.settlement_due_show)
        {
            this.setState(initialState);
        }
    }


    closeModel = () => {
        this.props.dispatch(closeModel())
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
      

     

    render() {
        const { isLoading, userMessage,settlementDataDue,orderSummary } = this.props
        const item = settlementDataDue

        console.log('', userMessage)
        console.log('settlement duw order',orderSummary)
        return (
            <>
            {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''}
            {/* Modal */}
            <div className="modal right fade myModal" id="myModal5" role="dialog">

                <div className="modal-dialog" key={item.id}>
                {/* Modal content*/}
                <form  className="f_height">
                <div className="modal-content">
                    
                    <div className="modelbg_1 modal-header">
                        <button type="button" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                        <div className='row justify-content-between align-items-start mb-4'>
                            <div className='col-sm-7'>
                                <h5 className="modal-title fz24">{orderSummary && orderSummary.customer_name?orderSummary.customer_name:''}<sup className='sup'>w</sup></h5>
                                <p>{orderSummary.plan && orderSummary.plan.application__c ? orderSummary.plan.application__c:'-'}</p>
                            </div>
                            {/* <div className='col-sm-5 d-flex justify-content-lg-end'>
                            <button className='' type='button'><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                            </div> */}
                            <div>
                                {/* <button className='p-2'><i className="fa fa-pencil" aria-hidden="true"></i></button> */}
                                    <button type='button' className='p-2 ml-2'  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <i className="fas fa-times" style={{float:'right',paddingRight:'5px'}}></i>
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
                                    <span className="amtdetails">{ orderSummary &&  orderSummary.order_value ? orderSummary.order_value:'0'}</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                            Payment Date
                                <span className="icontext">
                                    {/* <i className="fas fa-rupee-sign"></i>  */}
                                    <span className="amtdetails">{orderSummary && orderSummary.payment_date ?orderSummary.payment_date:'-'}</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                                UTR No.
                                <span className="icontext">
                                {/* <i className="fas fa-rupee-sign"></i>  */}
                                <span className="amtdetails">{orderSummary && orderSummary.utr_num ?orderSummary.utr_num:'-'}</span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div id="" className="modal-body pt-0  px-0">
                    <Scrollbar>
                    <div className='v-scroll_st px-3'>  
                        <div className='order_summery_wrapper pb-3 pt-5 px-3'>
                        <div className='shadow rounded-20 pb-4 mb-4'>
                            <div className='row align-items-center'>
                                    <div className='col-sm-8 d-flex align-items-center'>
                                        <h4 className='cpp_title mt-4 mb-4 px-4'> Order Summary</h4> <span className='dl_d'>Delivered on 31/01/22</span>
                                    </div>
                                    <div className='col-sm-4'>
                                        <span className='smi'>AM99-9912-1122-WUCK</span>
                                    </div> 
                            </div>
                            <div className='row px-4'>
                                            <div className='col-lg-9'>
                                                <div className='row'>
                                                    <div className='col-lg-3'>
                                                   { orderSummary && orderSummary.product_image ? <img src={orderSummary.product_image} alt="product" className='img-fluid'/>: '-'}
                                                    </div>
                                                    <div className='col-lg-9 pro_description'>
                                                        <h5>{orderSummary && orderSummary.product_name ? orderSummary.product_name:'-'}</h5>
                                                        <p>{orderSummary && orderSummary.product_description ? orderSummary.product_description:'-'}</p>
                                                        <span>{orderSummary && orderSummary.product_sku ? `SKU: ${orderSummary.product_sku}`:'-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-3'>
                                            <p className='price__ color_DarkCerulean font-weight-bold'>{orderSummary && orderSummary.product_price ? `₹ ${orderSummary.product_price}`:'-'}</p>
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

                        {this.state.active?
                        <>
                        <div className='shadow rounded-20'>
                            <div className='table__ px-4 py-3'>
                                <h5 className='modal-title mb-4 fz20'>Shipment Details</h5>
                                <div className='row mb-4'>
                                    <div className='col-sm-12'>
                                        <div className='th p-0'>Expected Date of Payment</div>
                                        <div className='td p-0'>02/02/2022</div>
                                    </div>
                                    
                                </div>

                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <div className='th p-0'>Billing Address</div>
                                        <div className='td p-0'>1546/27, Hari Singh Nalwa Street, Karol Bagh, New Delhi, Delhi - 110005</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        </>
                        :null
                        }
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
    const { settlement_due_show } = state.model;
    const { isLoading, user_id } = state.auth;
    const { userMessage,settlementDataDue,orderSummary } = state.user;
    return {
        settlement_due_show,
        user_id,
        userMessage,
        isLoading,
        settlementDataDue,
        orderSummary
    };
  }

export default connect(mapStateToProps)(SettlementDue)