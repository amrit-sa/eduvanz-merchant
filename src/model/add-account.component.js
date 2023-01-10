import React, { Component } from 'react'
import $ from 'jquery';
import Select from 'react-select'
import { Modal, Button } from "react-bootstrap"
import { closeAddAccount } from "../actions/model"
import { getBanks, addBank } from "../actions/user";
import { Scrollbar } from "react-scrollbars-custom";



class AddNewAccount extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onAlphaAccount = this.onAlphaAccount.bind(this);
        this.onAlpha = this.onAlpha.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.state = {
            acc_name: "",
            acc_type: "",
            acc_number: "",
            ifsc: "",
            branch: "",
            isActive: false,
            bank: '',
            bank_icon: "",
            message: '',
            errorMsg: '',
            isValid: true,
            isValidIFSC: true,
            showAll: true,
            isErrorName: false,
            errorname: '',
            errorIFsc: '',
            isErrorNameBranch: false,
            errornamebranch: '',
            viewall: false,
        };

        //   console.log("Componet addAccount props : ",this.props,props);
    }

    
    handleClear=()=>{
        this.setState({
            acc_name: "",
            acc_type: "",
            acc_number: "",
            ifsc: "",
            branch: "",
            isActive: false,
            bank: '',
            bank_icon: "",
            message: '',
            errorMsg: '',
            isValid: true,
            isValidIFSC: true,
            showAll: true,
            isErrorName: false,
            errorname: '',
            errorIFsc: '',
            isErrorNameBranch: false,
            errornamebranch: '',
            viewall: false,
        })
    }

    closeAddModel = () => {
        this.handleClear();
        this.props.dispatch(closeAddAccount());
    }

    componentDidMount() {
        this.props.dispatch(getBanks());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.adduser_show !== this.props.adduser_show) {
            this.setState(this.state);
        }


    }

    handlebank = (value, bankicon) => {
        this.setState({ bank: value, bank_icon: bankicon, showAll: false, viewall: false });
        console.log("bank name", value)
        console.log("bank icon", bankicon)
    }

    handleChange = (e) => {
        e.persist();
        console.log(e.target.value)
        this.setState(
            { [e.target.name]: e.target.value }
        );
    }

    handleBankAccount = (e) => {
        e.persist();
        this.setState({ acc_number: e.target.value })
        var pattern = new RegExp(/^[a-zA-Z0-9]+$/);

        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                document.getElementById('acc_number').value = '';
                this.setState({ acc_number: '' });
                this.setState({ isValid: false });
                this.setState({ message: "Please enter valid account number." });
            } else if (e.target.value.length < 9) {
                this.setState({ isValid: false });
                this.setState({ message: "Please enter valid account number." });
            } else if (e.target.value.length >= 9) {
                this.setState({ isValid: true, message: "" });

            }

        } else {
            this.setState({ isValid: true, message: "" });
        }
    }


    handleIFSC = (e) => {
        e.persist();

        var regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        this.setState(
            { [e.target.name]: e.target.value }
        );
        if (e.target.value !== '') {
            if (regex.test(e.target.value.toUpperCase())) {
                this.setState({ errorIFsc: '' });
            } else {
                this.setState({ errorIFsc: 'Enter valid IFSC code' });
            }
        } else {
            // this.setState(
            //   { [e.target.name]: e.target.value }
            // );
            this.setState({ errorIFsc: '' });
        }

    }

    handleCheckBoxChange = (e) => {
        e.persist();
        if (e.target.checked) {
            this.setState(
                { [e.target.name]: true }
            );
        }
        else {
            this.setState(
                { [e.target.name]: false }
            );
        }
    }
    onAlpha = (e) => {
        if (e.target.name == 'branch') {
            var hasNumber = /\d/;
            if (!hasNumber.test(e.target.value)) {
                this.setState(
                    { [e.target.name]: e.target.value }
                );
                this.setState(
                    { isErrorNameBranch: false, errornamebranch: "" }
                );
            }
            else {
                this.setState(
                    { isErrorNameBranch: true, errornamebranch: "Please enter valid branch" }
                );
            }
        } else {
            this.setState(
                { [e.target.name]: e.target.value }
            );
        }
    }
    onAlphaAccount = (e) => {
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
                    { isErrorName: true, errorname: "Please enter valid account Name" }
                );
            }
        } else {

            this.setState(
                { [e.target.name]: e.target.value }
            );
        }
    }



    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });
        let obj = {
            bank_name: this.state.bank,
            account_number: this.state.acc_number,
            account_name: this.state.acc_name,
            ifsc: this.state.ifsc,
            branch: this.state.branch,
            account_type: this.state.acc_type,
            user_sfid: this.props.user_sfid,
            is_active: this.state.isActive
        }

        this.props
            .dispatch(addBank(obj)).then((res) => {
                if (res.status === "success") {
                    // alert(res.message)
                }
                $("#close-add-btn").click();
                this.props.getBankList();
                this.handleClear();
            })
            .catch(() => {

            });
    }

    render() {
        const { add_account, user_id, banks } = this.props;
        // console.log('add to acc',add_account)
        const { acc_name, acc_type, acc_number, ifsc, branch, isActive, bank } = this.state
        this.state.owner = user_id;
        let bankOptions = [];
        let bankData;
        if (this.props.banks) {
            bankData = this.props.banks;
            for (var i = 0; i < bankData.length; i++) {
                bankOptions.push({ value: bankData[i].bank_id, label: bankData[i].bank_name });
            }
        }
        const btnStyle = {
            background: '#1F1F2D',
            borderRadius: '10px',
            color: '#ffffff'
        }
        return (
            <>

                {/* new modal account add */}
                <div className="modal right fade myModal" id="addNewAccountModal" role="dialog">
                    {this.state.viewall == false && <>
                        <div className="modal-dialog addNewAccountModal">
                            <div className="modal-content">
                                <div className="modelbg_1 p-4">
                                    <div className='d-flex justify-content-between align-items-center w-100 pt-2'>
                                        <div className='adduser_header d-flex align-items-center'>
                                            {/* <button type="button" className="adduser close" onClick={this.closeAddModel}> <i className="fas fa-times"></i> </button> */}
                                            <button type="button" id="close-add-btn" onClick={this.handleClear} className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                                            <h4 className='ml-3'>Add New Account</h4>
                                        </div>
                                        <div>
                                            <div className="switch_btn d-flex" style={{ color: `${this.state.isActive == true ? '#094588' : ''}` }}>
                                                <label className="switch mr-3">
                                                    <input type="checkbox"
                                                        onChange={this.handleCheckBoxChange}
                                                        name="isActive" value="1"
                                                        checked={this.state.isActive}
                                                    />
                                                    <span className="slider round"></span>
                                                </label> {this.state.isActive == true ? "Active" : "Inactive"}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/*  */}
                                <div id="" className="modal-body pt-0 px-0">
                                    <Scrollbar>
                                        <div className='v-scroll_st px-4'>
                                            <div className='mb-5 p-4'>
                                                <div className='shadow rounded-10 p-4'>
                                                    <form onSubmit={this.handleRegister}>
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label">
                                                                    Account Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={this.state.acc_name ? this.state.acc_name : ''}
                                                                    className="form-control"
                                                                    placeholder="Enter Account Name"
                                                                    name="acc_name"
                                                                    onChange={this.onAlphaAccount}
                                                                />

                                                                {this.state.isErrorName && this.state.errorname != '' && (
                                                                    <div className="form-group">
                                                                        <div className="col-12 mb-0 text-danger">
                                                                            {this.state.errorname}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className='d-flex mt-3 align-items-start'>
                                                                    <img src="images/icons/security_icon.png" />
                                                                    <p className='s-n'>Account name is not the account holder name, it is for personal reference only.</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <p>Select Your Bank</p>
                                                                <div className='d-flex flex-wrap mt-4'>


                                                                    {bankData && bankData.length > 0 && (
                                                                        bankData.slice(0, 8).map((item, index) => (
                                                                            <div key={"bank-" + index} className={`cursor-point text-center mobile-viewport-icon ${this.state.bank === item.bank_name ? 'bank-active' : ''}`}
                                                                                onClick={() => this.handlebank(item.bank_name, item.bank_icon)}>
                                                                                <span className="fs-8">
                                                                                    {item.bank_icon && item.bank_icon.length > 0 ?
                                                                                        <img src={item.bank_icon} />
                                                                                        :
                                                                                        <>
                                                                                            {item.bank_name}
                                                                                        </>
                                                                                    }
                                                                                </span>

                                                                                {/* <span></span> */}
                                                                            </div>

                                                                        ))
                                                                    )
                                                                    }
                                                                </div>
                                                                {/* <div className='d-flex align-items-center'>
                                                <div><img src={this.state.bank_icon} /></div>
                                                <div>{this.state.bank}</div>
                                                <div><img src="images/icons/edit_20.png" alt="" className='img-fluid' /></div>


                                            </div> */}
                                                                <div className='d-flex justify-content-end'>
                                                                    <button type='button'
                                                                        // onClick={this.props.handlebankModal} 
                                                                        onClick={() => this.setState({ viewall: true })}
                                                                        className='link fz16 font-weight-bold' >View All</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label">
                                                                    Account Type
                                                                </label>
                                                                <select
                                                                    name="acc_type"
                                                                    id="acc_type"
                                                                    className="form-control"
                                                                    value={this.state.acc_type ? this.state.acc_type : ''}
                                                                    onChange={this.handleChange}
                                                                >
                                                                    <option value="">Select account type</option>
                                                                    <option value="Savings Account">Saving Account</option>
                                                                    <option value="Current Account">Current Account</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label">
                                                                    Account Number
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Account Number"
                                                                    name="acc_number"
                                                                    id="acc_number"
                                                                    maxLength={"18"}
                                                                    value={this.state.acc_number ? this.state.acc_number : ''}
                                                                    onChange={this.handleBankAccount}
                                                                />
                                                            </div>
                                                            {
                                                                this.state.isValid === false && this.state.acc_number.length !== 0 ? (
                                                                    <div className="form-group">
                                                                        <div className="col-12 mb-0 text-danger">
                                                                            {this.state.message}
                                                                        </div>
                                                                    </div>
                                                                ) : ''
                                                            }
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label">
                                                                    IFSC
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={this.state.ifsc}
                                                                    className="form-control"
                                                                    placeholder="Enter IFSC Code"
                                                                    name="ifsc"
                                                                    id="ifsc"
                                                                    maxLength="11"
                                                                    onChange={this.handleIFSC}
                                                                />
                                                            </div>
                                                            {


                                                                this.state.errorIFsc !== '' ? (
                                                                    <div className="form-group">
                                                                        <div className="col-12 mb-0 text-danger">
                                                                            {this.state.errorIFsc}
                                                                        </div>
                                                                    </div>
                                                                ) : ''
                                                            }

                                                            {/* {this.state.isValid ==false && this.state.message !='' && (
                                                                <span style={{color:"red"}}>
                                                                {this.state.message}
                                                                </span>
                                                )} */}
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-sm-12 form-group">
                                                                <label className="form-label">
                                                                    Branch
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={this.state.branch ? this.state.branch : ''}
                                                                    className="form-control"
                                                                    placeholder="Enter branch name"
                                                                    name="branch"
                                                                    id="branch"
                                                                    onChange={this.onAlpha}
                                                                />
                                                            </div>
                                                            {this.state.isErrorNameBranch && this.state.errornamebranch != '' && (

                                                                <div className="form-group">
                                                                    <div className="col-12 mb-0 text-danger">
                                                                        {this.state.errornamebranch}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* {this.state.isValid ==false && this.state.message !='' && (
                                                                <span style={{color:"red"}}>
                                                                {this.state.message}
                                                                </span>
                                                )} */}
                                                        </div>

                                                        <div className="row pt-4">
                                                            <div className='col-sm-12 text-right'>
                                                                <Button
                                                                    type="button"
                                                                    className="btn btn-default_ subBtn"
                                                                    data-dismiss="modal"
                                                                    onClick={this.closeAddModel}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    type="submit"
                                                                    className="btn btn-default_ subBtn ml-2"
                                                                    disabled={acc_name && acc_type && acc_number && ifsc && branch && bank ? false : true}
                                                                >
                                                                    Save
                                                                </Button>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </Scrollbar>
                                </div>
                            </div>
                        </div>
                    </>}

                    {this.state.viewall == true && <>
                        <div className="modal-dialog modal-lg" style={{ width: "800px" }}>
                            <div className="modal-content">

                                <div className="modelbg_1 p-4">
                                    <div className='d-flex justify-content-between align-items-center w-100 pt-2'>
                                        <div className='adduser_header d-flex align-items-center'>
                                            {/* <button type="button" className="adduser close" onClick={this.closeAddModel}> <i className="fas fa-times"></i> </button> */}
                                            <button type="button" className="abs_close close" onClick={() => this.setState({ viewall: false })}> <i className="fas fa-times"></i> </button>

                                            <h4 className='ml-3'>Select Bank Account</h4>
                                        </div>

                                    </div>
                                </div>




                                {/*  */}
                                <div id="" className="modal-body pt-0 px-0">
                                    <Scrollbar>
                                        <div className='v-scroll_st px-4'>
                                            <div className="row mb-2">
                                                <div className="col-sm-12 form-group">
                                                    <div className='d-flex flex-wrap mt-4'>


                                                        {bankData && bankData.length > 0 && (
                                                            bankData.map((item, index) => (
                                                                <div key={"bank-" + index} className={` cursor-point text-center mobile-viewport-icon ${this.state.bank === item.bank_name ? 'bank-active' : ''}`}
                                                                    onClick={() => this.handlebank(item.bank_name, item.bank_icon)}>
                                                                    <span className="fs-8">
                                                                        {item.bank_icon && item.bank_icon.length > 0 ?
                                                                            <img src={item.bank_icon} />
                                                                            :
                                                                            <>
                                                                                {item.bank_name}
                                                                            </>
                                                                        }
                                                                    </span>
                                                                </div>

                                                            ))
                                                        )
                                                        }
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </Scrollbar>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
                {/* end */}


                {/* <Modal show={add_account} className="adduser">
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center w-100 pt-2'>
                            <div className='adduser_header d-flex align-items-center'>
                                <button type="button" className="adduser close" onClick={this.closeAddModel}> <i className="fas fa-times"></i> </button>
                                <h4 className='ml-3'>Add New Account</h4>
                            </div>
                            <div>
                                <div className="switch_btn d-flex">
                                    <label className="switch mr-3">
                                        <input type="checkbox" name="isActive" onChange={this.handleCheckBoxChange} value="1" />
                                        <span className="slider round" ></span>
                                    </label> Inactive
                                </div>
                            </div>
                        </div>
                    </Modal.Header>
                    <form onSubmit={this.handleRegister}>
                        <Modal.Body>
                            <div className="row justify-content-center mb-2">
                                <div className="col-sm-12 form-group">
                                    <label className="form-label">
                                        Account Name
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.acc_name ? this.state.acc_name : ''}
                                        className="form-control"
                                        placeholder="Account name"
                                        name="acc_name"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mb-2">
                                <div className="col-sm-12 form-group">
                                    <p>Select Your Bank</p>
                                </div>
                                {bankData && bankData.length > 0 && (
                                    bankData.map((item, index) => (
                                        <div key={"bank-" + index} className={`col-md-2 text-center mobile-viewport-icon ${this.state.bank === item.bank_name ? 'bank-active' : ''}`}>
                                            <span
                                                onClick={() => this.handlebank(item.bank_name)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img src={item.bank_icon} />
                                            </span>
                                            <span>{item.bank_name}</span>
                                        </div>
                                    ))
                                )
                                }

                            </div>|
                            <div className="row justify-content-center mb-2">
                                <div className="col-sm-9 form-group">
                                    <label className="form-label">
                                        Account Type
                                    </label>
                                    <select
                                        name="acc_type"
                                        id="acc_type"
                                        className="form-control"
                                        value={this.state.acc_type ? this.state.acc_type : ''}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select account type</option>
                                        <option value="Savings Account">Saving Account</option>
                                        <option value="Current Account">Current Account</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row justify-content-center mb-2">
                                <div className="col-sm-9 form-group">
                                    <label className="form-label">
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Account Number"
                                        name="acc_number"
                                        minLength={"9"}
                                        maxLength={"18"}
                                        value={this.state.acc_number ? this.state.acc_number : ''}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mb-2">
                                <div className="col-sm-9 form-group">
                                    <label className="form-label">
                                        IFSC
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.mobileNumber}
                                        className="form-control"
                                        placeholder="Enter IFSC Code"
                                        name="ifsc"
                                        id="ifsc"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {this.state.isValid == false && this.state.message != '' && (
                                    <span style={{ color: "red" }}>
                                        {this.state.message}
                                    </span>
                                )}
                            </div>
                            <div className="row justify-content-center mb-2">
                                <div className="col-sm-9 form-group">
                                    <label className="form-label">
                                        Branch
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.branch ? this.state.branch : ''}
                                        className="form-control"
                                        placeholder="Enter branch name"
                                        name="branch"
                                        id="branch"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {this.state.isValid == false && this.state.message != '' && (
                                    <span style={{ color: "red" }}>
                                        {this.state.message}
                                    </span>
                                )}
                            </div>

                            <div className="row justify-content-center pt-4">
                                <Button
                                    type="button"
                                    className="btn btn-default_ subBtn"
                                    onClick={this.closeAddModel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="btn btn-default_ subBtn ml-2"
                                    disabled={acc_name && acc_type && acc_number && ifsc && branch && bank ? false : true}
                                >
                                    Save
                                </Button>
                            </div>
                        </Modal.Body>
                    </form>
                </Modal> */}
            </>
        )
    }

}

export default AddNewAccount;