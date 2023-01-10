import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { login, clearMessage } from "../actions/auth";
import Footer from "../common/footer";

class SignOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      loading: false,
      passwordType: 'password',
      passwordHide:true,
      errorMsg: '',
      isValid: true,
    };
  }

  
  componentDidMount() {
    const { history, user_id } = this.props;
    this.handleClearMeaage();
    if(user_id)
    {
     // history.push("/home");
    }
  }

  handleClearMeaage = () =>{
    this.props.dispatch(clearMessage());
  }


  handleMobile = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    const reg = /^[0]?[6789]\d{9}$/;
    this.handleClearMeaage();
    if(e.target.value !=='')
    {
      if (!pattern.test(e.target.value)) {
        document.getElementById('mobile').value='';
        this.setState({mobile : ''});
        this.setState({isValid : false});
        this.setState({errorMsg : "Please enter only number."});
      }else if(e.target.value.length != 10){
        this.setState({isValid  : false});
        this.setState({errorMsg : "Please enter valid phone number."});
      }else{
        if(reg.test(e.target.value))
          {
          this.setState({isValid  : true, errorMsg : "", mobile : e.target.value});
          }else{
            this.setState({isValid : false, errorMsg : "Please enter valid mobile number.", mobile : e.target.value});
          }
      }
    }else{
      this.setState({isValid  : true, errorMsg : "", mobile : ''});
    }
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });
    this.handleClearMeaage();
    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          history.push("/verify_otp");
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleClear = () =>{
    this.setState({isValid  : true});
    this.setState({errorMsg : ""});
    this.setState({mobile : ''});
    document.getElementById('mobile').value='';
  }

  handleSubmit = (event) => {
      this.setState({isValid  : true});
      this.setState({errorMsg : ""});
      event.preventDefault();
      const { history, dispatch } = this.props;
      if(this.state.mobile !='')
      {
        localStorage.setItem('mobile', this.state.mobile);
        let data = {
          mobile_no: this.state.mobile
        }
        dispatch(login(data))
        .then(() => {
            history.push("/verify_otp");
        })
        .catch(() => {
         
        });
      }else{
        this.setState({isValid  : false});
        this.setState({errorMsg : "Please enter valid phone number."});
      }
  
    }
    handleRegister = () =>{
      const { history } = this.props;
      history.push("/register");
    }

  

  render() {
     const { message, isLoading } = this.props;
     const suBtn = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
    return (
         <>
          <Helmet>
              <title>Signin With Otp </title>
          </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
            ):''}
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
                                <span className="d-block">Welcomes</span>
                                You!
                              </h1>
                              <p className="col-md-12 mr-t p-lg-0 px-3 text-white">
                                Please sign in to continue manage dashboard
                              </p>
                          </div>
                        
                        </div>
                        <div className="login-img">
                              <img src="images/model.png" />
                            </div>
                    </div>






                  <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">

                  <div className="loginform">
                   
                   <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                       <h4 className="mtext-114">
                       <img src="images/icons/icon4_w.png" /> Merchant Sign-in
                       </h4>
                   </div>


                    
                  
                      <form onSubmit={this.handleSubmit}>
                          <h3 className="mb-5">Sign in to your account with your mobile number.</h3>

                        <div className="m-b-5 how-pos4-parent">
                        <div className="bor8 aline-row" style={{flexWrap:'initial'}}>
                          <input
                              name="text"
                              placeholder=""
                              style={{width: '40px', background:'#fff'}}
                              defaultValue={'+91'}
                              disabled={true}
                            />
                          <input
                            className="stext-111 cl2 plh3 size-116"
                            type="text"
                            name="mobile"
                            id="mobile"
                            placeholder="Enter Mobile Number"
                            style={{width:'86%'}}
                            onChange={this.handleMobile}
                            maxLength={"10"}
                          />
                          <div className="input-group-addon input-group-addon-sty">
                          {this.state.mobile !=='' && this.state.isValid?(
                            <img src="images/Vector.png" />
                          ):''
                          }
                           {
                            this.state.isValid === false?(
                              <img style={{cursor:'pointer'}} onClick={this.handleClear} src="images/error.png" />
                            ):''
                          }
                          </div>
                        </div>
                        </div>


                        {this.state.isValid === false?(
                          <div className="form-group">
                            <div className={"alert alert-danger" } role="alert">
                            {this.state.errorMsg}
                            </div>
                          </div>
                        ):''
                        }
                          <div className="text-center  mt-4 mb-4">
                            <div className="d-inline-flex align-items-center all_check">
                                <input type="checkbox"/>
                                <label>Get OTP on WhatsApp </label>
                                <img src="images/icons/whatsapp.svg" alt="whatsapp" />
                            </div>
                          </div>
                        <button 
                          type="submit" 
                          disabled={this.state.mobile !='' && this.state.isValid?false:true} 
                          className="submit-btn mb-3" 
                          style={this.state.mobile !='' && this.state.isValid?suBtn:{}}>
                           Continue
                        </button>
                        {message && (
                          <div className="form-group">
                            <div className={"alert alert-danger" } role="alert">
                            {message}
                            </div>
                          </div>
                        )}
                        <p className="form-p-sty text-center">
                            <img src="images/icons/icon-ind.png" /> We’ll send you a verification code
                            via SMS.
                        </p>
                        <div className="text-center mr-btn-sty mb-4">
                            <p className="form-p-sty mb-4">
                            By proceeding, I agree to Eduvanz's <a href="https://eduvanz.com/legal">T&amp;Cs </a>&amp;
                            authorize Eduvanz to connect with me.
                            </p>

                            <p className="form-p-sty text-center">
                              New User? <Link to="/register" className="font-weight-bold"> Register Here </Link>
                          </p>
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
  const { isLoggedIn, user_id, isLoading } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
    user_id,
    isLoading
  };
}

export default connect(mapStateToProps)(SignOtp);
