import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { verifyOtp, salesForceLogin, clearMessage } from "../actions/auth";
import Footer from "../common/footer";

class RegisterOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: localStorage.getItem('mobile'),
      loading: false,
      timerOn: true,
      timer: '00:16',
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      viewResend: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount()
  {
    this.startTimer();
    this.handleClearMeaage();
  }

  handleClearMeaage = () =>{
    this.props.dispatch(clearMessage());
  }

  handleChange(value1, event) {
    console.log('value1', value1);
    this.setState({ [value1]: event.target.value });
    if(value1 === 'otp4')
    {
      console.log('called');
      this.handleSubmit(event.target.value);
    }
  }

  handleSignup = () =>{
    const { history } = this.props;
    history.push("/editmobile");
  }

  handleSubmit(value) {
    const { dispatch, history, log_id, onBording  } = this.props;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(pattern.test(this.state.otp1) && pattern.test(this.state.otp3) && pattern.test(value) && pattern.test(this.state.otp2))
    {
      const givenOtp = parseInt(this.state.otp1+this.state.otp2+this.state.otp3+value);
      let data = { 
          otp: givenOtp,
          logId: parseInt(log_id)
        }
      dispatch(verifyOtp(data))
      .then((response) => {
        if(response.status === 'success'){
          let obj = { id: this.props.user_id , token: this.props.token }
          const getData = response.data;
          localStorage.setItem('user_sfid', getData.sfid);
          localStorage.setItem("sfid",getData.sfid);
          dispatch(salesForceLogin(obj));
          history.push("/company_details");
          // if(getData && !getData.pan_number__c)
          // {
          //   history.push("/company_details");
          // }else if(getData && !getData.temp_password__c){
          //   history.push("/credentails");
          // }else if(getData && !getData.bank_name__c){
          //   history.push("/bankdetails");
          // }else{
          //   history.push("/company_details");
          // }
        }
      });
    }
  }

  startTimer() {
    var presentTime = this.state.timer;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = this.checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    if(m<0){
      return
    }
    if(m === '00' && s === '00')
    {
      this.setState({viewResend: true});
    }
    this.setState({timer:  m + ":" + s});
    setTimeout(this.startTimer, 1000);
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec};
    if (sec < 0) {sec = "59"};
    return sec;
  }

  inputfocus = (elmnt, getvalue) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      console.log("next");
      const pattern = /^[0-9]$/;
      console.log('elmnt',pattern.test(elmnt.target.value));
      if(pattern.test(elmnt.target.value))
      {
        const next = elmnt.target.tabIndex;
        if (next < 4) {
          elmnt.target.form.elements[next].focus()
        }
      }else{
        this.setState({[getvalue]: ''});
        document.getElementById(getvalue).value = '';
      } 
    }

  }

  handleClear = () => {
    this.setState({ otp1:'', otp2:'', otp3:'', otp4:''});
    document.getElementById('otp1').value='';
    document.getElementById('otp2').value='';
    document.getElementById('otp3').value='';
    document.getElementById('otp4').value='';
    this.handleClearMeaage();
  }

  

  render() {
     const { message, isSuccess, authMessage, isLoading } = this.props;
    return (
      <>
      <Helmet>
          <title>Eduvanz | VerifyOtp </title>
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
                  {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">eduvanz.</h4> */}
                  <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                    {/* eduvanz. */}
                    <img src="images/logo-stride.png" />
                    </h4>
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
                        <img src="images/icons/verify-icon.svg" /> Verify your OTP
                        </h4>
                      </div>



                      <form className="otpform" onSubmit={this.handleSubmit}>
                      <div className="row">
                          <div className="col-md-12">
                            <h3 style={{fontWeight: '700',fontSize: '20px'}}>Please enter the verification code sent to {this.state.mobile}.</h3>
                          </div>
                          
                        </div>
                      <div className="text-center mr-btn-sty">
                        
                        <div className="row" style={{justifyContent: 'center',paddingTop: '20px'}}>
                          <div className="col-sm-12">
                            <input
                              className="otp"
                              name="otp1"
                              id="otp1"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp1}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp1", e)}
                              tabIndex="1" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,'otp1')}
                            />
                            <input
                              className="otp"
                              name="otp2"
                              id="otp2"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp2}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp2", e)}
                              tabIndex="2" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,'otp2')}
                            />
                            <input
                              className="otp"
                              name="otp3"
                              id="otp3"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp3}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp3", e)}
                              tabIndex="3" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e, 'otp3')}
                            />
                            <input
                              className="otp"
                              name="otp4"
                              id="otp4"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp4}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp4", e)}
                              tabIndex="4" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e, 'otp4')}
                            />
                            {authMessage && isSuccess === 0?(
                              <img style={{marginLeft: '10px', cursor:'pointer'}} onClick={this.handleClear} className="img-error" src="images/error.png" />
                          ):''}
                          </div>
                        </div>
                      </div>
                      {(message || authMessage) && (
                        <div className="form-group">
                          <div className={ isSuccess===1 ? "alert alert-success" : "alert alert-danger" } role="alert">
                            {message?message:authMessage?authMessage:''}
                          </div>
                        </div>
                      )}
                      <div className="text-center mr-btn-sty">
                        <img src="images/icons/icon-ind.png" /> Verification code valid for next 
                        {' '+this.state.timer} min
                      </div>
                      {this.state.viewResend?(

                        <div className="mb-4">
                        <p className="text-center form-p-sty mt-5"><Link className="font-weight-bold" to="#" onClick={this.handleSignup}>Didn’t get a code?</Link></p>
                        </div>
                   
                      ):''
                      }
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
  const {
      isLoggedIn,
      verificationType,
      log_id,
      user_id,
      isSuccess,
      authMessage,
      nextPage,
      onBording,
      isLoading,
      token
    } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
    verificationType,
    log_id,
    user_id,
    isSuccess,
    authMessage,
    nextPage,
    onBording,
    isLoading,
    token
  };
}

export default connect(mapStateToProps)(RegisterOtp);
