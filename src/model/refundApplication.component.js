import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModel, closeLoanCanelModal } from "../actions/model";
import { merchantcancellation } from "../actions/user";
import { Modal, Button, Form } from "react-bootstrap"
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
    active: true, 
    invoiceBtn: true,
    ImageName:'',
    refundAmount:'',
    UTRNo:'', 
    showErr:false,
    errMsg:'',
    showSuccess:false
};

class RefundApplication extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.testRef = React.createRef();
    }

    

    componentDidUpdate(prevProps)
    {
        if(prevProps.refund_app_show !== this.props.refund_app_show)
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

      handleImageUpload = (e) => {
        console.log(e.target.files[0]);
        this.setState({ImageName:e.target.files[0].name});
    }


    closeCancelrefModel = (e) => {
        e.preventDefault();
        // let stage = 'Loan Declined';
        // let objData = `stage=${stage}`;
        // let user_sfid = localStorage.getItem('sfid');
        // console.log(this.props);
        let obj = {
            merchant_sfid:localStorage.getItem('sfid'),
            opportunity_id:this.props.seettlemt_opp_id,
            utr_number: this.state.UTRNo,
            refund_amount: this.state.refundAmount,
            action: "Refund",
        };
        // this.props.dispatch(merchantSettlementCancellationStatusUpdate(obj)).then(res => {
        //     this.props.dispatch(getSettlement(objData, user_sfid));
        //     console.log(res);
    // })
        this.props.dispatch(merchantcancellation(obj)).then(res => {
            if(res.status === 'success'){
                this.setState({showSuccess:true,showErr:false,errMsg:''})
            }else{
                if(res.status === 'error'){
                    this.setState({showErr:true,errMsg:res.message})
                }
            }
        })
        //  this.props.dispatch(loanModalClose())
    }


     

    render() {
        const { isLoading, userMessage,settlementDataRefund,orderSummary } = this.props
        console.log(orderSummary);
        const item = settlementDataRefund
        return (
            <>
            {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''}
            {/* Modal */}
            <div className="modal right fade myModal" id="myModal4" role="dialog">
           
                <div className="modal-dialog"  key={item.id} >
                {/* Modal content*/}
                <form  className="f_height">
                <div className="modal-content">
                
                    <div className="modelbg_1 modal-header">
                        <button type="button" className="abs_close close" data-dismiss="modal" onClick={() => this.setState(initialState)}> <i className="fas fa-times"></i> </button>

                        <div className='row justify-content-between align-items-start mb-4'>
                            <div className='col-sm-10'>
                               <div className='d-flex'> <h5 className="modal-title fz24 mr-4">{orderSummary && orderSummary.customer_name?orderSummary.customer_name:''}<sup className='sup'>w</sup></h5>{this.state.showSuccess && <h6 className='bg-danger text-white py-2 px-4' style={{ borderRadius:'20px',width:'max-content'}}>Loan Cancelled</h6> }</div>
                                <p>{orderSummary.plan ? orderSummary.plan.application__c:'-'}</p>
                            </div>

                            <div>
                                {/* <button className='p-2'><i className="fa fa-pencil" aria-hidden="true"></i></button> */}
                                    <button type='button' className='p-2 ml-2'  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <i className="fas fa-times"></i>
                                        <a className="dropdown-item" style={{cursor:'pointer'}} >Raise Query</a>
                                        <a className="dropdown-item" style={{cursor:'pointer'}}  onClick={this.closeCancelModel}>Initiate Cancellation</a>
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
                                    {/* <i className="fas fa-rupee-sign"></i>  */}
                                    <span className="amtdetails">{orderSummary.payment_date && orderSummary.payment_date!=null?orderSummary.payment_date:'-'}</span>
                                </span>
                            </div>
                            <div className='col-sm-4'>
                                UTR No.
                                <span className="icontext">
                                {/* <i className="fas fa-rupee-sign"></i>  */}
                                <span className="amtdetails">{orderSummary.utr_num && orderSummary.utr_num!=null?orderSummary.utr_num:'-'}</span>
                            </span>
                            </div>
                        </div>
                    </div>

                    <div id="" className="modal-body pt-0  px-0">
                        <Scrollbar>
                            <div className='v-scroll_st px-3'>
                         { this.state.showSuccess && <div className='shadow my-3 py-3 mx-3'>
                                <div className='d-flex justify-content-center align-items-center'>
                                <i className="fa fa-check-circle mr-2" style={{ fontSize: "34px", color: "#00FF00" }}></i>  <h5>Application closed Successfully</h5>     
                                        
                                </div>
                            </div>}
                            <div className="">
                       {this.state.showSuccess ?(<div className="col-sm-12 form-group">
                            <ul className="timeliner_ px-3 mt-4">
                                <li className="complete">
                                    <span className="leadTitle">Refund Initiated</span>
                                </li>
                                <li className='complete'>
                                    <span className="leadTitle">Payment Done</span>
                                </li>
                                <li className='complete'>
                                    <span className="leadTitle">Application Closed</span>
                                </li>
                            </ul>
                        </div>) :(<div className="col-sm-12 form-group">
                            <ul className="timeliner_ px-3 mt-4">
                                <li className="complete">
                                    <span className="leadTitle">Refund Initiated</span>
                                </li>
                                <li className='inProgress'>
                                    <span className="leadTitle">Payment Done</span>
                                </li>
                                <li>
                                    <span className="leadTitle">Application Closed</span>
                                </li>
                            </ul>
                        </div>)}
                            </div>
     
                            <div className='order_summery_wrapper pb-3 px-3'>

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
                                           {orderSummary.product_image && <img src={orderSummary.product_image} alt="product" className='img-fluid'/>}
                                           {/* <img src='../img/loptop.png' alt="product" className='img-fluid'/> */}

                                            </div>
                                            <div className='col-lg-9 pro_description'>
                                                <h5>{orderSummary.product_name && orderSummary.product_name!=null?orderSummary.product_name:'- '}</h5>
                                                <p>{orderSummary.product_description && orderSummary.product_description!=null?orderSummary.product_description:''}</p>
                                                <span>{orderSummary.product_sku && orderSummary.product_sku!=null? `SKU: ${orderSummary.product_sku}`:'-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <p className='price__ color_DarkCerulean font-weight-bold'>{ orderSummary && orderSummary.product_price ? `₹ ${orderSummary.product_price}`:'-'}</p>
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
                            <div className='shadow rounded-20 py-4'>
                                <div className='table__ px-4'>
                                   <div className='d-flex align-items-center justify-content-between'> <h5 className='modal-title mb-4 fz20 mr-5'>Refund Details</h5> {this.state.showSuccess && <p className='bg-dark text-white px-4 py-2' style={{borderRadius:'20px'}}> Cancelled on 31/01/21</p>} </div>
                                        <div className='row mb-4'>
                                            <div className='col-sm-6'>
                                                <div className='th p-0'>Cancelled On</div>
                                                <div className='td p-0'>02/02/2022</div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='th p-0'>Cancellation Approved By</div>
                                                <div className='td p-0'>Ramesh Sharma</div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-sm-6 form-group'>
                                                <label className='form-label' htmlFor="">Refund Amount</label>
                                                <span className='c_s'>₹</span>
                                                    <input
                                                    type="text"
                                                    className="form-control pl-4"
                                                    placeholder="Enter Amount"
                                                    name="amount"
                                                    value={this.state.refundAmount}
                                                    onChange={(event) => this.setState({ refundAmount: event.target.value })}
                                                    required
                                                    />
                                            </div>

                                            <div className='col-sm-6 form-group'>
                                            <button className='info__' type='button'><img src="images/icons/info.png" alt="info" className='img-fluid'/></button>
                                            <label className='form-label' htmlFor="">UTR No. (Refund Reference)</label>
                                                
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter UTR No."
                                                name="amount"
                                                value={this.state.UTRNo}
                                                onChange={(event) => this.setState({ UTRNo: event.target.value })}
                                                required
                                                />
                                             <label for='uploadImage' style={{color:'blue', cursor:'pointer',width:'max-content', position: 'absolute',  top : '32px', right:'10px' }}><img src="images/icons/attach.png" alt="attach" style={{width:'15xx',height:'15px'}} className='img-fluid' /> Attach <input  type="file" accept="image/png, image/gif, image/jpeg" id="uploadImage" style={{display:'none'}} onChange={(e) => this.handleImageUpload(e)}/></label>
                                                    {this.state.ImageName && <p style={{float:'right', marginTop:"10px"}}>{this.state.ImageName} <span className='pl-2'> <i style={{cursor:'pointer'}} onClick={() => this.setState({ImageName:''})} className="fas fa-times"></i></span> </p>}
                                            </div>
                                        </div>
                                </div>
                            </div>
                            </>
                        :null}
                            </div>
                            <div className=" mt-5 pr-4">
                            {this.state.showErr && <div><p className='text-danger ml-5 mb-1'>{this.state.errMsg}</p></div>}
                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                            <Button style={{cursor:'pointer'}}className="border-0 mr-4 btn cancel" data-dismiss="modal"  onClick={() => this.setState(initialState)}>Cancel</Button>
                            <Button 
                              disabled={this.state.UTRNo.length === 0 || this.state.refundAmount.length === 0 ? true : false}
                                className="btn btn-default_"
                                onClick={this.closeCancelrefModel}
                            >SAVE</Button>
                            </div>
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
    const { refund_app_show } = state.model;
    const { isLoading, user_id } = state.auth;
    const { userMessage,settlementDataRefund,orderSummary,seettlemt_opp_id } = state.user;
    return {
        refund_app_show,
        user_id,
        userMessage,
        isLoading,
        settlementDataRefund,
        orderSummary,
        seettlemt_opp_id
    };
  }

export default connect(mapStateToProps)(RefundApplication)