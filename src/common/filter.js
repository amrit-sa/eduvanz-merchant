import React, { Component } from 'react';
import { history } from '../helpers/history';
import { connect } from "react-redux"; 
import { Link } from 'react-router-dom';

class Filter extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
          old_password: "",
          new_password: "",
          confirm_password: "",
          first_name:"",
          last_name:"",
          email:"",
          mobile_number:"",
          successful: false,
          isDisabled: true,
          isValid: true,
          message: '',
        };
    }
    
   componentDidMount()
   {
    const { user_id } = this.props;
   }

    handleChange = (e) => {
        e.persist();
        this.setState(
          {[e.target.name]: e.target.value}
        );
    }

    handleLogOut = () =>{
        localStorage.clear();
        history.push("/login");
        window.location.reload();
    }

    pageTop()
    {
        window.scrollTo(0, 0)
    }

    render(){
        const { isSuccess, userMessage } = this.props;
        return(
            <>
            {/* Scroll to Top Button*/}
            <a onClick={this.pageTop}  style={{cursor:'pointer'}} className="scroll-to-top rounded" href={void(0)}>
                <i className="fas fa-angle-up" />
            </a>
            {/* Logout Modal*/}
            <div
                className="modal fade"
                id="logoutModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fz24" id="exampleModalLabel">
                            Ready to Leave?
                        </h5>
                        <button
                            className="close"
                            type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure to Logout?
                    </div>
                    <div className="modal-footer">
                    <button
                        className="btn btn-secondary"
                        type="button"
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button onClick={this.handleLogOut} className="btn btn-primary">
                        Logout
                    </button>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Reports Start*/}
            <div id="reportDownloads" className="slideRight">
                <div className="slideRightContent">
                <div className="srContent">
                    <form>
                    <div className="buttonsBottom">
                        <div className="srHeader align-items-center">
                        <button type="button" className="close closereport">
                            ×
                        </button>
                        <h4 className="modal-title fz20">Reports</h4>
                        </div>
                        <div className="srBody pt-5">
                        <h3>Download Reports</h3>
                        <div className="col-md-12 pb-5">
                            <div className="row align-items-center text-center">
                            <div className="col-md-6">
                                <button
                                type="button"
                                className="btn btn-primary btn-bg bg-xls"
                                >
                                Download
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button
                                type="button"
                                className="btn btn-primary btn-bg bg-pdf"
                                >
                                Download
                                </button>
                            </div>
                            </div>
                        </div>
                        <h3>
                            Email Report{" "}
                            <span className="nav_h3">
                            <img src="img/icon_Settings.svg" alt="settings" />
                            </span>
                        </h3>
                        <ul className="customInputsradio approvalBased">
                            <li>
                            <input
                                type="checkbox"
                                defaultValue="mailSelection"
                                name="radio"
                                id="eReport"
                                defaultChecked="checked"
                            />
                            <label htmlFor="eReport">remesh.patel@gmail.com</label>
                            </li>
                        </ul>
                        <p className="addMore pb-4">Add More</p>
                        <h3>Email Report to Groups</h3>
                        <ul className="customInputsradio approvalBased">
                            <li>
                            <input
                                type="checkbox"
                                defaultValue="emailGroup"
                                name="radio"
                                id="stackholders"
                                defaultChecked="checked"
                            />
                            <label htmlFor="stackholders">Stackholders</label>
                            </li>
                            <li>
                            <input
                                type="checkbox"
                                defaultValue="emailGroup"
                                name="radio"
                                id="management"
                                defaultChecked="checked"
                            />
                            <label htmlFor="management">Management</label>
                            </li>
                            <li>
                            <input
                                type="checkbox"
                                defaultValue="emailGroup"
                                name="radio"
                                id="accounts"
                                defaultChecked="checked"
                            />
                            <label htmlFor="accounts">Accounts</label>
                            </li>
                        </ul>
                        <p className="addMore">Add More</p>
                        </div>
                        <div className="srFooter">
                        <button type="button" className="closereport">
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary btn-dark">
                            Send email
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            {/*Reports End */}
          </>
        );
    }
}
function mapStateToProps(state) {
    const { user_id, token } = state.auth;
    const { message } = state.message;
    const { userMessage, isSuccess } = state.user;
    return {
      user_id,
      token,
      message,
      userMessage,
      isSuccess
    };
  }

export default connect(mapStateToProps)(Filter);