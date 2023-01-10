import React, { Component } from 'react'
import $ from "jquery"
import { connect } from 'react-redux'
import { closeEnach } from "../actions/model";
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

class PaymentModel extends Component {

    constructor() {
        super()
        this.state = initialState;
       
        this.testRef = React.createRef();
    }

    

    componentDidUpdate(prevProps)
    {
        if(prevProps.open_enach !== this.props.open_enach)
        {
            this.setState(initialState);
        }

        $('.dd___').click(function(){
            
            $(".table__").hide();
        })
    }


    closeModel = () => {
        this.props.dispatch(closeEnach())
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
        const { isLoading, open_enach } = this.props
        return (
            <>
            {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''}
            {/* Modal */}
             <Modal show={open_enach} >
                <div className="modal-dialog">
                {/* Modal content*/}
                <form  className="f_height">
                <div className="modal-content">
                    
                <div className="modelbg_1 modal-header">
                        <button type="button" onClick={this.closeModel} className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                        <div className="row">
                            <div className="col-sm-12">
                        <div className="fullrow float-left mb-3">
                        <div className="leftpart float-left">
                            <div className="namearea float-left pr-4">
                            <Modal.Title>Sneha Sharma</Modal.Title>
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
                    </div>


                    <Modal.Body className="modal-body pt-0 px-0">
                    
                    <Scrollbar>
                      <div className='v-scroll_st'>  
                      
                      <div className='p-5'>
                          <div className='shadow payment-wrap'>
                            <div className='p-o_head d-flex justify-content-between'>
                                <div className='p-o_head_l'>
                                    <h3 className='mb-1'>3 Months</h3>
                                    <p className='m-0'>Tenure</p>
                                </div>
                                <div className='p-o_head_r'>
                                    <h3 className='mb-1'><i className='rupee'>`</i> 90,000</h3>
                                    <p className='m-0'>Monthly</p>
                                </div>
                            </div>
                            <div className='min-height'>
                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>Due Today <span><img src={"images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid' /></span></p>
                                        <h3><i className='rupee'></i>20,000</h3>
                                    </div>
                                    <div className='emi_r'>
                                        <p className='mb-1'>Tenure</p>
                                        <h3><i className='rupee'></i>90,000</h3>
                                    </div>
                                </div>

                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>Interest (APR)</p>
                                        <h3>fff% p.a</h3>
                                    </div>
                                    <div className='emi_r'>
                                        <p className='mb-1'>EMI account</p>
                                        <h3 className='d-flex align-items-center justify-content-end'>*******9172
                                            <img
                                                src={"images/bank-icon/bank-2.png"}
                                                className='img-fluid'
                                                alt="apple"
                                                style={{ "width": '18px' }}
                                            />
                                        </h3>
                                    </div>
                                </div>

                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>First EMI due date</p>
                                        <h3>12 December, 2022</h3>
                                    </div>
                                    <div className='emi_r'>
                                        <p className='mb-1'>Last EMI due date</p>
                                        <h3>12 December, 2022</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='border-line-dotted'></div>

                            <div className='d-flex justify-content-center align-items-center pt-3'>
                                <p className='poweredBy m-0 mr-2'>Powered by</p>
                                <img src={"images/fullerton_india.png"} className='img-fluid' alt="fullerton_india" />
                            </div>
                            </div>
                        </div>
                        <div className='p-5'>
                            <h5 className='text-center  mb-3'>Enter OTP sent to XXXXXX1363</h5>
                            <div className='row justify-content-center'>
                                <div className='col-8'>
                                <form  className="otpform" >
                                    <input
                                        className="otp"
                                        name=""
                                        id=""
                                        type="text"
                                        autoComplete=""
                                        tabIndex="1" 
                                        maxLength="1" 
                                        placeholder={0}
                                        />
                                        <input
                                        className="otp"
                                        name=""
                                        id=""
                                        type="text"
                                        autoComplete=""
                                        tabIndex="2" 
                                        maxLength="1" 
                                        placeholder={0}
                                        />
                                        <input
                                        className="otp"
                                        name=""
                                        id=""
                                        type="text"
                                        autoComplete=""
                                        tabIndex="3" 
                                        maxLength="1"
                                        placeholder={0} 
                                        />
                                        <input
                                        className="otp"
                                        name=""
                                        id=""
                                        type="text"
                                        autoComplete=""
                                        tabIndex="4" 
                                        maxLength="1"
                                        placeholder={0} 
                                        />
                                    </form>

                                    <div className='text-center'>
                                    <span className='d-inline-block invalid_otp mt-3'>Please enter valid OTP</span>

                                        <p className='mb-4'>
                                            <img src={"images/icons/icon-ind.png"} alt="icon-ind2" className='img-fluid'/> Verification code valid for next min
                                        </p>  


                                        <button onClick={this.handleResendSendOtp} className='d-inline-block resend-btn'>
                                            Resend OTP
                                        </button>
                                    </div>

                                    
                                </div>
                                
                            </div>
                        </div>
                        <div className="mt-5 pr-4">
                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                            <Button style={{cursor:'pointer'}}className="border-0 mr-4 btn cancel">Reject</Button>
                            <Button 
                                className="btn btn-default_"
                            >Approve</Button>
                            </div>
                         </div>
                        </div>  
                        </Scrollbar>
                        </Modal.Body>
                    </div>
                </form>
                </div>
            </Modal>
            {/*Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { open_enach } = state.model;
    const { isLoading, user_id } = state.auth;
    const { products } = state.user;
    return {
        open_enach,
        user_id,
        products,
        isLoading,
    };
  }

export default connect(mapStateToProps)(PaymentModel)