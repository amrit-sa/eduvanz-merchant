import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { changePassword, clearMessage } from "../actions/auth"; 
import Footer from "../common/footer";

class Createpassword extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username:"",
      passType:'password',
      cpassType:'password',
      passError:'',
      cpassError:'',
      email: localStorage.getItem('email'),
      password:"",
      cpassword:"",
      successful: false,
      isDisabled: true,
    };
  }

  componentDidMount()
  {
    this.handleClearMeaage();

    $('.labelFocus input').change(function(){
      var $this = $(this);
      if($this.val())
          $this.addClass('filled')
      else
          $this.removeClass('filled')
      })
     
  }

  handleClearMeaage = () =>{
    this.props.dispatch(clearMessage());
  }

  handleRegister(e) {
    e.preventDefault();
    this.form.validateAll();
    const { history, user_id } = this.props;
    let data = {
      newPassword: this.state.password,
      confirmPassword: this.state.cpassword,
      id: parseInt(user_id)
    }
      this.props
        .dispatch(
          changePassword(data)
        )
        .then(() => {
          history.push("/productdetails");
       //   window.location.reload();
        })
        .catch(() => {
         
        });
  }

  handleNewpassword = (elament) => {
      this.setState({ password:elament.target.value});
      console.log("Enter in handle password");
      if(elament.target.value === ""){
        this.setState({ passError: ''});
      }
     else if(elament.target.value.search(/[0-9]/) < 0){
         this.setState({passError:'Your password must contain at least one number'})
      }
      else if(elament.target.value.search(/[!@#$%^&*]/) < 0){
        this.setState({passError:'Your password must contain at least one special charactor'})
      }
    else if(elament.target.value.length < 8 || elament.target.value.length > 40)
    {
        this.setState({ passError: 'The password must be between 8 and 40 characters.'});
    }else{
        this.setState({ passError: ''});
    }
  };

  handleCpassword = (elament) => {
    this.setState({ cpassword:elament.target.value});
    if(elament.target.value !== this.state.password)
    {
        this.setState({ cpassError: 'password doesnot match'});
    }else{
        this.setState({ cpassError: ''});
    }

  }

  handleVisibility = (value) => {
        if(value ===1)
        {
            if(this.state.passType ==='password')
            {
                this.setState({ passType: 'text'});
            }else{
                this.setState({ passType: 'password'});
            }
        }else{
            if(this.state.cpassType ==='password')
            {
                this.setState({ cpassType: 'text'});
            }else{
                this.setState({ cpassType: 'password'});
            }
        }
  }

  render() {
    const { message, isLoading, user_id, user, authMessage, isSuccess } = this.props;
    if (!user_id) {
     // return <Redirect to="/login" />;
    }
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }

    return (
      <>
          <Helmet>
              <title>Create Password</title>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
            ):''}
          <section className="bg0 login">
            <div className="container-fluid container-zero" style={{paddingLeft:'0px'}}>
              <div className="flex-w flex-tr">
                <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                  {/* <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">eduvanz.</h4> */}
                  <h4 className="mtext-105 cl2 txt-left pb-1 pb-lg-5">
                    {/* eduvanz. */}
                    <img src="images/logo-stride.png" />
                    </h4>
                  <div className="row">
                    <div className="col-md-12 mr-t p-lg-0 px-3">
                        <h5 style={{fontWeight: '700', color:"#fff"}}>STEP 1</h5>
                      <h1 className="titfnt text-white">
                      Merchant<br /> Details
                      </h1>
                    </div>
                    <div className="col-md-12 mr-t p-lg-0 px-3">
                      <p className="col-md-7 mr-t p-0 text-white">
                      We would like to know more about you.
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
                        <img src="images/icons/key-icon.svg" /> Create Secure Access
                        </h4>
                    </div>


                    <Form ref={(c) => {
                            this.form = c;
                          }}
                          onSubmit={this.handleRegister}
                    >
                     
                        <div className="bor8 m-b-20 how-pos4-parent">
                        <span className="fs-11">Email ID</span>
                            <input
                            className="stext-111 cl2 plh3 size-116 p-r-15"
                            type="text"
                            name="email"
                            value={this.state.email}
                            disabled={true}
                            readOnly
                            style={{height:'40px'}}
                            />
                             
                        </div>
                    

                        {/* <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type={this.state.passType}
                                name="email"
                                placeholder=""
                                style={{width:'89%'}}
                            />
                            <span>Email ID</span>
                          </div>
                          
                        </div> */}


                        <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type={this.state.passType}
                                name="password"
                                placeholder=""
                                onChange={this.handleNewpassword}
                                style={{width:'89%'}}
                            />
                            <span>Enter Password</span>
                            <div className="input-group-addon input-group-addon-sty" onClick={()=>this.handleVisibility(1)}>
                                <i style={{fontSize:'24px'}} className={this.state.passType === 'password'?'fa fa-eye-slash':'fa fa-eye'} aria-hidden="true" />
                            </div>
                            </div>
                          
                            <div className="info_">
                            <button type="button" 
                                  className="" 
                                  data-toggle="tooltip" 
                                  data-placement="top" 
                                  title="Password must be atleast 8 letters contain a special character and a number"
                                >
                                  <img src="images/icons/icon-ind2.png" />
                              </button>
                              
                            </div>
                        </div>
                        {this.state.passError !=''?(
                                 <span style={{color:'#EA4335'}}>
                                 {this.state.passError}!
                           </span>
                            ):""}
                        <div className="bor8 m-b-20 how-pos4-parent">
                            <div className="input-group show_hide_password1 labelFocus">
                            <input
                                className="stext-111 cl2 plh3 size-116 p-r-15"
                                type={this.state.cpassType}
                                name="cpassword"
                                placeholder=""
                                onChange={this.handleCpassword}
                                style={{width:'89%'}}
                            />
                            <span>Confirm Password</span>
                            <div className="input-group-addon input-group-addon-sty" onClick={()=>this.handleVisibility(2)}>
                               <i style={{fontSize:'24px'}} className={this.state.cpassType === 'password'?'fa fa-eye-slash':'fa fa-eye'} aria-hidden="true" />
                            </div>
                            </div>
                           
                        </div>
                        {this.state.cpassError !=''?(
                                <span style={{color:'#EA4335'}}>
                                    {this.state.cpassError}!
                              </span>
                            ):""}
                        <div className="pb-4">
                        <button type="submit" disabled={this.state.cpassword !=='' && this.state.password!='' && (this.state.cpassword === this.state.password) ?false:true} className={"submit-btn mb-3"} style={this.state.cpassword !=='' && this.state.password!='' && (this.state.cpassword === this.state.password) ?btnStyle:{}}>
                        Submit 
                      </button>
                        {message || (authMessage && isSuccess ===0) && (
                        <div className="form-group">
                          <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                            {message?message:authMessage?authMessage:''}
                          </div>
                        </div>
                      )}
                      <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                          this.checkBtn = c;
                        }}
                      />
                    </div>

                      {/* <div className="row mb-4" style={{justifyContent: 'center', textAlign: 'center'}}>
                        <div className="col-md-6">
                            <p className="form-p-sty">
                              <Link to="/home" className="font-weight-bold">I’ll do this later</Link>
                            </p>
                        </div>
                      </div> */}
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
  const { 
    isSuccess,
    authMessage,
    user_id,
    isLoading,
    user
  } = state.auth;
  return {
    message,
    isSuccess,
    authMessage,
    user_id,
    isLoading,
    user
  };
}

export default connect(mapStateToProps)(Createpassword);
