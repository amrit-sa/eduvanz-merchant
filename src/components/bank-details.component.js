import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import Select from 'react-select'
import { connect } from "react-redux";
import { getMerchantUpdates, updateBanks, getBanks, checkIfsc, getUserBanks, checkAccount, herokuUpload } from "../actions/user";
import { clearMessage } from "../actions/auth";
import { Link } from 'react-router-dom';
import Footer from "../common/footer";

class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.brandChange = this.brandChange.bind(this);
    this.onAlphaAccount = this.onAlphaAccount.bind(this);
    this.handleIfscChange = this.handleIfscChange.bind(this);
    this.numberOnly = this.numberOnly.bind(this);
    console.log('sfid', localStorage.getItem('user_sfid'))


    this.state = {
      loading: false,
      username: "",
      password: "",
      successful: false,
      bank: '',
      not_found: false,
      acc_no: '',
      acc_name: '',
      ifsc: '',
      sub_category: '',
      isValid: false,
      errorMsg: '',
      errorMsgAcc:'',
      files: null,
      bankFailed: false,
      documentType: "Bank Statement",
      isDocUploaded: null,
      isUploadFaild: null,
      uploadedFileName: "",
      selectedFile: null,
      ifscVerified: null,
      ifsc_not_found: false,
      isErrorName: false,
      errorname: '',
      ifscCodes: [],
      user_sfid: localStorage.getItem('user_sfid')
    };
  }

  componentDidMount() {
    const { user_id } = this.props
    this.props.dispatch(getBanks());
    let data = {
      id: user_id
    }
    this.props.dispatch(getUserBanks(data)).then((response) => {
      if (response.status === "success") {
        let obj = response.data;
        this.setState({
          bank: obj && obj.bank_name__c ? obj.bank_name__c : '',
          acc_no: obj && obj.account_number__c ? obj.account_number__c : '',
          acc_name: obj && obj.bank_account_holder_name__c ? obj.bank_account_holder_name__c : '',
          ifsc: obj && obj.ifsc__c ? obj.ifsc__c : '',
          isValid: true,
        });
        if (obj && obj.ifsc__c) {
          if (obj.ifsc__c.length != 11) {
            this.setState({ errorMsg: 'Enter valid ifsc code' });
          }
        }
      }
    });
    let obj = {
      user_id: user_id
    }
    this.props.dispatch(getMerchantUpdates(obj))
    this.handleClearMeaage();
    $('.labelFocus input').change(function () {
      var $this = $(this);
      if ($this.val())
        $this.addClass('filled')
      else
        $this.removeClass('filled')
    })
  }

  deleteBrowseFile = () => {
    this.setState({ uploadedFileName: "", isDocUploaded: null });
  }

  handleTab = (value) => {
    this.setState({ documentType: value });
  }

  saveBank = (e) => {
    this.setState(
      { bank: e.target.value });
  }

  handleClearMeaage = () => {
    this.props.dispatch(clearMessage());
  }

  clearIFSC = () => {
    this.setState({
      ifsc: '', ifscCodes: []
    });
  }
  handleFileSelect = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    let given_file = files[0];
    let fname = files[0].name;
    this.setState({ selectedFile: given_file, uploadedFileName: fname, errorMsg: "" });
    console.log("files", files[0]);
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  uploadFiles = async () => {
    const file = this.state.selectedFile;
    const d = new Date()
    const time = d.getTime()
    const filePathsPromises = []
    let sizeError = 0;
    let fileError = 0;
    let fileSize = file.size / 1024 / 1024;
    let fname = file.name;
    var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
    //console.log('file name are ', file)
    if (fileSize > 5) {
      sizeError = 1;
    }
    if (!re.exec(fname)) {
      fileError = 1;
    }
    if (fileError === 1 || sizeError === 1) {
      if (fileError === 1) {
        this.setState({ isUploadFaild: "Unsupported File Type", isDocUploaded: null });
      } else if (sizeError === 1) {
        this.setState({ isUploadFaild: "Max file size should be 5 MB", isDocUploaded: null });
      }
    } else {
      let DataType = this.state.documentType;
      let DocType = file.type
      let type = file.type
      let ext = "jpg";
      if (type) {
        const getExt = type.split("/");
        ext = getExt[1];
      }
      filePathsPromises.push(await this.toBase64(file))
      const filePaths = await Promise.all(filePathsPromises);
      let mappedFiles = filePaths.map((base64File) => (base64File.replace(`data:${type};base64,`, "")));
      let data = {
        "parent_id": this.props.sfid,
        "fname": "eduvan-web-" + time + '.' + ext,
        "base64": mappedFiles[0],
        "doctype": DataType,
        "basetype": DocType,
        "catType": DataType == "Bank Statement" ? "Income Proof" : "Bank Account Proof"
      }
      //this.setState({ isDocUploaded: null, isUploadFaild: null, bankFailed: true });
      this.props.dispatch(herokuUpload(data)).then((response) => {
        if (response && response.status && response.status == "success") {
          this.setState({ isDocUploaded: true, isUploadFaild: '', bankFailed: true, uploadedFileName: fname });
        } else {
          this.setState({ isUploadFaild: true, isDocUploaded: null, uploadedFileName: "" });
        }
      });
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { history, user_id } = this.props;
    let obj = { account_number: this.state.acc_no, ifsc_code: this.state.ifsc,account_name: this.state.acc_name,bank: this.state.bank,user_sfid: this.props.sfid }
    let data = {
      user_sfid: this.props.sfid,
      name: this.state.acc_name,
      bank: this.state.bank,
      ifsc: this.state.ifsc,
      account_number: this.state.acc_no
    }
    //console.log('data',data)
    await this.props.dispatch(checkAccount(obj)).then(async (response) => {
      if (response.status === "success") {
        this.props.dispatch(updateBanks(data)).then(() => {
          this.setState({ loading: false, });
          //this.setState({ loading: false, bankFailed: true });
          history.push("/success");
        }).catch(() => {
          this.setState({ loading: false });
        });
      } else {
        this.setState({ loading: false, bankFailed: true });
      }
    }).catch(() => {
      this.setState({ loading: false, bankFailed: true });
    });;
  }

  handleContinue = () => {
    const { history, user_id } = this.props;
    let data = {
      user_sfid: this.props.sfid,
      name: this.state.acc_name,
      bank: this.state.bank,
      ifsc: this.state.ifsc,
      account_number: this.state.acc_no,
      //account_name:this.state.acc_name
    }
    this.props.dispatch(updateBanks(data)).then(() => {
      this.setState({ loading: false, });
      history.push("/success");
    }).catch(() => {
      this.setState({ loading: false });
    });
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
  brandChange = (e) => {
    console.log('Event ', e.label);
    this.setState(
      { bank: e.label }
    );
  }

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  numberOnly = (e) => {


    e.persist();
        this.setState({ acc_no: e.target.value })
        var pattern = new RegExp(/^[a-zA-Z0-9]+$/);

        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                document.getElementById('acc_no').value = '';
                this.setState({ acc_no: '' });
                this.setState({ isValid: false });
                this.setState({ errorMsgAcc: "Please enter valid account number." });
            } else if (e.target.value.length < 9) {
                this.setState({ isValid: false });
                this.setState({ errorMsgAcc: "Please enter valid account number." });
            } else if (e.target.value.length >= 9) {
                this.setState({ isValid: true, errorMsgAcc: "" });

            }

        } else {
            this.setState({ isValid: true, errorMsgAcc: "" });
        }
  }

  handleIfscChange = async (event) => {
    event.persist();
    let ifsc = event.target.value;
    var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
    if (ifsc.length == 11) {
      if (ifsc.match(reg)) {
        console.log('length okk')

        this.setState({ isValid: true, errorMsg: '', ifsc: event.target.value });
        let data = {
          ifsc: event.target.value
        }
        await this.props.dispatch(checkIfsc(data)).then((response) => {

          console.log('ifsc data', response.data)
          if (response.status == 'success' && Object.keys(response.data).length > 0) {
            this.setState({ isValid: true, errorMsg: '', ifsc: event.target.value });
          } else {
            this.setState({ isValid: false, errorMsg: 'Enter valid ifsc code' });
          }
        });
      } else {
        this.setState({ isValid: false, errorMsg: 'Enter valid ifsc code' });
      }
    } else {
      this.setState({ isValid: false, errorMsg: 'Enter valid ifsc code', ifsc: event.target.value });
    }
  }

  handlebank = (value) => {
    this.setState({ bank: value });
  }

  handleBack = () => {
    const { history } = this.props;
    history.push("/productdetails");
    // window.location.reload();
  }

  findBank = () => {
    this.setState({ not_found: true });
  }
  findIFSC = () => {
    this.setState({ ifsc_not_found: true });
  }

  render() {
    const { message, banks, isLoading, sfid } = this.props;
    const { bankFailed, isDocUploaded, isUploadFaild, documentType, uploadedFileName } = this.state;
    let inputRef;
    let bankOptions = [];
    let bankData;
    if (this.props.banks) {
      bankData = this.props.banks;
      for (var i = 0; i < bankData.length; i++) {
        bankOptions.push({ value: bankData[i].bank_id, label: bankData[i].bank_name });
      }
    }
    console.log('bank data',bankData)
    console.log('bank state',this.state.bank)

    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }

    return (
      <>
        <Helmet>
          <title>Bank Details</title>
        </Helmet>
        {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        <section className="bg0 login">
          <div className="container-fluid container-zero" style={{ paddingLeft: '0px' }}>
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">eduvanz.</h4> */}
                <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                  {/* eduvanz. */}
                  <img src="images/logo-stride.png" />
                </h4>
                <div className="row">
                  <div className="col-md-6">
                    <Link
                      to="/productdetails"
                      onClick={this.handleBack}
                      className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    >
                      <i className="lnr lnr-arrow-left-circle right-circle" />{" "}
                      <span className="backbtn-sty">Back</span>
                    </Link>
                  </div>
                  <div className="col-md-12 mr-t ">
                    <h6 className="text-white">Step 3</h6>
                  </div>
                  <div className="col-md-12 mr-t text-white">
                    <h1 className="titfnt">
                      Bank <br />
                      Details
                    </h1>
                    <p className="col-md-7 p-0 mr-t">
                      We will deposit ₹ 1 in your bank account for customer
                      verification.
                    </p>
                  </div>

                </div>
                <div className="col-md-12 mr-t login-img">
                  <img src="images/model.png" />
                </div>
              </div>

              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform">
                  <div className="cl2 txt-center p-b-30 form-title form-primary-card">
                    <h4 className="mtext-105 cl2 txt-center p-b-30 form-title">
                      <img src="images/icons/icon4_w.png" /> Update Bank Details
                      {/*Let’s get started */}

                    </h4>
                  </div>

                  <form onSubmit={this.handleRegister}>
                    {this.state.not_found === false ? (
                      <div className="row bank-icom-img mr-btn-sty">
                        <div className="col-md-12">
                          <p>Bank Name </p>
                        </div>
                        <div className="row  pb-5 w-100 pl-3 pr-3">
                        <select className="brandSelect" value={this.state.bank} onChange={(e) => { this.handlebank(e.target.value)}}>
                                <option value=""> Select Bank</option>
                                {
                                  bankData && bankData.length > 0 > 0 ? bankData.map((bank,index) => {
                                return(
                                        <option value={bank.bank_name} key={bank.bank_name}>{bank.bank_name}</option>
                                        )
                                    })
                                  : ""
                                }
                          </select>
                        </div>
                        {/* <div className="row pt-5 pb-5">
                          {bankData && bankData.length > 0 && (
                            bankData.map((item, index) => (
                              <div key={"bank-" + index} className={`text-center mobile-viewport-icon2  p-2  ${this.state.bank === item.bank_name ? 'bank-active' : ''}`}>
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

                        </div> */}
                      </div>
                    ) : ''
                    }
                    {this.state.not_found ? (
                      <div className="bor8 m-b-20 how-pos4-parent input-group labelFocus">
                        <span>Bank Name</span>
                        <input
                          className="stext-111 cl2 plh3 size-116  p-r-15 mt-n2"
                          type="text"
                          name="acc_no"
                          value={this.state.bank}
                          onChange={this.saveBank}
                          autoComplete="off"

                        />
                      </div>
                    ) : ''
                    }
                    {/* {this.state.not_found === false ? (
                      <div className="col-md-12 text-right mr-btn-sty mt-n4">
                        <span
                          onClick={this.findBank}
                          style={{ cursor: 'pointer', color: '#0051ff', fontWeight: '600' }}
                        >Can’t find my bank</span>
                      </div>
                    ) : ''} */}
                    <div className="bor8 m-b-20 how-pos4-parent input-group labelFocus">
                      <span>Account Number</span>

                      <input
                        className="stext-111 cl2 plh3 size-116  p-r-15"
                        type="text"
                        name="acc_no"
                        id="acc_no"
                        value={this.state.acc_no}
                        onChange={this.numberOnly}
                        autoComplete="off"
                        maxLength="18"
                        minLength="9"
                      />

                    </div>
                    {

                      this.state.acc_no && this.state.acc_no.length < 9 &&

                      <div className="form-group">

                        <div className="alert alert-danger" role="alert">

                          Please enter a valid account Number

                        </div>

                      </div>
                    }
                    <div className="bor8 m-b-20 how-pos4-parent input-group labelFocus">
                      <span>Account holder name</span>

                      <input
                        className="stext-111 cl2 plh3 size-116 p-r-15"
                        type="text"
                        name="acc_name"
                        value={this.state.acc_name}
                        onChange={this.onAlphaAccount}
                        autoComplete="off"
                        maxlength="100"
                        minLength="1"
                      />
                      {/*<span>Account holder name</span>*/}
                    </div>
                    {this.state.isErrorName && this.state.errorname != '' && (
                                                                <span style={{ color: "red" }}>
                                                                    {this.state.errorname}
                                                                </span>
                                                            )}
                    <div className="bor8 m-b-20 how-pos4-parent ">
                      <span>IFSC</span>

                      <div className="labelFocus" style={{ flexWrap: 'initial' }}>
                        <input
                          type="text"
                          name="ifsc"
                          className="search-query stext-111 cl2 plh3 size-116 p-r-15"
                          value={this.state.ifsc}
                          maxLength={'11'}
                          onChange={this.handleIfscChange}
                          autoComplete="off"

                        />
                        {/*<span>IFSC</span>*/}

                      </div>
                      {/*<div className="mt-4">
                        <span style={{ cursor: 'pointer', color: '#0051ff', fontWeight: '600', marginTop: '50' }}>Search for IFSC</span>
                      </div>*/}

                    </div>

                    {this.state.isValid == false && this.state.errorMsg != '' && (
                      <div className="form-group">
                        <span style={{ color: '#EA4335' }}>
                          {this.state.errorMsg}
                        </span>
                      </div>
                    )}

                    {bankFailed === false ? <div className="d-flex align-items-center justify-content-center mb-4"><img src="images/icons/info.svg" alt="whatsapp" /> <p>We are depositing Re.1 in your account for verification</p>
                    </div> : ""}

                    {bankFailed === false ? (
                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={this.state.bank !== '' && this.state.acc_name !== '' && this.state.acc_no !== '' && this.state.ifsc !== '' && !isLoading && this.state.isValid ? false : true}
                        style={this.state.bank !== '' && this.state.acc_name !== '' && this.state.acc_no !== '' && this.state.ifsc !== '' && !isLoading && this.state.isValid ? btnStyle : {}}
                      >
                        Submit
                      </button>
                    ) : ""}
                    {message && (
                      <div className="form-group">
                        <div className={"alert alert-danger"} role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    {bankFailed === true ? (
                      <>

                        {uploadedFileName == "" && isDocUploaded != true ? <><div className="d-flex px-4 py-2 align-items-start v-f mb-3">
                          <img src="images/icons/exclamation-red-circle.svg" className="mr-2" />
                          <p className="mb-0">Account verification failed! Please upload any one of the below to verify manually.</p>
                        </div>

                          <p className="mb-3">Upload any one <img src="images/icons/icon-ind2.png" className="ml-3" /> </p>
                          <div className="row mb-3">
                            <div className="col-lg-4">
                              <div className="custom-radio">
                                <input type="radio" name="bank" id="bank_statement" onClick={() => this.handleTab('Bank Statement')} defaultChecked={documentType == "Bank Statement" ? true : false} />
                                <label htmlFor="bank_statement">Bank Statment</label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="custom-radio">
                                <input type="radio" name="bank" id="cancelled_cheq" onClick={() => this.handleTab('Cancelled Cheque')} defaultChecked={documentType == "Cancelled Cheque" ? true : false} />
                                <label htmlFor="cancelled_cheq">Cancelled Cheque</label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="custom-radio">
                                <input type="radio" name="bank" id="bank_pass" onClick={() => this.handleTab('Bank Passbook')} defaultChecked={documentType == "Bank Passbook" ? true : false} />
                                <label htmlFor="bank_pass">Bank Passbook</label>
                              </div>
                            </div>
                          </div></> : ""}


                        {isDocUploaded == true && uploadedFileName != "" ? <>
                          <div className="text-center">
                            <div className="d-inline-flex px-4 py-2 align-items-center v-s mb-3">
                              <img src="images/icons/tick_w.png" className="mr-2" />
                              <p className="mb-0">File uploaded successfully</p>
                            </div>
                          </div>
                        </> : ""}

                        {isUploadFaild == true && uploadedFileName != "" ? <>
                          <div className="d-flex px-4 py-2 align-items-start v-f mb-3">
                            <img src="images/icons/exclamation-red-circle.svg" className="mr-2" />
                            <p className="mb-0">File uploaded failed.</p>
                          </div>
                        </> : ""}
                        {isDocUploaded != true && uploadedFileName != "" ? <>
                          <span className="mt-1 pt-2" style={{ fontSize: '12px' }}>{`Upload ${documentType}`}</span>
                          <div className="m-b-20 how-pos4-parent input-group labelFocus" style={{ flexWrap: 'initial' }}>
                            <span className="pr-2"><img src="images/icons/pdfFile.png" /> </span>

                            <input
                              className="stext-111 cl2 plh3 size-116 p-r-15"
                              type="text"
                              name="file uploaded"
                              value={this.state.uploadedFileName}
                            //onChange={this.handleChange}
                            />
                            <span></span>
                            <span className="input-group-btn">
                              <button
                                className="btn btn-danger-search"
                                type="button"
                                onClick={this.deleteBrowseFile}
                              >
                                <span className="lnr lnr-cross" />
                              </button>
                            </span>
                          </div></> : ""}
                        <div>
                          <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={refParam => inputRef = refParam}
                            onChange={this.handleFileSelect}
                            accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                            multiple
                          />
                        </div>
                        {!isDocUploaded && uploadedFileName == "" ? <>
                          <button onClick={() => inputRef.click()} type="button" className="submit-btn mt-3">
                            Browse
                          </button>
                        </> :
                          !isDocUploaded && uploadedFileName != "" ? <>
                            <button type="button" className="submit-btn mt-3" onClick={this.uploadFiles}>
                              Upload
                            </button>
                          </>
                            :
                            <button onClick={this.handleContinue} type="button" className="submit-btn mt-3">
                              Submit
                            </button>

                        }
                        {/*{!isDocUploaded ? (
                          <button onClick={() => inputRef.click()} type="button" className="submit-btn mt-3">
                            Browse
                          </button>
                        ) 
                        (
                          <button onClick={this.handleContinue} type="button" className="submit-btn mt-3">
                            Continue
                          </button>
                         )}*/}

                      </>
                    ) : ""}
                    <div className="col-md-12 text-center mr-btn-sty mt-4">
                      <Link style={{ cursor: 'pointer', color: '#0051ff', fontWeight: '600' }} to="/home">I’ll do this later</Link>
                    </div>
                  </form>
                </div>


                <Footer />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { banks } = state.user;
  const { user_id, isLoading, sfid } = state.auth;
  return {
    isLoading,
    message,
    banks,
    sfid,
    user_id
  };
}

export default connect(mapStateToProps)(BankDetails);
