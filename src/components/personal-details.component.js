import React, { Component, useReducer } from "react";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { updateProfile } from "../actions/auth";
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

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      googleData:{},
      successful: false,
      isDisabled: true,
    };
  }

  componentDidMount() {
   
    $('.labelFocus input').change(function(){
      var $this = $(this);
      if($this.val())
          $this.addClass('filled')
      else
          $this.removeClass('filled')
      })
  }

  handleChange = (e) => {
      e.persist();
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history, user_id, token } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      let data = {
        first_name: this.state.fname,
        last_name: this.state.lname,
        id: parseInt(user_id),
        token: token,
        email: this.state.email
      }
      this.props
        .dispatch(
          updateProfile(data)
        )
        .then(() => {
          history.push("/credentails");
        })
        .catch(() => {
         
        });
    }
  }

  render() {
    const { message, isLoading } = this.props;
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }

    return (
      <>
      <Helmet>
          <title> Personal Detals </title>
        </Helmet>
        {isLoading?(
          <div className="loading">Loading&#8230;</div>
        ):''}
      <section className="bg0 login">
        <div className="container-fluid container-zero" style={{paddingLeft:'0px'}}>
          <div className="flex-w flex-tr">
            <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5" style={{color:'#FFFFFF'}}>eduvanz.</h4> */}
              <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                    {/* eduvanz. */}
                    <img src="images/logo-stride.png" />
                    </h4>
              <div className="col-md-12 mr-t p-0">
                  <h1 className="titfnt">
                    Welcomes <br />
                    you !
                  </h1>
                  <p className="col-md-7 mr-t p-0 text-white">
                    Create your account in 3 easy steps!
                  </p>
                </div>
                <div className="col-md-12 mr-t p-0 text-white">
                  <p className="col-md-7 mr-t p-0">
                    Step 1: Merchant Details
                  </p>
                  <p className="col-md-7 mr-t p-0">
                    Step 2: Product Details
                  </p>
                  <p className="col-md-7 mr-t p-0">
                    Step 3: Bank Details
                  </p>
                </div>
                <div className="col-md-12 mr-t login-img">
                  <img src="images/model.png" />
                </div>
            </div>

            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform">
                <h4 className="mtext-105 cl2 txt-center p-b-30 form-title" style={{background:'#FEA99'}}>
                  <img src="images/icons/login-title.png" /> Personal Details
                </h4>
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
                      className="stext-111 cl2 plh3 size-116 p-r-15"
                      type="text"
                      name="fname"
                      placeholder=""
                      validations={[required, vusername]}
                      onChange={this.handleChange}
                      value={this.state.fname}
                    />
                    <span>First Name</span>
                  </div>
                  </div>
                  <div className="bor8 m-b-20 how-pos4-parent">
                   <div className="input-group labelFocus">
                    <input
                      className="stext-111 cl2 plh3 size-116 p-r-15"
                      type="text"
                      name="lname"
                      placeholder=""
                      validations={[required, vusername]}
                      onChange={this.handleChange}
                      value={this.state.lname}
                    />
                    <span>Last Name</span>
                  </div>
                  </div>


                  <div className="bor8 m-b-20 how-pos4-parent">
                    <div className="input-group labelFocus">
                    <input
                      className="stext-111 cl2 plh3 size-116 p-r-15"
                      type="email"
                      name="email"
                      placeholder=""
                      validations={[required, email]}
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                    <span>Email ID</span>
                  </div>
                  </div>

                  <div className="mb-4">

                      <button type="submit" disabled={this.state.fname !=='' && this.state.lname !=='' && this.state.email !==''?false:true} className={"submit-btn mb-3"} style={this.state.fname !=='' && this.state.lname!=='' && this.state.email !=='' ?btnStyle:{}}>
                        Continue 
                      </button>
                  </div>
                 </>
                 )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                
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
  const {isLoading, successMsg, errorMsg, isValid, user_id, token} = state.auth;
  return {
    message,
    isLoading,
    successMsg,
    errorMsg,
    isValid,
    user_id,
    token
  };
}

export default connect(mapStateToProps)(PersonalDetails);
