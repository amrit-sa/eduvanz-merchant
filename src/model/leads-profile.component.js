import React, { Component } from 'react'
import $ from "jquery";
import { connect } from 'react-redux'
import Select from 'react-select'
import { Modal, Button } from "react-bootstrap"
import { Nav } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { saveAs } from "file-saver";
import 'react-toastify/dist/ReactToastify.css';
import { openPreviewPdfModel, closeLeadProfileModel, openImageEditModel, openDocumentDropModel, openDropModel, openQueryModel, openSuccessModel, openEnach, closeEnach, closeLeadApplicationModel, openLeadProfileModel } from "../actions/model"
import {
    updateProfession,
    updateEmpType,
    updateAddress,
    updateRent,
    updatePan,
    updatePanStatus,
    getLeadProfile,
    updateAccount,
    getAddress,
    addAddress,
    uploadDocument,
    uploadProfile,
    checkLiveliness,
    getLeadProfileDocuemnt,
    getLeadOtherDocuemnt,
    getLeadPanDocuemnt,
    checkEnachDownload,
    checkEnachUpload,
    checkEnachStatus,
    clearSearchEntity,
    getBankDocuemnt,
    removeDocument,
    leadPdfStore,
    searchEntity,
    removeProfile,
    getBankDetails,
    statementUpload,
    verifyUserOtp,
    checkAccount,
    sendUserOtp,
    sendLink,
    faceMatch,
    checkIfsc,
    fraudCheck,
    getBanks,
    updateBanks,
    createTransApp,
    updateIpabureau,
    bankProofUpload,
    validatePan,
    merchantSettlementDetail,
    sendAgreementSms,
    downloadNach,
    getStage,
    getDocData,
    verifyDoc,
    enachPay
} from "../actions/user";
import { selectPlan, getPlanById, getPlans, getUserProduct } from "../actions/payment";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import PlacesAutocomplete, {
    geocodeByAddress,
} from 'react-places-autocomplete';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Scrollbar } from "react-scrollbars-custom";


const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;

const initial = {
    isPanVerified: false,
    isProfileVerified: false,
    isAddressDocVerified: false,
    addressType: 1,
    downpayment: null,
    timer: '00:18',
    viewResend: false,
    logId: null,
    isOtpSent: false,
    lead_sfid: null,
    livenessScore: 0,
    isLive: false,
    bankSrc: '',
    maxRequestLength: "5242880",
    company_name: '',
    monthly_income: '',
    family_income: '',
    gmapsLoaded: false,
    isValidPan: true,
    isValid: true,
    isValidAccount: true,
    errorMsg: '',
    otpError: false,
    onBoarding: 9,
    rent_amount: '',
    house: 0,
    isBackUploading: false,
    isSuccess: '',
    successMsg: '',
    isProfileSuccess: '',
    profileSuccessMsg: '',
    statementUploaded: false,
    userProfile: null,
    panAttempt: 0,
    pan: null,
    username: '',
    userstatus: 'PENDING',
    sfid: '',
    product: '',
    email: '',
    mobile: '',
    card: '',
    loan_amount: '',
    profileId: null,
    panId: null,
    frontId: null,
    backId: null,
    limit: 0,
    dob: '', //new Date
    gender: '',
    pincode: '',
    address_pin: '',
    address: '',
    state: '',
    city: '',
    errpincode: '',
    isValidpincode: false,
    addressList: [],
    selectedAddress: '',
    current_address: 0,
    selectedLeadAddress: '',
    profession: '',
    selectedTab: 1,
    selectedBankTab: 1,
    defaultTab: 0,
    defaultBankTab: 0,
    profileType: '',
    profileBase: '',
    profile: null,
    panType: '',
    panBase: '',
    Errmessage: '',
    isErrorName: true,
    errorname: '',
    frontProofType: '',
    frontProofBase: '',
    backProofType: '',
    backProofBase: '',
    bankDocument: [],
    selectedPlan: '',
    frontFileType: 0,
    backFileType: 0,
    panFileType: 0,
    frontDocAttempt: 0,
    backDocAttempt: 0,
    bankProofSrc: null,
    ifsc: '',
    acc_name: '',
    acc_no: '',
    bank: '',
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    professionValue: 'Select Any',
    showSelectOptionDropdown: false,
    showCompanySearch: false,
    planData: null,
    productData: null,
    download_status: null,
    upload_status: null,
    responsive: {
        0: {
            items: 1,
        },
        450: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        },
    },
    successmsg_: false,
    help_modal: false,
    showAddAddress: false,
    isAutoAdd: false,
    smscheck:0,
    emailcheck:0,
    emailcheck:0,
    sendagainshow:true.valueOf,
    bothChecked:0,
    isLoader:false,
}

class LeadsProfile extends Component {

    constructor(props) {
        super(props)
        this.state = initial;
        this.onlyNumbers = this.onlyNumbers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePanChange = this.handlePanChange.bind(this)
        this.handleProfileSelect = this.handleProfileSelect.bind(this)
        this.handlePanSelect = this.handlePanSelect.bind(this)
        this.handleBackProofSelect = this.handleBackProofSelect.bind(this)
        this.handleFrontProofSelect = this.handleFrontProofSelect.bind(this)
        this.handleEnachUploadSelect = this.handleEnachUploadSelect.bind(this)
        this.handleBankProofSelect = this.handleBankProofSelect.bind(this)
        this.handleBankSlipSelect = this.handleBankSlipSelect.bind(this)
        this.handleEntitySearch = this.handleEntitySearch.bind(this)
        this.handleIfscChange = this.handleIfscChange.bind(this)
        this.handleOtpChange = this.handleOtpChange.bind(this);
        this.bankChange = this.bankChange.bind(this)
        this.startTimer = this.startTimer.bind(this)  
        this.aadharAddFront = this.aadharAddFront.bind(this)
        this.aadharAddBack = this.aadharAddBack.bind(this)   
        this.screenRedirect =  this.screenRedirect.bind(this) 
        this.getDocumentImage = this.getDocumentImage.bind(this)
        this.getPhotoDoc = this.getPhotoDoc.bind(this)
        this.getPanDoc = this.getPanDoc.bind(this)
        this.getOtherDoc = this.getOtherDoc.bind(this)
        this.dataURLtoFile = this.dataURLtoFile.bind(this)
        this.textInput1 = React.createRef();
        this.textInput2 = React.createRef();
        this.textInput3 = React.createRef();
        this.textInput4 = React.createRef();
        this.textInput5 = React.createRef();
    }    

    screenRedirect = () => {
        const {lead_id, dispatch}= this.props
        dispatch(getStage({user_sfid:lead_id})).then(response => {
            if(response.status == "success"){
                let stageData = response.accountDet;
                if(!stageData.pan_verified__c){
                    this.setState({
                        onBoarding : 0
                    })
                }else if(!stageData.date_of_birth_applicant__c || !stageData.approved_pin_code__c || !stageData.gender__c){
                    this.setState({
                        onBoarding : 1
                    })
                }else if(!stageData.monthly_income__c || !stageData.occupation__c || !stageData.employer_name__c){
                    this.setState({
                        onBoarding : 4
                    })
                }else if(!stageData.resident_type__c || !stageData.current_address_id__c){
                    this.setState({
                        onBoarding : 3
                    })
                }else if(!stageData.is_address_document_uploaded__c || !stageData.is_address_document_verified__c || !stageData.is_bank_detail_verified__c ||
                    !stageData.is_kyc_document_verified__c || !stageData.is_pan_document_uploaded__c || !stageData.is_pan_document_verified__c ||
                    !stageData.is_photo_uploaded__c || !stageData.is_photo_verified__c){
                    this.setState({
                        onBoarding : 5
                    })
                    this.getDocumentImage()
                }else if(!stageData.bank_account_number__c || !stageData.is_bank_detail_verified__c){
                    this.setState({
                        onBoarding:7
                    })
                }else if(stageData.bank_account_number__c || stageData.is_bank_detail_verified__c){
                    this.setState({
                        onBoarding:6
                    })
                }
            }
        })        
    }

    bankChange = (e) => {
        this.setState(
            { bank: e.label }
        );
    }

    handlebank = (name) => {
        this.setState({ bank: name });
    }

    handleSelectPlan = (id, sfid) => {
        let obj = {
            stage: 'Application Pending',
            plan: sfid,
            sfid: this.props.opp_id
        }
        this.createTransactionApp(obj);
        this.getPlanData(id);
        this.checkEnachStatus();
        this.setState({ selectedPlan: id})
    }

    handlePanChange = (e) => {
        e.persist();
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/i;
        console.log(e.target.value);
        console.log(regex.test(e.target.value.toUpperCase()));
        if (e.target.value !== '') {
            if (regex.test(e.target.value)) {
                this.setState({ isValidPan: true });
                this.setState(
                    { [e.target.name]: e.target.value.toUpperCase() }
                );
                this.setState({ errorMsg: '', successMsg: '', isSuccess: 0 });
            } else {
                this.setState({ isValidPan: false });
                this.setState({ successMsg: '', isSuccess: 0, errorMsg: 'Enter valid pan number!', [e.target.name]: e.target.value.toUpperCase() });
            }
        } else {
            this.setState({ isValidPan: true });
            this.setState(
                { [e.target.name]: e.target.value.toUpperCase() }
            );
            this.setState({ errorMsg: '' });
        }

    }

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        })
    }

    componentDidMount() {
        this.initMap();
        window.initMap = this.initMap;
        const gmapScriptEl = document.createElement(`script`);
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places&callback=initMap`;
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl);
        $("input[name='checkAll']").change(function () {
            alert()
        });

        
        
    }

    saveFile = async () => {
        // saveAs(
        //     "assets/A220325570_nach.pdf",
        //     "example.pdf"
        // );
        let obj = {
            user_sfid: this.props.lead_id,
            opp_sfid: this.props.opp_id
        }
        let data={"user_sfid":this.props.lead_id}
        this.props.dispatch(downloadNach(data)).then((response) => {
            if (response && response.status && response.status === "success") {
                if(response.getdata){
                    window.open(`https://${response.getdata.Url}`,'_blank')
                }
                
            } else {
                    
            } });
        await this.handleEnachDownload();
    };

    handleEnachDownload = async () => {
        const { user_id, dispatch } = this.props
        let data = { user_sfid: this.props.lead_id }
        await dispatch(checkEnachDownload(data)).then((response) => {
            if (response && response.status && response.status === "success") {
                this.setState({ download_status: 1 });
            } else {
                this.setState({ download_status: 1 });
            }
        });

    }

    handleEnachUpload = async () => {
        const { user_id, dispatch } = this.props
        let data = { user_sfid: this.props.lead_id }
        await dispatch(checkEnachUpload(data)).then((response) => {
            if (response && response.status && response.status === "success") {
                this.setState({ upload_status: 1, onBoarding: 11 });
            } else {
                this.setState({ upload_status: 1, onBoarding: 11 });
            }
        });
    }

    checkEnachStatus = async () => {
        const { user_id, dispatch } = this.props
        let data = { user_sfid: this.props.lead_id }
        await dispatch(checkEnachStatus(data)).then((response) => {
            if (response && response.status && response.status === "success") {
                const getData = response && response.data ? response.data : null;
                if (getData) {
                    const download = getData && getData.download_status ? getData.download_status : null;
                    const upload = getData && getData.upload_status ? getData.upload_status : null;
                    this.setState({ download_status: download, upload_status: upload });
                } else {
                    this.setState({ download_status: null, upload_status: null });
                }

            }
        });
    }

    // sendAgreement = async () => {
    //     const { opp_sfid, dispatch } = this.props
    //     let data = { user_sfid: this.props.lead_id }
    //     await dispatch(sendAgreementSms(data)).then((response) => {
    //         if (response && response.status && response.status === "success") {
                
    //         } else {
               
    //         }
    //     });
    // }

    handleBankAccount = (e) => {
        e.persist();
        this.setState({ acc_no: e.target.value })
        var pattern = new RegExp(/^[a-zA-Z0-9]+$/);

        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                document.getElementById('acc_no').value = '';
                this.setState({ acc_no: '' });
                this.setState({ isValidAccount: false });
                this.setState({ Errmessage: "Please enter valid account number." });
            } else if (e.target.value.length < 9) {
                this.setState({ isValidAccount: false });
                this.setState({ Errmessage: "Please enter valid account number." });
            } else if (e.target.value.length >= 9) {
                this.setState({ isValidAccount: true, Errmessage: "" });

            }

        } else {
            this.setState({ isValidAccount: true, Errmessage: "" });
        }
    }
    handleAccountName = (e) => {
        if (e.target.name == 'acc_name') {
            var hasNumber = /\d/;
            if (!hasNumber.test(e.target.value)) {
                this.setState(
                    { [e.target.name]: e.target.value }
                );

                this.setState(
                    { isErrorName: false, errorname: "" }
                );

            }
            else {
                this.setState(
                    { isErrorName: true, errorname: "Please enter valid name" }
                );
            }
        } else {

            this.setState(
                { [e.target.name]: e.target.value }
            );
        }
    }
    handleStatementNext = async () => {
        const { dispatch } = this.props
        let data = { "user_sfid": this.props.sfid }
        await dispatch(updateIpabureau(data)).then(async (response) => {
            if (response && response.status && response.status === "success") {
                let obj = {
                    user_sfid: this.props.lead_id,
                    opp_sfid: this.props.opp_id
                }
                await this.props.dispatch(getLeadProfile(obj)).then((response) => {
                    if (response.status === "success") {
                        const getData = response.data;
                        if (getData && getData.ipa_basic_bureau__c) {
                            this.openSuccess();
                            this.handleClearMessage();
                            this.getUserAddress();
                            this.setState({ onBoarding: 2 });
                        } else {
                            this.setState({ onBoarding: 14 });
                        }
                    } else {
                        this.setState({ onBoarding: 14 });
                    }
                });
            } else {
                this.setState({ onBoarding: 14 });
            }
        },
            (error) => {
                if (error) {
                    console.log("error Faild Called");
                    //  this.setState({onBoarding : 14});
                }

            }).catch((error) => {
                if (error) {
                    console.log("Catch Faild Called");
                    // this.setState({onBoarding : 14});
                }

            });
    }

    handleKycNext = async () => {
        const { dispatch } = this.props
        let obj = {
            user_sfid: this.props.lead_id,
            opp_sfid: this.props.opp_id
        }
        this.getLeadProfile();
        // await dispatch(getLeadProfile(obj)).then((response) => {
        //     if (response.status === "success") {
        //         // const getData = response.data;
        //         // if (getData && getData.is_bank_detail_verified__c) {
        //         //     this.setState({ onBoarding: 6 });
        //         // } else {
        //         //     this.setState({ onBoarding: 7 });
        //         // }
        //     } 
        //     // else {
        //     //     this.setState({ onBoarding: 7 });
        //     // }
        // }, (error) => {
        //     console.log(error);
        //     // this.setState({ onBoarding: 7 });
        // }).catch((error) => {
        //     console.log(error);
        //     // this.setState({ onBoarding: 7 });
        // });
    }

    handlePlacesChange = address => {
        this.setState({ address });
    };

    closeModel = () => {
        this.props.dispatch(closeLeadProfileModel())
    }

    openImageEdit = (value, tab) => {
        let data = {
            value: value,
            tab: tab
        }
        this.props.dispatch(openImageEditModel(data));
    }

    openEnachModel = () => {
        this.props.dispatch(openEnach());
    }

    closeEnachModel = () => {
        this.props.dispatch(closeEnach());
    }

    openDropModel = () => {
        this.props.dispatch(openDocumentDropModel());
    }

    openSuccess = () => {
        this.props.dispatch(openSuccessModel());
    }

    showToast = () => {
        toast("I am Tostify!")
    };

    successToast = (message) => {
        toast.success(message);
    };

    errorToast = (message) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    checkLiveness = (file) => {
        const { dispatch, lead_id, sfid } = this.props
        let isValid = false;
        console.log(file, "lead_sfid", lead_id);
        var formdata = new FormData();
        formdata.append("files", file);
        formdata.append("user_sfid", lead_id);
        return dispatch(checkLiveliness(formdata)).then((response) => {
            return response;
        });
    }

    getPlanData = async (id) => {
        const { dispatch } = this.props
        let data = {
            plan_id: id
        }

        await dispatch(getPlanById(data)).then((response) => {
            if (response.status === "success") {
                const getData = response.data ? response.data : null;
                this.setState({ planData: getData, downpayment: getData.down_payment__c ? getData.down_payment__c : 0 });
            }
        })
    }

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => results[0])
            .then((getData) => {
                const address = getData.formatted_address,
                    addressArray = getData.address_components,
                    city = this.getCity(addressArray),
                    state = this.getState(addressArray),
                    pincode = this.getPincode(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    address_pin: (pincode) ? pincode : '',
                    pincode: (pincode) ? pincode : ''
                })
            }).catch(error => console.error('Error', error));
    };

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    getPincode = (addressArray) => {
        let pincode = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'postal_code' === addressArray[i].types[0]) {
                    pincode = addressArray[i].long_name;
                    return pincode;
                }
            }
        }
    };

    onNextBording = (next) => {
        if(next == '10'){
            this.props.dispatch(merchantSettlementDetail(this.props.seettlemt_opp_id));
        }
        this.setState({ onBoarding: next, successMsg: '', isSuccess: 0, errorMsg: '', isValidPan: false });
        if (next === 5) {
            this.getLeadsKycData();
        }
    }

    getLeadProfile = () => {
        let data = {
            user_sfid: this.props.lead_id,
            opp_sfid: this.props.opp_id
        }
        this.props.dispatch(getLeadProfile(data)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                let account_profile = getData.account_profile ? getData.account_profile : '';
                let gender = getData.gender__c ? getData.gender__c.toLowerCase() : '';
                this.setState({
                    limit: getData.ipa_basic_bureau__c ? getData.ipa_basic_bureau__c : 0,
                    lead_sfid: getData.sfid ? getData.sfid : '',
                    username: getData.first_name__c+' '+getData.last_name__c,
                    userstatus: response.account_status__c ? response.account_status__c : 'PENDING',
                    sfid: getData.sfid ? getData.sfid : '02398123',
                    product: response.rowData.product_name ? response.rowData.product_name : '-',
                    email: getData.email__c,
                    mobile: getData.phone,
                    pan: getData.pan_number__c,
                    card: getData.pan_number__c ? getData.pan_number__c : '',
                    dob: new Date(getData.date_of_birth_applicant__c),
                    loan_amount: response.rowData.loan_amount ? response.rowData.loan_amount : '-' ,
                    pincode: getData.approved_pin_code__c ? getData.approved_pin_code__c.toString() : '',
                    gender: getData.gender__c ? getData.gender__c : "",
                    selectedAddress: account_profile ? account_profile.current_address : 0,
                    rent_amount: getData.rent_amount__c,
                    house: getData.rent_amount__c ? 2 : 1,
                    profession: getData.employer_type__c,
                    monthly_income: getData.monthly_income__c ? getData.monthly_income__c : '',
                    family_income: getData.family_income__c ? getData.family_income__c : '',
                    company_name: getData.employer_name__c ? getData.employer_name__c : '',
                    isPanVerified: getData.is_pan_document_verified__c,
                    isProfileVerified: getData.is_photo_verified__c,
                    isAddressDocVerified: getData.is_address_document_verified__c,
                    stage:getData.limit_application_stage__c ? getData.limit_application_stage__c : null,
                },() => {
                    this.screenRedirect()
                })
            }
        });
    }

    dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    getPhotoDoc = () => {
        let proData = {
            sfid: this.props.lead_id,
            doc_type: "Photo",
        }
        this.props.dispatch(getDocData(proData)).then((response) => {
            if (response.status === "success") {
                let getData = response.imageData;
                if(getData.length > 0){
                    var img = getData[0]
                    this.setState({
                        profileBase: "data:image/jpg;base64," + img.base64.base64,
                        profileType: "image/jpg",
                        profile: this.dataURLtoFile("data:image/jpg;base64," + img.base64.base64, img.title)
                        // profileId: getData.id
                    });
                }
                // if (getData.profile !== undefined && getData.profile !== "") {
                // }
            }
        });
    }

    getBankDoc = () => {
        let proData = {
            sfid: this.props.lead_id,
            doc_type: "Financial",
        }
        this.props.dispatch(getDocData(proData)).then((response) => {
            if (response.status === "success") {
                let getData = response.imageData;
                if(getData.length > 0){
                    var img = getData[0]
                    this.setState({
                        bankSrc: [img.base64.base64],
                        // profileType: "image/jpg",
                        // profile: this.dataURLtoFile("data:image/jpg;base64," + img.base64.base64, img.title)
                        // profileId: getData.id
                    });
                }
                // if (getData.profile !== undefined && getData.profile !== "") {
                // }
            }
        });
    }

    getPanDoc = () => {
        let proData = {
            sfid: this.props.lead_id,
            doc_type: "PAN"
        }
        this.props.dispatch(getDocData(proData)).then((response) => {
            if (response.status === "success") {
                let getData = response.imageData;
                let type = 0;
                let DocBase = ""
                if(getData.length > 0){
                    var img = getData[0]
                    if (img.filetype == "PDF") {
                        type = 2;
                        DocBase = "data:application/pdf;base64," + img.base64.base64;
                    } else {
                        type = 1;
                        DocBase = "data:image/jpg;base64," + img.base64.base64;
                    }
                    this.setState({                        
                        panFileType: type,
                        panBase: DocBase,
                        panType: img.filetype,
                        // panId: resData.id
                        // profileId: getData.id
                    });
                }
                // if (getData.pan_front !== undefined && getData.pan_front !== "") {
                //     let resData = getData.pan_front;
                    
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         panFileType: type,
                //         panBase: DocBase,
                //         panType: resData.formate,
                //         panId: resData.id
                //     });
                // }
            }
        });
    }

    getOtherDoc = () => {
        const {selectedTab} = this.state
        // selectedTab == 1 ? 'Aadhaar Card' : this.state.selectedTab == 2 ? 'Driving License' : this.state.selectedTab == 3 ? 'Voter ID' : 'Passport'
        let proData = {
            sfid: this.props.lead_id,
            doc_type : selectedTab == 1 ? 'Aadhar' : this.state.selectedTab == 2 ? 'DL' : this.state.selectedTab == 3 ? 'VoterId' : 'Passport'
        }
        this.props.dispatch(getDocData(proData)).then((response) => {
            console.log(response,'>> other doc response')
            if (response.status === "success") {
                let getData = response.imageData;
                if(getData.length == 0){return}
                for (let i = 0; i < getData.length; i++) {
                    const element = getData[i];
                    let FB = element.document_type.split(" ")[1]
                    console.log(FB,'>>>>> front back is')
                    let type = 0;
                    let DocBase = ""
                    if (element.type == "PDF") {
                        type = 2;
                        DocBase = "data:application/pdf;base64," + element.base64.base64;
                    } else {
                        type = 1;
                        DocBase = "data:image/jpg;base64," + element.base64.base64;
                    }
                    if(FB == "Front"){
                        this.setState({
                            frontFileType: type,
                            frontProofBase: DocBase,
                            selectedTab: 1,
                            defaultTab: 1,
                            frontProofType: element.type,
                            // frontId: resData.id
                        });
                    }else{
                        this.setState({
                            backFileType: type,
                            backProofBase: DocBase,
                            selectedTab: 1,
                            defaultTab: 1,
                            backProofType: element.type,
                            // backId: resData.id
                        });
                    }
                }
                // if (getData.aadhar_front !== undefined && getData.aadhar_front !== "") {
                //     let resData = getData.aadhar_front;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         frontFileType: type,
                //         frontProofBase: DocBase,
                //         selectedTab: 1,
                //         defaultTab: 1,
                //         frontProofType: resData.formate ? resData.formate : '',
                //         frontId: resData.id
                //     });
                // } else if (getData.driving_front !== undefined && getData.driving_front !== "") {
                //     let resData = getData.driving_front;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         frontFileType: type,
                //         frontProofBase: DocBase,
                //         selectedTab: 2,
                //         defaultTab: 2,
                //         frontProofType: resData.formate ? resData.formate : '',
                //         frontId: resData.id
                //     });
                // } else if (getData.voter_front !== undefined && getData.voter_front !== "") {
                //     let resData = getData.voter_front;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         frontFileType: type,
                //         frontProofBase: DocBase,
                //         selectedTab: 3,
                //         defaultTab: 3,
                //         frontProofType: resData.formate ? resData.formate : '',
                //         frontId: resData.id
                //     });
                // } else if (getData.passport_front !== undefined && getData.passport_front !== "") {
                //     let resData = getData.passport_front;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         frontFileType: type,
                //         frontProofBase: DocBase,
                //         selectedTab: 4,
                //         defaultTab: 4,
                //         frontProofType: resData.formate ? resData.formate : '',
                //         frontId: resData.id
                //     });
                // }

                // if (getData.aadhar_back !== undefined && getData.aadhar_back !== "") {
                //     let resData = getData.aadhar_back;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         backFileType: type,
                //         backProofBase: DocBase,
                //         selectedTab: 1,
                //         defaultTab: 1,
                //         backProofType: resData.formate ? resData.formate : '',
                //         backId: resData.id
                //     });
                // } else if (getData.driving_back !== undefined && getData.driving_back !== "") {
                //     let resData = getData.driving_back;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         backProofBase: DocBase,
                //         backFileType: type,
                //         selectedTab: 2,
                //         defaultTab: 2,
                //         backProofType: resData.formate ? resData.formate : '',
                //         backId: resData.id
                //     });
                // } else if (getData.voter_back !== undefined && getData.voter_back !== "") {
                //     let resData = getData.voter_back;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         backFileType: type,
                //         backProofBase: DocBase,
                //         selectedTab: 3,
                //         defaultTab: 3,
                //         backProofType: resData.formate ? resData.formate : '',
                //         backId: resData.id
                //     });
                // } else if (getData.passport_back !== undefined && getData.passport_back !== "") {
                //     let resData = getData.passport_back;
                //     let type = 0;
                //     let DocBase = ""
                //     if (resData.formate !== null) {
                //         if (resData.formate === "application/pdf") {
                //             type = 2;
                //             DocBase = "data:application/pdf;base64," + resData.base;
                //         } else {
                //             type = 1;
                //             DocBase = "data:image/jpg;base64," + resData.base;
                //         }

                //     }
                //     this.setState({
                //         backFileType: type,
                //         backProofBase: DocBase,
                //         selectedTab: 4,
                //         defaultTab: 4,
                //         backProofType: resData.formate ? resData.formate : '',
                //         backId: resData.id
                //     });
                // }
            }
        });
    }
    getDocumentImage = () => {        
        this.getPhotoDoc()
        this.getPanDoc()
        this.getOtherDoc()
        this.getBankDoc()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lead_profile_show !== this.props.lead_profile_show && this.props.lead_profile_show === true) {
            let data = {
                user_sfid: this.props.lead_id,
                opp_sfid: this.props.opp_id
            }
            this.props.dispatch(getPlans(data));
            this.props.dispatch(getBanks());
            this.setState(initial);
            this.initMap();
            window.initMap = this.initMap;
            this.setState({isLoader:true})
            this.props.dispatch(getLeadProfile(data)).then((response) => {
                this.setState({isLoader:false})

                if (response.status === "success") {
                    let getData = response.data;
                    //  let onBoard = !getData.pan_number__c?13:!getData.pan_verified__c?0:getData.account_profile.onbording;
                    let account_profile = getData.account_profile ? getData.account_profile : '';
                    let gender = getData.gender__c ? getData.gender__c.toLowerCase() : '';
                    const notiDet = response.notification ? response.notification : null;
                    const notiStatus = notiDet && notiDet.status__c ? notiDet.status__c : null;
                    // let userOnBord = 0;
                    // this.setState({ lead_sfid: getData.sfid ? getData.sfid : '' });
                    // if (notiStatus && notiStatus == "pending") {
                    //     userOnBord = 20;
                    // } else if (getData.account_status__c === "Full User") {
                    //     userOnBord = 6;
                    // } else if (!getData.pan_number__c) {
                    //     userOnBord = 13;
                    // } else if (getData.pan_number__c && !getData.pan_verified__c) {
                    //     userOnBord = 0;
                    // } else if (!getData.is_qde_1_form_done__c) {
                    //     userOnBord = 1;
                    // } else if (!getData.ipa_basic_bureau__c && getData.pan_verified__c) {
                    //     userOnBord = 19;
                    // } else if (getData.ipa_basic_bureau__c && !getData.pan_verified__c) {
                    //     userOnBord = 14;
                    // } else if (!getData.ipa_basic_bureau__c && !getData.pan_verified__c) {
                    //     userOnBord = 15;
                    // } else if (!getData.is_qde_2_form_done__c) {
                    //     this.getUserAddress();
                    //     userOnBord = 2;
                    // } else if (!getData.is_kyc_document_verified__c) {
                    //     this.getLeadsKycData();
                    //     userOnBord = 5;
                    // } else if (!getData.is_bank_detail_verified__c) {
                    //     userOnBord = 7;
                    // } else {
                    //     userOnBord = 6;
                    // }
                    this.setState({
                        limit: getData.ipa_basic_bureau__c ? getData.ipa_basic_bureau__c : 0,
                        lead_sfid: getData.sfid ? getData.sfid : '',
                        username: getData.first_name__c+' '+getData.last_name__c,
                        userstatus: getData.account_status__c ? getData.account_status__c : 'PENDING',
                        sfid: getData.sfid ? getData.sfid : '02398123',
                        product: response.rowData.product_name ? response.rowData.product_name : '-',
                        email: getData.email__c,
                        mobile: getData.phone,
                        pan: getData.pan_number__c,
                        card: getData.pan_number__c ? getData.pan_number__c : '',
                        dob: new Date(getData.date_of_birth_applicant__c),
                        loan_amount: response.rowData.loan_amount ? response.rowData.loan_amount : '-',
                        pincode: getData.approved_pin_code__c ? getData.approved_pin_code__c.toString() : '',
                        gender: getData.gender__c ? getData.gender__c : "",
                        selectedAddress: account_profile ? account_profile.current_address : 0,
                        // onBoarding: userOnBord,
                        //onBoarding: 6,
                        rent_amount: getData.rent_amount__c,
                        house: getData.rent_amount__c ? 2 : 1,
                        profession: getData.employer_type__c,
                        monthly_income: getData.monthly_income__c ? getData.monthly_income__c : '',
                        family_income: getData.family_income__c ? getData.family_income__c : '',
                        company_name: getData.employer_name__c ? getData.employer_name__c : '',
                        isPanVerified: getData.is_pan_document_verified__c,
                        isProfileVerified: getData.is_photo_verified__c,
                        isAddressDocVerified: getData.is_address_document_verified__c,
                        stage:getData.limit_application_stage__c ? getData.limit_application_stage__c : null
                    },() => {
                        this.screenRedirect();
                    })
                }
            });

            this.props.dispatch(getBankDetails(data)).then((response) => {
                if (response.status === "success") {
                    const getData = response.data ? response.data : null;
                    this.setState({
                        ifsc: getData && getData.ifsc__c ? getData.ifsc__c : '',
                        acc_name: getData && getData.bank_account_holder_name__c ? getData.bank_account_holder_name__c : '',
                        acc_no: getData && getData.account_number__c ? parseInt(getData.account_number__c) : '',
                        bank: getData && getData.bank_name__c ? getData.bank_name__c : '',
                    });
                }
            });
            this.getProductDetails();
        }

        // if (prevProps.document_drop_show !== this.props.document_drop_show) {            
        //     this.getDocumentImage();
        // }
    }

    getProductDetails = async () => {
        let objData = { user_sfid: this.props.lead_id }
        await this.props.dispatch(getUserProduct(objData)).then((response) => {
            if (response.status === 'success') {
                const getData = response.data;
                this.setState({ productData: getData });
            }
        });
    }

    async profileDataURLtoFile(dataurl, filename) {
        return new Promise((resolve, reject) => {
            try {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const profile = new File([u8arr], filename, { type: mime });
                this.setState({ profile: profile });
                resolve(true);
            } catch (err) {
                reject(err.message ? err.message : err)
            }
        });
    }

    handleClearMessage = () => {
        this.setState({
            isSuccess: 0,
            successMsg: '',
            isValidPan: true,
            errorMsg: '',
            isProfileSuccess: '',
            profileSuccessMsg: ''
        });
    }

    updatePanStatus = () => {
        const { user_id, dispatch } = this.props
        let data = {
            user_sfid: this.props.lead_id,
            pan: this.state.pan
        }
        // this.getLeadProfile();
        // this.setState({ onBoarding: 1 })
        dispatch(updatePanStatus(data)).then((response)=>{
             console.log(response,"response");
             if(response.status ==="success")
             {
               //  this.setState({ isSuccess: 1, successMsg: response.message });
            //    this.setState({ onBoarding: 1});
               this.getLeadProfile();
             }else{
               //  this.setState({ isSuccess: 0, successMsg: response.message });
                // this.setState({ onBoarding: 1});
             }
         });
    }

    updatePan = () => {
        const { user_id, dispatch } = this.props
        let data = {
            user_sfid: this.props.lead_id,
            pan: this.state.pan
        }
        dispatch(updatePan(data)).then((response) => {
            if (response.status === "success") {
                this.getLeadProfile();
            } 
        });
    }

    updateProfile = async () => {
        const { dispatch } = this.props
        const { dob, pincode, gender } = this.state
        let data = {
            dob: dob,
            gender: gender,
            pin: pincode,
            // id: parseInt(this.props.lead_id)
            //id:localStorage.getItem("L_id")
            user_sfid: this.props.lead_id
        }
        
        await dispatch(updateAccount(data)).then(async (response) => {
            if (response.status === "success") {
                let obj = {
                    user_sfid: this.props.lead_id,
                    opp_sfid: this.props.opp_id
                }
                await this.props.dispatch(getLeadProfile(obj)).then((response) => {
                    if (response.status === "success") {
                        const getData = response.data;
                        if (getData && getData.ipa_basic_bureau__c) {
                            this.getUserAddress();
                            this.openSuccess();
                            this.handleClearMessage();
                        } else {
                            // this.setState({ onBoarding: 19 });
                        }
                    } else {
                        // this.setState({ onBoarding: 19 });
                    }
                });
            } else {
                // this.setState({ onBoarding: 19 });
            }
            this.getLeadProfile();
        });
    }

    getUserAddress = () => {
        let addData = {
            user_sfid: this.props.lead_id
        }
        this.props.dispatch(getAddress(addData)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                this.setState({
                    addressList: getData,
                })
            }
        });
    }

    updateBank = async () => {
        const { dispatch } = this.props
        const { acc_name, ifsc, acc_no, bank } = this.state
        let obj = { "account_number": acc_no, "ifsc_code": ifsc }
        let data = {
            name: acc_name,
            bank: bank,
            ifsc: ifsc,
            account_number: acc_no,
            user_sfid: this.props.lead_id
        }
        await dispatch(checkAccount(obj)).then(async (response) => {
            if (response.status === "success") {
                await dispatch(updateBanks(data)).then((response) => {
                    this.getLeadProfile();
                    dispatch(enachPay({user_sfid:this.props.lead_id, type: "DebitCard"})).then(response => {
                        console.log(response,'>>>>>> enach data is')
                        if(response.status == "success"){
                            localStorage.setItem('customer_id', response.data.customer_id)
                            localStorage.setItem('order_id', response.data.order_id)
                        }
                    })
                    if (response) {
                        this.successToast(response.message);
                        // setInterval(this.setState({ onBoarding: 6 }), 15000);
                    } else {
                        this.errorToast(response.message);
                        // setInterval(this.setState({ onBoarding: 18 }), 15000);
                    }
                });
            } else {
                this.errorToast("Invalid Bank Details");
                // setInterval(this.setState({ onBoarding: 18 }), 15000);
            }
        });

    }


    submitProfession = () => {
        const { dispatch } = this.props
        const { company_name, monthly_income, family_income, profession } = this.state
        let obj = {
            user_sfid: this.props.lead_id
        };
        let employerType = 'Salaried';
        if (profession === '1') {
            obj.source = 1;
            obj.compant_name = company_name;
            obj.amount = monthly_income;
            employerType = 'Salaried';
        }
        if (profession === '2') {
            obj.source = 2;
            obj.compant_name = company_name;
            obj.isProfessional = 1;
            obj.amount = monthly_income;
            employerType = 'Self-Employed-Professional';
        }
        if (profession === '3') {
            obj.source = 3;
            obj.compant_name = company_name;
            obj.isProfessional = 2;
            obj.amount = monthly_income;
            employerType = 'Self-Employed-Non Professional';
        }
        if (profession === '4') {
            obj.source = 4;
            obj.amount = monthly_income;
            employerType = 'Retired';
        }
        if (profession === '5') {
            obj.source = 5;
            employerType = 'Students';
        }
        let objData = { user_sfid: this.props.lead_id, type: employerType }
        dispatch(updateEmpType(objData));
        dispatch(updateProfession(obj)).then((response) => {
            if (response.status === "success") {
                this.setState({ isSuccess: 1, successMsg: response.message });
                setInterval(this.setState({ isSuccess: '', successMsg: '' }), 15000);
                this.getLeadsKycData();
            } else {
                this.setState({ isSuccess: 0, successMsg: response.message });
            }
        });
        this.getLeadProfile();
    }

    startTimer() {
        var presentTime = this.state.timer;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = this.checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        if (m === '00' && s === '00') {
            this.setState({ viewResend: true });
        }
        if (m < 0) {
            return
        }
        this.setState({ timer: m + ":" + s });
        setTimeout(this.startTimer, 1000);
    }

    handleOtpSend = () => {
        const { user_id, dispatch } = this.props
        let data = {
            id: parseInt(this.props.lead_id)
        }
        this.startTimer()
        dispatch(sendUserOtp(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ logId: response.logId, isOtpSent: true });
            }
        });
    }

    handleResendSendOtp = () => {
        const { user_id, dispatch } = this.props
        let data = {
            id: parseInt(this.props.lead_id)
        }
        dispatch(sendUserOtp(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ logId: response.logId, isOtpSent: true, viewResend: false, timer: '00:18' });
                this.startTimer()
            }
        });

    }

    handleOtpChange(value1, event) {
        this.setState({ [value1]: event.target.value, errorMsg: '' });
        if (value1 === "otp4" && event.target.value) {
            this.handleSubmitotp(event.target.value);
        }
    }

    inputfocus = (elmnt, getvalue) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {
                this.reverseFocueInputS(next);
            }
        }
        else {
            const pattern = /^[0-9]$/;
            if (pattern.test(elmnt.target.value)) {
                const next = elmnt.target.tabIndex;
                if (next < 4) {
                    this.focueInputS(next);
                }
            } else {
                this.setState({ [getvalue]: '' });
                document.getElementById(getvalue).value = '';
            }
        }

    }

    reverseFocueInputS = (next) => {
        if (next === 2) {
            this.textInput3.current.focus();
        } else if (next === 1) {
            this.textInput2.current.focus();
        } else if (next === 0) {
            this.textInput1.current.focus();
        }
    }

    focueInputS = (next) => {
        if (next === 1) {
            this.textInput2.current.focus();
        } else if (next === 2) {
            this.textInput3.current.focus();
        } else if (next === 3) {
            this.textInput4.current.focus();
        }
    }

    checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec };
        if (sec < 0) { sec = "59" };
        return sec;
    }

    handleSubmitotp = (otp4) => {
        const { otp1, otp2, otp3 } = this.state
        const { dispatch } = this.props;
        if (otp1 && otp2 && otp3) {
            const givenOtp = parseInt(this.state.otp1 + this.state.otp2 + this.state.otp3 + otp4);
            let data = {
                otp: givenOtp,
                logId: this.state.logId
            }
            dispatch(verifyUserOtp(data))
                .then((response) => {
                    if (response.status === 'success') {
                        let obj = {
                            stage: "Ready to disburse",
                            sfid: this.props.opp_id
                        }
                        this.createTransactionApp(obj);
                        this.setState({
                            otp1: '',
                            otp2: '',
                            otp3: '',
                            otp4: ''
                        });
                        if (this.state.downpayment) {
                            this.getUserAddress();
                            this.setState({ onBoarding: 12 });
                        } else {
                            this.getUserAddress();
                            this.setState({ onBoarding: 12 });
                        }

                    } else {
                        this.setState({ otpError: true });
                    }
                });
        }
    }

    getLeadsKycData = () => {

        let proData = {
            sfid: this.props.lead_id,
        }
        this.props.dispatch(getLeadProfileDocuemnt(proData)).then((response) => {
            if (response.status === "success") {
                const getData = response.data;
                if (getData && getData.base64 !== undefined && getData.base64 !== "") {
                    const base = getData && getData.base64 ? getData.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    this.setState({
                        profileBase: base64 ? `data:image/${getData.filetype};base64,` + base64 : '',
                        profileType: `image/${getData.filetype}`,
                        profileId: null
                    });
                    this.profileDataURLtoFile(base64 ? `data:image/${getData.filetype};base64,${base64}` : '', "profile.jpg");
                } else {
                    this.setState({
                        profileBase: "",
                        profileType: ""
                    });
                    const proBase = localStorage.getItem("userBase");
                    if (proBase) {
                        this.profileDataURLtoFile(`data:image/jpg;base64,${proBase}`, "profile.jpg");
                    }
                }
            }
        });

        this.props.dispatch(getLeadPanDocuemnt(proData)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                if (getData.base64 !== undefined && getData.base64 !== "") {
                    let resData = getData.base64;
                    let type = 0;
                    let DocBase = ""
                    if (resData.filetype !== null) {
                        if (resData.filetype === "PDF") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base64;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base64;
                        }

                    }
                    this.setState({
                        panFileType: type,
                        panBase: DocBase,
                        panType: resData.filetype ? resData.filetype : '',
                        panId: resData.id
                    });
                } else {
                    this.setState({ panBase: "", panType: "" });
                }
            }
        });

        this.props.dispatch(getLeadOtherDocuemnt(proData)).then((response) => {
            if (response.status === "success") {
                let getData = response;

                if (getData && getData.aadharfrontdata && getData.aadharfrontdata.length !== 0) {

                    let resData = getData && getData.aadharfrontdata && getData.aadharfrontdata.base64 ? getData.aadharfrontdata.base64 : '';
                    let type = 0;
                    let DocBase = ""
                    if (getData.aadharfrontdata.filetype !== null) {
                        if (getData.aadharfrontdata.filetype === "PDF") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base64;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base64;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontProofBase: DocBase,
                        selectedTab: 1,
                        defaultTab: 1,
                        frontProofType: getData.aadharfrontdata.filetype ? getData.aadharfrontdata.filetype : '',
                        frontId: resData.id
                    });
                } else if (getData && getData.driving_front && getData.driving_front !== undefined && getData.driving_front !== "") {
                    let resData = getData.driving_front;
                    let type = 0;
                    let DocBase = ""
                    if (resData.formate !== null) {
                        if (resData.formate === "application/pdf") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontProofBase: DocBase,
                        selectedTab: 2,
                        defaultTab: 2,
                        frontProofType: resData.formate ? resData.formate : '',
                        frontId: resData.id
                    });
                } else if (getData && getData.voterfrontdata && getData.voterfrontdata.length !== 0) {
                    let resData = getData && getData.voterfrontdata && getData.voterfrontdata.base64 ? getData.voterfrontdata.base64 : '';
                    let type = 0;
                    let DocBase = ""
                    if (getData.voterfrontdata.filetype !== null) {
                        if (getData.voterfrontdata.filetype === "PDF") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base64;
                        }
                        else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base64;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontProofBase: DocBase,
                        selectedTab: 3,
                        defaultTab: 3,
                        frontProofType: getData.voterfrontdata.filetype ? getData.voterfrontdata.filetype : '',
                        frontId: resData.id
                    });
                } else if (getData && getData.passport && getData.passport.length !== 0) {
                    let resData = getData && getData.passport && getData.passport.base64 ? getData.passport.base64 : '';
                    let type = 0;
                    let DocBase = ""
                    if (getData.passport.filetype !== null) {
                        if (getData.passport.filetype === "PDF") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base64;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base64;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontProofBase: DocBase,
                        selectedTab: 4,
                        defaultTab: 4,
                        frontProofType: getData.passport.filetype ? getData.passport.filetype : '',
                        frontId: resData.id
                    });
                } else {
                    this.setState({ frontProofBase: "", selectedTab: 1, defaultTab: 0, frontProofType: "" });
                }

                if (getData && getData.aadharbackdata && getData.aadharbackdata.length !== 0) {
                    let resData = getData && getData.aadharbackdata && getData.aadharbackdata.base64 ? getData.aadharbackdata.base64 : '';
                    let type = 0;
                    let DocBase = ""
                    if (getData.aadharbackdata.filetype !== null) {
                        if (getData.aadharbackdata.filetype === "PDF") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base64;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base64;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backProofBase: DocBase,
                        selectedTab: 1,
                        defaultTab: 1,
                        backProofType: getData.aadharbackdata.filetype ? getData.aadharbackdata.filetype : '',
                        backId: resData.id
                    });
                } else if (getData && getData.driving_back && getData.driving_back !== undefined && getData.driving_back !== "") {
                    let resData = getData.driving_back;
                    let type = 0;
                    let DocBase = ""
                    if (resData.formate !== null) {
                        if (resData.formate === "application/pdf") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backProofBase: DocBase,
                        selectedTab: 2,
                        defaultTab: 2,
                        backProofType: resData.formate ? resData.formate : '',
                        backId: resData.id
                    });
                } else if (getData && getData.voterbackdata && getData.voterbackdata.length !== 0) {
                    let resData = getData && getData.voterbackdata && getData.voterbackdata.base64 ? getData.voterbackdata.base64 : '';
                    let type = 0;
                    let DocBase = ""
                    if (getData.voterbackdata.filetype !== null) {
                        if (getData.voterbackdata.filetype === "PDF") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base64;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base64;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backProofBase: DocBase,
                        selectedTab: 3,
                        defaultTab: 3,
                        backProofType: getData.voterbackdata.filetype ? getData.voterbackdata.filetype : '',
                        backId: resData.id
                    });
                } else if (getData && getData.passport_back && getData.passport_back !== undefined && getData.passport_back !== "") {
                    let resData = getData.passport_back;
                    let type = 0;
                    let DocBase = ""
                    if (resData.formate !== null) {
                        if (resData.formate === "application/pdf") {
                            type = 2;
                            DocBase = "data:application/pdf;base64," + resData.base;
                        } else {
                            type = 1;
                            DocBase = "data:image/jpg;base64," + resData.base;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backProofBase: DocBase,
                        selectedTab: 4,
                        defaultTab: 4,
                        backProofType: resData.formate ? resData.formate : '',
                        backId: resData.id
                    });
                }
            }
        });

        this.props.dispatch(getBankDocuemnt(proData)).then((response) => {
            let getData = response.data
            if (getData && getData.length > 0) {
                this.setState({ bankSrc: getData });
            }
        });

    }

    updateResident = () => {
        const { dispatch, lead_id } = this.props
        const { address, state, city, address_pin, rent_amount,house } = this.state
        let data = {
            address: address,
            type: "Manual",
            state: state,
            city: city,
            pincode: address_pin,
            user_sfid: this.props.lead_id
        }
        let obj = {
            rent: parseInt(rent_amount),
            user_sfid: this.props.lead_id,
            resident_type: house == 1 ? "Owned" : "Rented"
        }        
        dispatch(updateRent(obj));
        dispatch(addAddress(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ isSuccess: 1, successMsg: response.message, selectedAddress: response.data });
                setInterval(this.setState({isSuccess: '', successMsg: '' }), 15000);
                this.getUserAddress();
            } else {
                this.setState({ isSuccess: 0, successMsg: response.message });
            }
            this.getLeadProfile();
        });

    }

    addDeliveryAddress = async () => {
        const { dispatch } = this.props
        const { address, state, city, address_pin } = this.state
        let data = {
            address: address,
            type: "Manual",
            state: state,
            city: city,
            pincode: address_pin,
            user_sfid: this.props.lead_id
        }
        await dispatch(addAddress(data)).then(async (response) => {
            if (response.status === "success") {
                if (this.state.addressType === 2) {
                    this.setState({ onBoarding: 12, isSuccess: 1, successMsg: response.message, selectedAddress: response.data });
                } else {
                    this.setState({ onBoarding: 2, isSuccess: 1, successMsg: response.message, selectedAddress: response.data });
                }
                this.getUserAddress();
            } else {
                this.setState({ isSuccess: 0, successMsg: response.message });
            }
        });
    }

    updateLenderAddress = () => {
        const { dispatch } = this.props
        const { selectedAddress } = this.state
        let addObj = {
            user_sfid: this.props.lead_id,
            address_id: selectedAddress,
        }
        dispatch(updateAddress(addObj)).then((response) => {
            if (response.status === "success") {
                this.setState({ isSuccess: 1, successMsg: response.message });
                setInterval(this.setState({ isSuccess: '', successMsg: '' }), 15000);
            } else {
                this.setState({ isSuccess: 0, successMsg: response.message });
            }
            this.getLeadProfile();
        });

    }

    updateDeliveryAddress = () => {
        const { dispatch } = this.props
        const { selectedAddress } = this.state
        let addObj = {
            user_sfid: this.props.lead_id,
            address_id: selectedAddress,
        }
        dispatch(updateAddress(addObj)).then((response) => {
            if (response.status === "success") {
                this.setState({ isSuccess: 1, successMsg: response.message });
                if (this.state.downpayment) {
                    this.props.dispatch(merchantSettlementDetail(this.props.seettlemt_opp_id));
                    this.setState({ onBoarding: 10, isSuccess: '', successMsg: '' })
                } else {
                    this.setState({ onBoarding: 16, isSuccess: '', successMsg: '' })
                }
            } else {
                this.setState({ onBoarding: 16, isSuccess: 0, successMsg: response.message });
            }
        });

    }

    getDocumentBase = async () => {
        const { bankDocument } = this.state
        let bindData = [];
        for (let i = 0; i < bankDocument.length; i++) {
            var reader = new FileReader();
            var url = reader.readAsDataURL(bankDocument[i]);
            reader.onloadend = function (e) {
                if (reader.result) {
                    let proBase = reader.result;
                    const proBase64 = proBase.replace(`data:application/pdf;base64,`, "");
                    bindData.push(proBase64);
                }
            }.bind(this);
        }
        return bindData;
    }

    toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    submitDocument = async () => {
        const { dispatch } = this.props
        const { backProofBase, bankDocument, profileType, profileBase, panType, panBase, frontProofType, frontProofBase, backProofType } = this.state
        let DataType = [];
        const filePathsPromises = [];
        bankDocument.forEach(file => {
            filePathsPromises.push(this.toBase64(file));
            DataType.push("Bank-Statement");
        });
        const filePaths = await Promise.all(filePathsPromises);
        let mappedFiles = filePaths.map((base64File) => (base64File.replace(`data:application/pdf;base64,`, "")));
        if (this.state.selectedTab === 1) {
            DataType.push("Aadhar-Front");
            DataType.push("Aadhar-Back");
        } else if (this.state.selectedTab === 2) {
            DataType.push("Driving-Front");
            DataType.push("Driving-Back");
        } else if (this.state.selectedTab === 3) {
            DataType.push("Voter-Front");
            DataType.push("Voter-Back");
        } else {
            DataType.push("Passport-Front");
            DataType.push("Passport-Back");
        }
        let frontBase = frontProofBase;
        const frontBase64 = frontBase.replace(`data:${frontProofType};base64,`, "");
        let backBase = backProofBase;
        const backBase64 = backBase.replace(`data:${backProofType};base64,`, "");
        mappedFiles.push(frontBase64);
        mappedFiles.push(backBase64);
        DataType.push("Pan-Front");
        let panBaseC = panBase;
        const panBase64 = panBaseC.replace(`data:${panType};base64,`, "");
        mappedFiles.push(panBase64);
        let data = {
            base64: mappedFiles,
            doctype: DataType,
            parent_id: this.state.lead_id,
            id: this.props.lead_id,
            token: this.props.salesForceToken
        }

        dispatch(uploadDocument(data)).then((response) => {
            if (response.status === "success") {

            }
        });
    }

    createTransactionApp = (getData) => {
        const { dispatch } = this.props
        dispatch(createTransApp(getData));
    }    

    uploadBankDocument = async (bankDocument) => {

        const { dispatch } = this.props
        const filePathsPromises = [];
        let limit = '';
        await Promise.all(bankDocument.map(async file => {
            let baseData = await this.toBase64(file);
            let base = baseData.replace(`data:application/pdf;base64,`, "");
            let type = file.type
            const d = new Date()
            const time = d.getTime()
            let ext = "pdf";
            if (type) {
                const getExt = type.split("/");
                ext = getExt[1];
            }
            let data = {
                statement: file,
                base64: base,
                doctype: "Bank-Statement",
                "catType": "Income Proof",
                basetype: file.type,
                fname: "eduvan-web-" + time + '.' + ext,
                fileType: "Bank Statement",
                parent_id: this.props.lead_id,
                id: this.props.lead_id,
                token: this.props.salesForceToken,
                sfid: this.props.sfid
            }
            await dispatch(statementUpload(data)).then((response) => {
                console.log(response);
                const getData = response;
                if (getData && getData.file_status !== undefined && getData.file_status) {
                    filePathsPromises.push(base);
                    this.successToast("file uploaded successfully");
                    this.setState({ statementUploaded: true });
                    this.props.dispatch(verifyDoc({isStatementUpload : true, user_sfid: this.props.lead_id}))
                } else {
                    let msg = getData && getData.doc_message ? getData.doc_message : 'Something Went Wrong';
                    this.errorToast(msg);
                }
            });

        }));
        if (limit) {
            this.getLeadProfile();
            this.openSuccess();
        }
        const filePaths = await Promise.all(filePathsPromises);
        let mappedFiles = filePaths.map((base64File) => (base64File.replace(`data:application/pdf;base64,`, "")));
        if (mappedFiles && mappedFiles.length > 0) {
            this.setState({ bankSrc: mappedFiles })
        } else {
            this.setState({ bankSrc: '' })
        }
    }

    uploadBackDocument = async (backProofType, backProofBase, file) => {
        const { dispatch } = this.props
        const tab = this.state.selectedTab;
        const check = await this.checkFraud(file, 2, tab);
        if (check) {
            let DataType = [];
            let mappedFiles = [];
            let BaseType = [];
            let eduFileType = [];
            if (this.state.selectedTab === 1) {
                DataType.push("Aadhar-Back");
                eduFileType.push("Aadhar Back");
            } else if (this.state.selectedTab === 2) {
                DataType.push("Driving-Back");
                eduFileType.push("Driving License");
            } else if (this.state.selectedTab === 3) {
                DataType.push("Voter-Back");
                eduFileType.push("Voter ID");
            } else {
                DataType.push("Passport-Back");
                eduFileType.push("Passport");
            }
            BaseType.push(backProofType);
            let backBase = backProofBase;
            const backBase64 = backBase.replace(`data:${backProofType};base64,`, "");
            mappedFiles.push(backBase64);
            let data = {
                base64: mappedFiles,
                doctype: DataType,
                "catType": "ID Proof",
                basetype: BaseType,
                parent_id: this.props.lead_id,
                id: this.props.lead_id,
                fileType: eduFileType,
                token: this.props.salesForceToken
            }
            let selectedTab = this.state.selectedTab;
            await dispatch(uploadDocument(data)).then(response => {
                if(response.status == "success"){
                this.props.dispatch(verifyDoc({isAadharUpload : true,user_sfid:this.props.lead_id}))
                if(this.state.frontProofBase){
                    this.props.dispatch(verifyDoc({isKycDone : true,user_sfid:this.props.lead_id}))
                }
                this.getOtherDoc()
                }
            })
            this.setState({ backProofBase: backProofBase, defaultTab: selectedTab })
        }
    }

    panFraudCheck = async (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const attempt = this.state.panAttempt;
                if (this.state.profile) {
                    const { dispatch } = this.props
                    var formdata = new FormData();
                    formdata.append("first_image", file);
                    formdata.append("sfid", this.props.lead_id);
                    formdata.append("second_image", this.state.profile);
                    await dispatch(validatePan(formdata)).then(async (response) => {
                        const panAttempt = attempt + 1;
                        if (response.status == "success") {
                            this.successToast("Verified Successfully.");
                            resolve(true);
                        } else {
                            if (panAttempt > 2) {
                                this.setState({ validPic: false, errorMsg: 'Your pan document not verified still we can moved to backend verification' });
                                resolve(true);
                            } else {
                                this.errorToast(response.message);
                                resolve(false);
                            }
                        }
                        this.setState({ panAttempt: panAttempt });
                    });
                } else {
                    this.errorToast("Your profile picture is not ready, please try after some times!");
                    resolve(false);
                }
            } catch (err) {
                reject(err.message ? err.message : err)
            }
        });
    }

    checkFraud = async (file, type, tab) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { dispatch } = this.props
                const { frontDocAttempt, backDocAttempt } = this.state
                var formdata = new FormData();
                formdata.append("files", file);
                if (type == 1) {
                    if (tab == 1) {
                        formdata.append("type", "ADHAR-FRONT");
                    } else if (tab == 2) {
                        formdata.append("type", "DRIVING-LIICENSE-FRONT");
                    } else if (tab == 3) {
                        formdata.append("type", "VOTER-ID-FRONT");
                    } else {
                        formdata.append("type", "PASSPORT");
                    }
                } else {
                    if (tab == 1) {
                        formdata.append("type", "ADHAR-BACK");
                    } else if (tab == 2) {
                        formdata.append("type", "DRIVING-LIICENSE-BACK");
                    } else if (tab == 3) {
                        formdata.append("type", "VOTER-ID-BACK");
                    } else {
                        formdata.append("type", "PASSPORT");
                    }
                }
                formdata.append("sfid", this.props.lead_id);
                await dispatch(fraudCheck(formdata)).then(async (response) => {
                    if (response.status && response.status == "success") {
                        const res = response.result ? response.result : null;
                        const getData = res && res.length > 0 ? res[0] : null;
                        const doctype = getData && getData.type ? getData.type : null;
                        if (type == 1) {
                            this.successToast("Verification Successful!");
                            resolve(true);
                        } else {
                            this.successToast("Verification Successful!");
                            resolve(true);
                        }
                    } else {
                        if (type == 1) {
                            const doctAttempt = frontDocAttempt + 1;
                            this.setState({ frontDocAttempt: doctAttempt });
                            if (doctAttempt > 2) {
                                if (tab == 1) {
                                    this.errorToast("Your adhaar front document not verified still we can moved to backend verification");
                                } else if (tab == 2) {
                                    this.errorToast("Your driving front document not verified still we can moved to backend verification");
                                } else if (tab == 3) {
                                    this.errorToast("Your voter front document not verified still we can moved to backend verification");
                                } else {
                                    this.errorToast("Your passport document not verified still we can moved to backend verification");
                                }
                                resolve(true);
                            } else {
                                this.errorToast(response.message);
                                resolve(false);
                            }
                        } else {
                            const doctAttempt = backDocAttempt + 1;
                            this.setState({ backDocAttempt: doctAttempt });
                            if (doctAttempt > 2) {
                                if (tab == 1) {
                                    this.errorToast("Your adhaar back document not verified still we can moved to backend verification");
                                } else if (tab == 2) {
                                    this.errorToast("Your driving back document not verified still we can moved to backend verification");
                                } else if (tab == 3) {
                                    this.errorToast("Your voter back document not verified still we can moved to backend verification");
                                } else {
                                    this.errorToast("Your passport document not verified still we can moved to backend verification");
                                }
                                resolve(true);
                            } else {
                                this.errorToast(response.message);
                                resolve(false);
                            }
                        }
                    }
                });
            } catch (err) {
                reject(err.message ? err.message : err)
            }
        });
    }

    checkFrontFile = async (type) => {
        return new Promise(async (resolve) => {
            const doctype = this.state.selectedTab;
            if (doctype == 1 && (type == "aadhaar_front_bottom" || type == "aadhaar_front_top")) {
                resolve(true);
            } else if (doctype == 2) {
                resolve(true);
            } else if (doctype == 3 && (type == "voterid_front_new" || type == "voterid_front")) {
                resolve(true);
            } else if (doctype == 4 && type == "passport_front") {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    checkBackFile = async (type) => {
        return new Promise(async (resolve) => {
            const doctype = parseInt(this.state.selectedTab);
            if (doctype == 1 && type == "aadhaar_back") {
                resolve(true);
            } else if (doctype == 2) {
                resolve(true);
            } else if (doctype == 3 && type == "voterid_back") {
                resolve(true);
            } else if (doctype == 4 && type == "passport_front") {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    uploadEnachDocument = async (type, base) => {
        const { dispatch } = this.props
        const base64 = base.replace(`data:${type};base64,`, "");
        let data = {
            base64: [base64],
            doctype: ["Physical_NACH"],
            basetype: [type],
            "catType": ["Income Proof"],
            parent_id: this.props.lead_id,
            id: this.props.lead_id,
            fileType: ["Physical_NACH"],
        }
        const getData = await dispatch(uploadDocument(data));
        await this.getProductDetails();
        await this.handleEnachUpload();
    }

    uploadFrontDocument = async (frontProofType, frontProofBase, file) => {
        const tab = this.state.selectedTab;
        const check = await this.checkFraud(file, 1, tab);
        if (check) {
            const { dispatch } = this.props
            let DataType = [];
            let mappedFiles = [];
            let Basetype = [];
            let eduFileType = [];
            if (this.state.selectedTab === 1) {
                DataType.push("Aadhar-Front");
                eduFileType.push("Aadhar Front");
            } else if (this.state.selectedTab === 2) {
                DataType.push("Driving-Front");
                eduFileType.push("Driving License");
            } else if (this.state.selectedTab === 3) {
                DataType.push("Voter-Front");
                eduFileType.push("Voter ID");
            } else {
                DataType.push("Passport-Front");
                eduFileType.push("Passport");
            }
            Basetype.push(frontProofType);
            let frontBase = frontProofBase;
            const frontBase64 = frontBase.replace(`data:${frontProofType};base64,`, "");
            mappedFiles.push(frontBase64);
            let data = {
                base64: mappedFiles,
                doctype: DataType,
                basetype: Basetype,
                "catType": "ID Proof",
                parent_id: this.props.lead_id,
                id: this.props.lead_id,
                fileType: eduFileType,
                token: this.props.salesForceToken
            }
            await dispatch(uploadDocument(data)).then(response => {
                if(response.status == "success"){
                    this.props.dispatch(verifyDoc({isAadharUpload : true,user_sfid:this.props.lead_id}))
                    if(this.state.backProofBase){
                        this.props.dispatch(verifyDoc({isKycDone : true,user_sfid:this.props.lead_id}))
                    }
                    this.getOtherDoc()
                }
            });
            let selectedTab = this.state.selectedTab;
            this.setState({ frontProofBase: frontProofBase, defaultTab: selectedTab })
        }
    }

    uploadPanDocument = async (panType, panBase, file) => {
        const check = await this.panFraudCheck(file);
        if (check) {
            const { dispatch } = this.props
            let DataType = [];
            let mappedFiles = [];
            let BaseType = [];
            let eduFileType = ["PAN"];
            DataType.push("Pan-Front");
            BaseType.push(panType);
            let panBaseC = panBase;
            const panBase64 = panBaseC.replace(`data:${panType};base64,`, "");
            mappedFiles.push(panBase64);
            let data = {
                base64: mappedFiles,
                doctype: DataType,
                "catType": "PAN",
                basetype: BaseType,
                parent_id: this.props.lead_id,
                id: this.props.lead_id,
                fileType: eduFileType,
                token: this.props.salesForceToken
            }
            await dispatch(uploadDocument(data)).then(response => {
                if(response.status == "success"){
                    this.props.dispatch(verifyDoc({isPanUpload : true,user_sfid:this.props.lead_id}))
                    this.getPanDoc()
                }
            });
            this.setState({ panBase: panBase })
        }
    }

    uploadProfileImage = async (profileType, profileBase) => {
        const { dispatch } = this.props
        let proBase = profileBase;
        const proBase64 = proBase.replace(`data:${profileType};base64,`, "");
        const d = new Date()
        const time = d.getTime()
        localStorage.setItem("userBase", proBase64);
        let prodata = {
            base64: proBase64,
            doctype: "Photo",
            "catType": "Photo",
            fname: "eduvan-" + time + '.jpg',
            parent_id: this.props.lead_id,
            id: this.props.lead_id,
            token: this.props.salesForceToken,
            livenessScore: this.state.livenessScore,
            isLive: this.state.isLive

        }
        await dispatch(uploadProfile(prodata)).then(response => {
            this.getPhotoDoc();
        });
        // this.setState({ profileBase: profileBase })
    }

    setStartDate = (date) => {
        this.setState({ dob: date });
    }

    selectAddress = (value) => {
        this.setState({
            selectedAddress: value
        });
    }

    handleGender = (value) => {
        this.setState({ gender: value });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleEntitySearch = (event) => {
        this.setState({ [event.target.name]: event.target.value, isValidCompany: false });
        let string = event.target.value;
        if (string.length <= 2) {
            this.setState({ showCompanySearch: false })
            this.props.dispatch(clearSearchEntity());
        } else {
            this.setState({ showCompanySearch: true })
            let data = { company_name: string }
            this.props.dispatch(searchEntity(data));
        }
    }

    handleHouse = (value) => {
        this.setState({ house: value, rent_amount: '' });
    }

    handleTab = (eventKey) => {
        this.setState({ selectedTab: parseInt(eventKey) });
    }

    handleBankTab = (eventKey) => {
        this.setState({ selectedBankTab: parseInt(eventKey) });
    }

    async handleProfileSelect(e) {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast("Profile picture size exceeds 5 MB");
        } else {
            this.setState({ profile: files[0] });
            const isValidPic = await this.checkLiveness(files[0])
                .then((response) => {
                    if (response.message) {
                        const getData = response.message;
                        if (getData && getData.statusCode === 101) {
                            const result = getData && getData.result ? getData.result : null;
                            const livenessScore = result && result.livenessScore !== undefined ? result.livenessScore : 0;
                            const validPic = result && result.isLive !== undefined ? result.isLive : false
                            this.setState({ livenessScore: livenessScore, isLive: validPic });
                            var reader = new FileReader();
                            var url = reader.readAsDataURL(files[0]);
                            reader.onloadend = function (e) {
                                this.uploadProfileImage(type, reader.result);
                            }.bind(this);
                        } else {
                            this.setState({ livenessScore: 0, isLive: false });
                            if (getData && getData.message && getData.message == "Insufficient Credits") {
                                this.errorToast("Insufficient Credits");
                            } else {
                                this.errorToast("Invalid Profile Picture");
                            }

                        }
                    }
                });
        }
    }

    handlePanSelect = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                this.uploadPanDocument(type, reader.result, files[0]);
            }.bind(this);
        }
    }

    handleEnachUploadSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                this.uploadEnachDocument(type, reader.result);
            }.bind(this);
        }
    }

    handleFrontProofSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                this.uploadFrontDocument(type, reader.result, files[0]);
            }.bind(this);
        }
    }

    handleBackProofSelect = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                this.uploadBackDocument(type, reader.result, files[0]);
            }.bind(this);
        }
    }

    handleBankSlipSelect = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let selectedFile = [];
        let sizeError = 0;
        let fileError = 0;
        for (var i = 0; i < files.length; i++) {
            let fname = files[i].name;
            let fileSize = files[i].size / 1024 / 1024;
            var re = /(\.pdf)$/i;
            if (fileSize > 5) {
                sizeError = 1;
            } else {
                if (re.exec(fname)) {
                    selectedFile.push(files[i]);
                } else {
                    fileError = 1;
                }
            }
        }
        if (selectedFile.length > 0) {
            this.uploadBankDocument(selectedFile);
            //  this.setState({ bankDocument: selectedFile});
        }

        if (fileError === 1) {
            this.errorToast("Some file not supported!");
        }
        if (sizeError === 1) {
            this.errorToast("Some file size exceeds 5 MB");
        }
        //var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;

    }

    handleBankProofSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files[0];
        let sizeError = 0;
        let fileError = 0;
        let fname = files.name;
        let fileSize = files.size / 1024 / 1024;
        var re = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        } else {
            if (!re.exec(fname)) {
                fileError = 1;
            }
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.errorToast("File not supported!");
            }
            if (sizeError === 1) {
                this.errorToast("File size exceeds 5 MB");
            }
        } else {
            let type = files.type
            let baseData = await this.toBase64(files);
            let base = baseData.replace(`data:${type};base64,`, "");
            const d = new Date()
            const time = d.getTime()
            let ext = "pdf";
            let fileType = 'Cancelled Cheque';
            if (this.state.selectedBankTab === 1) {
                fileType = 'Cancelled Cheque';
            } else if (this.state.selectedBankTab === 2) {
                fileType = 'Bank Passbook';
            } else {
                fileType = 'Bank Statement';
            }
            if (type) {
                const getExt = type.split("/");
                ext = getExt[1];
            }
            let data = {
                base64: base,
                doctype: "Bank Account Proof",
                basetype: files.type,
                fname: "eduvan-web-" + time + '.' + ext,
                fileType: fileType,
                parent_id: this.props.lead_id,
                id: this.props.lead_id
            }
            this.props.dispatch(bankProofUpload(data)).then((response) => {
                if (response && response.status === "success") {
                    this.successToast("Uploaded Successfully");
                    this.setState({ onBoarding: 6 });
                } else {
                    this.setState({ onBoarding: 6 });
                }
            });
        }
    }

    handleSendPhysicalMandate = async () => {
        console.log("Function Clicked")
        const { dispatch, user_id } = this.props
        let data = {
            type: 'Physical Mandate',
            user_sfid: this.props.lead_id,
            send_via: 'email'
        }
        let datasms={
            "email_notification_flag": this.state.emailcheck,
            "sms_notification_flag": this.state.smscheck,
            "whats_app_notification_flag": 0,
            "opp_sfid": this.props.opp_id
        }
        await dispatch(sendAgreementSms(datasms)).then((response) => {
        });
        await dispatch(sendLink(data)).then((response) => {
            if (response && response.status === "success") {
                this.successToast("Sent Successfully");
                this.setState({ onBoarding: 11 });
            } else {
                this.setState({ onBoarding: 11 });
            }
        });
    }

    handleSendKyc = async () => {
       
        const { dispatch, user_id } = this.props
        let data = {
            type: 'Kyc Complete',
            user_sfid: this.props.lead_id,
            send_via: 'email'
        }
       
        
        await dispatch(sendLink(data)).then((response) => {

            if (response && response.status === "success") {
                this.successToast("Sent Successfully");
                this.setState({ onBoarding: 9 });
            } else {
                this.setState({ onBoarding: 9 });
            }
        });
    }

    deleteRow = (row) => {
        let arr = this.state.bankDocument;
        arr = arr.slice(0);
        arr.splice(row, 1);
        this.setState({ bankDocument: arr });
    }

    onlyNumbers = (e) => {
        var pattern = new RegExp(/^(?!(0))\d+$/);
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                // this.setState({ [e.target.name]: "" });
            } else {
                this.setState({ [e.target.name]: e.target.value });
            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onlyPincode = (e) => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                this.setState({ errpincode: "Please Enter the valid Pincode", isValidpincode: true });
            } else if (e.target.value.length < 6) {
                this.setState({ [e.target.name]: e.target.value, errpincode: "Please Enter the valid Pincode ", isValidpincode: true });
            }
            else {
                this.setState({ [e.target.name]: e.target.value, errpincode: " ", isValidpincode: false });
            }
        } else {
            this.setState({ [e.target.name]: e.target.value, errpincode: " ", isValidpincode: false })
        }
    }



    openPdf = (base64) => {
        const { dispatch } = this.props
        dispatch(leadPdfStore(base64));
        dispatch(openPreviewPdfModel());
    }

    base64toBlob = (base64Data) => {
        const { dispatch } = this.props
        dispatch(openPreviewPdfModel());
    }

    handleselectCompany = (item) => {
        this.setState({ company_name: item.name, isValidCompany: true });
        this.props.dispatch(clearSearchEntity());
    }

    renderAutoSearch = (entity) => {
        let row = [];
        entity.map((item, index) => {
            row.push(<div onClick={() => this.handleselectCompany(item)} style={{ backgroundColor: '#f5f5f5', cursor: 'pointer' }} key={`search-${index}`}>{item.name}</div>);
        });
        return row;
    }

    handleProfileRemove = async (id) => {
        const { salesForceToken, dispatch } = this.props
        let data = {
            id: id,
            token: salesForceToken
        }
        if (id !== null && id !== '') {
            await dispatch(removeProfile(data));
        }
        this.setState({ profileBase: '', profileType: '' });
    }

    handleFileRemove = async (id, type) => {
        const { salesForceToken, dispatch } = this.props
        let data = {
            id: id,
            token: salesForceToken
        }
        if (id !== null) {
            await dispatch(removeDocument(data));
        }
        if (type === 1) {
            this.setState({ panBase: '' });
        } else if (type === 2) {
            let tab = 0;
            if (this.state.backProofBase !== '') {
                tab = this.state.defaultTab;
            }
            this.setState({ frontProofBase: '', defaultTab: tab });
        } else if (type === 3) {
            let tab = 0;
            if (this.state.frontProofBase !== '') {
                tab = this.state.defaultTab;
            }
            this.setState({ backProofBase: '', defaultTab: tab });
        }
    }

    handleIfscChange = async (event) => {
        event.persist();
        let ifsc = event.target.value;
        var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
        if (ifsc.length == 11) {
            if (ifsc.match(reg)) {
                this.setState({ isValid: true, errorMsg: '', ifsc: event.target.value });
                let data = {
                    ifsc: event.target.value
                }
                await this.props.dispatch(checkIfsc(data)).then((response) => {
                    if (response.status == 'success') {
                        this.setState({ isValid: true, errorMsg: '', ifsc: event.target.value });
                    } else {
                        this.setState({ isValid: false, errorMsg: 'Enter valid ifsc code', ifsc: '' });
                    }
                });
            } else {
                this.setState({ isValid: false, errorMsg: 'Enter valid ifsc code', ifsc: '' });
            }
        } else {
            this.setState({ isValid: false, errorMsg: '', ifsc: event.target.value });
        }
    }

    succesmsg_ = () => {
        this.setState({ successmsg_: !this.state.successmsg_ })
    }

    replaceMiddle(string, n) {
        let str;
        if (n > 0) {
            str = string.replace(/^(\+?[\d]{2})\d+(\d{4})$/g, "$1****$2");
        } else {
            str = string.replace(/^(\+?[\d]{0})\d+(\d{4})$/g, "$1XXXXXX$2");
        }
        return str
    }

    addNewAddress = (type) => {
        this.setState({ onBoarding: 17, addressType: type });
    }

    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async handlePay(amount) {
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        var payAmount = parseInt(amount);
        var options = {
            key: 'rzp_test_KHBSglpuXC3xGa',
            amount: payAmount * 100, //100000, //  = INR 1
            name: 'Eduvanz',
            description: 'Test Transaction',
            image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
            "handler": (response) => {
                alert(response.razorpay_payment_id);
                this.setState({ onBoarding: 16 });
                /* alert(response.razorpay_order_id);
                alert(response.razorpay_signature); */
            },
            prefill: {
                name: this.state.username ? this.state.username : '',
                email: this.state.email ? this.state.email : '',
                contact: this.state.mobile ? this.state.mobile : '',
            },
            "theme": {
                "color": "#F37254"
            }
        };
        var rzp1 = new window.Razorpay(options);
        /*  document.getElementById('rzp-button1').onclick = function (e) {
           rzp1.open();
           e.preventDefault();
         } */
        /*   const rzp1  = new window.Razorpay(options); */
        rzp1.open();
    }

    handleSendAgreementSigning = async (plan) => {
        const { user_id, dispatch } = this.props
        let data = {
            type: 'Agreement Signing',
            user_sfid: this.props.lead_id,
            send_via: 'email',
            plan: plan
        }
        await dispatch(sendLink(data)).then((response) => {
            if (response.status === "success") {
                this.successToast("Sent Successfully");
            }
        });

    }
    openLeads = (id) => {
        this.props.dispatch(closeLeadApplicationModel());
        this.props.dispatch(openLeadProfileModel(id));
    }
    openRaiseQuery = () => {
        this.props.dispatch(openQueryModel());
    }

    openDrop = () => {
        this.props.dispatch(openDropModel());
    }

    handleSelectOption = (no, value) => {
        this.setState({ profession: no, professionValue: value, showSelectOptionDropdown: false });
    }

    getPanDetails = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                // this.uploadFrontDocument(type, reader.result, files[0]);
                var formdata = new FormData();
                formdata.append("files", files[0]);
                formdata.append("type","PAN")
                formdata.append("sfid", this.props.sfid)
                this.props.dispatch(fraudCheck(formdata)).then(response => {
                    console.log(response,'>>>> pan details is')
                    if(response.data.status == "success"){
                        this.setState({
                            pan : response.data.result[0].details.pan_no.value
                        })
                    }
                })
                .catch(error => {
                    console.log('error while getting pan details')
                })
            }.bind(this);
        } 
    }

    aadharAddFront = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                // this.uploadFrontDocument(type, reader.result, files[0]);
                var formdata = new FormData();
                formdata.append("files", files[0]);
                formdata.append("type","ADHAR-FRONT")
                formdata.append("sfid", this.props.sfid)
                this.props.dispatch(fraudCheck(formdata)).then(response => {
                    console.log(response,'>>>> AF details is')    
                    if(response.data.status == "success"){
                        var addKey = response.data.result[0].details
                        if(addKey.address){
                            this.setState({
                                isAutoAdd:false,
                                address: addKey.address.value ? addKey.address.value : '',
                                city: addKey.address.city ? addKey.address.city : '',
                                state: addKey.address.state ? addKey.address.state : '',
                                address_pin: addKey.address.pin ? addKey.address.pin : '',
                                pincode: addKey.address.pin ? addKey.address.pin : ''
                            })
                        }else{
                            alert("Kindly upload Back / Full Aadhaar Card")
                        }
                    }                
                })
                .catch(error => {
                    console.log('error while getting pan details')
                })
            }.bind(this);
        }
    }

    aadharAddBack = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        let fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            this.errorToast('File size exceeds 5 MB');
        } else {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                // this.uploadFrontDocument(type, reader.result, files[0]);
                var formdata = new FormData();
                formdata.append("files", files[0]);
                formdata.append("type","ADHAR-BACK")
                formdata.append("sfid", this.props.sfid)
                this.props.dispatch(fraudCheck(formdata)).then(response => {
                    console.log(response,'>>>> AB details is')
                    if(response.data.status == "success"){
                        var addKey = response.data.result[0].details
                        if(addKey.address){
                            this.setState({
                                isAutoAdd:false,
                                address: addKey.address.value ? addKey.address.value : '',
                                city: addKey.address.city ? addKey.address.city : '',
                                state: addKey.address.state ? addKey.address.state : '',
                                address_pin: addKey.address.pin ? addKey.address.pin : '',
                                pincode: addKey.address.pin ? addKey.address.pin : ''
                            })
                        }
                    } 
                    
                })
                .catch(error => {
                    console.log('error while getting pan details')
                })
            }.bind(this);
        }
    }


    handleEmailChange = (e) => {
        console.log("Email check",e.target.checked)
        if(e.target.checked){
            this.setState({emailcheck:1})
        }else{
            this.setState({emailcheck:0})
        } 
    }

    handleSmsChange = (e) => {
        console.log("sms check",e.target.checked)

        if(e.target.checked){
            this.setState({smscheck:1})
        }else{
            this.setState({smscheck:0})
        }  
        
    }

    handleSelectSmsEmail = (e) => {
        if(e.target.checked){
            this.setState({smscheck:1,emailcheck:1})
            this.setState({})
        }else{
            this.setState({smscheck:0,emailcheck:0})
        } 
    }
    handleSendAgain =async() => {
        const { dispatch, user_id } = this.props
        this.setState({smscheck:1,emailcheck:1})
        let datasms={
            "email_notification_flag":1 ,
            "sms_notification_flag": 1,
            "whats_app_notification_flag": 0,
            "opp_sfid": this.props.opp_id
        }
        await dispatch(sendAgreementSms(datasms)).then((response) => {
            if (response.status === "success") {
                toast.success(response.message);
                this.setState({sendagainshow:false})
            }
        });
    }

    render() {
        console.log("Akhsya",this.state.smscheck,this.state.emailcheck,this.state.bothChecked,this.state.emailcheck == 1 && this.state.smscheck == 1)
        const { lead_profile_show, lead_id, entitySearch, entity, banks, plans, orderSummary } = this.props
        const { bankProofSrc, defaultBankTab, limit, isOtpSent, productData, planData, bankSrc, profileSuccessMsg, isProfileSuccess, addressList, dob, gender, username, defaultTab,
            userstatus, sfid, product, email, mobile, card, loan_amount, pincode, onBoarding, isSuccess, successMsg, state, city, address, upload_status, download_status } = this.state
        const subBtn = { background: '#1F1F2D', borderRadius: '8px', color: '#ffffff' };
        const searchResult = this.renderAutoSearch(entity);
        console.log(this.state.showSelectOptionDropdown, this.state.professionValue);
        let hMobile = '';
        if (this.state.mobile) {
            hMobile = this.replaceMiddle(this.state.mobile, 0);
        }
        const proImages = productData && productData.images ? productData.images[0] : [];
        let profileInputRef;
        let panInputRef;
        let frontProofInputRef;
        let backProofInputRef;
        let bankProofInputRef;
        let bankSlipInputRef;
        let addFront;
        let addBack;
        let bankOptions = [];
        let bankData;
        let enachUploadInputRef;
        if (this.props.banks) {
            bankData = this.props.banks.slice(0, 6);
            for (var i = 0; i < this.props.banks.length; i++) {
                bankOptions.push({ value: this.props.banks[i].bank_name, label: this.props.banks[i].bank_name });
            }
        }
     console.log('onboarding : ', onBoarding);

        return (
            <>
            {this.state.isLoader?(<div className="loading" style={{zIndex:1}}>Loading&#8230;</div>):''}
            <Modal show={lead_profile_show} className='right myModal w-700 enable_scroll'>
                    <Modal.Header className='modelbg_1'>
                        <button type="button" className="abs_close close" onClick={this.closeModel}> <i className="fas fa-times"></i> </button>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="fullrow float-left mb-3">
                                    <div className="leftpart float-left">
                                        <div className="namearea float-left pr-4">
                                            {username !== '' && (<Modal.Title>{username}</Modal.Title>)}
                                            {lead_id !== '' && (<span className="d-block appnum">{lead_id}</span>)}
                                        </div>
                                        <div className="statusbtn float-left">
                                            <span className="btn btn-sm btn-blue radius-20">{userstatus}</span>
                                        </div>
                                    </div>
                                    <div className="rightpart float-right">
                                        {/* <i className="fas fa-pen"></i>
                            <i style={{cursor:'pointer'}} className="fas fa-ellipsis-v" aria-haspopup="true" aria-expanded="false" ></i> */}

                                        {/* <button onClick={() => this.openLeads(this.props.lead_id)} style={{ cursor: 'pointer' }} className='p-2'><i className="fa fa-pencil" aria-hidden="true"></i></button> */}
                                        <button type='button' className='p-2 ml-2' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={this.openRaiseQuery} href={void (0)}>Raise Query</a>
                                            <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={this.openDrop} href={void (0)}>Drop Lead</a>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        {mobile !== '' && (<span className="icontext"><i className="fas fa-phone-alt"></i> {mobile}</span>)}
                                        {email !== '' && (<span className="icontext"><i className="fas fa-envelope"></i> {email}</span>)}
                                    </div>
                                    <div className="col-sm-4">
                                        {card !== '' && (<span className="icontext"><i className="fas fa-credit-card"></i> {card}</span>)}
                                        {product !== '' && (<span className="icontext"><i className="fas fa-cube"></i> {product}</span>)}
                                    </div>
                                    <div className="col-sm-4">
                                        <span className="icontext"><i className="fas fa-rupee-sign"></i> <span className="amtdetails">Loan Amount{loan_amount !== '' && (<b><i className="fas fa-rupee-sign"></i> {loan_amount}</b>)}</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body className='px-0'>
                        <Scrollbar>

                            <div className='px-5'>
                                <div className="row">

                                    <div className="col-sm-12 form-group">

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
                                </div>
                                {this.state.onBoarding == 0 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <h5 className="mt-4 mb-3"> Verify PAN</h5>
                                            <div className="pansection text-center">
                                                <div className="paninput">
                                                    <input
                                                        type={'text'}
                                                        className="PANtextbox"
                                                        placeholder="XXXXXXXXXX"
                                                        value={this.state.pan ? this.state.pan : ''}
                                                        name="pan"
                                                        maxLength="10"
                                                        onChange={this.handlePanChange}
                                                    //  readOnly={true}
                                                    />
                                                </div>
                                                <div className="form_notes">
                                                    <p className="color_1">This will not affect the applicant's Credit Score</p>
                                                </div>
                                                <div className="d-block text-center">
                                                    <div className="row error-msg">
                                                        {
                                                            this.state.isValidPan === false && this.state.errorMsg !== '' ? (
                                                                <span >
                                                                    {this.state.errorMsg}
                                                                </span>
                                                            ) : ''
                                                        }
                                                        {
                                                            this.state.successMsg != '' && this.state.isSuccess === 0 ? (
                                                                <span>
                                                                    {this.state.successMsg}
                                                                </span>
                                                            ) : ''
                                                        }

                                                    </div>
                                                    <button
                                                        onClick={this.updatePanStatus}
                                                        type="button"
                                                        className="flex-c-m cl0 bor1 p-lr-15 trans-04 pointer mr-btn-sty"
                                                        style={subBtn}>
                                                        Yes, this is correct PAN
                                                    </button>
                                                </div>
                                                <span
                                                    onClick={() => this.onNextBording(13)}
                                                    style={{ cursor: 'pointer', color: 'blue' }} >No, this is not correct PAN</span>
                                            </div>
                                        </div>
                                        <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(1)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button>

                                    </>
                                ) : this.state.onBoarding == 1 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="mn_height_57">
                                                <div className="boxed mt-4">
                                                    <h5 className="mb-3">Basic Details</h5>
                                                    <div className="row">
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                Date of Birth
                                                            </label>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDatePicker
                                                                    format="dd-MM-yyyy"
                                                                    value={dob}
                                                                    name="dob"
                                                                    disableFuture={true}
                                                                    onChange={this.setStartDate}
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                        <div className="col-sm-6 form-group" style={{marginTop:"-10px"}}>
                                                            <label htmlFor="" className="form-label">
                                                                Pincode
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="000 000"
                                                                maxLength={"6"}
                                                                name="pincode"
                                                                value={pincode ? pincode : ''}
                                                                onChange={this.onlyPincode}
                                                            />
                                                            {this.state.isValidpincode == true ? (

                                                                <div className="form-group">
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {this.state.errpincode}
                                                                    </div>
                                                                </div>) : ''
                                                            }
                                                        </div>

                                                        <div className="col-sm-12 form-group r_shadow">
                                                            <label htmlFor="" className="form-label mb-2">
                                                                Gender
                                                            </label>
                                                            <button type="button" onClick={() => this.handleGender('male')} className={`btn ${gender === "male" ? "selected-gender" : "btn-primary"}`}><i className="fas fa-mars"></i> Male</button>
                                                            <button type="button" onClick={() => this.handleGender('female')} className={`btn ${gender === "female" ? "selected-gender" : "btn-primary"}`}><i className="fas fa-venus"></i> Female</button>
                                                            <button type="button" onClick={() => this.handleGender('others')} className={`btn ${gender === "others" ? "selected-gender" : "btn-primary"}`}><i className="fas fa-venus-mars"></i> Others</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row error-msg">
                                                {
                                                    profileSuccessMsg != '' && isProfileSuccess === 0 ? (
                                                        <span>
                                                            {profileSuccessMsg}
                                                        </span>
                                                    ) : ''
                                                }

                                            </div>
                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(0)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(2)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(0)} className="border-0 mr-4 btn cancel">Previous</Button>
                                                <Button
                                                    onClick={this.updateProfile}
                                                    className="btn btn-default_"
                                                    disabled={dob != '' && gender != '' && pincode != '' && !this.state.isValidpincode ? false : true}
                                                    style={dob != '' && gender != '' && pincode != '' && !this.state.isValidpincode ? subBtn : {}}
                                                >Submit</Button>
                                            </div>

                                        </div>

                                    </>
                                ) : this.state.onBoarding == 2 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="mn_height_57">
                                                <div className="boxed mt-4">
                                                    <h5 className="mb-3">Select Communication Address <button type='button' onClick={() => this.addNewAddress(1)} className='btn btn-sm border-0 btn-primary color_1 shadow-none float-right'><i className="fas fa-plus"></i> Add New</button></h5>
                                                    <div className="row">

                                                        <ul className="customInputsradio">
                                                            {addressList && addressList.length > 0 && (
                                                                addressList.map((item, index) => (
                                                                    <li key={"item" + index}>
                                                                        <input
                                                                            type="radio"
                                                                            value={item.id}
                                                                            name="selectedAddress"
                                                                            id={`selectedAddress-${item.id}`}
                                                                            defaultChecked={`${this.state.selectedAddress === item.id ? "checked" : ""}`}
                                                                            onClick={() => this.selectAddress(item.id)}
                                                                        />
                                                                        <label htmlFor={`selectedAddress-${item.id}`}>
                                                                            {`${item.address__c ? item.address__c : "" } ,${item.city__c ? item.city__c : ""} ,${item.state__c ? item.state__c : ""} ,${item.pincode__c ? item.pincode__c : ""}`}
                                                                            <span className="d-block color_grey">Source: <b>{item.name}</b></span>
                                                                        </label>
                                                                    </li>
                                                                ))
                                                            )
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(1)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(3)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} onClick={this.closeModel} className="border-0 mr-4 btn cancel">Cancel</Button>
                                                <Button onClick={this.updateLenderAddress} className="btn btn-default_"
                                                    disabled={this.state.selectedAddress != '' ? false : true}
                                                    style={this.state.selectedAddress != '' ? subBtn : {}}
                                                >Continue</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 3 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="mn_height_57">
                                                <div className="boxed mt-4">
                                                    <h5 className="mb-3">Communication Address Details <button type='button' className='btn btn-sm border-0 btn-primary shadow-none float-right'><i className="fas fa-info-circle f-16"></i></button></h5>
                                                    <div className="switch_btn d-flex">
                                                        <label className="switch mr-3">
                                                            <input type="checkbox" onChange={(e) => this.setState({showAddAddress : e.target.checked})}/>
                                                            <span className="slider round"></span>
                                                        </label> Same as Aadhaar address</div>
                                                        {
                                                            this.state.showAddAddress &&
                                                            <div style={{position:"relative", float:"right", top:"-24px"}}>
                                                                {
                                                                    !this.state.isAutoAdd &&
                                                                    <p onClick={() => this.setState({isAutoAdd:true})} style={{fontSize:"16px", fontWeight:"bold", color:"#1251F1", cursor:"pointer"}}>Upload aadhaar to autofill</p>
                                                                }
                                                                {
                                                                    this.state.isAutoAdd &&
                                                                    <p onClick={() => this.setState({isAutoAdd:false})} style={{fontSize:"16px", fontWeight:"bold", color:"#1251F1", cursor:"pointer"}}>Enter manually instead</p>
                                                                }
                                                            </div>
                                                        }
                                                    {
                                                        !this.state.isAutoAdd ? 
                                                        <div className="row w-100">
                                                        <div className="col-sm-12 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                Address Line
                                                            </label>
                                                            {this.state.gmapsLoaded && (
                                                                <PlacesAutocomplete
                                                                    value={this.state.address}
                                                                    style={{ width: '100%' }}
                                                                    onChange={this.handlePlacesChange}
                                                                    onSelect={this.handleSelect}
                                                                >
                                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                        <div className="form-group position-relative">
                                                                            <input
                                                                                {...getInputProps({
                                                                                    placeholder: 'Search Area/Road ...',
                                                                                    className: 'form-control location-search-input',
                                                                                })}
                                                                            />
                                                                            <div className="autocomplete-dropdown-container">
                                                                                {loading && <div>Loading...</div>}
                                                                                {suggestions.map((suggestion, index) => {
                                                                                    const className = suggestion.active
                                                                                        ? 'suggestion-item--active'
                                                                                        : 'suggestion-item';
                                                                                    // inline style for demonstration purpose
                                                                                    const style = suggestion.active
                                                                                        ? { backgroundColor: '#eaeaea', cursor: 'pointer' }
                                                                                        : { backgroundColor: '#f5f5f5', cursor: 'pointer' };
                                                                                    return (
                                                                                        <div
                                                                                            key={'item' + index}
                                                                                            {...getSuggestionItemProps(suggestion, {
                                                                                                className,
                                                                                                style,
                                                                                            })}
                                                                                        >
                                                                                            <span key={index}>{suggestion.description}</span>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </PlacesAutocomplete>
                                                            )}
                                                        </div>
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="City"
                                                                onChange={this.handleChange}
                                                                value={city}
                                                                name="city"
                                                            />
                                                        </div>
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                State
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="State"
                                                                name="state"
                                                                value={state}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-group clearfix">
                                                            <label htmlFor="" className="form-label">
                                                                Pincode
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="000 000"
                                                                maxLength={"6"}
                                                                name="address_pin"
                                                                id="address_pin"
                                                                value={this.state.address_pin}
                                                                onChange={this.onlyNumbers}
                                                            />
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="row" style={{margin:"40px 0px"}}>
                                                            <div className="col-md-4">
                                                                <label htmlFor="" className="form-label mb-2">
                                                                    Front
                                                                </label>
                                                                <input
                                                                    type="file"   
                                                                    style={{display:"none"}}                                                                 
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                    ref={refParam => addFront = refParam}
                                                                    onChange={(e) => this.aadharAddFront(e)}
                                                                    onClick={(event) => {
                                                                        event.target.value = null
                                                                    }}
                                                                />
                                                                <button type="button" onClick={() => addFront.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor="" className="form-label mb-2">
                                                                    Back
                                                                </label>
                                                                <input
                                                                    type="file"          
                                                                    style={{display:"none"}}                                                          
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                    ref={refParam => addBack = refParam}
                                                                    onChange={(e) => this.aadharAddBack(e)}
                                                                    onClick={(event) => {
                                                                        event.target.value = null
                                                                    }}
                                                                />
                                                                <button type="button" onClick={() => addBack.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    }
                                                    
                                                    <div className="row w-100">
                                                        <div className="col-md-7 form-group r_shadow">
                                                            <label htmlFor="" className="form-label mb-2">
                                                                Address Type
                                                            </label>
                                                            <div className='d-flex'>
                                                                <button type='button' onClick={() => this.handleHouse(1)} className={`btn ${this.state.house === 1 ? "selected-gender" : "btn-primary"}`}><i className="fas fa-home"></i>Owned</button>
                                                                <button type='button' onClick={() => this.handleHouse(2)} className={` btn ${this.state.house === 2 ? "selected-gender" : "btn-primary"}`}><i className="fas fa-home"></i>Rented</button>
                                                            </div>
                                                        </div>
                                                        {this.state.house === 2 && (
                                                            <div className="col-md-6 form-group">
                                                                <label htmlFor="rent_amount" className="form-label mb-2">
                                                                    Rent Amount
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="rent_amount"
                                                                    id="rent_amount"
                                                                    placeholder="₹ 000"
                                                                    value={this.state.rent_amount}
                                                                    onChange={this.onlyNumbers} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between align-items-center pr-4">
                                            <div className="col-lg-5 form_notes mt-0">
                                                <button className='link'>
                                                    <span className='d-inline-block mr-2'><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                    Applicant's data will not be saved in case you cancel or close the page
                                                </button>
                                            </div>

                                            <div className='col-lg-7 d-flex justify-content-end'>
                                                {/* prev next arrow*/}

                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(2)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(4)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} type='button' onClick={this.closeModel} className="border-0 mr-4 btn cancel">Cancel</Button>
                                                <Button
                                                    type='button'
                                                    onClick={this.updateResident}
                                                    className="btn btn-default_"
                                                    disabled={address != '' && state != '' && city && pincode != '' && ((this.state.house === 1) || (this.state.house === 2 && this.state.rent_amount !== '')) ? false : true}
                                                    style={address != '' && state != '' && city && pincode != '' && ((this.state.house === 1) || (this.state.house === 2 && this.state.rent_amount !== '')) ? subBtn : {}}
                                                >Save &amp; Next</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 4 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="mn_height_57">
                                                <div className="boxed mt-4">
                                                    <h5 className="mb-3">Professional Details <button type='button' className='btn btn-sm border-0 btn-primary shadow-none float-right'><i className="fas fa-info-circle f-16"></i></button></h5>
                                                    <div className="row w-100">
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="professional" className="form-label">
                                                                {username !== '' ? `${username} is a` : ""}
                                                            </label>
                                                            {/* <select 
                                            name="profession"
                                            id="professional"
                                            className="form-control"
                                            value={this.state.profession?this.state.profession:'0'}
                                            onChange={this.handleChange}
                                        >
                                            <option value={''}>Select Any</option>
                                            <option value={'1'} >Salaried Person</option>
                                            <option value={'2'} >Self Employed (Professional)</option>
                                            <option value={'3'} >Self employed (Non-Professional)</option>
                                            <option value={'4'} >Retired</option>
                                            <option value={'5'} >Student</option>
                                        </select> */}

                                                            <div className='d-flex justify-content-between align-items-center border-darks position-relative' style={{ paddingBottom: '4px', paddingTop: '3px' }}   >
                                                                <p className="form-control font-weight-bold" onClick={() => this.setState({ showSelectOptionDropdown: true })}>
                                                                    {/* type="text"
                                            className="form-control"
                                            placeholder="Start typing..."
                                            onChange={() => this.setState({professionValue:this.state.professionValue})} */}

                                                                    {this.state.professionValue}

                                                                </p>
                                                                <i style={{ cursor: 'pointer' }} class="fa fa-chevron-down" aria-hidden="true"></i>

                                                            </div>

                                                            {this.state.showSelectOptionDropdown && <div className='optionsdropdown'>
                                                                <p onClick={() => this.handleSelectOption('1', 'Salaried Person')}>Salaried Person</p>
                                                                <p onClick={() => this.handleSelectOption('2', 'Self Employed (P)')}>Self Employed (Professional)</p>
                                                                <p onClick={() => this.handleSelectOption('3', 'Self Employed (NP)')} >Self employed (Non-Professional)</p>
                                                                <p onClick={() => this.handleSelectOption('4', 'Retired')}>Retired</p>
                                                                {/* <p onClick={() => this.handleSelectOption('5', 'Student')}>Student</p> */}
                                                            </div>}

                                                        </div>
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="monthly_income" className="form-label">
                                                                Family Income
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="₹ 00000"
                                                                name="family_income"
                                                                value={this.state.family_income}
                                                                onChange={this.onlyNumbers}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row w-100">
                                                        {this.state.profession === '1' ? (
                                                            <>
                                                                <div className="col-sm-6 form-group">
                                                                    <label htmlFor="company_name" className="form-label">
                                                                        Company Name
                                                                    </label>
                                                                    <div className='d-flex justify-content-between align-items-center border-darks'>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Start typing..."
                                                                            onChange={this.handleEntitySearch}
                                                                            value={this.state.company_name}
                                                                            name="company_name"
                                                                        />
                                                                        <i style={{ cursor: 'pointer' }} class="fa fa-search" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="autocomplete">
                                                                        {this.state.showCompanySearch ? entitySearch ? (
                                                                            <div style={{ width: '100%' }}>Searching....</div>
                                                                        ) : searchResult : ''}
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6 form-group">
                                                                    <label htmlFor="monthly_income" className="form-label">
                                                                        Monthly Income
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="₹ 00000"
                                                                        name="monthly_income"
                                                                        value={this.state.monthly_income}
                                                                        onChange={this.onlyNumbers}
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : ''}
                                                        {this.state.profession === '2' || this.state.profession === '3' ? (
                                                            <>
                                                                <div className="col-sm-6 form-group">
                                                                    <label htmlFor="company_name" className="form-label">
                                                                        Company Name
                                                                    </label>
                                                                    <div className='d-flex justify-content-between align-items-center border-darks'>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Start typing..."
                                                                            onChange={this.handleEntitySearch}
                                                                            value={this.state.company_name}
                                                                            name="company_name"
                                                                        />
                                                                        <i style={{ cursor: 'pointer' }} class="fa fa-search" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="autocomplete">
                                                                        {this.state.showCompanySearch ? entitySearch ? (
                                                                            <div style={{ width: '100%' }}>Searching....</div>
                                                                        ) : searchResult : ''}
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6 form-group">
                                                                    <label htmlFor="monthly_income" className="form-label">
                                                                        Monthly Income
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="₹ 00000"
                                                                        name="monthly_income"
                                                                        value={this.state.monthly_income}
                                                                        onChange={this.onlyNumbers}
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : ''}
                                                        {this.state.profession === '4' ? (
                                                            <>
                                                                <div className="col-sm-6 form-group">
                                                                    <label htmlFor="monthly_income" className="form-label">
                                                                        Monthly Income
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="₹ 00000"
                                                                        name="monthly_income"
                                                                        value={this.state.monthly_income}
                                                                        onChange={this.onlyNumbers}
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : ''}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row error-msg'>
                                                {
                                                    this.state.successMsg != '' && this.state.isSuccess === 0 ? (
                                                        <span>
                                                            {this.state.successMsg}
                                                        </span>
                                                    ) : ''
                                                }
                                            </div>
                                            <div className='row'>
                                                {
                                                    this.state.successMsg != '' && this.state.isSuccess === 1 ? (
                                                        <span>
                                                            {this.state.successMsg}
                                                        </span>
                                                    ) : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-lg-5 form_notes mt-0">
                                                <button className='link'>
                                                    <span className='d-inline-block mr-2'><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                    Applicants's data will not be saved in case you cancel or close the page
                                                </button>

                                            </div>

                                            <div className='col-lg-7 d-flex justify-content-end'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(3)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(5)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} type='button' onClick={this.closeModel} className="border-0 cancel btn mr-4">Cancel</Button>
                                                <Button
                                                    type='button'
                                                    onClick={this.submitProfession}
                                                    className="btn btn-default_"
                                                    disabled={this.state.profession &&
                                                        ((this.state.profession === '1' && this.state.monthly_income != '' && this.state.company_name != '') ||
                                                            (this.state.profession === '2' && this.state.monthly_income != '' && this.state.company_name != '') ||
                                                            (this.state.profession === '3' && this.state.monthly_income != '' && this.state.company_name != '') ||
                                                            (this.state.profession === '4' && this.state.monthly_income != '') ||
                                                            (this.state.profession === '5')) ? false : true}
                                                    style={this.state.profession &&
                                                        ((this.state.profession === '1' && this.state.monthly_income != '' && this.state.company_name != '') ||
                                                            (this.state.profession === '2' && this.state.monthly_income != '' && this.state.company_name != '') ||
                                                            (this.state.profession === '3' && this.state.monthly_income != '' && this.state.company_name != '') ||
                                                            (this.state.profession === '4' && this.state.monthly_income != '') ||
                                                            (this.state.profession === '5')) ? subBtn : {}}
                                                >Save &amp; Next</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 5 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="boxed max_images mt-4">
                                                <div className="row">
                                                    <div className="col-sm-12 form-group">
                                                        <h5 className="mb-2">
                                                            Kyc Documents
                                                        </h5>
                                                        <div className="rightpart float-right position-relative">
                                                            <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                                            <div className="dropdown-menu nav_upload_all" aria-labelledby="dropdownMenuButton">
                                                                <i style={{ cursor: 'pointer' }} className="fas fa-times float-right"></i>
                                                                <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={this.openDropModel} href={void (0)}>Upload All</a>
                                                                <a className="dropdown-item" style={{ cursor: 'pointer' }} href={void (0)}>Request Documents</a>
                                                            </div>
                                                        </div>
                                                        <ul className="listinputs">
                                                            <li>Max file size 5MB</li>
                                                            <li>Jpeg/Png/Pdf only</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-sm-6 form-group uploaded_img">
                                                        <label htmlFor="" className="form-label mb-2">
                                                            Photo
                                                        </label>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    ref={refParam => profileInputRef = refParam}
                                                                    onChange={this.handleProfileSelect}
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                />
                                                                {this.state.profileBase ? (
                                                                    <>  <div className="radius10">
                                                                        <img src={this.state.profileBase} />
                                                                        {/* {!this.state.isProfileVerified && ( */}
                                                                        <div className="img_abs">
                                                                            <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.openImageEdit(0, 1)} ><i className="fas fa-search-plus"></i></button>
                                                                            <button type="button" disabled={this.state.isProfileVerified} style={{ cursor: this.state.isProfileVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.openImageEdit(1, 1)} ><i className="fas fa-pen"></i></button>
                                                                            <button type="button" disabled={this.state.isProfileVerified} style={{ cursor: this.state.isProfileVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.handleProfileRemove(this.state.profileId)} ><i className="fa fa-trash-o"></i></button>
                                                                        </div>
                                                                        {/* )} */}
                                                                    </div>
                                                                    </>
                                                                ) : (
                                                                    <button type="button" onClick={() => profileInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                                )
                                                                }
                                                            </div></div>
                                                    </div>
                                                    <div className="col-sm-6 form-group uploaded_img">
                                                        <label htmlFor="" className="form-label mb-2">
                                                            PAN
                                                        </label>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    ref={refParam => panInputRef = refParam}
                                                                    onChange={this.handlePanSelect}
                                                                    onClick={(event) => {
                                                                        event.target.value = null
                                                                    }}
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                />
                                                                {this.state.panBase ? (
                                                                    <div className="radius10">
                                                                        {this.state.panFileType === 2 ? (
                                                                            <img style={{ cursor: 'pointer', padding: '10px' }} onClick={() => this.openPdf(this.state.panBase)} src='./images/pdf.png' />
                                                                        ) : (
                                                                            <>
                                                                                <img src={this.state.panBase} />
                                                                                {/* {!this.state.isPanVerified && ( */}
                                                                                <div className="img_abs">
                                                                                    <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.openImageEdit(0, 2)} ><i className="fas fa-search-plus"></i></button>
                                                                                    <button type="button" disabled={this.state.isPanVerified} style={{ cursor: this.state.isPanVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.openImageEdit(1, 2)} ><i className="fas fa-pen"></i></button>
                                                                                    <button type="button" disabled={this.state.isPanVerified} style={{ cursor: this.state.isPanVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.handleFileRemove(this.state.panId, 1)} ><i className="fa fa-trash-o"></i></button>
                                                                                </div>
                                                                                {/* )} */}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <button type="button" onClick={() => panInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                                )
                                                                }
                                                            </div></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 form-group">
                                                        <h6 className="h6_1">
                                                            {'Identity Proof > Upload Atleast One'}
                                                        </h6>
                                                        <Nav variant="pills" activeKey={this.state.selectedTab} onSelect={this.handleTab} defaultActiveKey={this.state.selectedTab}>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={1} disabled={defaultTab != 0 && defaultTab != 1 ? true : false} >Aadhar</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={2} disabled={defaultTab != 0 && defaultTab != 2 ? true : false} >Driving License</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={3} disabled={defaultTab != 0 && defaultTab != 3 ? true : false} >Voter ID</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={4} disabled={defaultTab != 0 && defaultTab != 4 ? true : false} >Passport</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <h6 className="h6_2">
                                                            {this.state.selectedTab == 1 ? 'Aadhaar Card' : this.state.selectedTab == 2 ? 'Driving License' : this.state.selectedTab == 3 ? 'Voter ID' : 'Passport'}
                                                        </h6>
                                                        <div className="row">
                                                            <div className="col-md-3 form-group">
                                                                <label htmlFor="" className="form-label mb-2">
                                                                    Front
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    ref={refParam => frontProofInputRef = refParam}
                                                                    onChange={this.handleFrontProofSelect}
                                                                    onClick={(event) => {
                                                                        event.target.value = null
                                                                    }}
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                />
                                                                {this.state.frontProofBase ? (
                                                                    <div className="radius10">
                                                                        {this.state.frontFileType === 2 ? (
                                                                            <img style={{ cursor: 'pointer', padding: '10px' }} onClick={() => this.openPdf(this.state.frontProofBase)} src='./images/pdf.png' />
                                                                        ) : (
                                                                            <>
                                                                                <img src={this.state.frontProofBase} />
                                                                                {/* {!this.state.isAddressDocVerified && ( */}
                                                                                <div className="img_abs">
                                                                                    <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.openImageEdit(0, 3)} ><i className="fas fa-search-plus"></i></button>
                                                                                    <button type="button" disabled={this.state.isAddressDocVerified} style={{ cursor: this.state.isAddressDocVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.openImageEdit(1, 3)} ><i className="fas fa-pen"></i></button>
                                                                                    <button type="button" disabled={this.state.isAddressDocVerified} style={{ cursor: this.state.isAddressDocVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.handleFileRemove(this.state.frontId, 2)} ><i className="fa fa-trash-o"></i></button>
                                                                                </div>
                                                                                {/* )} */}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <button type="button" onClick={() => frontProofInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                                )
                                                                }
                                                            </div>
                                                            <div className="col-md-3 form-group">
                                                                <label htmlFor="" className="form-label mb-2">
                                                                    Back
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    ref={refParam => backProofInputRef = refParam}
                                                                    onChange={this.handleBackProofSelect}
                                                                    onClick={(event) => {
                                                                        event.target.value = null
                                                                    }}
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                />
                                                                {this.state.backProofBase ? (
                                                                    <div className="radius10">
                                                                        {this.state.backFileType === 2 ? (
                                                                            <img style={{ cursor: 'pointer', padding: '10px' }} onClick={() => this.openPdf(this.state.backProofBase)} src='./images/pdf.png' />
                                                                        ) : (
                                                                            <>
                                                                                <img src={this.state.backProofBase} />
                                                                                {!this.state.isAddressDocVerified && (
                                                                                    <div className="img_abs">
                                                                                        <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.openImageEdit(0, 4)} ><i className="fas fa-search-plus"></i></button>
                                                                                        <button type="button" disabled={this.state.isAddressDocVerified} style={{ cursor: this.state.isAddressDocVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.openImageEdit(1, 4)} ><i className="fas fa-pen"></i></button>
                                                                                        <button type="button" disabled={this.state.isAddressDocVerified} style={{ cursor: this.state.isAddressDocVerified ? 'not-allowed' : 'pointer' }} onClick={() => this.handleFileRemove(this.state.backId, 3)} ><i className="fa fa-trash-o"></i></button>
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <button type="button" onClick={() => backProofInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                                )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <>
                                                <div className='v-scroll_lead'>
                                                    <div className="boxed max_images">
                                                        <div className="row">
                                                            <div className="col-sm-12 form-group">
                                                                <h5 className="mb-2">
                                                                    Financial Documents
                                                                </h5>
                                                                <ul className="listinputs">
                                                                    <li>Max file size 5MB</li>
                                                                    <li>Pdf only</li>
                                                                </ul>
                                                            </div>
                                                            <div className='row'>
                                                                {bankSrc && bankSrc.length > 0 && (
                                                                    bankSrc.map((item, index) => (
                                                                        <div key={`pdf-${index}`} className='col-md-3'>
                                                                            <img onClick={() => this.openPdf(item)} style={{ cursor: 'pointer' }} src="images/icons/pdf.png" alt="" />
                                                                        </div>
                                                                    )
                                                                    )
                                                                )
                                                                }
                                                            </div>
                                                            {!bankSrc && (
                                                                <div className="col-md-3 form-group">
                                                                    <h6 className="h6_2">
                                                                        Bank Statement
                                                                    </h6>
                                                                    <ul>
                                                                        {
                                                                            this.state.bankDocument && this.state.bankDocument.length > 0 && (
                                                                                this.state.bankDocument.map((item, index) => (
                                                                                    <li key={`statement-${index}`}>{item.name}<span style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.deleteRow(index)}>X</span></li>
                                                                                ))
                                                                            )
                                                                        }
                                                                    </ul>

                                                                    <input
                                                                        type="file"
                                                                        style={{ display: 'none' }}
                                                                        ref={refParam => bankSlipInputRef = refParam}
                                                                        onChange={this.handleBankSlipSelect}
                                                                        accept="application/pdf"
                                                                        multiple
                                                                    />
                                                                    <button type="button" onClick={() => bankSlipInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="row pr-4">

                                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                                <button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(4)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                                <button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(6)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button>

                                                                <Button style={{ cursor: 'pointer' }} type='button' onClick={() => this.onNextBording(4)} className="border-0 btn cancel mr-4">Cancel</Button>
                                                                <Button
                                                                    type="button"
                                                                    //  onClick={() => this.onNextBording(6)} 
                                                                    variant="secondary"
                                                                    className="btn btn-default_"
                                                                    onClick={this.handleStatementNext}
                                                                    disabled={bankSrc.length > 0 ? false : true}
                                                                    style={bankSrc.length > 0 ? subBtn : {}}
                                                                >Continue</Button>
                                                            </div>

                                                        </div> */}
                                            </>
                                        </div>
                                        <div className="row pr-4">

                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(4)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(6)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} type='button' onClick={() => this.onNextBording(4)} className="border-0 btn cancel mr-4">Cancel</Button>
                                                <Button
                                                    type="button"
                                                    //  onClick={() => this.onNextBording(6)} 
                                                    variant="secondary"
                                                    className="btn btn-default_"
                                                    onClick={this.handleKycNext}
                                                    disabled={this.state.profileBase !== '' && this.state.panBase !== '' &&
                                                        this.state.frontProofBase !== '' && this.state.backProofBase !== '' ? false : true}
                                                    style={this.state.profileBase !== '' && this.state.panBase !== '' &&
                                                        this.state.frontProofBase !== '' && this.state.backProofBase !== '' ? subBtn : {}}
                                                >Save &amp; Next</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 6 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <h4 className='cpp_title mt-3 mb-4'>Choose Payment Plan</h4>
                                            <div className='pricing_cariusel mb-5'>
                                                <OwlCarousel
                                                    className='owl-theme'
                                                    loop
                                                    margin={20}
                                                    responsive={this.state.responsive}
                                                    nav
                                                    dots={false}
                                                >
                                                    {plans && plans.length > 0 && plans.map((item, index) => (
                                                        <div className={`item ${this.state.selectedPlan === item.id ? "selected" : ""} `} key={`item-${index}`} onClick={() => this.handleSelectPlan(item.id, item.sfid)}>
                                                            <h4><span>₹</span> {item.disbursal_amount__c ? item.disbursal_amount__c.toLocaleString() : '--'} <span>/Mo</span></h4>
                                                            <div className='month mb-3'>{item.net_tenure__c} Months</div>
                                                            <ul className='list-unstyled m-0'>
                                                                <li>
                                                                    <p>Processing Fee</p>
                                                                    <h5><span>₹</span> {item.processing_fee__c ? item.processing_fee__c.toLocaleString() : '--'}</h5>
                                                                </li>
                                                                <li>
                                                                    <p>Due today</p>
                                                                    <h5><span>₹</span> {item.emi_amount__c ? item.emi_amount__c.toLocaleString() : '--'}</h5>
                                                                </li>
                                                                <li>
                                                                    <p>Interest ({item.fixed_rate__c}% p.a)</p>
                                                                    <h5><span>₹</span> {((item.fixed_rate__c / 100) * item.emi_amount__c).toFixed(2).toLocaleString()}</h5>
                                                                </li>
                                                                <li>
                                                                    <p>Total Repayble Amount</p>
                                                                    <h5><span>₹</span> {(((item.fixed_rate__c / 100) * item.emi_amount__c) + item.emi_amount__c).toFixed(2).toLocaleString()}</h5>
                                                                </li>
                                                                <li>
                                                                    <p>Down Payment</p>
                                                                    <h5><span>₹</span> {item.down_payment__c ? (item.down_payment__c).toFixed(2).toLocaleString() : '--'}</h5>
                                                                </li>
                                                            </ul>
                                                            <div className='text-center'>
                                                                <button className='d-inline-flex im_btn'>Includes Moratorium <span className='d-inline-block ml-2'><img src="images/icons/icon-ind.png" alt="icon-ind" className='img-fluid' /></span></button>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </OwlCarousel>
                                            </div>
                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(5)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(7)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}
                                                <Button onClick={() => this.onNextBording(5)} variant="secondary" className="btn border-0 cancel">Previous</Button>
                                                <Button onClick={() => this.onNextBording(7)} variant="secondary" className="btn btn-default_" style={subBtn}>Next</Button>
                                            </div>
                                        </div>
                                    </>
                                ) : this.state.onBoarding == 7 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <h4 className='cpp_title mt-3 mb-4'>Bank Account Details</h4>
                                            <p>Bank Name</p>
                                            {/* <div className='p-1'>
                                                <ul className='d-flex align-items-center bank_name'>
                                                    {bankData && bankData.length > 0 && (
                                                        bankData.map((item, index) => (
                                                            <li onClick={() => this.handlebank(item.bank_name)} key={"bank-" + index} >
                                                                <span className={`d-block ${this.state.bank === item.bank_name ? 'bank-active' : ''}`}><img src={item.bank_icon} alt="bank-1" className='img-fluid' /></span>
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </div> */}
                                            <div className="row w-100">
                                                <div className="col-sm-12 form-group">
                                                    <Select
                                                        options={bankOptions}
                                                        placeholder="Select Bank"
                                                        name="bank"
                                                        onChange={this.bankChange}
                                                    />
                                                </div>
                                                <div className="col-sm-6 form-group">
                                                    <label htmlFor="" className="form-label">
                                                        Account Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Bank Account Number"
                                                        onChange={this.handleBankAccount}
                                                        value={this.state.acc_no ? this.state.acc_no : ''}
                                                        name="acc_no"
                                                        id="acc_no"
                                                        minLength="9"
                                                        maxLength="18"
                                                    />
                                                    {
                                                        this.state.isValidAccount === false && this.state.acc_no.length !== 0 ? (
                                                            <div className="form-group">
                                                                <div className="alert alert-danger" role="alert">
                                                                    {this.state.Errmessage}
                                                                </div>
                                                            </div>
                                                        ) : ''
                                                    }
                                                </div>
                                                <div className="col-sm-6 form-group">
                                                    <label htmlFor="" className="form-label">
                                                        Account Holder Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Full Name"
                                                        name="acc_name"
                                                        value={this.state.acc_name ? this.state.acc_name : ''}
                                                        onChange={this.handleAccountName}
                                                    />
                                                    {this.state.isErrorName && this.state.errorname != '' && (
                                                        <span style={{ color: "red" }}>
                                                            {this.state.errorname}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group clearfix">
                                                    <label htmlFor="" className="form-label">
                                                        IFSC Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Bank IFSC Code"
                                                        maxLength={"11"}
                                                        name="ifsc"
                                                        id="ifsc"
                                                        value={this.state.ifsc ? this.state.ifsc : ''}
                                                        onChange={this.handleIfscChange}
                                                    />
                                                    {this.state.isValid == false && this.state.errorMsg != '' && (
                                                        <span style={{ color: "red" }}>
                                                            {this.state.errorMsg}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between align-items-center pr-4">


                                            <div className='col-lg-5'>
                                                <button className='link'>
                                                    <span className='d-inline-block mr-2' style={{ "width": "12px" }}><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                    We will deposit Rs. 1 to above bank account.
                                                </button>
                                            </div>

                                            <div className='col-lg-7 d-flex justify-content-lg-end'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(6)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(8)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}
                                                
                                                <Button onClick={() => this.onNextBording(6)} variant="secondary" className="btn cancel border-0">Previous</Button>
                                                <Button
                                                    disabled={this.state.ifsc && this.state.acc_name && this.state.acc_no && this.state.bank ? false : true}
                                                    onClick={() => this.updateBank()}
                                                    style={this.state.ifsc && this.state.acc_name && this.state.acc_no && this.state.bank ? subBtn : {}}
                                                    variant="secondary"
                                                    className="btn btn-default"
                                                >Verify</Button>

                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 8 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className='d-flex justify-content-between align-items-center mt-4  mb-4'>
                                                <h4 className='cpp_title'>Send eMandate completion request</h4>
                                                <div className='ml-3 d-flex justify-content-end align-items-center'>
                                                    <label className="switch m-0">
                                                        <input type="checkbox" name='checkAll' />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <p className='m-0 w-a-txt ml-3'>Select all</p>
                                                </div>
                                            </div>


                                            <div className='d-flex flex-wrap three_checkbox mb-4'>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="emailCheck" />
                                                        <label className="custom-control-label" htmlFor="emailCheck">Email</label>
                                                    </div>
                                                </div>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="whatsappCheck" />
                                                        <label className="custom-control-label" htmlFor="whatsappCheck">WhatsApp</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="smsCheck" />
                                                        <label className="custom-control-label" htmlFor="smsCheck">Push Notification/SMS</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className='cpp_title fz14 mb-4'>How eMandate registration works?</p>

                                            <div className='row mb-5'>
                                                <div className='col-lg-4'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h6 className='step_txt'>Step 1</h6>
                                                        <div className='arrow'></div>
                                                    </div>
                                                    <div>
                                                        <p className='fz12'>Open Link and Generate Auto-pay Mandate Instruction</p>
                                                    </div>
                                                </div>
                                                <div className='col-lg-4'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h6 className='step_txt'>Step 2</h6>
                                                        <div className='arrow'></div>
                                                    </div>
                                                    <div>
                                                        <p className='fz12'>Sign Mandate using OTP</p>
                                                    </div>
                                                </div>
                                                <div className='col-lg-4'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h6 className='step_txt'>Step 3</h6>
                                                        <div className='arrow'></div>
                                                    </div>
                                                    <div>
                                                        <p className='fz12'>Amount due (if any) is auto-debited from the customer's account monthly</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(7)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(9)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button onClick={() => this.onNextBording(7)} variant="secondary" className="btn cancel border-0">Cancel</Button>
                                                <Button onClick={this.handleSendKyc} variant="secondary" className="btn btn-default_" style={subBtn}>Send</Button>
                                            </div>
                                        </div>
                                    </>
                                ) : this.state.onBoarding == 9 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className='d-flex justify-content-between align-items-center mt-4  mb-4'>
                                                <h4 className='cpp_title mt-4 mb-4'>Physical Mandate Registration</h4>
                                                <span className='qst cursor-point' onClick={() => this.setState({ help_modal: !this.state.help_modal })}>?</span>
                                            </div>

                                            <div className='row align-items-center justify-content-between'>
                                                <input
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    ref={refParam => enachUploadInputRef = refParam}
                                                    onChange={this.handleEnachUploadSelect}
                                                    accept="application/pdf"
                                                />
                                                {!download_status && (
                                                    <div className='col-lg-6'>
                                                        <button type='button' onClick={this.saveFile} className='download_btn' >
                                                            <span><img src="images/icons/download.png" alt="download" /></span>
                                                            Download Mandate Form
                                                        </button>
                                                    </div>
                                                )}

                                                <div className='col-lg-6'>
                                                    <button
                                                        type='button'
                                                        className='upload'
                                                        onClick={(e) => {e.stopPropagation(); enachUploadInputRef.click()}}
                                                    >
                                                        <span><img src="images/icons/upload.png" alt="upload" /></span>
                                                        <span>Upload Signed Copy</span>
                                                        {/* <input type="file" /> */}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='my-lg-5 my-4'>
                                                <h4 className='or text-center'>-OR-</h4>
                                            </div>


                                            {this.state.help_modal &&

                                                <div class="row help_modal cursor-point" >
                                                    <div className='fs-16 font-weight-bold container d-flex justify-content-between mb-2'>

                                                        <span>How to share Physical Mandate Registration request with customer?</span><span><i className="fa fa-times " onClick={() => this.setState({ help_modal: !this.state.help_modal })}></i></span>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="step_txt">Step 1</h6>
                                                            <div class="arrow"></div>
                                                        </div>
                                                        <div>
                                                            <p class="fz12">Select medium to share the download link with customer.</p>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="step_txt">Step 2</h6>
                                                            <div class="arrow"></div>
                                                        </div>
                                                        <div>
                                                            <p class="fz12">Click on "Send Request" button.</p>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="step_txt">Step 3</h6>
                                                            <div class="arrow"></div>
                                                        </div>
                                                        <div>
                                                            <p class="fz12">Ask the customer to fill in the blank details and EMI details on the mandate.</p>
                                                        </div>
                                                    </div>

                                                    <div class="col-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="step_txt">Step 4</h6>
                                                            <div class="arrow"></div>
                                                        </div>
                                                        <div>
                                                            <p class="fz12">Get the scanned copy of signed mandate from the customer and upload it via "Upload Signed Copy"</p>
                                                        </div>
                                                    </div>


                                                </div>

                                            }





                                            <div className='d-flex justify-content-between align-items-center mt-4  mb-4'>
                                                <h4 className='cpp_title'>Send Physical Mandate completion request to user via</h4>




                                                <div className='ml-3 d-flex justify-content-end align-items-center'>
                                                    <label className="switch m-0">
                                                        <input type="checkbox" name='checkAll' onChange={(e)=>this.handleSelectSmsEmail(e)} checked={this.state.smscheck == 1 && this.state.emailcheck == 1 ? true :false} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <p className='m-0 w-a-txt ml-3'>Select all</p>
                                                </div>

                                            </div>


                                            <div className='d-flex flex-wrap three_checkbox mb-4'>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="emailCheck" onChange={(e)=>this.handleEmailChange(e)} checked={this.state.emailcheck==1 ? true :false} />
                                                        <label className="custom-control-label" htmlFor="emailCheck">Email</label>
                                                    </div>
                                                </div>
                                                {/* <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="whatsappCheck" />
                                                        <label className="custom-control-label" htmlFor="whatsappCheck">WhatsApp</label>
                                                    </div>
                                                </div> */}
                                                <div>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="smsCheck" onChange={(e)=>this.handleSmsChange(e)}  checked={this.state.smscheck==1 ? true :false}/>
                                                        <label className="custom-control-label" htmlFor="smsCheck">Push Notification/SMS</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className='cpp_title fz14 mb-4'>How eMandate registration works?</p>

                                            <div className='row mb-5'>
                                                <div className='col-lg-4'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h6 className='step_txt'>Step 1</h6>
                                                        <div className='arrow'></div>
                                                    </div>
                                                    <div>
                                                        <p className='fz12'>Open Link and Generate Auto-pay Mandate Instruction</p>
                                                    </div>
                                                </div>
                                                <div className='col-lg-4'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h6 className='step_txt'>Step 2</h6>
                                                        <div className='arrow'></div>
                                                    </div>
                                                    <div>
                                                        <p className='fz12'>Sign Mandate using OTP</p>
                                                    </div>
                                                </div>
                                                <div className='col-lg-4'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h6 className='step_txt'>Step 3</h6>
                                                        <div className='arrow'></div>
                                                    </div>
                                                    <div>
                                                        <p className='fz12'>Amount due (if any) is auto-debited from the customer's account monthly</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(8)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(10)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button onClick={() => this.onNextBording(8)} variant="secondary" className="btn cancel border-0">Cancel</Button>
                                                <Button onClick={this.handleSendPhysicalMandate} variant="secondary" className="btn btn-default_" style={subBtn}>Send</Button>
                                            </div>
                                        </div>

                                    </>
                                ) : this.state.onBoarding == 10 ? (
                                    <>

                                        <div className='v-scroll_lead'>

                                            {
                                                this.state.successmsg_ ?
                                                    <div className="boxed text-center mt-4 position-relative">
                                                        <h5 className="d-flex align-items-center justify-content-center">
                                                            <span className='success'>
                                                                <img src="images/tick-white.png" alt="tick-white" className='img-fluid' />
                                                            </span>

                                                            Physical Mandate Signed Copy Uploaded! </h5>
                                                        <button type='button' className='position-absolute border-0 close'>
                                                            <span className=''>
                                                                <img src="images/icons/icon-close2.png" alt="icon-close2" className='img-fluid' />
                                                            </span>
                                                        </button>
                                                    </div>
                                                    : ""
                                            }

                                            <div className='order_summery_wrapper'>
                                                <h4 className='cpp_title mt-4 mb-4 px-4'> Order Summary</h4>

                                                <div className='row px-4'>
                                                    <div className='col-md-9'>
                                                        <div className='row'>
                                                            <div className='col-md-3'>
                                                               {orderSummary && orderSummary.product_image &&  <img src={orderSummary.product_image} alt="loptop" className='img-fluid' />}
                                                            </div>
                                                            <div className='col-md-9 pro_description'>
                                                            <h5>{ orderSummary && orderSummary.product_name ? orderSummary.product_name:'- '}</h5>
                                                        <p>{orderSummary && orderSummary.product_description ? orderSummary.product_description:'-'}</p>
                                                        <span>{orderSummary && orderSummary.product_sku ? `SKU: ${orderSummary.product_sku}`:'-'}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-md-3'>
                                                    <p className='price__ color_DarkCerulean font-weight-bold'>{ orderSummary && orderSummary.product_price ? `₹ ${orderSummary.product_price}`:'-'}</p>
                                                    </div>
                                                </div>

                                                <div className='dashed_line my-4'></div>

                                                <div className='table__ px-4'>
                                                    <div className='row_table_th'>
                                                        <div className='th'>Tenure</div>
                                                        <div className='th'>APR (p.a.)</div>
                                                        <div className='th'>EMI Amount</div>
                                                        <div className='th'>EMI Start Date</div>
                                                        <div className='th'>
                                                            <button type='button' className='position-absolute dd___' onClick={this.succesmsg_}>
                                                                <img src="images/wc-next.png" alt="drop-down" className='rotate90' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='row_table_td'>
                                                    <div className='td'>{orderSummary.plan && orderSummary.plan.net_tenure__c ?`${orderSummary.plan.net_tenure__c} months`:'-'}</div>
                                                        <div className='td'>{orderSummary.plan  && orderSummary.plan.interest_rate_apr__c ?`${orderSummary.plan.interest_rate_apr__c}%`:'-'}</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.plan.emi_amount__c ?`₹ ${orderSummary.plan.emi_amount__c}`:'0'}</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.first_emi_date__c ? orderSummary.first_emi_date__c:'-'}</div>
                                                        <div className='td'></div>
                                                    </div>
                                                </div>

                                                {/* <div className='d-flex tablebottom_row justify-content-between' id="accordion">
                                                    <div className='t_r_txt'>Total Repayble Amount</div>
                                                    <div>
                                                        <div className='t_r_amount'><span>₹</span> {planData && planData.down_payment__c ? planData.down_payment__c.toLocaleString('en-IN') : 0}</div>
                                                        <button className='position-absolute dd_'>
                                                            <img src="images/wc-next-white.png" alt="drop-down" className='rotate90' data-toggle="collapse" data-target="#collapseOne" aria-controls="collapseOne"/>
                                                        </button>
        
                                                    </div> */}
                                                   
                                            </div>

                                            <div className='row my-3' id="accordion">
                                            <div className="card" style={{width: '100%',backgroundColor:'#1824AC'}}>        
                                                        <div className="card-header" id="heading-2">
                                                            <h5 className="mb-0">
                                                                <a className="collapsed d-flex align-items-center d-flex justify-content-between text-white" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                                    <div >Total Repayble Amount</div>
                                                                    <div  style={{marginRight:'22px'}}>{orderSummary && orderSummary.total_repayable_amount ? `₹ ${orderSummary.total_repayable_amount}`:'-'}</div>
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body my-3 text-white">
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>EMIs</div>
                                                                   <div>₹ {orderSummary.plan && orderSummary.plan.emi_amount__c ?`${orderSummary.plan.emi_amount__c}`:'-'} x {orderSummary.plan && orderSummary.plan.net_tenure__c ?`${orderSummary.plan.net_tenure__c}`:'-'}</div>
                                                                </div>
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>Interest</div>
                                                                   <div>₹ {orderSummary && orderSummary.interest ? ` ${orderSummary.interest}`:'-'}</div>
                                                                </div>
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>Pre-Emi Amount</div>
                                                                   <div>₹ {orderSummary && orderSummary.plan && orderSummary.plan.pre_emi__c ?`${orderSummary.plan.pre_emi__c}`:'-'}</div>
                                                                </div>
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>Other Changes</div>
                                                                   <div>₹ {orderSummary && orderSummary.other_charges ? `${orderSummary.other_charges}`:'-'}</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>

                                            {/* <div className='d-flex justify-content-between align-items-center mt-lg-5 mt-4  mb-4'>
                                                <h4 className='cpp_title'>Send Agreement Signing Request to Customer via</h4>

                                                <div className='ml-3 d-flex justify-content-end align-items-center'>
                                                    <label className="switch m-0">
                                                        <input type="checkbox" name='checkAll' />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <p className='m-0 w-a-txt ml-3'>Select all</p>
                                                </div>

                                            </div> */}

{/* 
                                            <div className='d-flex flex-wrap three_checkbox mb-4'>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="emailCheck" />
                                                        <label className="custom-control-label" htmlFor="emailCheck">Email</label>
                                                    </div>
                                                </div>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="whatsappCheck" />
                                                        <label className="custom-control-label" htmlFor="whatsappCheck">WhatsApp</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="smsCheck" />
                                                        <label className="custom-control-label" htmlFor="smsCheck">Push Notification/SMS</label>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(9)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(11)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button onClick={() => this.onNextBording(9)} variant="secondary" className="cancel border-0">Cancel</Button>
                                                <Button onClick={() => this.handlePay(planData && planData.down_payment__c ? planData.down_payment__c : 0)} variant="secondary" className="btn btn-default_" style={subBtn}>Pay</Button>
                                            </div>
                                        </div>
                                    </>
                                ) : this.state.onBoarding == 11 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="boxed text-center mt-4 position-relative">
                                                <h5 className="d-flex align-items-center justify-content-center">
                                                    <span className='success'>
                                                        <img src="images/tick-white.png" alt="tick-white" className='img-fluid' />
                                                    </span>

                                                    Physical Mandate Signed Copy Uploaded!</h5>
                                                <button type='button' className='position-absolute border-0 close'>
                                                    <span className=''>
                                                        <img src="images/icons/icon-close2.png" alt="icon-close2" className='img-fluid' />
                                                    </span>
                                                </button>
                                            </div>

                                            <div className='order_summery_wrapper'>
                                                <h4 className='cpp_title mt-4 mb-4 px-4'> Order Summary</h4>

                                                {/* <div className='row px-4'>
                                                    <div className='col-md-9'>
                                                        <div className='row'>
                                                            <div className='col-md-3'>
                                                                <img src={proImages && proImages.base64 ? `data:image/jpg;base64,${proImages.base64}` : "images/custom/loptop.png"} alt="loptop" className='img-fluid' />
                                                            </div>
                                                            <div className='col-md-9 pro_description'>
                                                                <h5>{productData && productData.name ? productData.name : ''}</h5>
                                                                <p>Silvergray, Apple M1 Pro with 8-core CPU, 14-core GPU, 16-core Neural Engine</p>
                                                                <span>{productData && productData.sfid ? productData.sfid : ''}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-md-3'>
                                                        <p className='price__'>₹ {productData && productData.mrp__c ? productData.mrp__c.toLocaleString('en-IN') : '50000'}</p>
                                                    </div>
                                                </div> */}
                                            
                                            <div className='row px-4'>
                                                    <div className='col-md-9'>
                                                        <div className='row'>
                                                            <div className='col-md-3'>
                                                               {orderSummary && orderSummary.product_image &&  <img src={orderSummary.product_image} alt="loptop" className='img-fluid' />}
                                                            </div>
                                                            <div className='col-md-9 pro_description'>
                                                            <h5>{ orderSummary && orderSummary.product_name ? orderSummary.product_name:'- '}</h5>
                                                        <p>{orderSummary && orderSummary.product_description ? orderSummary.product_description:'-'}</p>
                                                        <span>{orderSummary && orderSummary.product_sku ? `SKU: ${orderSummary.product_sku}`:'-'}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-md-3'>
                                                    <p className='price__ color_DarkCerulean font-weight-bold'>{ orderSummary && orderSummary.product_price ? `₹ ${orderSummary.product_price}`:'-'}</p>
                                                    </div>
                                                </div>


                                                <div className='dashed_line my-4'></div>

                                                <div className='table__ px-4'>
                                                    <div className='row_table_th'>
                                                        <div className='th'>Tenure</div>
                                                        <div className='th'>APR (p.a.)</div>
                                                        <div className='th'>EMI Amount</div>
                                                        <div className='th'>EMI Start Date</div>
                                                        <div className='th'>
                                                            <button
                                                                type='button'
                                                                className='position-absolute dd___'>
                                                                <img
                                                                    src="images/wc-next.png"
                                                                    alt="drop-down"
                                                                    className='rotate90' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='row_table_td'>
                                                        <div className='td'>{orderSummary.plan && orderSummary.plan.net_tenure__c ?`${orderSummary.plan.net_tenure__c} months`:'-'}</div>
                                                        <div className='td'>{orderSummary.plan  && orderSummary.plan.interest_rate_apr__c ?`${orderSummary.plan.interest_rate_apr__c}%`:'-'}</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.plan.emi_amount__c ?`₹ ${orderSummary.plan.emi_amount__c}`:'-'}</div>
                                                        <div className='td'>{orderSummary.plan && orderSummary.first_emi_date__c ? orderSummary.first_emi_date__c:'-'}</div>
                                                        <div className='td'></div>
                                                    </div>
                                                </div>

                                                <div className='row px-4 mb-4'>
                                                    <div className='col-md-6 '>
                                                        <p className=''>Moratorium Tenure</p>
                                                        <h5 className='fz18'>{ orderSummary && orderSummary.plan && orderSummary.moratorium_duration__c ?orderSummary.moratorium_duration__c:'-'}</h5>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <p>EMI Account</p>
                                                        {/* <div><span className='d-inline-block' style={{ "width": "20px" }}><img src="images/bank-icon/bank-1.png" alt="" className='img-fluid' /></span>xxxxxxx12001</div> */}
                                                        <div>{ orderSummary && orderSummary.bank_account_num ?`xxxxxxx${orderSummary.bank_account_num.substr(orderSummary.bank_account_num.length-5, 5)}`:'-'}</div>
                                                    </div>
                                                </div>

                                                {/* <div className='d-flex tablebottom_row justify-content-between'>
                                                    <div className='t_r_txt'>Total Repayble Amount</div>
                                                    <div>
                                                        <div className='t_r_amount'><span>₹</span> {planData && planData.down_payment__c ? planData.down_payment__c.toLocaleString('en-IN') : 0} </div>
                                                        <button className='position-absolute dd_'>
                                                            <img src="images/wc-next-white.png" alt="drop-down" className='rotate90' />
                                                        </button>
                                                    </div>

                                                </div> */}
                                                <div className='row my-3' id="accordion">
                                            <div className="card" style={{width: '100%',backgroundColor:'#1824AC',color:'white'}}>
                                                        <div className="card-header" id="heading-2">
                                                            <h5 className="mb-0">
                                                                <a className="collapsed d-flex align-items-center d-flex justify-content-between text-white" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                                    <div>Total Repayble Amount</div>
                                                                    <div style={{marginRight:'22px'}}>{orderSummary && orderSummary.total_repayable_amount ? `₹ ${orderSummary.total_repayable_amount}`:'-'}</div>
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                        <div className="card-body my-3 text-white">
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>EMIs</div>
                                                                   <div>₹ {orderSummary.plan && orderSummary.plan.emi_amount__c ?`${orderSummary.plan.emi_amount__c}`:'-'} x {orderSummary.plan && orderSummary.plan.net_tenure__c ?`${orderSummary.plan.net_tenure__c}`:'-'}</div>
                                                                </div>
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>Interest</div>
                                                                   <div>₹ {orderSummary && orderSummary.interest ? ` ${orderSummary.interest}`:'-'}</div>
                                                                </div>
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>Pre-Emi Amount</div>
                                                                   <div>₹ {orderSummary && orderSummary.plan && orderSummary.plan.pre_emi__c ?`${orderSummary.plan.pre_emi__c}`:'-'}</div>
                                                                </div>
                                                                <div className='d-flex align-items-center d-flex justify-content-between px-3'>
                                                                   <div>Other Changes</div>
                                                                   <div>₹ {orderSummary && orderSummary.other_charges ? `${orderSummary.other_charges}`:'-'}</div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>

                                            </div>
                                            {isOtpSent && (
                                                <div className='col-md-12'>
                                                    <h4 className="e_otp_txt mt-5" style={{ textAlign: 'center' }}>Enter OTP sent to {hMobile}</h4>
                                                    <div className="otp-fill-boxes d-flex flex-row justify-content-center">
                                                        <input
                                                            ref={this.textInput1}
                                                            name="otp1"
                                                            id="otp1"
                                                            type="text"
                                                            autoComplete="off"
                                                            value={this.state.otp1}
                                                            maxLength={1}
                                                            onChange={e => this.handleOtpChange("otp1", e)}
                                                            tabIndex="1"
                                                            placeholder={0}
                                                            onKeyUp={e => this.inputfocus(e, "otp1")}
                                                            className={`${this.state.otpError && this.state.otp1 ? "error" : ""}`}
                                                        />
                                                        <input
                                                            ref={this.textInput2}
                                                            type="text"
                                                            maxLength={1}
                                                            name="otp2"
                                                            id="otp2"
                                                            autoComplete="off"
                                                            value={this.state.otp2}
                                                            onChange={e => this.handleOtpChange("otp2", e)}
                                                            tabIndex="2"
                                                            placeholder={0}
                                                            onKeyUp={e => this.inputfocus(e, "otp2")}
                                                            className={`${this.state.otpError && this.state.otp2 ? "error" : ""}`}
                                                        />
                                                        <input
                                                            ref={this.textInput3}
                                                            type="text"
                                                            maxLength={1}
                                                            name="otp3"
                                                            id="otp3"
                                                            autoComplete="off"
                                                            value={this.state.otp3}
                                                            onChange={e => this.handleOtpChange("otp3", e)}
                                                            tabIndex="3"
                                                            placeholder={0}
                                                            onKeyUp={e => this.inputfocus(e, "otp3")}
                                                            className={`${this.state.otpError && this.state.otp3 ? "error" : ""}`}
                                                        />
                                                        <input
                                                            ref={this.textInput4}
                                                            type="text"
                                                            maxLength={1}
                                                            name="otp4"
                                                            id="otp4"
                                                            autoComplete="off"
                                                            value={this.state.otp4}
                                                            onChange={e => this.handleOtpChange("otp4", e)}
                                                            tabIndex="4"
                                                            placeholder={0}
                                                            onKeyUp={e => this.inputfocus(e, "otp4")}
                                                            className={`${this.state.otpError && this.state.otp4 ? "error" : ""}`}
                                                        />
                                                    </div>
                                                    {(this.state.otp1 || this.state.otp2 || this.state.otp3 || this.state.otp4) && this.state.otpError ? (
                                                        <div className={"row"} style={{ textAlign: 'center', justifyContent: 'center' }}>
                                                            <span className='d-inline-block invalid_otp'>Please enter valid OTP</span>
                                                        </div>
                                                    ) : ''}
                                                    {!this.state.viewResend && (
                                                        <div className={"row"} style={{ textAlign: 'center', justifyContent: 'center' }}>
                                                            <p className='mt-2'><img src={"images/icons/icon-ind.png"} alt="icon-ind2" className='img-fluid' /> Verification code valid for next {' ' + this.state.timer} min</p>
                                                        </div>
                                                    )}
                                                    {this.state.viewResend && (
                                                        <div className={"row"} style={{ textAlign: 'center', justifyContent: 'center' }}>
                                                            <button type="button" onClick={this.handleResendSendOtp} className="d-inline-block resend-btn mt-2" >Resend OTP</button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* <div className='d-flex justify-content-between align-items-center mt-lg-5 mt-4  mb-4'>
                                                <h4 className='cpp_title'>Send Agreement Signing Request to Customer via</h4>

                                                <div className='ml-3 d-flex justify-content-end align-items-center'>
                                                    <label className="switch m-0">
                                                        <input type="checkbox" name='checkAll' />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <p className='m-0 w-a-txt ml-3'>Select all</p>
                                                </div>

                                            </div> */}

{/* 
                                            <div className='d-flex flex-wrap three_checkbox mb-4'>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="emailCheck" checked={true} />
                                                        <label className="custom-control-label" htmlFor="emailCheck">Email</label>
                                                    </div>
                                                </div>
                                                <div className='mr-4'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="whatsappCheck" />
                                                        <label className="custom-control-label" htmlFor="whatsappCheck">WhatsApp</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="smsCheck" />
                                                        <label className="custom-control-label" htmlFor="smsCheck">Push Notification/SMS</label>
                                                    </div>
                                                </div>
                                            </div> */}

                                        </div>

                                        <div className="row justify-content-between align-items-center mb-4">

                                            <div className='col-md-5'>
                                                <input type="text" style={{width:'90%'}} placeholder='Input serial number' className='input_style_' />
                                            </div>
                                            <div className='col-md-7 d-flex justify-content-end text-right'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(10)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(12)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}


                                                <Button onClick={() => this.onNextBording(10)} variant="secondary" className="btn border-0 cancel">Cancel</Button>
                                                <Button onClick={() => this.handleSendAgreementSigning(planData && planData.id ? planData.id : 0)} variant="secondary" className="btn btn-default_" style={subBtn}>Approve</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 12 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="boxed mt-4">
                                                <div className='d-flex justify-content-between mb-lg-5 mb-4'>
                                                    <h5 className="m-0">Delivery Address</h5>
                                                    <button type='button' onClick={() => this.addNewAddress(2)} className='btn btn-sm border-0 btn-primary color_1 shadow-none'><i className="fas fa-plus"></i> Add New</button>
                                                </div>
                                                {addressList && addressList.length > 0 && (
                                                    addressList.map((item, index) => (
                                                        <div className='address_box mb-4'>
                                                            <div className='address_checkbox'>
                                                                <input
                                                                    type="radio"
                                                                    value={item.id}
                                                                    name="selectedAddress"
                                                                    id={`selectedAddress-${item.id}`}
                                                                    defaultChecked={`${this.state.selectedAddress === item.id ? "checked" : ""}`}
                                                                    onClick={() => this.selectAddress(item.id)}
                                                                />
                                                                <label></label>
                                                            </div>
                                                            <div className='address address_checked'>
                                                                <h5>{item.address__c}</h5>
                                                                <p>Source: <span>{item.name}</span></p>
                                                            </div>
                                                            {/* <button className='position-absolute edit_address_btn'>
                                                                <img src="images/icons/edit_20.png" alt="" className='rotate180' />
                                                            </button> */}
                                                        </div>
                                                    ))
                                                )
                                                }
                                            </div>


                                            <div className="order_summery_wrapper mt-4">
                                                <h4 className='cpp_title mt-4 mb-4 px-4'> Order Summary</h4>
                                                <div className='d-flex tablebottom_row justify-content-between'>
                                                    <div className='t_r_txt'>Total Repayble Amount</div>
                                                    <div>
                                                        <div className='t_r_amount'><span>₹</span> {planData && planData.down_payment__c ? planData.down_payment__c.toLocaleString('en-IN') : 0}</div>
                                                        <button className='position-absolute dd_'>
                                                            <img src="images/wc-next-white.png" alt="drop-down" className='rotate90' />
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <div className='d-flex align-items-center mt-4'>
                                                        <div className='single_check mr-2'>
                                                            <input type="checkbox" />
                                                            <label></label>
                                                        </div>
                                                        <label className='m-0'>I have received the upfront payment from the customer.</label>
                                                    </div>


                                                </div>
                                                <div className='col-12 mt-3'>
                                                    <button className='link'>
                                                        <span className='d-inline-block mr-2' style={{ "width": "12px" }}><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                        The amount collected from the customer will be deducted from the disbursal amount.
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row pr-4">
                                            <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(11)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(13)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button onClick={() => this.onNextBording(11)} variant="secondary" className="btn border-0 cancel">Cancel</Button>
                                                <Button
                                                    onClick={this.updateDeliveryAddress}
                                                    disabled={this.state.selectedAddress != '' ? false : true}
                                                    style={this.state.selectedAddress != '' ? subBtn : {}} variant="secondary" className="btn btn-default_" >Save &amp; Next</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 13 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <h5 className="mt-4 mb-3"> Enter PAN</h5>
                                            <div className="pansection text-center">
                                                <div className="paninput">
                                                    <input
                                                        type={'text'}
                                                        name='pan'
                                                        className="PANtextbox"
                                                        placeholder="XXXXXXX76A"
                                                        value={this.state.pan ? this.state.pan : ''}
                                                        maxLength="10"
                                                        onChange={this.handlePanChange}
                                                    />
                                                </div>
                                                <div>
                                                    <p>OR</p>
                                                    <label for="file_input_id" className="upload_pan_btn">Upload PAN Card</label>
                                                    <input type="file" id="file_input_id" onChange={(e) => {this.getPanDetails(e)}}></input>
                                                </div>
                                                <div className="d-block text-center">
                                                    <div className="row error-msg">
                                                        {
                                                            this.state.isValidPan === false && this.state.errorMsg !== '' ? (
                                                                <span >
                                                                    {this.state.errorMsg}
                                                                </span>
                                                            ) : ''
                                                        }
                                                        {
                                                            this.state.successMsg != '' && this.state.isSuccess === 0 ? (
                                                                <span>
                                                                    {this.state.successMsg}
                                                                </span>
                                                            ) : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between align-items-center pr-4">
                                            <div className="col-lg-5 form_notes mt-0">

                                                <button className='link'>
                                                    <span className='d-inline-block mr-2'><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                    This will not affect the applicant's Credit Score
                                                </button>
                                                {/* <p className="color_1 mb-0"><img src="images/icons/tick-mark.png" alt="tick-mark" className='img-fluid'/> </p> */}
                                            </div>

                                            <div className='col-lg-7 d-flex justify-content-end'>
                                                {/* prev next arrow*/}
                                                {/* <button type="button" style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(1)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button> */}

                                                <button
                                                    disabled={this.state.pan && this.state.pan !== '' && this.state.isValidPan === true ? false : true}
                                                    type="button" style={{ cursor: 'pointer' }} className="btn btn-default"><i className="fas fa-arrow-right"></i></button>



                                                <Button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(0)} className="border-0 btn cancel mr-4">Cancel</Button>

                                                <Button
                                                    type='button'
                                                    onClick={this.updatePan}
                                                    className="btn btn-secondary"
                                                    disabled={this.state.pan && this.state.pan !== '' && this.state.isValidPan === true ? false : true}
                                                    style={this.state.pan && this.state.pan !== '' && this.state.isValidPan === true ? subBtn : {}}
                                                >Confirm</Button>
                                            </div>
                                        </div>
                                    </>
                                ) : this.state.onBoarding === 14 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <h5 className="mt-4 mb-3"> Approval Pending</h5>
                                        </div>
                                    </>
                                ) : this.state.onBoarding === 15 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <h5 className="mt-4 mb-3"> Approval Rejected</h5>
                                        </div>
                                    </>
                                ) : this.state.onBoarding === 16 ? (
                                    <div className="row">
                                        <div className="col-md-12 success-popup text-center">
                                            <h5>Congratulations!</h5>
                                            <p className="t1">Your order has been completed</p>
                                            <div className="row align-items-center justify-content-center"><div className="col-md-12 prizeamt"><i className="fas fa-check-circle"></i></div></div>
                                        </div>
                                    </div>
                                ) : this.state.onBoarding === 17 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="mn_height_57">
                                                <div className="boxed mt-4">
                                                    <h5 className="mb-3">Add Delivery Address <button type='button' className='btn btn-sm border-0 btn-primary shadow-none float-right'><i className="fas fa-info-circle f-16"></i></button></h5>

                                                    <div className="row w-100">
                                                        <div className="col-sm-12 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                Address Line
                                                            </label>
                                                            {this.state.gmapsLoaded && (
                                                                <PlacesAutocomplete
                                                                    value={this.state.address}
                                                                    style={{ width: '100%' }}
                                                                    onChange={this.handlePlacesChange}
                                                                    onSelect={this.handleSelect}
                                                                >
                                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                        <div className="form-group position-relative">
                                                                            <input
                                                                                {...getInputProps({
                                                                                    placeholder: 'Search Area/Road ...',
                                                                                    className: 'form-control location-search-input',
                                                                                })}
                                                                            />
                                                                            <div className="autocomplete-dropdown-container">
                                                                                {loading && <div>Loading...</div>}
                                                                                {suggestions.map((suggestion, index) => {
                                                                                    const className = suggestion.active
                                                                                        ? 'suggestion-item--active'
                                                                                        : 'suggestion-item';
                                                                                    // inline style for demonstration purpose
                                                                                    const style = suggestion.active
                                                                                        ? { backgroundColor: '#eaeaea', cursor: 'pointer' }
                                                                                        : { backgroundColor: '#f5f5f5', cursor: 'pointer' };
                                                                                    return (
                                                                                        <div
                                                                                            key={'item' + index}
                                                                                            {...getSuggestionItemProps(suggestion, {
                                                                                                className,
                                                                                                style,
                                                                                            })}
                                                                                        >
                                                                                            <span key={index}>{suggestion.description}</span>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </PlacesAutocomplete>
                                                            )}
                                                        </div>
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="City"
                                                                onChange={this.handleChange}
                                                                value={city}
                                                                name="city"
                                                            />
                                                        </div>
                                                        <div className="col-sm-6 form-group">
                                                            <label htmlFor="" className="form-label">
                                                                State
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="State"
                                                                name="state"
                                                                value={state}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-group clearfix">
                                                            <label htmlFor="" className="form-label">
                                                                Pincode
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="000 000"
                                                                maxLength={"6"}
                                                                name="address_pin"
                                                                id="address_pin"
                                                                value={this.state.address_pin}
                                                                onChange={this.onlyNumbers}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between align-items-center pr-4">
                                            <div className="col-lg-5 form_notes mt-0">
                                                <button className='link'>
                                                    <span className='d-inline-block mr-2'><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                    User's data will not be saved in case you cancel or close the page.4
                                                </button>
                                            </div>
                                            {/* prev next arrow*/}
                                            <div className='col-lg-7 d-flex justify-content-end'>
                                                {/* <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(2)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button type='button' style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(4)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} type='button' onClick={this.closeModel} className="border-0 mr-4 btn cancel">Cancel</Button>
                                                <Button
                                                    type='button'
                                                    onClick={this.addDeliveryAddress}
                                                    className="btn btn-default_"
                                                    disabled={address != '' && state != '' && city && pincode != '' ? false : true}
                                                    style={address != '' && state != '' && city && pincode != '' ? subBtn : {}}
                                                >Save &amp; Next</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding == 18 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="boxed max_images mt-4">
                                                <div className="row">
                                                    <div className="col-sm-12 form-group">
                                                        <h6 className="h6_1">
                                                            {'Identity Proof > Upload Atleast One'}
                                                        </h6>
                                                        <Nav variant="pills" activeKey={this.state.selectedBankTab} onSelect={this.handleBankTab} defaultActiveKey={this.state.selectedBankTab}>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={1} disabled={defaultBankTab != 0 && defaultBankTab != 1 ? true : false} >Cancelled Cheque</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={2} disabled={defaultBankTab != 0 && defaultBankTab != 2 ? true : false} >Bank Passbook</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={3} disabled={defaultBankTab != 0 && defaultBankTab != 3 ? true : false} >Bank Statement</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <input
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            ref={refParam => bankProofInputRef = refParam}
                                                            onChange={this.handleBankProofSelect}
                                                            accept="image/x-png,image/jpeg,image/jpg, application/pdf"
                                                        />
                                                        <div className='row'>
                                                            {bankProofSrc && bankProofSrc.length > 0 && (
                                                                bankProofSrc.map((item, index) => (
                                                                    <div key={`pdf-${index}`} className='col-md-3'>
                                                                        <img onClick={() => this.openPdf(item)} style={{ cursor: 'pointer' }} src="images/icons/pdf.png" alt="" />
                                                                    </div>
                                                                )
                                                                )
                                                            )
                                                            }
                                                        </div>
                                                        {!bankProofSrc && (
                                                            <button type="button" onClick={() => bankProofInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : this.state.onBoarding === 19 ? (
                                    <>
                                        <div className='v-scroll_lead'>
                                            <div className="boxed max_images">
                                                <div className="row">
                                                    <div className="col-sm-12 form-group">
                                                        <h5 className="mb-2">
                                                            Financial Documents
                                                        </h5>
                                                        <ul className="listinputs">
                                                            <li>Max file size 5MB</li>
                                                            <li>Pdf only</li>
                                                        </ul>
                                                    </div>
                                                    <div className='row'>
                                                        {bankSrc && bankSrc.length > 0 && (
                                                            bankSrc.map((item, index) => (
                                                                <div key={`pdf-${index}`} className='col-md-3'>
                                                                    <img onClick={() => this.openPdf(item)} style={{ cursor: 'pointer' }} src="images/icons/pdf.png" alt="" />
                                                                    <p style={{color:"#1824AC", cursor:"pointer",marginTop:"12px",textAlign:"center"}} onClick={() => this.setState({bankSrc:''})}>remove</p>
                                                                </div>
                                                            )
                                                            )
                                                        )
                                                        }
                                                    </div>
                                                    {!bankSrc && (
                                                        <div className="col-md-3 form-group">
                                                            <h6 className="h6_2">
                                                                Bank Statement
                                                            </h6>
                                                            <ul>
                                                                {
                                                                    this.state.bankDocument && this.state.bankDocument.length > 0 && (
                                                                        this.state.bankDocument.map((item, index) => (
                                                                            <li key={`statement-${index}`}>{item.name}<span style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.deleteRow(index)}>X</span></li>
                                                                        ))
                                                                    )
                                                                }
                                                            </ul>

                                                            <input
                                                                type="file"
                                                                style={{ display: 'none' }}
                                                                ref={refParam => bankSlipInputRef = refParam}
                                                                onChange={this.handleBankSlipSelect}
                                                                accept="application/pdf"
                                                                multiple
                                                            />
                                                            <button type="button" onClick={() => bankSlipInputRef.click()} className="btn btn-upload"><i className="fas fa-upload"></i> Upload</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pr-4">

                                            <div className='col-sm-12 d-flex  justify-content-end align-items-center'>
                                                {/* prev next arrow*/}
                                                {/* <button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(4)} className="btn btn-default"><i className="fas fa-arrow-left"></i></button>
                                                <button style={{ cursor: 'pointer' }} onClick={() => this.onNextBording(6)} className="btn btn-default"><i className="fas fa-arrow-right"></i></button> */}

                                                <Button style={{ cursor: 'pointer' }} type='button' onClick={() => this.onNextBording(4)} className="border-0 btn cancel mr-4">Cancel</Button>
                                                <Button
                                                    type="button"
                                                    //  onClick={() => this.onNextBording(6)} 
                                                    variant="secondary"
                                                    className="btn btn-default_"
                                                    onClick={this.handleStatementNext}
                                                    disabled={bankSrc.length > 0 ? false : true}
                                                    style={bankSrc.length > 0 ? subBtn : {}}
                                                >Continue</Button>
                                            </div>

                                        </div>
                                    </>
                                ) : this.state.onBoarding === 20 ? (
                                    <>
                                        <div className='v-scroll_st px-4'>
                                            <div className='mb-5 pb-5'>
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
                                                {
                                                    this.state.sendagainshow ? <p className='text-right pt-4'>Customer didn't receive the link?
                    
                                                    <button onClick={this.handleSendAgain} className='links'>Send Again</button></p> : ''
                                                }
                                                
                                            </div>
                                            <div className='text-right'>
                                                <button className='proceed-btn'><img src="images/loadinfo2.gif"></img> Waiting for customer to proceed...</button>
                                            </div>
                                        </div>
                                    </>
                                ) : this.state.onBoarding === 21 ? (
                                    <>
                                        <div className="loader"></div>
                                    </>
                                ) : ('')}
                            </div>
                        </Scrollbar>
                    </Modal.Body>
                </Modal>
                <ToastContainer />
            </>
        )
    }

}

function mapStateToProps(state) {
    const { lead_profile_show, document_drop_show } = state.model;
    const { banks, opp_id, lead_id, lead_profile, entity, entitySearch,seettlemt_opp_id,orderSummary } = state.user;
    const { user_id, salesForceToken, sfid } = state.auth;
    const { plans, product } = state.payment;
    console.log("Akshay",opp_id)
    return {
        document_drop_show,
        lead_profile_show,
        lead_profile,
        entitySearch,
        banks,
        entity,
        opp_id,
        lead_id,
        user_id,
        sfid,
        plans,
        product,
        salesForceToken,
        seettlemt_opp_id,
        orderSummary,
    };
}

export default connect(mapStateToProps)(LeadsProfile)