import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModel } from "../actions/model";
import { createLeads, getLeads, getLeadProfile, getMerchantProducts } from "../actions/user";
import {
  openLeadProfileModel, openSuccessModel,
  openLeadApplicationModel, OpenCreateLeadSuccess
} from "../actions/model"
import { Scrollbar } from "react-scrollbars-custom";

const isValidEmail = (email) => {

  return /\S+@\S+\.\S+/.test(email);

}

const initialState = {
  mobile: '+91 ',
  first_name: '',
  last_name: '',
  email: '',
  product: '',
  product_price: '',
  loan_amount: '',
  isValid: true,
  errorMsg: '',
  isSuccess: '',
  successMsg: '',
  searchItems: [],
  showSearchActive: false,
  email_id: "",
  isValidEmailId: false,
  selectProductid: '',
  showErr: false,
  loanerrmsg: '',
  selling_price: '',
  isloanError:false
};

class CreateLead extends Component {

  constructor() {
    super()
    this.state = initialState;
    this.handleMobile = this.handleMobile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onlyNumbers = this.onlyNumbers.bind(this);
    this.handleSubmitLead = this.handleSubmitLead.bind(this);
    this.onAlpha = this.onAlpha.bind(this);
    this.testRef = React.createRef();
  }

  // componentDidMount(){
  //     this.props.dispatch(getMerchantProducts()).then(res => {
  //         console.log(res);
  //     })
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.create_lead_show !== this.props.create_lead_show) {
      this.setState(initialState);
    }
  }

  closeModel = () => {
    this.props.dispatch(closeModel())
  }

  onAlpha = (e) => {
    /*for first name*/
    if (e.target.name == "first_name" || e.target.name == "last_name") {
      const value = e.target.value;
      const regMatch = /^[a-zA-Z]*$/.test(value);

      if (regMatch && e.target.name == "first_name") {
        this.setState({
          first_name: value
        })
      }
      if (regMatch && e.target.name == "last_name") {
        this.setState({
          last_name: value
        })
      }
    }
  }

  handleChange = (e) => {
    if (e.target.name == "email") {


      if (!isValidEmail(e.target.value)) {

        this.setState({

          isValidEmailId: true,

        })

      }

      else {

        this.setState({

          isValidEmailId: false,

        })

      }

      if (e.target.value == "") {

        this.setState({

          isValidEmailId: false,

        })



      }

    }

    this.setState({ isValid: true, errorMsg: '' });
    this.setState({ [e.target.name]: e.target.value });
  }

  openSuccess = () => {
    this.props.dispatch(openSuccessModel());
  }

  handleMobile = (e) => {
    let mobno = e.target.value.slice(4);
    const reg = /^[0]?[6789]\d{9}$/;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (mobno !== '') {
      if (!pattern.test(mobno)) {
        this.setState({ isValid: false, errorMsg: "Please enter only number." });
        // document.getElementById('mobile').value = "";
      } else if (mobno.length < 10) {
        this.setState({ isValid: false, errorMsg: "mobile number must be of 10 digit", mobile: `+91 ${mobno}` });
      }
      else if (mobno.length === 10) {
        if (reg.test(mobno)) {
          this.setState({ isValid: true, errorMsg: "", mobile: `+91 ${mobno}` });
        } else {
          this.setState({ isValid: false, errorMsg: "Please enter valid mobile number.", mobile: `+91 ${mobno}` });
        }
      } else {
        this.setState({ isValid: true, errorMsg: "", mobile: `+91 ${mobno}` });
      }
    } else {
      this.setState({ isValid: false, errorMsg: "", mobile: `+91 ${mobno}` });
    }
  }

  getLeadProfile = (lead_id) => {
    let data = {
      user_sfid: lead_id
    }
    this.props.dispatch(getLeadProfile(data)).then((response) => {
      if (response.status === "success") {
        let getData = response.data;
        let limit = getData.ipa_basic_bureau__c ? getData.ipa_basic_bureau__c : null;
        if (limit) {
          setInterval(this.props.dispatch(openLeadProfileModel(lead_id)), 15000);
          //  setInterval(this.props.dispatch(openLeadProfileModel(lead_id)), 15000);
          //  setInterval(this.props.dispatch(this.openSuccess()), 18000);
        } else {
          setInterval(this.props.dispatch(openLeadProfileModel(lead_id)), 18000);
        }
      } else {
        setInterval(this.props.dispatch(openLeadProfileModel(lead_id)), 18000);
      }
    });
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
    console.log('mobile state',this.state.mobile)
  }


  handleSelectProduct = (e) => {

    let id = e.target.value;
    this.setState({ product: id })
    const { products } = this.props;

    let arr = products.proData.filter(ele => ele.name.toLowerCase().includes(id.toLowerCase()));
    this.setState({ searchItems: arr });


    //   if(id !='')
    //   { 
    //     var selctedItem = products.proData.find(item => item.sfid == id);
    //     this.setState({ product_price: selctedItem.mrp__c, product: id, loan_amount: selctedItem.mrp__c });
    //   }else{
    //     this.setState({ product_price: '', product: '', loan_amount: '' });
    //   }
  }

  selectProduct = (id, sfid) => {
    this.setState({ selectProductid: sfid });
    const { products } = this.props;
    let prod = products.proData.find(ele => ele.id === id);
    if (prod) {
      this.setState({ product: prod.name, showSearchActive: false, product_price: prod.mrp__c, selling_price: prod.loan_amount__c });
    }
  }

  scrollToBottom = () => {
    var objDiv = document.getElementById("create-lead");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  handleSubmitLead = (e) => {
    e.preventDefault();
    if (this.state.loan_amount < 2000) {
      this.setState({ showErr: true, loanerrmsg: "Minimum loan amount should be more than 2000" })
      return
    }
    // if(this.state.loan_amount<=this.state.product_price){
    //   this.setState({showErr:true, loanerrmsg:"Loan amount should be less than or equal to product price."}) 
    //   return
    // }
    if (Number(this.state.selling_price) < Number(this.state.loan_amount)) {
      // document.getElementById('loan_error').style.display = "block"
      this.setState({isloanError:true})
      return
    } else {
      let data = {
        fname: this.state.first_name,
        lname: this.state.last_name,
        email: this.state.email,
        mobile: this.state.mobile.slice(4),
        product: this.state.selectProductid,
        selling_price: Number(this.state.selling_price),
        loan_amount: Number(this.state.loan_amount),
        merchant_sfid: localStorage.getItem('sfid'),
      };
      console.log("Enter in the component Create lead");
      this.props.dispatch(createLeads(data)).then(response => {
        console.log(response);
        console.log(response.status);
        if (response.status === "success") {
          console.log("Enter if");
          // console.log(response,response.data.sfid,this.props.sfid);
          //   localStorage.setItem('showleadsuccess','true');
          document.getElementById("close-create").click();
          setTimeout(() => {
            this.props.dispatch(OpenCreateLeadSuccess(response));
          }, 500);



          // let getData = response.data;
          // this.setState({isSuccess: 1, successMsg: response.message});
          // // setInterval( document.getElementById("close-create").click(), 5000);
          // this.props.dispatch(getLeads('', this.props.sfid));
          // this.getLeadProfile(getData.sfid);
        } else {
          console.log("Enter else");
          console.log(response.user_id);
          if (response.status === "error") {
            this.setState({ showErr: true, loanerrmsg: response.message })
          }
          // const leadId = response.user_id?response.user_id: null;
          // document.getElementById("close-create").click();
          // this.props.dispatch(openLeadProfileModel(leadId));

          // this.scrollToBottom();
          // this.setState({isSuccess: 0, successMsg: response.message});
        }
      }).catch((error) => {
        console.log(error);
        // this.setState({isSuccess: 0, successMsg: error});
      });
    }
  }

  render() {
    const { isLoading, products } = this.props;
    let searchresults = this.state.product.length === 0 ? products.proData : this.state.searchItems;
    console.log(searchresults,"xxxxxxxxxxxx")
    return (
      <>
        {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        {/* Modal */}
        <div className="modal right fade myModal" id="myModal" role="dialog">
          <div className="modal-dialog">
            {/* Modal content*/}
            <form onSubmit={this.handleSubmitLead} className="f_height">
              <div className="modal-content create-lead-model">
                <Scrollbar>
                  <div className="modal-header d-flex align-items-center">
                    <button type="button" className="close" data-dismiss="modal"> <i className="fas fa-chevron-left"></i> </button>
                    <h5 className="modal-title fz24">Let's Get Started</h5>
                  </div>
                  <div id="create-lead" className="modal-body pt-0">

                    <div className='v-scroll'>
                      <div className="boxed">
                        <h5>Personal Details</h5>
                        <div className="row">
                          <div className="col-sm-6 form-group">
                            <label className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={this.state.first_name}
                              onChange={this.onAlpha}
                              className="form-control"
                              placeholder="Start typing..."
                              name="first_name"
                              maxLength="100"
                              minLength="1"
                            />
                          </div>
                          <div className="col-sm-6 form-group">
                            <label className="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={this.state.last_name}
                              onChange={this.onAlpha}
                              className="form-control"
                              placeholder="Start typing..."
                              name="last_name"
                              maxLength="100"
                              minLength="1"
                            />
                          </div>
                          <div className="col-sm-6 form-group">
                            <label className="form-label">
                              Email ID
                            </label>
                            <input
                              type="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder="Start typing..."
                              name="email"
                              id="email_id"
                            />
                            {

                              this.state.isValidEmailId &&

                              <div className="form-group">

                                <div className="alert alert-danger" role="alert">

                                  Please enter a valid email

                                </div>

                              </div>
                            }
                          </div>

                          <div className="col-sm-6 form-group">
                            <label className="form-label">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              name="mobile"
                              id="mobile"
                              maxLength={"14"}
                              value={this.state.mobile}
                              onChange={this.handleMobile}
                              className="form-control"
                              placeholder="+91 0000 000 000"
                              // onFocus={() => this.setState({ mobile: '+91' })}
                            />
                            {
                              this.state.isValid === false && this.state.mobile.length > 4 ? (
                                <div className="form-group">
                                  <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                  </div>
                                </div>
                              ) : ''
                            }
                          </div>
                        </div>
                      </div>
                      <div className="boxed">
                        <h5>Product &amp; Loan Details</h5>
                        <div className="row">
                          <div className="col-sm-12 form-group">
                            <label className="form-label">
                              Product
                            </label>
                            <input
                              onFocus={() => this.setState({ showSearchActive: true })}
                              name="product"
                              className="form-control"
                              onChange={this.handleSelectProduct}
                              value={this.state.product}
                              placeholder="Select any Product"
                              autoComplete='off'
                            />
                            {/* <option value={""}>Select any product</option > */}
                            {(this.state.showSearchActive &&
                              searchresults && searchresults.length > 0) ? (
                              searchresults.map((item, index) => (                                
                                item.activate_product__c && <option key={`product-${index}`} value={item.sfid} onClick={() => this.selectProduct(item.id, item.sfid)} style={{ cursor: "pointer" }}>{item.name}</option>
                              ))
                            ) : (this.state.showSearchActive && <option>No Match Found</option>)
                            }

                          </div>
                          <div className="col-sm-6 form-group">
                            <label className="form-label">
                              Selling Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="₹ 000"
                              // value={this.state.product_price ? this.state.product_price : ''}
                              value={this.state.selling_price ? this.state.selling_price : ''}
                              onChange={this.onlyNumbers}
                              name="selling_price"
                              readOnly
                            //   readOnly={true}
                            />
                          </div>
                          <div className="col-sm-6 form-group">
                            <label className="form-label">
                              Loan Amount
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="₹ 000"
                              value={this.state.loan_amount ? this.state.loan_amount : ''}
                              onChange={this.onlyNumbers}
                              name="loan_amount"
                            />
                            {this.state.isloanError &&
                              <p style={{ color: "red" }} id="loan_error">Loan amount greater than Selling price</p>
                            }
                          </div>
                        </div>

                      </div>
                      <div className="form_notes col-12">
                        <p className="color_1">This will not affect the user's Credit Score</p>
                        <p>* By clicking Create customer agrees to our <a href="#">T&amp;C</a> and <a href="#">Privacy Policy</a>
                        </p>
                      </div>

                      {/* <div className="row"> 
                        {
                            this.state.successMsg !='' && this.state.isSuccess === 0 ?(
                            <div className="form-group col-md-12" style={{textAlign:"center"}}>
                                <div className="alert alert-danger" role="alert">
                                {this.state.successMsg}
                                </div>
                            </div>
                            ):''
                        }
                        {
                            this.state.successMsg !='' && this.state.isSuccess === 1 ?(
                            <div className="form-group col-md-12" style={{textAlign:"center"}}>
                                <div className="alert alert-success" role="alert">
                                {this.state.successMsg}
                                </div>
                            </div>
                            ):''
                        }
                        </div> */}
                    </div>
                  </div>

                  {this.state.showErr &&
                    <div className="form-group"><div className='alert alert-danger' role='alert'>{this.state.loanerrmsg}</div></div>
                  }
                  <div className="modal-footer mb-3">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      id="close-create"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={this.state.product !== '' && this.state.first_name !== '' && this.state.last_name !== ""
                        && this.state.email !== "" && this.state.mobile.length === 14
                        && this.state.isValid && this.state.loan_amount !== '' && this.state.selling_price != "" ? false : true
                      }
                      className={`btn ${this.state.product !== '' && this.state.first_name !== '' && this.state.last_name !== ""
                        && this.state.email !== "" && this.state.mobile.length === 14
                        && this.state.isValid && this.state.loan_amount !== '' && this.state.selling_price != "" ? "btn-dark" : "btn-secondary"}`}
                    >
                      Create
                    </button>
                  </div>
                </Scrollbar>
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
  const { create_lead_show } = state.model;
  const { isLoading, user_id, sfid } = state.auth;
  const { products } = state.user;
  return {
    create_lead_show,
    sfid,
    user_id,
    products,
    isLoading,
  };
}

export default connect(mapStateToProps)(CreateLead)