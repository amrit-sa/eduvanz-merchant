import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { Link } from 'react-router-dom';

class Success extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: "",
      successful: false,
      category: '',
      sub_category: '',
      timer:11
    };
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history } = this.props;
    history.push("/productdata");
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

  componentDidMount(){
    this.timer();
  }

  timer=()=>{
    this.setState({timer:11})
    let interval_id = setInterval(()=>{
      if(this.state.timer <= 1){
        clearInterval(interval_id);
        window.location.replace('/')
        // this.props.history.push('/')
      }
      this.setState({timer: this.state.timer-1})
    
    },1000);

  }

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleBack = () => {
    const { history } = this.props;
    history.push("/bankdetails");
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
          <title> Success </title>
        </Helmet>
        <section className="bg-black0">
          <div className="logo__"><img src="images/logo-stride.png" />
          </div>
          <div className="loginformthank">
            <div className="frame_">
              <img src="images/frame.png" alt="" className='img-fluid' />
            </div>
            <form className="thankyouform" >
              <div className="mt-1 pt-lg-3" >
                <h2 className="txt-center" >
                  <b >Thank You for</b>
                </h2>
                <h2 className="txt-center" >
                  <b>Choosing Stride!</b>
                </h2>

              </div>

              <div className="col-md-12 text-center pt-5 mt-lg-1">
                <p className="mr-t p-lg-0 px-3 balockfnt fntsizesub">
                  Congratulations! <br />You’re now our Merchant Partner!
                </p>
              </div>
              <div className="col-md-12 mr-t p-lg-0 px-3 text-center">
                <div className="span-fnt-sty  pb-lg-5 pt-lg-2 mt-n1">
                  Our team will get in touch with you in the next 24-48 hours. For any assistance, please reach out to us @ 022-4444 9999
                </div>
              </div>
              <div className="col-md-12 mr-t p-lg-0 px-3 text-center">
                <div className="mr-btn-sty dash-fnt-sty mt-n3">
                  <img src="images/icons/icon-ind.png" /> You will be
                  auto-redirected to the ‘Homepage’ in 00:{this.state.timer}
                </div>
                <Link
                  to="/home"

                  className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                >
                  <button className="submit-btn mt-n2">
                    Go to Homepage
                  </button>
                </Link>
              </div>
            </form>
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

export default connect(mapStateToProps)(Success);
