import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../actions/auth"; 
import Footer from "../common/footer";

class ProductDetails2 extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    this.state = {
      username:"",
      password:"",
      successful: false,
      category:'',
      sub_category:''
    };
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history } = this.props;
    history.push("/bankdetails");
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

  handleBack = () =>{
    const { history } = this.props;
    history.push("/productdetails");
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
                    <div className="col-md-6 padd-0">
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
                    <div className="col-md-12 mr-t p-lg-0 px-3 text-white">
                        <h1 className="titfnt">
                        Product <br />
                        Details
                        </h1>
                        <p className="col-md-7 mr-t p-lg-0 px-3 text-white">
                        What do you have in store for us?
                        </p>
                    </div>
                    <div className="col-md-12 mr-t login-img">
                        <img src="images/model.png" />
                    </div>
                    </div>
                </div>

                <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                    <div className="loginform">
                    <h4 className="mtext-105 cl2 txt-center p-b-30 form-title">
                        <img src="images/icons/login-title.png" /> Let’s get started
                    </h4>
                    <form onSubmit={this.handleRegister}>
                        <div className="row">
                        <div className="col-md-12 mr-btn-sty">
                            <h6>Category</h6>
                        </div>
                        <div className="col-md-10 mr-btn-sty">
                            <span className="spanitemsty">
                            Electronics <span className="lnr lnr-cross" />
                            </span>
                            <span className="spanitemanother">
                            Travel <span className="lnr lnr-cross" />
                            </span>
                        </div>
                        <div className="col-md-2">
                            <span className="lnr lnr-plus-circle plus-circle-sty" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12 mr-btn-sty">
                        <h6>Sub-category</h6>
                        </div>
                        <div className="col-md-12 bor8 m-b-20">
                        <select
                            className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15 selectdropsty"
                            id="exampleFormControlSelect1"
                            name="sub_category"
                            onChange={this.handleChange}
                        >
                            <option>Select sub-categories</option>
                            <option>Electronics</option>
                            <option>Travel</option>
                            <option>Education</option>
                            <option>Electronics</option>
                        </select>
                        </div>
                    </div>
                        <button type="submit" className="submit-btn mb-3 pointer">
                        Submit
                        </button>
                    </form>
                    {/* <div className="row margin-top-sty text-right">
                        <div className="col-md-10">
                        <a href className="getappsty">
                            Get our App <img src="images/icons/app-icon.png" />
                        </a>
                        </div>
                        <div className="col-md-2">
                        <a href className="getappsty">
                            Help <img src="images/icons/qustionmark.png" />
                        </a>
                        </div>
                    </div> */}
                    </div>
                    <Footer />
                </div>
                </div>
            </div>
            </section>

    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(ProductDetails2);
