import React, { Component } from "react";
import $, { map } from 'jquery';
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button"; import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { connect } from "react-redux";
import { updateCompnay, clearMessage } from "../actions/auth";
import { getBrands, searchEntity, clearSearchEntity } from "../actions/user";
import Footer from "../common/footer";



const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const searchDropdown = {
  'overflow-y': 'scroll',
  'max-height': '400px',
  'position': 'absolute',
  'top': '57px',
  'z-index': '9',
  'background': '#ffffff',
}

class Details extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.brandChange = this.brandChange.bind(this);
    this.entityChange = this.entityChange.bind(this);
    // this.searchEntity = this.searchEntity.bind(this);
    this.handlePan = this.handlePan.bind(this);

    this.state = {
      username: "",
      brand: "",
      entity: "",
      pan: "",
      cin: "",
      gst: "",
      isCin: true,
      isGst: true,
      failMessage: '',
      password: "",
      successful: false,
      isDisabled: true,
      errorMsg: '',  
      
    };
  }

  componentDidMount() {
    this.handleClearMeaage();
    this.props.dispatch(getBrands())
    

    $('.labelFocus input').change(function () {
      var $this = $(this);
      if ($this.val())
        $this.addClass('filled')
      else
        $this.removeClass('filled')
    })
  }

  handleClearMeaage = () => {
    this.props.dispatch(clearMessage());
  }

  handleChange = (e) => {
    let regexCin = new RegExp(/^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/)
    let regexGst = new RegExp(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/);
    if (e.target.name == 'cin') {
      if (regexCin.test(e.target.value)) {
        this.setState({
          isCin: true,
          failMessage: '',
        })
      } else {
        this.setState({
          isCin: false,
          failMessage: 'Invalid CIN Number',
        })
      }
    } else if (e.target.name == 'gst') {
      if (regexGst.test(e.target.value)) {
        this.setState({
          isGst: true,
          failMessage: '',
        })
      } else {
        this.setState({
          isGst: false,
          failMessage: 'Invalid GST Number',
        })
      }
    }
    this.setState(
      { [e.target.name]: e.target.value }
    );
  }

  brandChange = (e) => {
    this.setState(
      { brand: e.label }
    );
  }

  entityChange = (e) => {
    this.setState(
      { entity: e.target.value }, () => {
        if (this.state.entity.length > 2) {
          let data = { company_name: this.state.entity }
          this.props.dispatch(searchEntity(data));
        } else {
          this.props.dispatch(clearSearchEntity());
        }
      }
    );
  }

  // searchEntity = (string) => {
  //   if (string.length > 2) {
  //     let data = { company_name: string }
  //     this.props.dispatch(searchEntity(data));
  //   } else {
  //     this.props.dispatch(clearSearchEntity());
  //   }
  // }

  handlePan = (e) => {
    e.persist();
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    this.setState(
      { [e.target.name]: e.target.value }
    );
    if (e.target.value !== '') {
      if (regex.test(e.target.value.toUpperCase())) {
        this.setState({ errorMsg: '' });
      } else {
        this.setState({ errorMsg: 'Enter valid pan number' });
      }
    } else {
      // this.setState(
      //   { [e.target.name]: e.target.value }
      // );
      this.setState({ errorMsg: '' });
    }

  }

  handleOnSelect = (item) => {
    //console.log("item",item)
   //console.log(item, item.name, item.pan[0], item.entityId, item.kid)
    this.setState({
      entity: item.name,
      // pan : item.pan[0],
      // cin: item.entityId,
      // gst : item.kid
    }, () => {
      this.props.dispatch(clearSearchEntity());
    });
    console.log(item)
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    this.form.validateAll();
    const { history, user_id } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      let data = {
        brand: this.state.brand,
        entity: this.state.entity,
        cin: this.state.cin,
        gst: this.state.gst,
        pan: this.state.pan,
        id: parseInt(user_id)
      }
      this.props
        .dispatch(
          updateCompnay(data)
        )
        .then(() => {
          history.push("/credentails");
        })
        .catch(() => {

        });
    }
  }

  render() {
    const { message, authMessage, isSuccess, isLoading, brands, entity } = this.props;
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }
    let branOption = [];
    let entityOptions = [];
    if (brands && brands.length > 0) {
      for (var i = 0; i < brands.length; i++) {
        branOption.push({ value: brands[i].id, label: brands[i].name });
      }
    }

    if (entity && entity.length > 0) {
      for (var i = 0; i < entity.length; i++) {
        entityOptions.push({ value: entity[i].kid, label: entity[i].name });
      }
    }

    return (
      <>
        <Helmet>
          <title>Company Details</title>
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
                  <div className="col-md-12 mr-t p-lg-0 px-3">
                    <h5 style={{ fontWeight: '700', color: "#fff" }}>STEP 1</h5>
                    <h1 className="titfnt text-white">
                      Add Your Details
                  </h1>
                  </div>
                  <div className="col-md-12 mr-t p-lg-0 px-3">
                    <p className="col-md-7 mr-t p-0 text-white">
                      Please tell us about your business.
                  </p>

                  </div>

                </div>
                <div className="col-md-12 mr-t login-img">
                  <img src="images/model.png" />
                </div>
              </div>


              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform">
                  <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                    <h4 className="mtext-114">
                      <img src="images/icons/icon4_w.png" /> Let’s get started
                  </h4>
                  </div>


                  <Form ref={(c) => {
                    this.form = c;
                  }}
                    onSubmit={this.handleRegister}
                  >
                    {!this.state.successful && (
                      <>
                        <div className=" m-b-20 how-pos4-parent">



                          <div className="m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                              {/* <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type="text"
                                name="brand"
                                placeholder=""
                                style={{ width: '89%' }}
                                onChange={this.handleChange}
                                validations={[required]}
                              /> */}
                              <select className="brandSelect" onChange={(e) => {this.setState({brand : e.target.value})}}>
                                <option>Brand</option>
                                {
                                  branOption && branOption.length > 0 ? branOption.map((option) => {
                                    if(!option.isdeleted){
                                      return(
                                      <option value={option.value} key={option.value}>{option.label}</option>
                                      )
                                    }
                                  })
                                  : ""
                                }
                              </select>
                              {/* <span>Brand Name</span> */}
                            </div>
                          </div>


                          <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group input-group labelFocus" style={{ flexWrap: 'initial' }}>
                              <input
                                type="text"
                                name="entity"
                                className="search-query stext-111 cl2 plh3 size-116 p-r-15"
                                validations={[required]}
                                onChange={this.entityChange}
                                value={this.state.entity ? this.state.entity : ''}
                                autoComplete="off"
                              />
                              <span>Entity Name</span>
                              <span className="input-group-btn">
                                <button
                                  className="btn btn-danger-search"
                                  type="button"
                                >
                                  <span className="lnr lnr-magnifier" />
                                </button>
                              </span>
                            </div>
                            <div style={searchDropdown}>
                              {entity && entity.length > 0 && (
                                entity.map((item, index) => (
                                  <span onClick={() => this.handleOnSelect(item)} key={index} style={{ display: 'block', textAlign: 'left', borderBottom: '#f5e5e5 solid 2px', cursor: 'pointer' }}>{item.name}</span>
                                ))
                              )}
                            </div>
                            {this.state.isValid == false && this.state.errorMsg != '' && (
                              <div className="form-group">
                                <div className={"alert alert-danger"} role="alert">
                                  {this.state.errorMsg}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group show_hide_password labelFocus">
                            <input
                              className="stext-111 cl2 plh3 size-116"
                              type="text"
                              name="pan"
                              placeholder=""
                              maxLength={"10"}
                              validations={[required]}
                              onChange={this.handlePan}
                              value={this.state.pan}
                              style={{textTransform:"uppercase"}}
                              autoComplete="off"
                            />
                            <span>PAN</span>
                          </div>
                        </div>
                        {
                          this.state.errorMsg !== '' ? (
                            <span style={{ color: '#EA4335' }}>{this.state.errorMsg}</span>
                          ) : ''
                        }
                        <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group show_hide_password labelFocus">
                            <input
                              className="stext-111 cl2 plh3 size-116"
                              type="text"
                              name="cin"
                              placeholder=""
                              validations={[required]}
                              onChange={this.handleChange}
                              maxLength={21}
                              value={this.state.cin}
                              autoComplete="off"
                            />

                            <span>CIN</span>

                          </div>
                        </div>
                        {
                          !this.state.isCin ?
                            <span style={{ color: '#EA4335' }}>{this.state.failMessage}</span>
                            : ''
                        }
                        <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group show_hide_password labelFocus">
                            <input
                              className="stext-111 cl2 plh3 size-116"
                              type="text"
                              name="gst"
                              placeholder=""
                              validations={[required]}
                              onChange={this.handleChange}
                              value={this.state.gst}
                              maxLength={15}
                              autoComplete="off"
                            />
                            <span>GSTIN</span>

                          </div>
                        </div>
                        {
                          !this.state.isGst ?
                            <span style={{ color: '#EA4335' }}>{this.state.failMessage}</span>
                            : ''
                        }
                        <button type="submit" disabled={this.state.errorMsg == '' && this.state.brand !== '' && this.state.entity && this.state.pan !== '' && (this.state.gst && this.state.isGst) && (this.state.cin && this.state.isCin) ? false : true} className={"submit-btn mb-3"} style={this.state.errorMsg == '' && this.state.brand !== '' && this.state.entity && this.state.pan !== '' && (this.state.gst && this.state.isGst) && (this.state.cin && this.state.isCin) ? btnStyle : {}}>
                          Submit
                  </button>
                      </>
                    )}
                    {(message || (authMessage && isSuccess === 0)) && (
                      <div className="form-group">
                        <div className={isSuccess === 1 ? "alert alert-success" : "alert alert-danger"} role="alert">
                          {message ? message : authMessage ? authMessage : ''}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                    <div className="row" style={{ justifyContent: 'center', textAlign: 'center' }}>
                      <div className="col-md-6">
                        <p className="form-p-sty">
                          <Link to="/credentails" className="font-weight-bold">I’ll do this later</Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                  {/*  */}
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
  const {
    isSuccess,
    authMessage,
    user_id,
    isLoading
  } = state.auth;
  const { brands, entity, entitySearch } = state.user;
  return {
    message,
    isSuccess,
    authMessage,
    user_id,
    isLoading,
    entitySearch,
    entity,
    brands
  };
}

export default connect(mapStateToProps)(Details);
