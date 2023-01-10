import React, { Component } from "react";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { register } from "../actions/auth"; 
import Footer from "../common/footer";

class FindBank extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    this.state = {
      username:"",
      password:"",
      successful: false,
      bank:'',
      acc_no:'',
      acc_name:'',
      ifsc:'',
      sub_category:''
    };
  }


  componentDidMount()
  {
   

    $('.labelFocus input').change(function(){
      var $this = $(this);
      if($this.val())
          $this.addClass('filled')
      else
          $this.removeClass('filled')
      })
  }


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history } = this.props;
    history.push("/success");
    window.location.reload();
    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.email, this.state.password)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  handleChange = (event) => {
      event.persist();
      this.setState({[event.target.name]: event.target.value});
  }

  handlebank = (value) =>{
      this.setState({ bank:value});
  }

  handleBack = () =>{
    const { history } = this.props;
    history.push("/productdata");
   // window.location.reload();
  }

  findBank = () =>{
    const { history } = this.props;
    history.push("/productdata");
   // window.location.reload();
  }

  render() {
    const { message } = this.props;
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
                    <div className="col-md-6">
                        <a
                        href
                        onClick={this.handleBack}
                        className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                        >
                        <i className="lnr lnr-arrow-left-circle right-circle" />{" "}
                        <span className="backbtn-sty">Back</span>
                        </a>
                    </div>
                    <div className="col-md-12 mr-t p-lg-0 px-3">
                        <h6 className="text-white">Step 2</h6>
                    </div>
                    <div className="col-md-12 mr-t p-lg-0 px-3">
                        <h1 className="titfnt text-white">
                        Bank <br />
                        Details
                        </h1>
                        <p className="col-md-7 mr-t p-0 text-white">
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
                    <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                    <h4 className="mtext-114">
                    <img src="images/icons/icon4_w.png" /> Let’s get started
                    </h4>
                  </div>




                    <form onSubmit={this.handleRegister}>

                    <div className="bor8 m-b-20 how-pos4-parent">
                        <div className="input-group labelFocus" style={{flexWrap: 'initial'}}>
                            <input
                            type="text"
                            name="bank"
                            className="search-query stext-111 cl2 plh3 size-116 p-l-15 p-r-15"
                            placeholder=""
                            onChange={this.handleChange}
                            />

                            <span>Bank Name</span>


                            <span className="input-group-btn">
                            <button
                                className="btn btn-danger-search"
                                type="button"
                            >
                                <span className="lnr lnr-magnifier" />
                            </button>
                            </span>
                        </div>
                        </div>
                        <div className="bor8 m-b-20 how-pos4-parent">
                        <div className="input-group labelFocus" style={{flexWrap: 'initial'}}>

                        <input
                            className="stext-111 cl2 plh3 size-116 p-r-15"
                            type="text"
                            name="acc_no"
                            placeholder=""
                            onChange={this.handleChange}
                        />
                        <span>Enter account number</span>
                        </div>
                        </div>
                        <div className="bor8 m-b-20 how-pos4-parent">
                        <div className="input-group  labelFocus" style={{flexWrap: 'initial'}}>
                        <input
                            className="stext-111 cl2 plh3 size-116 p-r-15"
                            type="text"
                            name="acc_name"
                            placeholder="Account holder name"
                            onChange={this.handleChange}
                        />
                        </div>
                        </div>
                        <div className="bor8 m-b-20 how-pos4-parent">
                        <div className="input-group  labelFocus" style={{flexWrap: 'initial'}}>
                            <input
                            type="text"
                            name="ifsc"
                            className="search-query stext-111 cl2 plh3 size-116 p-r-15"
                            placeholder=""
                            onChange={this.handleChange}
                            />
                            <span>IFSC</span>
                            <span className="input-group-btn">
                            <button
                                className="btn btn-danger-search"
                                type="button"
                            >
                                <span className="lnr lnr-magnifier" />
                            </button>
                            </span>
                        </div>
                        </div>
                        <p className="form-p-sty">
                        We will deposit ₹ 1 to above bank account for customer
                        verification.
                        </p>
                        <button 
                        className="submit-btn mb-3"
                        type="submit"
                        disabled={this.state.bank !=='' && this.state.acc_name!=='' && this.state.acc_no!=='' && this.state.ifsc !=='' ?false:true}
                        style={this.state.bank !=='' && this.state.acc_name!=='' && this.state.acc_no!=='' && this.state.ifsc !=='' ?btnStyle:{}}
                        >
                        Submit
                        </button>
                        <div className="col-md-12 text-center mr-btn-sty">
                            <Link to="/credentails" className="font-weight-bold">I’ll do this later</Link>
                        {/* <a href="#" className="font-weight-bold">I’ll do this later</a> */}
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
  return {
    message,
  };
}

export default connect(mapStateToProps)(FindBank);
