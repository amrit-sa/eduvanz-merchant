import React, { Component } from "react";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { merchantLogin, salesForceLogin, clearMessage } from "../actions/auth";
import Footer from "../common/footer";




class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    

    this.state = {
      email: "",
      email_id:"",
      password: "",
      loading: false,
      passwordType: 'password',
      passwordHide: true,
      isDisabled: true,
      phError: '',
      loginCount: 0,
      maxLoginCount: 3,
      isValidEmailId:false,
      isEmailvalid: false,
      isEmail: false,

    };
  }

  componentDidMount() {
    const { history, user_id } = this.props;
    this.props.dispatch(clearMessage());
    if (user_id) {
      // history.push("/home");
    }
    $('.labelFocus input').change(function () {
      var $this = $(this);
      if ($this.val())
        $this.addClass('filled')
      else
        $this.removeClass('filled')
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      this.setState({ isEmailvalid: true })
      return true;
    }
    else {
      this.setState({ isEmailvalid: false })
      return false;
    }
  }

  handleEmail1 = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    let str = event.target.value
    if (str && str.length > 2) {
      this.setState({ isEmail: true })
      this.ValidateEmail(str)
    } else {
      this.setState({ isEmail: false })
    }
  }

  handlePassword = () => {
    if (this.state.passwordHide === true) {
      this.setState({ passwordHide: false, passwordType: 'text' });
    } else {
      this.setState({ passwordHide: true, passwordType: 'password' });
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { dispatch, history, onBording } = this.props;
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    dispatch(merchantLogin(data))
      .then((bording) => {
        this.setState({
          loading: false,
        });
        let obj = { id: this.props.user_id, token: this.props.token }
        dispatch(salesForceLogin(obj));
        console.log('onBording', bording);
        history.push("/home");
        /* if(bording === 0)
        {
          history.push("/company_details");
         // window.location.reload();
        }else if(bording === 1){
          history.push("/credentails");
         // window.location.reload();
        }else if(bording === 2){
          history.push("/bankdetails");
        //  window.location.reload();
        }else{
          history.push("/home");
          // window.location.reload();
        } */
      })
      .catch(() => {
        this.setState({
          loading: false,
          loginCount: this.state.loginCount + 1
        });
        if (this.state.loginCount > this.state.maxLoginCount) {
          history.push("/login_mobile");
        }
      });
  }

  render() {
    const { message, isSuccess, authMessage, user_id } = this.props;
    const subBtn = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    console.log('auth message', authMessage)
    return (
      <>
        <Helmet>
          <title>Eduvanz | Signin</title>
        </Helmet>
        {this.state.loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        <section className="bg0 login">
          <div className="container-zero">
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card">
                <div className="d-flex flex-column">
                  <div className="textpart">

                    <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                      {/* eduvanz. */}
                      <img src="images/logo-stride.png" />
                    </h4>
                    <h1 className="titfnt text-white">
                      <span className="d-block">Welcome Back, Partner!</span>
                    </h1>
                    {/* <p className="col-md-12 mr-t padd-0 balockfnt">
                        Please sign in to continue manage dashboard
                      </p> */}
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
                      <img src="images/icons/icon4_w.png" /> Merchant Sign-in
                    </h4>
                  </div>
                  <form onSubmit={this.handleLogin} >
                    <div className="row">
                      <div className="col-12">
                        <h3 className="text-center mb-lg-5 mb-3">Please enter your email ID and password</h3>
                      </div>
                    </div>
                    {/* <div className="row pb-3">
                          <div className="col-md-6">
                            <h3>Sign in</h3>
                          </div>
                          <div className="col-md-6">
                            <p className="form-p-sty">
                              <Link to="/register" style={{float: 'right', cursor:'pointer'}}> Register</Link>
                            </p>
                          </div>
                        </div> */}

                    { /*  <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group labelFocus" style={{flexWrap:'initial'}}>
                            <input
                              className="stext-111 cl2 plh3 size-116"
                              type="text"
                              name="phone"
                              // onChange={this.handleChange}
                            />
                            <span>Enter Mobile Number</span>
                            <div className="f-s-s">
                              <img src="images/icons/tick-success.svg" /> 
                              <img src="images/icons/cross.svg" />
                            </div>
                            
                          </div>
                        </div> */}
                    <div className="bor8 m-b-20 how-pos4-parent">

                      <div className="input-group labelFocus" style={{ flexWrap: 'initial' }}>
                        <input
                          className="stext-111 cl2 plh3 size-116"
                          type="text"
                          name="email"
                          id="email_id"
                          // placeholder="Email ID"
                          onChange={this.handleEmail1}
                        />
                        <span>Email ID</span>
                       
                        {/* <div className="f-s-s">
                              <img src="images/icons/tick-success.svg" /> 
                              <img src="images/icons/cross.svg" />
                            </div>
                            <div className="bottom-error">Enter valid email ID</div> */}
                      </div>
                      
                    </div>
                    {this.state.isEmail && !this.state.isEmailvalid && (
                  <span style={{ color: "red" }}>
                    Invalid email ! Please enter a valid email address.
                  </span>
                )}
                    <div className="bor8 mb-2 how-pos4-parent">

                      <div className="input-group show_hide_password1 labelFocus">
                        <input
                          className="stext-111 cl2 plh3 size-116 p-r-15"
                          type={this.state.passwordType}
                          name="password"
                          style={{ width: '83%' }}
                          onChange={this.handleChange}
                        />
                        <span>Password</span>
                        <div className="input-group-addon input-group-addon-sty" onClick={() => this.handlePassword()}>
                          {
                            this.state.passwordHide ? (
                              <i style={{ fontSize: '27px' }} className="fa fa-eye-slash" aria-hidden="true" />
                            ) : (<i style={{ fontSize: '27px' }} className="fa fa-eye" aria-hidden="true" />)
                          }
                        </div>
                        {/* <div className="f-s-s">
                              <img src="images/icons/tick-success.svg" /> 
                              <img src="images/icons/cross.svg" />
                            </div>
                            <div className="bottom-error">Password does not match</div> */}
                      </div>
                    </div>

                    <div className="text-right mb-3">
                      <div className="d-inline-flex align-items-center all_check mr-0">
                        <input type="checkbox" />
                        <label>Remember Me</label>
                      </div>
                    </div>

                    <div>
                      {/* <div className="text-center">
                          <div className="d-inline-flex align-items-center all_check">
                              <input type="checkbox"/>
                              <label>Get OTP on WhatsApp </label>
                              <img src="images/icons/whatsapp.svg" alt="whatsapp" />
                            </div>
                          </div> */}
                      <button
                        type="submit"
                        disabled={this.state.isEmail && this.state.isEmailvalid  && this.state.password != ''   ? false : true}
                        className="submit-btn mb-3"
                        style={this.state.isEmail && this.state.isEmailvalid && this.state.password != '' ? subBtn : {}}>
                        Continue
                      </button>

                      <div className="d-flex align-items-center justify-content-center mb-4"><img src="images/icons/info.svg" alt="whatsapp" /> <p>We’ll send you a verification code via SMS.</p>
                      </div>
                    </div>

                    <div className="row mb-5" style={{ justifyContent: 'center', textAlign: 'center' }}>
                      <div className="col-md-6">
                        <p className="form-p-sty font-weight-bold">
                          <Link to="/login_mobile" >Sign in with otp</Link>
                        </p>
                      </div>
                    </div>


                    <div className="mb-4">
                      <p className="text-center form-p-sty">By proceeding, I agree to Eduvanz's <a href="https://eduvanz.com/legal" >T&amp;Cs &amp;</a>  authorize Eduvanz to connect with me</p>
                    </div>

                    <div className="d-lg-flex justify-content-lg-between mb-4">
                      <p className="text-center form-p-sty">Customer sign-in? <a href=" https://stride-qa.herokuapp.com/register" className="font-weight-bold">Click Here</a></p>
                      <span className="d-none d-md-block">|</span>
                      <p className="text-center form-p-sty">New User? <Link className="font-weight-bold" to="/register" >Register Here</Link></p>
                    </div>

                    {/* <div className="bor8 m-b-20 how-pos4-parent">
                          <div className="input-group show_hide_password" style={{flexWrap:'initial'}}>
                            <input
                              className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15"
                              type="text"
                              name="email"
                              placeholder="Email ID"
                              onChange={this.handleChange}
                            />
                          </div>
                        </div> */}


                    {/* <button 
                          type="submit"
                          disabled={this.state.email !='' && this.state.password !=''?false:true}
                          className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty"
                          style={this.state.email !='' && this.state.password !=''?subBtn:{}}>
                        Sign in
                        </button> */}
                    {isSuccess === 0 && authMessage && (
                      <div className="form-group">
                        <div className={isSuccess === 1 ? "alert alert-success" : "alert alert-danger"} role="alert">
                          {authMessage}
                          {/* {isSuccess === 1 ? authMessage : 'Password does not match'} */}
                        </div>
                      </div>
                    )}
                    {/* <div className="row" style={{justifyContent: 'center', textAlign: 'center'}}>
                          <div className="col-md-6">
                            <p className="form-p-sty">
                              <Link to="/login_mobile" >Sign in with OTP</Link>
                            </p>
                          </div>
                        </div> */}
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
  const { isLoggedIn, onBording, isSuccess, authMessage, user_id, token } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    isSuccess,
    authMessage,
    message,
    user_id,
    onBording,
    token
  };
}

export default connect(mapStateToProps)(Login);
