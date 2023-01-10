import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { resendOtp } from "../actions/auth";
import Footer from "../common/footer";

class Dontgetotp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: localStorage.getItem('mobile'),
      successful: false,
      isDisabled: true,
    };
  }

  handleResendOtp = () => {
      this.setState({
        loading: true,
      });
      const { dispatch, history, log_id } = this.props;
      let data = {
        logId: parseInt(log_id),
      }
      dispatch(resendOtp(data))
        .then((status) => {
          this.setState({ 
            loading: false,
          });
          if(status === 'success')
          {
            history.push("/verify_otp");
          }
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
  }

  editMobile = () =>{
    const { history } = this.props;
    history.push("/login_mobile");
  }

  render() {
    const { message } = this.props;

    return (
     <>
           <Helmet>
              <title>Didn’t get the code</title>
            </Helmet>
            {this.state.loading?(
              <div className="loading">Loading&#8230;</div>
            ):''}
      <section className="bg0 login">
              <div className="npm start-zero">
                <div className="flex-w flex-tr">
                <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card">
                <div className="d-flex flex-column">
                    <div className="textpart">
                    <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                    {/* eduvanz. */}
                    <img src="images/logo-stride.png" />
                    </h4>
                  {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">eduvanz.</h4> */}
                   <h1 className="titfnt text-white">
                        <span className="d-block">Welcomes</span>
                        You!
                      </h1>
                      <p className="col-md-12 mr-t p-lg-0 px-3 text-white">
                        Please sign in to continue manage dashboard
                      </p>
                  </div>
                  <div className="login-img">
                      <img src="images/model.png" />
                    </div>
                </div>
                </div>

            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform" style={{width: '65%'}}>
                    <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                        <h4 className="mtext-114">
                        <img src="images/icons/key-icon.svg" /> Didn’t get the OTP?
                        </h4>
                      </div>


                <form>
                    <div className="row mb-5">
                      <div className="col-md-12">
                        <h3 style={{fontWeight: '700',fontSize: '20px'}}>Try another option to get OTP</h3>
                      </div>
                    </div>
                  
                    <button type="button" onClick={this.handleResendOtp} className="flex-c-m btn-forget cl0 size-121 p-lr-15 trans-04 pointer mr-btn-sty">
                      Text Me 
                    </button>


                    <div className="pb-4 text-center">

                    <p className="form-p-sty mt-5">
                        <Link className="font-weight-bold" to="#" onClick={this.editMobile}>Edit mobile number </Link>
                    </p>

                     
                      

                      {/* <button type="button" onClick={this.editMobile} className="text-center">
                        Edit mobile number 
                      </button> */}
                      {message && (
                        <div className="form-group">
                          <div className={"alert alert-danger"} role="alert">
                            {message}
                          </div>
                        </div>
                      )}
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
  const { log_id } = state.auth;
  return {
    message,
    log_id
  };
}

export default connect(mapStateToProps)(Dontgetotp);
