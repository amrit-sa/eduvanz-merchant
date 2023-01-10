import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Modal, Button, Form } from "react-bootstrap"
import { closeLeadApplicationModel, openLeadProfileModel, openDropModel, closeDropModel, openQueryModel, closeQueryModel, openSuccessQueryModal, closeSuccessQueryModal, openLeadDropModal,closeLeadDropModal } from "../actions/model";
import {
    getLeadProfile, getAddress, getLeadProfileDocuemnt, getLeadPanDocuemnt, getLeadOtherDocuemnt,
    updateLoan, dropLead, raiseLeadQuery,merchantSettlementDetail
} from "../actions/user";
import dateFormat from 'dateformat';
import { Scrollbar } from "react-scrollbars-custom";

const initialState = {
    lead_sfid: null,
    username: '',
    userstatus: 'PENDING',
    owner_id: '',
    product: '',
    email: '',
    mobile: '',
    pan: null,
    card: '',
    dob: '',
    gender: '',
    pincode: '',
    loan_amount: '',
    selectedAddress: '',
    rent_amount: '',
    house: 0,
    company_name: '',
    monthly_income: '',
    profession: '',
    addressList: [],
    photo_verified: '',
    pan_verified: '',
    kyc_verified: '',
    created_date: '',
    profileType: '',
    profileBase: '',
    panType: '',
    panBase: '',
    frontProofType: '',
    frontProofBase: '',
    backProofType: '',
    backProofBase: '',
    frontFileType: 0,
    backFileType: 0,
    panFileType: 0,
    profileTitle: '',
    panTitle: '',
    frontTitle: '',
    backTitle: '',
    occupation:'',
    applicationStatus:'',
    showErr: false,
    loanerrmsg: '',
    showSuccess: false,
    showsuccessmsg: '',
    showErrdrop:false,
    droperrmsg:'',
    selectedReason:''


};

class LeadApplicationDetails extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

   

    async componentDidUpdate(prevProps)
    {
        if(prevProps.lead_application_show !== this.props.lead_application_show && this.props.lead_application_show === true)
        {
         let data = {
            user_sfid: this.props.lead_id,
            opp_sfid:this.props.opp_id
        }
        await this.props.dispatch(getLeadProfile(data)).then((response)=>{
            if(response.status ==="success")
            {
                let getData = response.data;
                let account_profile = getData.account_profile?getData.account_profile:'';
                let gender = getData.gender__c?getData.gender__c.toLowerCase():'';
                this.setState({
                    owner_id: getData.merchant_id,
                    lead_sfid: getData.opp_sfid?getData.opp_sfid:'',
                    username: getData.first_name__c,
                    userstatus: getData.account_status__c?getData.account_status__c:'PENDING',
                    product: getData.product_name?getData.product_name:'-',
                    email: getData.email__c,
                    mobile: getData.phone,
                    pan: getData.pan_number__c,
                    card: 'XXXXXXX76A',
                    dob: new Date(getData.date_of_birth_applicant__c),
                    loan_amount: getData.mrp__c?getData.mrp__c:'-',
                    pincode: getData.pin_code__c,
                    gender: getData.gender__c,
                    selectedAddress: account_profile?account_profile.current_address:0,
                    rent_amount: getData.rent_amount__c,
                    house: getData.rent_amount__c?2:1,
                    profession: getData.employer_type__c,
                    monthly_income: getData.monthly_income__c?getData.monthly_income__c:'',
                    company_name: getData.employer_name__c?getData.employer_name__c:'',
                    photo_verified: getData.is_photo_verified__c?getData.is_photo_verified__c:'',
                    pan_verified: getData.is_pan_document_verified__c?getData.is_pan_document_verified__c:'',
                    kyc_verified: getData.is_kyc_document_verified__c?getData.is_kyc_document_verified__c:'',
                    created_date: getData.createddate?getData.createddate:'',
                    occupation: getData.occupation__c ? getData.occupation__c :'',
                    applicationStatus : getData.limit_application_stage__c ? getData.limit_application_stage__c : '',
                })
            }
        });
        await this.props.dispatch(getAddress(data)).then((response)=>{
            if(response.status ==="success")
            {
                let getData = response.data && response.data[1] && response.data[1];
                this.setState({
                    addressList: getData,
                })
                
            }
        });
      await this.props.dispatch(merchantSettlementDetail(this.props.opp_id));

        let proData = {
            sfid: this.props.lead_id,
          }
        await this.props.dispatch(getLeadProfileDocuemnt(proData)).then((response)=>{
            if(response.status ==="success")
            {
                let getData = response.data;
                if(getData.base64 !==undefined && getData.base64 !=="")
                {
                    this.setState({
                        profileBase: "data:image/jpg;base64,"+getData.base64.base64,
                        profileType: "image/jpg",
                        profileTitle: getData.title
                    });
                }else{
                    this.setState({
                        profileBase: "",
                        profileType: ""
                    });
                }
            }
        });
        await this.props.dispatch(getLeadPanDocuemnt(proData)).then((response)=>{
            if(response.status ==="success")
            {
                let getData = response.data;
                if(getData.base64 !==undefined && getData.base64 !=="")
                {
                    let resData = getData.base64;
                    let type = 0;
                    let DocBase = ""
                    if(resData.filetype !==null )
                    {
                        if(resData.filetype ==="PDF")
                        {
                            type=2;
                            DocBase = "data:application/pdf;base64,"+resData.base64;
                        }else{
                            type=1;
                            DocBase = "data:image/jpg;base64,"+resData.base64;
                        }
                        
                    }
                    this.setState({
                        panFileType: type,
                        panBase: DocBase,
                        panType: resData.filetype?resData.filetype:'',
                        panTitle: getData.title,
                    });
                }else{
                    this.setState({ panBase: "", panType: "" });
                }
            }
        });
        this.props.dispatch(getLeadOtherDocuemnt(proData)).then((response)=>{
            if(response.status ==="success")
            {
                let getData = response.imageData &&  response.imageData;
                for (let i = 0; i < getData.length; i++) {
                    if(getData[i].base64['Document Type']   === 'Aadhar Front')
                    this.setState({
                        // frontFileType: type,
                        frontProofBase: "data:image/jpg;base64,"+getData[i].base64.base64,
                        frontProofType: 'image/jpg',
                        frontTitle: getData[i].title,
                    });
                    
                }
               

                
             
                // if(getData && getData.aadharfrontdata && getData.aadharfrontdata.length!==0)
                // {
            
                //     let resData = getData && getData.aadharfrontdata && getData.aadharfrontdata.base64?getData.aadharfrontdata.base64:'';
                //     let type = 0;
                //     let DocBase = ""
                //     if(getData.aadharfrontdata.filetype !==null )
                //     {
                //         if(getData.aadharfrontdata.filetype ==="PDF")
                //         {
                //             type=2;
                //             DocBase = "data:application/pdf;base64,"+resData.base64;
                //         }else{
                //             type=1;
                //             DocBase = "data:image/jpg;base64,"+resData.base64;
                //         }
                        
                //     }
                    // this.setState({
                    //     frontFileType: type,
                    //     frontProofBase: DocBase,
                    //     frontProofType: getData.aadharfrontdata.filetype?getData.aadharfrontdata.filetype:'',
                    //     frontTitle: getData.aadharfrontdata.title?getData.aadharfrontdata.title:''
                    // });
                   
                // }
            //     else if(getData && getData.voterfrontdata && getData.voterfrontdata.length !==0)
            //     {
            //         let resData = getData && getData.voterfrontdata && getData.voterfrontdata.base64?getData.voterfrontdata.base64:'';
            //         let type = 0;
            //         let DocBase = ""
            //         if( getData.voterfrontdata.filetype !==null )
            //         {
            //             if( getData.voterfrontdata.filetype ==="PDF")
            //             {
            //                 type=2;
            //                 DocBase = "data:application/pdf;base64,"+resData.base64;
            //             }
            //             else{
            //                 type=1;
            //                 DocBase = "data:image/jpg;base64,"+resData.base64;
            //             }
                        
            //         }
            //         this.setState({
            //             frontFileType: type,
            //             frontProofBase: DocBase,
            //             frontProofType:  getData.voterfrontdata.filetype? getData.voterfrontdata.filetype:'',
            //             frontTitle: getData.voterfrontdata.title?getData.voterfrontdata.title:''
            //         });
            //     }else if(getData && getData.passport && getData.passport.length !==0)
            //     {
            //         let resData = getData && getData.passport && getData.passport.base64?getData.passport.base64:'';
            //         let type = 0;
            //         let DocBase = ""
            //         if(getData.passport.filetype !==null )
            //         {
            //             if(getData.passport.filetype ==="PDF")
            //             {
            //                 type=2;
            //                 DocBase = "data:application/pdf;base64,"+resData.base64;
            //             }else{
            //                 type=1;
            //                 DocBase = "data:image/jpg;base64,"+resData.base64;
            //             }
                        
            //         }
            //         this.setState({
            //             frontFileType: type,
            //             frontProofBase: DocBase,
            //             frontProofType: getData.passport.filetype?getData.passport.filetype:'',
            //             frontTitle: getData.passport.title?getData.passport.title:''
            //         });
            //     }else{
            //         this.setState({ frontProofBase: "", selectedTab: 1, defaultTab: 0, frontProofType: ""});
            //     }

            //     if(getData && getData.aadharbackdata && getData.aadharbackdata.length !==0)
            //     {
            //         let resData = getData && getData.aadharbackdata && getData.aadharbackdata.base64?getData.aadharbackdata.base64:'';
            //         let type = 0;
            //         let DocBase = ""
            //         if(getData.aadharbackdata.filetype !==null )
            //         {
            //             if(getData.aadharbackdata.filetype ==="PDF")
            //             {
            //                 type=2;
            //                 DocBase = "data:application/pdf;base64,"+resData.base64;
            //             }else{
            //                 type=1;
            //                 DocBase = "data:image/jpg;base64,"+resData.base64;
            //             }
                        
            //         }
            //         this.setState({
            //             backFileType: type,
            //             backProofBase: DocBase,
            //             backProofType: getData.aadharbackdata.filetype?getData.aadharbackdata.filetype:'',
            //             backTitle: getData.aadharbackdata.title?getData.aadharbackdata.title:''
            //         });
            //     }else if(getData && getData.voterbackdata && getData.voterbackdata.length !==0)
            //     {
            //         let resData = getData && getData.voterbackdata && getData.voterbackdata.base64?getData.voterbackdata.base64:'';
            //         let type = 0;
            //         let DocBase = ""
            //         if(getData.voterbackdata.filetype !==null )
            //         {
            //             if(getData.voterbackdata.filetype ==="PDF")
            //             {
            //                 type=2;
            //                 DocBase = "data:application/pdf;base64,"+resData.base64;
            //             }else{
            //                 type=1;
            //                 DocBase = "data:image/jpg;base64,"+resData.base64;
            //             }
                        
            //         }
            //         this.setState({
            //             backFileType: type,
            //             backProofBase: DocBase,
            //             backProofType: getData.voterbackdata.filetype?getData.voterbackdata.filetype:'',
            //             backTitle: getData.voterbackdata.title?getData.voterbackdata.title:''
            //         });
            //     }
            }
        });
    }
}
    

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({selectedReason:event.target.value})
    }

    openRaiseQuery = () => {
        this.props.dispatch(openQueryModel());
    }

    openDrop = () => {
        this.props.dispatch(openDropModel());
    }

    handleLeadClose = () => {
        this.props.dispatch(closeDropModel());
    }

    handleQueryClose = () => {
        this.props.dispatch(closeQueryModel());
    }

    dropLead = () => {
        const { opp_id, dispatch } = this.props
        let obj = {
            oppertunity_sfid: opp_id,
            stage_name: 'Dropped',
            "reason_name": this.state.reason,
            "reason_description": this.state.description
        }
        dispatch(dropLead(obj)).then((response) => {
            if (response && response.status == "success") {
                // window.location = '/leads';
                this.setState({ showSuccess: true, showsuccessmsg: response.message })
                this.props.dispatch(openLeadDropModal());
                this.props.dispatch(closeDropModel());
            }else {
                if (response && response.status == "error") {
                    this.setState({ showErrdrop: true, droperrmsg: response.message })
                }
            }
        });
    }

    raiseQuery = (e) => {
        e.preventDefault();
        const { dispatch, lead_id } = this.props
        let obj = {
            user_sfid: lead_id,
            // "user_sfid": "001C4000002zE97IAE",
            "issue_type": this.state.query_type,
            "subject": "Order Enquiry",
            "description": this.state.quer_description
            // issue_type: Order,
            // subject: this.state.query_type, 
            // description: this.state.quer_description
        }
        dispatch(raiseLeadQuery(obj)).then((response) => {
            if (response && response.status == "success") {
                

                // window.location = '/leads';
                this.setState({ showSuccess: true, showsuccessmsg: response.message })
                this.props.dispatch(closeQueryModel());
                this.props.dispatch(openSuccessQueryModal());
            } else {
                if (response && response.status == "error") {
                    this.setState({ showErr: true, loanerrmsg: response.message })
                }
            }
        });
    }

    closeModalDrop = () => {
        this.props.dispatch(closeLeadDropModal());
        this.props.dispatch(closeLeadApplicationModel());
    }
    openLeads = (sfid) => {
        this.props.dispatch(closeLeadApplicationModel());
        this.props.dispatch(openLeadProfileModel(sfid , this.props.L_id));
    }

    closeLeadApplicationModel = () => {
        this.setState(initialState);
        this.props.dispatch(closeLeadApplicationModel());
    }

    render() {
        const { lead_application_show, lead_id, sfid, leade_drop, raise_query, orderSummary,showraiseQuerySuccess, showLeadDropSuccess} = this.props;
        const { dob, product, created_date, pan, photo_verified, pan_verified, kyc_verified, selectedAddress, gender, owner_id, username, userstatus, lead_sfid, email, mobile, card, loan_amount, pincode, monthly_income,frontProofBase } = this.state
        console.log("frontProofBase",this.state.panBase);
        return (
            <>

                {/* <div show={lead_application_show} className="modal right fade myModal" id="myModal8" role="dialog">
                <div className="modal-dialog"> */}
                <Modal show={lead_application_show} className="modal right fade myModal" id="myModal8" role="dialog">
                    <Modal.Header className='modelbg_1'>
                        <button type="button"  onClick={this.closeLeadApplicationModel} id="close-create" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                        <div className='px-3'>
                            <div className='d-flex justify-content-between w-100'>
                                <h5 className="modal-title fz24">Application Details</h5>
                                <div>
                                    <button onClick={() => this.openLeads(this.props.lead_id)} className='p-2'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                    <button type='button' className='p-2 ml-2' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={this.openRaiseQuery} href={void (0)}>Raise Query</a>
                                        <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={this.openDrop} href={void (0)}>Drop Lead</a>
                                    </div>
                                </div>
                            </div>

                        <div className='alert-msg py-2 px-3 text-center mt-4'>
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i> { this.state.applicationStatus ?  this.state.applicationStatus :'-'   }
                        </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body className='px-0'>
                        {/* Modal content*/}


                        {/* <div className="modal-header">
                        <button type="button" id="close-create" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                        <div className='px-3'>
                        <div className='d-flex justify-content-between w-100'>
                            <h5 className="modal-title fz24">Application Details</h5>
                            <div>
                                <button className='p-2'><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                <button className='p-2 ml-2'><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                            </div>
                        </div>

                        <div className='alert-msg py-2 px-3 text-center mt-4'>
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i> Application Incomplete
                        </div>
                        </div>
                        
                    </div> */}
                        <Scrollbar>
                            <div className='px-4'>
                                <div className='shadow p-4 rounded-10 mt-4 mb-4'>
                                    <h5 className='text-blue mb-4'>Basic Details</h5>
                                    <div className='row'>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Applicant Name</label>
                                            <p>{username}</p>
                                        </div>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Application ID</label>
                                            <p>{lead_sfid}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Application Created on</label>
                                            <p>{dateFormat(created_date, "mmmm d, yyyy")}</p>
                                        </div>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>PAN</label>
                                            <p>{pan}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Email ID</label>
                                            <p>{email}</p>
                                        </div>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Mobile Number</label>
                                            <p>{mobile}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 form-group'>
                                            <label className='form-label'>Address (Owned)</label>
                                            <p>{this.state.addressList && this.state.addressList.address__c}, {this.state.addressList && this.state.addressList.pincode__c}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Gender</label>
                                            <p>{gender}</p>
                                        </div>
                                        <div className='col-lg-6 form-group'>
                                            <label className='form-label'>Occupation ({monthly_income}/mo)</label>
                                            <p>{this.state.occupation}</p>
                                        </div>
                                    {/* </div> */}
                                    {/* <div className='col-lg-6 form-group'>
                                    <label className='form-label'>Mobile Number</label>
                                        <p>{mobile}</p>
                                    </div> */}
                                </div>
                                {/* <div className='row'>
                                    <div className='col-lg-12 form-group'>
                                    <label className='form-label'>Address (Owned)</label>
                                        <p>{this.state.addressList && this.state.addressList.address__c}, {this.state.addressList && this.state.addressList.pincode__c}</p>
                                    </div>
                                </div> */}
                                {/* <div className='row'>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>Gender</label>
                                        <p>{gender}</p>
                                    </div>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>Occupation ({monthly_income}/mo)</label>
                                        <p>{this.state.occupation}</p>
                                    </div>
                                </div> */}
                                </div>

                                <div className='shadow p-4 rounded-10 mt-4 mb-4'>
                                <h5 className='text-blue mb-4'>Loan Details</h5>
                                <div className='row'>
                                    <div className='col-lg-6 form-group'>
                                        <label className='form-label'>Product Name</label>
                                        <p>{orderSummary && orderSummary.product_name ? orderSummary.product_name : '-'}</p>
                                    </div>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>Product Price</label>
                                        <p><i className='rupee'>`</i> { orderSummary && orderSummary.product_price?orderSummary.product_price:'-'}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>Loan Amount</label>
                                        <p>{orderSummary &&  orderSummary.plan && orderSummary.plan.loan_amount__c ?`₹ ${orderSummary.plan.loan_amount__c}`:'-'}</p>
                                    </div>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>Autopay Bank Account</label>
                                        {/* <p><img src="images/bank-icon/bank-1.png" className='bank-icon'/> xxxxxxx12001</p> */}
                                        <p>{orderSummary &&  orderSummary.bank_account_num ? `xxxxxxx${orderSummary.bank_account_num.slice(-5)}`:'-'}</p>
                        
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>EMI Amount</label>
                                        <p><i className='rupee'>`</i>{orderSummary &&  orderSummary.plan && orderSummary.plan.emi_amount__c ?`${orderSummary.plan.emi_amount__c}/mo`:'-'}</p>
                                    </div>
                                    <div className='col-lg-6 form-group'>
                                    <label className='form-label'>EMI Tenure</label>
                                        <p>{orderSummary && orderSummary.plan && orderSummary.plan.net_tenure__c ?`${orderSummary.plan.net_tenure__c} months`:'-'}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 form-group'>
                                    <label className='form-label'>Interest ({ orderSummary.plan && orderSummary.plan.interest_rate_apr__c ? `${orderSummary.plan.interest_rate_apr__c}%`:'-'})</label>
                                        <p><i className='rupee'>`</i>-</p>
                                    </div>
                                </div>
                    </div>

                                <div className='shadow p-4 rounded-10 mt-4 mb-4'>
                                    <h5 className='text-blue mb-4'>Documents Details</h5>
                                    <div className='row align-items-center mb-3'>
                                        <div className='col-lg-4'>
                                            <div className='d-flex align-items-center font-weight-bold'><img src="images/icons/photo-icon.png" className='bank-icon mr-3' /> Photo</div>
                                        </div>
                                        <div className='col-lg-4'>
                                            {this.state.profileBase !== '' ? (
                                                <p>{this.state.profileTitle}</p>
                                            ) :
                                                <p>------------</p>
                                            }
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='d-flex align-items-center'>
                                                {this.state.profileBase !== '' ? (
                                                    <>
                                                        <span className='uploaded'>Uploaded</span>
                                                        <a href={this.state.profileBase} download={"profile.jpeg"}><img src="img/icon_Download.svg" className='bank-icon ml-3' /></a>
                                                    </>
                                                ) :
                                                    <>
                                                        <span className='pending'>Pending</span>
                                                        <img src="img/icon_Download.svg" className='bank-icon ml-3' />
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row align-items-center mb-3'>
                                        <div className='col-lg-4'>
                                            <div className='d-flex align-items-center font-weight-bold'><img src="images/icons/pancard-icon.png" className='bank-icon mr-3' /> PAN</div>
                                        </div>
                                        <div className='col-lg-4'>
                                            {this.state.panBase !== '' ? (
                                                <p>{this.state.panTitle}</p>
                                            ) :
                                                <p>------------</p>
                                            }
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='d-flex align-items-center'>
                                                {this.state.panBase !== '' ? (
                                                    <>
                                                        <span className='uploaded'>Uploaded</span>
                                                        <a href={this.state.panBase} download={"pan.jpeg"}><img src="img/icon_Download.svg" className='bank-icon ml-3' /></a>
                                                    </>
                                                ) :
                                                    <>
                                                        <span className='pending'>Pending</span>
                                                        <img src="img/icon_Download.svg" className='bank-icon ml-3' />
                                                    </>
                                                }


                                            </div>
                                        </div>
                                    </div>
                                    <div className='row align-items-center'>
                                        <div className='col-lg-4'>
                                            <div className='d-flex align-items-center font-weight-bold'><img src="images/icons/adharcard-icon.png" className='bank-icon mr-3' /> Aadhar</div>
                                        </div>
                                        <div className='col-lg-4'>
                                            {this.state.frontProofBase !== '' ? (
                                                <p>{this.state.frontTitle}</p>
                                            ) :
                                                <p>------------</p>
                                            }
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='d-flex align-items-center'>
                                                {this.state.frontProofBase !== '' ? (
                                                    <>
                                                        <span className='uploaded'>Uploaded</span>
                                                        <a href={this.state.frontProofBase} download={"front.jpeg"}><img src="img/icon_Download.svg" className='bank-icon ml-3' /></a>
                                                    </>
                                                ) :
                                                    <>
                                                        <span className='pending'>Pending</span>
                                                        <img src="img/icon_Download.svg" className='bank-icon ml-3' />
                                                    </>
                                                }


                                            </div>
                                        </div>
                                    </div>

                                    {

                                    }
                                </div>
                            </div>
                        </Scrollbar>

                    </Modal.Body>
                </Modal>

                <Modal show={leade_drop} className="myModal" id="myModal2" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <form className="f_height">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <button onClick={this.handleLeadClose} type="button" style={{ marginLeft: "20px" }} id="close-create" className="abs_close close " data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                                    <div className='d-flex justify-content-between w-100'>
                                        <h5 className="modal-title fz24" style={{ marginLeft: "25px" }}>Drop Lead</h5>
                                        <h6 className='ml-3' style={{ color: '#1824AC', fontWeight: 'bold' }}>{lead_sfid}</h6>
                                        {/* <button className='qst'>?</button> */}
                                    </div>
                                    <div className='ml-4' style={{ marginLeft: '10px' }}>
                                        <p>Please select a reason for dropping</p>
                                        <p>the lead</p>
                                    </div>
                                </div>

                                <div id="" className="modal-body pt-0 px-0">

                                    <div className='px-4'>
                                        <>
                                            <div className="row justify-content-center mb-2">
                                                <div className="col-sm-11">
                                                    <div className='v-scroll'>
                                                        <div className="row justify-content-center mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label htmlFor='reason' className="form-label">
                                                                    Reason*
                                                                </label>

                                                                <select
                                                                    name="reason"
                                                                    id="reason"
                                                                    className="form-control"
                                                                    onChange={this.handleChange}
                                                                    value={this.state.reason ? this.state.reason : ''}
                                                                >
                                                                    <option value=''>Select Any</option>
                                                                    <option value='Customer not interested'>Customer not interested</option>
                                                                    <option value='Approval Failed'>Approval Failed</option>
                                                                    <option value='Other'>Other</option>
                                                                </select>


                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-center mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label mb-3">
                                                                    Description
                                                                </label>
                                                                <textarea className="form-control border" onChange={this.handleChange} name="description" id="exampleFormControlTextarea1" rows="3" placeholder='Start typing...'></textarea>
                                                            </div>
                                                            {this.state.showErrdrop &&
                                                                <div className="form-group"><div className='alert alert-danger' role='alert'>{this.state.droperrmsg}</div></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-end mb-2 mt-4">
                    
                                                        <button
                                                            type="button"
                                                            className='btn btn-default_ btn btn-secondary'
                                                            onClick={this.dropLead}
                                                            disabled={this.state.reason && this.state.description ? false : true}
                                                        >Submit</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </>

                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </Modal>

                <Modal show={raise_query} className="myModal" id="myModal2" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <form className="f_height">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <button onClick={this.handleQueryClose} type="button" style={{ marginLeft: "20px" }} id="close-create" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                                    <div className='d-flex justify-content-between w-100'>
                                        <h5 className="modal-title fz24" style={{ marginLeft: "25px" }}>Raise Query</h5>
                                        <h6 className='ml-3' style={{ color: '#1824AC', fontWeight: 'bold' }}>{lead_sfid} </h6>
                                        {/* <button className='qst'>?</button> */}
                                    </div>
                                    <div className='ml-4' style={{ marginLeft: '10px' }}>
                                        <p>Please select the query type below</p>
                                        <p>and provide description.</p>
                                    </div>

                                </div>

                                <div id="" className="modal-body pt-0 px-0">

                                    <div className='px-4'>
                                        <>
                                            <div className="row justify-content-center mb-2">
                                                <div className="col-sm-11">
                                                    <div className='v-scroll'>
                                                        <div className="row justify-content-center mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label htmlFor='query_type' className="form-label">
                                                                    Query Type*
                                                                </label>

                                                                <select
                                                                    name="query_type"
                                                                    id="query_type"
                                                                    className="form-control"
                                                                    onChange={this.handleChange}
                                                                    value={this.state.query_type ? this.state.query_type : ''}
                                                                >
                                                                    <option value=''>Select Any</option>
                                                                    <option value='Loan Approval'>Loan Approval</option>
                                                                    <option value='Document Upload'>Document Upload</option>
                                                                    <option value='Communication with Customer'>Communication with Customer</option>
                                                                    <option value='Applicaiton Process'>Applicaiton Process</option>
                                                                    <option value='NACH Mandate'>NACH Mandate</option>
                                                                    <option value='Agreement'>Agreement</option>
                                                                </select>


                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-center mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label mb-3">
                                                                    Description
                                                                </label>
                                                                <textarea className="form-control border" onChange={this.handleChange} name="quer_description" id="exampleFormControlTextarea1" rows="4" placeholder='Start typing...'></textarea>
                                                            </div>
                                                            {this.state.showErr &&
                                                                <div className="form-group"><div className='alert alert-danger' role='alert'>{this.state.loanerrmsg}</div></div>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-end mb-2 mt-4">
                                                        <button
                                                            type="button"
                                                            className='btn btn-default_ btn btn-secondary'
                                                            onClick={this.raiseQuery}
                                                            disabled={this.state.query_type && this.state.quer_description ? false : true}
                                                        >Submit</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>


                <Modal show={showraiseQuerySuccess} className="bulkupload type_1">

                    <form>
                        <Modal.Body>
                        <button type="button" onClick={() => this.props.dispatch(closeSuccessQueryModal())} id="close-create" className="abs_close close ml-3 modal-close-lead" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                            
                            <div className="row iconRow">
                                <div className="mt-2">
                                    <img src="images/succ-thumb.png" class="img-fluid mr-3" /></div>
                                <div className="col-md-12 success-popup text-center">

                                    <p className="t1"> {this.state.showSuccess &&
                                        <div className="form-group"><div className='alert alert-success' role='alert'>{this.state.showsuccessmsg}</div></div>
                                    }</p>
                                    {/* <div className="row align-items-center justify-content-center"><div className="col-md-12 prizeamt"><i className="fas fa-rupee-sign"></i>  <i className="fas fa-check-circle"></i></div></div> */}
                                    <p className="t2"><span className="d-block">Our team will answer your query shortly.</span></p>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="col-md-12">
                                <div className="d-block text-center mb-3">
                                    <Button onClick={() => this.props.dispatch(closeSuccessQueryModal())} variant="secondary" className="btn btn-dark">Continue With Applicaiton  </Button>
                                </div>

                            </div>
                        </Modal.Footer>
                    </form>
                </Modal>

                <Modal show={showLeadDropSuccess} className="bulkupload type_1">

                    <form>
                        <Modal.Body>
                        <button type="button"  onClick={this.closeModalDrop} id="close-create" className="abs_close close ml-3 modal-close-lead" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                            
                            <div className="row iconRow">
                                <div className="mt-2">
                                    <img src="images/succ-thumb.png" class="img-fluid mr-3" /></div>
                                <div className="col-md-12 success-popup text-center">

                                    <p className="t1"> {this.state.showSuccess &&
                                        <div className="form-group"><div className='alert ' role='alert'>{this.state.showsuccessmsg}</div></div>
                                    }</p>
                                    {/* <div className="row align-items-center justify-content-center"><div className="col-md-12 prizeamt"><i className="fas fa-rupee-sign"></i>  <i className="fas fa-check-circle"></i></div></div> */}
                                    <div className="form-group"><div className='alert alert-info' role='alert'>{username}<br/>{lead_sfid}</div></div>
                                    
                                    
                                    {/* <p className="t2"><span className="d-block">Our team will answer your query shortly.</span></p> */}
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="col-md-12">
                                <div className="d-block text-center mb-3">
                                    <Button onClick={this.closeModalDrop} variant="secondary" className="btn btn-dark">Go to Leads Dashboard  </Button>
                                </div>

                            </div>
                        </Modal.Footer>
                    </form>
                </Modal>



                
            </>
        )
    }
    }



function mapStateToProps(state) {
    const { lead_application_show, leade_drop, raise_query, showraiseQuerySuccess,showLeadDropSuccess } = state.model;
    const { isLoading, user_id, sfid } = state.auth;
    const { mproducts, category, lead_id,L_id, opp_id, orderSummary } = state.user;
    return {
        lead_application_show,
        leade_drop,
        raise_query,
        user_id,
        mproducts,
        isLoading,
        sfid,
        opp_id,
        category,
        lead_id,
        L_id,
        orderSummary,
        showraiseQuerySuccess,
        showLeadDropSuccess
    };
}

export default connect(mapStateToProps)(LeadApplicationDetails)