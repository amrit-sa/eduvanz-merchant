import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { register } from "../actions/auth";
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

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

let isValid = false;

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      mobileNumber: '',
      successful: false,
      isDisabled: true,
      // isValid: true,
      // message: '',
      isFirstName: true,
      isLastName: true,
      isEmail: true,
      isMobile: true,
      failMessage: ''
    };
  }


  componentDidMount() {

    $('.labelFocus input').change(function () {
      var $this = $(this);
      if ($this.val())
        $this.addClass('filled')
      else
        $this.removeClass('filled')
    })
  }


  vmobile = (value) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(value)) {
      document.getElementById('mobileNumber').value = "";
      return (
        <div className="alert alert-danger" role="alert">
          Please enter only number.
        </div>
      );
    } else if (value.length !== 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter valid phone number.
        </div>
      );
    }

  };


  handleChange = (e) => {
    e.persist();
    if (e.target.name == 'email') {
      if (!isValidEmail(e.target.value)) {
        this.setState({
          isEmail : false,
          failMessage : "Enter Valid email"
        })
      } else {
        this.setState({
          isEmail : true,
          failMessage : "",
          [e.target.name]: e.target.value
        })
      }
    } else {
      const result = e.target.value.replace(/[^a-z]/gi, '');
      this.setState(
        { [e.target.name]: result }
      );
    }
  }

  handleMobile = (e) => {
    console.log('mobile',e.target.value)
    // this.setState({ message: '', isValid: true });
    var pattern = new RegExp(/^[0-9\b]+$/);
     if (e.target.value !== '') {
      if (pattern.test(e.target.value)) {
        this.setState({
          mobileNumber : e.target.value
        })
        if (e.target.value.length === 10) {
          this.setState({ isMobile : true, failMessage : "" });
        } else {
          this.setState({ isMobile : false, failMessage : "Please enter correct 10 digit number" });
        }
      } else {
        // document.getElementById('mobileNumber').value = "";
        this.setState({ isMobile : false, failMessage : "Please enter correct 10 digit number" });
      }
     }
     else{
      this.setState({ isMobile : false, failMessage : "Please enter correct 10 digit number", mobileNumber:''});

     }
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    let user = {
      mobile: this.state.mobileNumber,
      fname: this.state.first_name,
      lname: this.state.last_name,
      email: this.state.email
    }
    let givenData = {
      mobileNumber: this.state.mobileNumber,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem('mobile', this.state.mobileNumber);
    localStorage.setItem('email', this.state.email);
    this.form.validateAll();
    const { history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(givenData)
        )
        .then(() => {
          history.push("/register_otp");
        })
        .catch(() => {

        });
    }
  }
  handleClear = () =>{
    this.setState({failMessage: ""});
    this.setState({mobileNumber : ''});
  }


  render() {
    const { message, isLoading, isSuccess } = this.props;
    const { isFirstName, isEmail, isLastName, isMobile, failMessage, first_name, last_name, mobileNumber, email } = this.state
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }
    console.log('message',message)
    return (
      <>
        <Helmet>
          <title>Eduvanz | Signup </title>
        </Helmet>
        {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        <section className="bg0 login">
          <div className="container-zero">
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card">
                <div className="d-flex flex-column">
                  <div className="textpart">
                    {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">eduvanz.</h4> */}
                    <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                      {/* eduvanz. */}
                      <img src="images/logo-stride.png" />
                    </h4>
                    <h1 className="titfnt text-white">
                      <span className="d-block">Welcomes</span>
                        Partner!
                      </h1>
                      {/* <p className="col-md-12 mr-t p-lg-0 px-3 text-white">
                      Please sign in to continue manage dashboard
                      </p> */}
                      </div>

                      <div className="text-white" style={{ marginTop: "8px" ,position:"relative",zIndex:1}}>
                    <div className="" style={{ fontWeight: 600, fontSize: "22px", font: "Graphik", lineHeight: "28px" }}>Access Ready online Market of learners in just 3 steps</div>
                    <div style={{ fontWeight: 500, fontSize: "16px", font: "Graphik", lineHeight: "22px" }}>
                      <div className="mt-2">Step1 : Add your details</div>
                      <div className="mt-2">Step2 : Add product details</div>
                      <div className="mt-2">Step3 : Add bank details</div>
                    </div>
                  </div>




                  <div className="login-img">
                    <img src="images/model.png" />
                  </div>
                </div>
              </div>


              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform">
                  <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                    <h4 className="mtext-114">
                      <img src="images/icons/icon4_w.png" /> Register as merchant
                        </h4>
                  </div>
                  <Form ref={(c) => {
                    this.form = c;
                  }}
                    onSubmit={this.handleRegister}
                  >
                    {!this.state.successful && (
                      <>
                        <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group labelFocus">
                            <input
                              className="stext-111 cl2 plh3 size-116  p-r-15"
                              type="text"
                              name="first_name"
                              placeholder=""
                              // validations={[required, vusername]}
                              onChange={this.handleChange}
                              // value={first_name}
                              autoComplete="off"
                              maxLength="25"
                              value={first_name}
                            />
                            <span>First Name</span>
                          </div>
                        </div>
                        {
                          !isFirstName ?
                            <div className="form-group">
                              <span style={{ color: '#EA4335' }}>
                                {failMessage}
                              </span>
                            </div>
                            :
                            ""
                        }
                        <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group labelFocus">
                            <input
                              className="stext-111 cl2 plh3 size-116  p-r-15"
                              type="text"
                              name="last_name"
                              placeholder=""
                              // validations={[required, vusername]}
                              onChange={this.handleChange}
                              autoComplete="off"
                              maxLength="25"
                              value={last_name}
                            />
                            <span>Last Name</span>
                          </div>
                          {
                            !isLastName ?
                              <div className="form-group">
                                <span style={{ color: '#EA4335' }}>
                                  {failMessage}
                                </span>
                              </div>
                              :
                              ""
                          }
                        </div>

                        <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group labelFocus">
                            <input
                              className="stext-111 cl2 plh3 size-116  p-r-15"
                              type="text"
                              name="email"
                              placeholder=""
                              validations={[required, email]}
                              maxLength="55"
                              onChange={this.handleChange}
                            />
                            <span>Email ID</span>
                          </div>
                        </div>
                          {
                            !isEmail ?
                              <div className="form-group">
                                <span style={{ color: '#EA4335' }}>
                                  {failMessage}
                                </span>
                              </div>
                              :
                              ""
                          }

                        <div className="valignimg">
                          <img src="images/icons/icon-ind.png" /> Please enter your business email.
                      </div>

                        <div className="bor8 m-b-20 how-pos4-parent d-flex">
                          {/* <div className="input-group labelFocus"> */}
                          <div className="aline-row w-100" style={{flexWrap:'initial'}}>
                          <input
                              name="text"
                              placeholder=""
                              style={{width: '40px', background:'#fff'}}
                              defaultValue={'+91'}
                              disabled={true}
                            />
                            <input
                              className="stext-111 cl2 plh3 size-116  p-r-15"
                              type="tel"
                              name="mobileNumber"
                              id="mobileNumber"
                              placeholder="Enter Mobile Number"
                              maxLength={"10"}
                              value={mobileNumber}
                              style={{width:'80%'}}
                              onChange={this.handleMobile}
                            />
                            {/* <span>Enter Mobile Number</span> */}


                          <div className="input-group-addon input-group-addon-sty">
                            {mobileNumber > 0 && isMobile ? (
                              <img src="images/Vector.png" />
                            ) : ''
                            }
                            {
                              !isMobile ? (
                                <img src="images/error.png"  onClick={this.handleClear} style={{cursor:'pointer'}}/>
                              ) : ''
                            }
                          </div>

                          </div>

                          
                        </div>


                        {!isMobile ? (
                          <div className="form-group">
                            <span style={{ color: '#EA4335' }}>
                              {failMessage}
                            </span>
                          </div>
                        ) : ''
                        }
                        <button
                          type="submit"
                          disabled={first_name != '' && last_name != "" && (email != "" && isEmail) && (mobileNumber != "" && isMobile) ? false : true}
                          className={"submit-btn mb-3"}
                          style={first_name != '' && last_name != "" && (email != "" && isEmail) && (mobileNumber != "" && isMobile) ? btnStyle : {}}>
                          Continue
                      </button>
                      </>
                    )}
                    {message && (
                      <div className="form-group">
                        <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                    <p className="form-p-sty text-center valignimg">
                      <img src="images/icons/icon-ind.png" /> We’ll send you a verification code via SMS.
                      </p>
                    <div className="col-md-12 text-center mr-btn-sty">
                      <p className="form-p-sty">
                        By proceeding, I agree to Eduvanz's <a href="https://eduvanz.com/legal">T&amp;Cs </a>
                          &amp; authorize Eduvanz to connect with me.
                        </p>
                    </div>
                    <div className="d-lg-flex justify-content-lg-between mb-4 mmc">
                      <p className="text-center form-p-sty">Customer sign-up ? <a href="https://stride-qa.herokuapp.com/register" className="font-weight-bold" >Click Here</a></p>
                      <span className="d-none d-md-block">|</span>
                      <p className="text-center form-p-sty">Already registered ? <Link className="font-weight-bold" to="/login" >Sign in</Link></p>


                    </div>
                  </Form>
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
  const { isLoading, isSuccess, authMessage } = state.auth;
  return {
    message,
    isLoading,
    isSuccess,
    authMessage
  };
}

export default connect(mapStateToProps)(Register);
