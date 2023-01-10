import React, { Component } from 'react'
import readXlsxFile from 'read-excel-file'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { loanModalClose, loanModalApprove2Open, loanModalApprove2Close, loanModalRejectClose, loanModalReject2Open, loanModalReject2Close } from "../actions/model"
import { createBulkLeads, getLeads, merchantSettlementCancellationStatusUpdate, getSettlement, merchantcancellation,setActiveSettlement,merchantSettlementDetail} from "../actions/user"
import fileDownload from 'js-file-download'
import axios from 'axios'
import { Scrollbar } from "react-scrollbars-custom";

const initialState = {

}

class LoanCancellationModal extends Component {

    constructor() {
        super()
        this.state = {
            refundAmount: "",
            UTRNo: "",
            user_sfid: localStorage.getItem('user_sfid'),
            ImageName:'',
            showErr:false,
            errMsg:'',
        }

    }

    closeCancelModel = () => {
        this.setState({showErr:false,errMsg:''});
        this.props.dispatch(loanModalClose())
    }

    componentDidUpdate() {

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

        })
        //  this.props.dispatch(loanModalClose())
    }

    handle1modalClose = () => {
        let obj = {
            merchant_sfid:localStorage.getItem('sfid'),
            opportunity_id:this.props.seettlemt_opp_id,
            action:"Approve",         
        }
        this.props.dispatch(merchantcancellation(obj)).then(res => {
            if(res.status === 'success'){
                this.props.dispatch(loanModalClose());
                this.props.dispatch(loanModalApprove2Open());
            }else{
                if(res.status === 'error'){
                    this.setState({showErr:true,errMsg:res.message})
                }
            }
        })

        // this.props.dispatch(loanModalClose());
        // this.props.dispatch(loanModalApprove2Open());
        
    }

    handleImageUpload = (e) => {
        console.log(e.target.files[0]);
        this.setState({ImageName:e.target.files[0].name});
    }

    handleYesbtnReject = () => {
        let obj = {
            merchant_sfid:localStorage.getItem('sfid'),
            opportunity_id:this.props.seettlemt_opp_id,
            action:"Reject",         
        }
        this.props.dispatch(merchantcancellation(obj)).then(res => {
            if(res.status === 'success'){
                this.props.dispatch(loanModalRejectClose());
                this.props.dispatch(loanModalReject2Open());        
            }else{
                if(res.status === 'error'){
                    this.setState({showErr:true,errMsg:res.message})
                }
            }
        })
       
    }

    handlecloseApprove2model = () => {
        
        // this.props.dispatch(setActiveSettlement(null));
        // this.props.dispatch(setActiveSettlement('settlementDisbursed'));
        
        this.props.dispatch(loanModalApprove2Close());
        document.getElementById('close_loan_cancel').click();
        document.getElementById('nav-refunds-tab').click()
      
        this.props.dispatch(merchantSettlementDetail(this.props.seettlemt_opp_id));
        setTimeout(() => {
            
            document.getElementById('refund_settlement_modal').click();
        }, 500);
       
        // this.props.dispatch(setActiveSettlement('settlementRefundCount'));

    }

    handlecloseApprove2modelX = () => {
        this.props.dispatch(loanModalApprove2Close());
    }

    closeRejectHandler = () => {
        this.setState({showErr:false,errMsg:''});
        this.props.dispatch(loanModalRejectClose());

    }

   

    closeRejectHandler2 = () => {
        
        this.props.dispatch(loanModalReject2Close());
    }


    render() {
        const { loancancel_show, loancancel_show2, cancelLoanRejectModal, cancelLoanRejectModal2 } = this.props;

        return (
            <>

                <Modal show={loancancel_show} className="loan_cancel_modal">
                    <Modal.Header>
                        <Modal.Title><button type="button" className="close float-left" onClick={this.closeCancelModel}> <i className="fas fa-times"></i> </button></Modal.Title>
                    </Modal.Header>
                    {/* <form> */}
                    <Modal.Body>
                        <div className="row">

                            <div className="col-md-12 text-center px-lg-4">

                                <div className='px-lg-4'>
                                    <h5 className='font-weight-bold mb-2'>Cancel the Loan</h5>
                                    <p className='mb-5'>Are you sure you want to continue?</p>
                                </div>

                                 {this.state.showErr && <p className='text-danger'>{this.state.errMsg}</p>}
                                <button type="button" className="btn btn-dark w-75 mb-3"
                                    onClick={this.handle1modalClose}>
                                    Yes, Approve the Cancellation
                                </button>
                                <button style={{ cursor: 'pointer' }} className="downloadbulk mb-3" onClick={this.closeCancelModel}>
                                    No, Go back to Application
                                </button>
                            </div>

                        </div>

                    </Modal.Body>
                   
                </Modal>


                {/* reject byn modal 1 */}
                <Modal show={cancelLoanRejectModal} className="loan_cancel_modal">
                    <Modal.Header>
                        <Modal.Title><button type="button" className="close float-left" onClick={this.closeRejectHandler}> <i className="fas fa-times"></i> </button></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">

                            <div className="col-md-12 text-center px-lg-4">

                                <div className='px-lg-4'>
                                    <h5 className='font-weight-bold mb-2'
                    
                                 >Cancel the Loan</h5>
                                    <p className='mb-5'>Are you sure you want to reject the cancellation request?</p>
                                </div>

                                {this.state.showErr && <p className='text-danger'>{this.state.errMsg}</p>}
                                <button type="button" className="btn btn-dark w-25 mb-3" onClick={this.handleYesbtnReject}>
                                    Yes
                                </button>
                                <br />
                                <button style={{ cursor: 'pointer' }} className="downloadbulk mb-3" onClick={this.closeRejectHandler}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>

                {/* reject button modal 2 */}
                <Modal show={cancelLoanRejectModal2} className="loan_cancel_modal">
                    <Modal.Header>
                        <Modal.Title><button type="button" className="close float-left" onClick={this.closeRejectHandler2}> <i className="fas fa-times"></i> </button></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">

                            <div className="col-md-12 text-center px-lg-4">

                                <div className='px-lg-4 mb-5'>
                                    <div><i className="fa fa-check-circle mb-2" style={{ fontSize: "80px", color: "#32de84" }}></i></div>
                                    <h5 className='font-weight-bold mb-2'>Loan Cancellation Request Rejected</h5>
                                </div>


                                <button type="button" className="btn btn-dark w-50 mb-3">
                                    <a href="/leads" style={{ color: 'white' }}> Go to Leads</a>
                                </button>
                                <br />
                                <button style={{ cursor: 'pointer' }} className="downloadbulk mb-3" onClick={this.closeRejectHandler2}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>



                {/*approve btn modal 2  */}
                <Modal show={loancancel_show2} className="loan_cancel_modal">
                    <Modal.Header>
                        <Modal.Title><button type="button" className="close float-left" onClick={this.handlecloseApprove2modelX}> <i className="fas fa-times"></i> </button></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12 text-center px-lg-4">
                                <div className='px-lg-4 mb-5'>
                                    <div><i className="fa fa-check-circle mb-2" style={{ fontSize: "80px", color: "#32de84" }}></i></div>
                                    <h5 className='font-weight-bold mb-2'>Loan Cancelled Successfully</h5>
                                </div>
                                <button type="button" className="btn btn-dark w-50 mb-3" onClick={this.handlecloseApprove2model}
                                // data-toggle="modal"
                                // data-target="#myModal4" 
                                >
                                    Initiate Refund
                                </button>
                                <br />
                                <button style={{ cursor: 'pointer' }} className="downloadbulk mb-3" onClick={this.handlecloseApprove2modelX}>
                                    I'll do this later
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                                                       
                <button type="button" className="btn btn-dark w-50 mb-3 d-none"   id='refund_settlement_modal'
                                data-toggle="modal"
                                data-target="#myModal4" 
                                ></button>
              {/* after approve button 2  modal open */}
                <div className="modal right fade myModal" id="refundModal" role="dialog">

                    <div className="modal-dialog" style={{ width: '600px' }} >
                        {/* Modal content*/}
                        <form className="f_height" style={{ width: '100%' }}>
                            <div className="modal-content">

                                <div className="modelbg_1 modal-header">
                                    <button type="button" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                                    <div className='row justify-content-between align-items-start mb-4'>
                                        <div className='col-sm-7'>
                                            <h5 className="modal-title fz24"> <sup className='sup'>w</sup></h5>
                                            <p> </p>
                                        </div>

                                        <div className='col-sm-5 d-flex justify-content-lg-end'>
                                            <button className='' type='button'><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                        </div>


                                    </div>

                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            Order Value
                                            <span className="icontext">
                                                <i className="fas fa-rupee-sign"></i>
                                                <span className="amtdetails"></span>
                                            </span>
                                        </div>
                                        <div className='col-sm-4'>
                                            Payment Date
                                            <span className="icontext">
                                                <i className="fas fa-rupee-sign"></i>
                                                <span className="amtdetails"></span>
                                            </span>
                                        </div>
                                        <div className='col-sm-4'>
                                            UTR No.
                                            <span className="icontext">
                                                <i className="fas fa-rupee-sign"></i>
                                                <span className="amtdetails"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div id="" className="modal-body pt-0  px-0 bg-white" >
                                    <Scrollbar>
                                        <div className='v-scroll_st px-3'>
                                            <div className="">
                                                <div className="col-sm-12 form-group">
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
                                                </div>
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
                                                                    <img src="images/custom/loptop.png" alt="loptop" className='img-fluid' />
                                                                </div>
                                                                <div className='col-lg-9 pro_description'>
                                                                    <h5>Macbook Pro 2021 14‑inch</h5>
                                                                    <p>Silvergray, Apple M1 Pro with 8-core CPU, 14-core GPU, 16-core Neural Engine</p>
                                                                    <span>SKU: 1288374A</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-3'>
                                                            <p className='price__ color_DarkCerulean font-weight-bold'>₹ 1,49,000</p>
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
                                                                    <img src="images/wc-next.png" alt="drop-down" className={!this.state.active ? "rotate180" : "rotate90"} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* {this.state.active ?
                                <> */}
                                                <div className='shadow rounded-20 py-4'>
                                                    <div className='table__ px-4'>
                                                        <h5 className='modal-title mb-4 fz20'>Refund Details</h5>
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
                                                                <button className='info__' type='button'><img src="images/icons/info.png" alt="info" className='img-fluid' /></button>
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
                                                {/* </>
                                : null} */}
                                            </div>

                                            <div className=" mt-5 pr-4">
                                                <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                    <Button style={{ cursor: 'pointer' }} className="border-0 mr-4 btn cancel">Cancel</Button>
                                                    <button

                                                        className="btn btn-default_"
                                                        data-dismiss='modal'
                                                        onClick={this.closeCancelrefModel}
                                                    >SAVE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Scrollbar>
                                </div>

                            </div>

                        </form>
                    </div>



                </div>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { loancancel_show, loancancel_show2, cancelLoanRejectModal, cancelLoanRejectModal2 } = state.model;
    const { MerchantCancelId,seettlemt_opp_id} = state.user;
    const { user_id } = state.auth;
    return {
        loancancel_show,
        user_id,
        MerchantCancelId,
        loancancel_show2,
        cancelLoanRejectModal,
        cancelLoanRejectModal2,
        seettlemt_opp_id,
    };
}

export default connect(mapStateToProps)(LoanCancellationModal)