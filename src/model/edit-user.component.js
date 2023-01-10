import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeEditUser } from "../actions/model"
import { registerNewUser, getUsers, update_user_details, getUsers_list } from "../actions/user"


const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

class EditUserModel extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      mobileNumber: "",
      role: "",
      department: '',
      owner: "",
      active_status: false,
      successful: false,
      isDisabled: true,
      isValid: true,
      message: '',
      isEmail: false,
      isEmailvalid: true,
      isError: false,
      errormsg: '',
      isErrorName: false,
      errorname: '',
      selectedUser: {}
    };
  }


  closeEditUser = () => {
    this.handleClear();
    this.props.dispatch(closeEditUser())
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.edituser_show !== this.props.edituser_show) {
      this.setState(this.state);
    }
    const { singleUser } = this.props

    if (Object.keys(this.state.selectedUser).length == 0 && Object.keys(singleUser).length > 0 || (JSON.stringify(this.state.selectedUser) != JSON.stringify(singleUser))) {
      // if(Object.keys(singleUser).length >0 && prevState.selectedUser !== this.state.selectedUser){
      // if (Object.keys(this.state.selectedUser).length == 0  && Object.keys(singleUser).length >0) {
      this.setState({

        selectedUser: singleUser,
        mobileNumber: singleUser && singleUser.mobile__c ? singleUser.mobile__c : '',
        username: singleUser && singleUser.name__c ? singleUser.name__c : '',
        role: singleUser && singleUser.select_user__c ? singleUser.select_user__c : '',
        email: singleUser && singleUser.email__c ? singleUser.email__c : '',
        owner: singleUser && singleUser.sfid ? singleUser.sfid : '',
        active_status: singleUser.activate__c ? singleUser.activate__c : false,
        department: singleUser && singleUser.department__c ? singleUser.department__c : '',

      });
    }
  }

  handleChange = (e) => {
    e.persist();
    if (e.target.name == 'username') {
      var hasNumber = /\d/;
      if (!hasNumber.test(e.target.value)) {

        this.setState(
          { [e.target.name]: e.target.value }
        );

        this.setState(
          { isErrorName: false, errorname: "" }
        );
        if (e.target.value.length <= 1) {
          this.setState(
            { isErrorName: true, errorname: "Please enter valid name with atleast 2 characters" }
          );
        }

      }
      else {
        this.setState(
          { isErrorName: true, errorname: "Numbers are not allowed" }
        );
      }
    } else {

      this.setState(
        { [e.target.name]: e.target.value }
      );
    }
  }


  handleEmail = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    let str = event.target.value
    if (str && str.length > 2) {
      this.setState({ isEmail: true })
      this.ValidateEmail(str)
    } else {
      this.setState({ isEmail: false })
    }
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



  handleMobile = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    const reg = /^[0]?[6789]\d{9}$/;
    if (e.target.value !== '') {
      if (!pattern.test(e.target.value)) {
        document.getElementById('mobileNumber').value = '';
        // this.setState({ mobileNumber: '' });
        this.setState({ isValid: false });
        // this.setState({ message: "Please enter only number." });
      }
      //  else if (e.target.value.length != 10) {
      //   this.setState({ isValid: false });
      //   this.setState({ message: "Please enter valid phone number." });
      // } 
      else {
        if (reg.test(e.target.value)) {
          this.setState({ isValid: true, message: "", mobileNumber: e.target.value });
          console.log(this.state.mobileNumber);
        } else {
          this.setState({ isValid: false, message: "Please enter valid mobile number.", mobileNumber: e.target.value });
          console.log(this.state.mobileNumber);
        }
      }
    } else {
      this.setState({ isValid: true, message: "", mobileNumber: '' });
    }
  }


  handleCheckBoxChange = (e) => {
    e.persist();
    if (e.target.checked) {
      this.setState(
        { [e.target.name]: true }
      );
    }
    else {
      this.setState(
        { [e.target.name]: false }
      );
    }

  }



  handleRegister(e) {
    e.preventDefault();


    this.setState({
      successful: false,
    });

    let givenData = {};

    if (this.props.singleUser.sfid === null) {
      givenData = {
        mobileNumber: this.state.mobileNumber,
        username: this.state.username,
        role: this.state.role,
        department: this.state.department,
        email: this.state.email,
        owner: localStorage.getItem('sfid'),
        active_status: this.state.active_status,
        id: this.props.singleUser.id
      }
    }
    else {

      givenData = {
        mobileNumber: this.state.mobileNumber,
        username: this.state.username,
        role: this.state.role,
        department: this.state.department,
        email: this.state.email,
        owner: localStorage.getItem('sfid'),
        active_status: this.state.active_status,
        sfid: this.props.singleUser.sfid
      }
    }

    this.props
      .dispatch(
        update_user_details(givenData)
      )
      .then((response) => {
        if (response.responseCode && response.responseCode == 200) {
          if (response.status == 'success') {

            this.closeEditUser();
            const { user_id } = this.props;
            let data = {
              id: user_id,
            }
            this.props.dispatch(getUsers_list(localStorage.getItem('sfid')));
          } 
        }

        if (response.status == 'error') {

          this.setState({ isError: true, errormsg: response.message })

        }

      })
      .catch((err) => {
        this.setState({ isError: true, errormsg: err.message })
      });

  }


  handleClear = () => {
    console.log('clear')
    this.setState({
      username: "",
      email: "",
      password: "",
      mobileNumber: "",
      role: "",
      department: '',
      owner: "",
      active_status: false,
      successful: false,
      isDisabled: true,
      isValid: true,
      message: '',
      isEmail: false,
      isEmailvalid: true,
      isError: false,
      errormsg: '',
      isErrorName: false,
      errorname: '',
      selectedUser: {}
    })
  }

  render() {
    const { edituser_show, user_id, singleUser } = this.props;
    this.state.owner = user_id;
    console.log("usr", singleUser);

    return (
      <>
        <Modal show={edituser_show} className="adduser" >
          <Modal.Header>
            <div className='d-flex justify-content-between align-items-center w-100 pt-2'>
              <div className='adduser_header d-flex align-items-center'>
                <button type="button" className="adduser close" onClick={this.closeEditUser}> <i className="fas fa-times"></i> </button>
                <h4 className='ml-3'>Edit User</h4>
              </div>
              <div>
                <div className="switch_btn d-flex" style={{ color: `${this.state.active_status == true ? '#094588' : ''}` }}>
                  <label className="switch mr-3">
                    <input type="checkbox"
                      onChange={this.handleCheckBoxChange}
                      name="active_status" value="1"
                      checked={this.state.active_status}
                    />
                    <span className="slider round"></span>
                  </label> {this.state.active_status == true ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </Modal.Header>
          <form onSubmit={this.handleRegister}>
            <Modal.Body>
              <div className="row justify-content-center mb-2">
                <div className="col-sm-9 form-group">
                  <label className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={this.state.username}
                    className="form-control"
                    placeholder="Enter User's Full Name"
                    name="username"
                    onChange={this.handleChange}
                  />
                  {this.state.isErrorName && this.state.errorname != '' && (
                    <span style={{ color: "red" }} className="text-left">
                      {this.state.errorname}
                    </span>
                  )}
                </div>
              </div>

              <div className="row justify-content-center mb-2">
                <div className="col-sm-9 form-group">
                  <label className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={this.state.mobileNumber}
                    className="form-control"
                    placeholder="0000 000 000"
                    name="mobileNumber"
                    id="mobileNumber"
                    maxLength={"10"}
                    onChange={this.handleMobile}
                  />
                  {this.state.isValid == false && this.state.message != '' && (
                    <span style={{ color: "red" }} className="text-left">
                      {this.state.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row justify-content-center mb-2">
                <div className="col-sm-9 form-group">
                  <label className="form-label">
                    Email ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Start typing..."
                    name="email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                  {this.state.isEmail && !this.state.isEmailvalid && (
                    <span style={{ color: "red" }} className="text-left">
                      Invalid email ! Please enter a valid email address.
                    </span>
                  )}
                </div>

              </div>

              <div className="row justify-content-center mb-2">
                <div className="col-sm-9 form-group">
                  <label className="form-label">
                    Role(s)
                  </label>
                  <select
                    name="role"
                    id=""
                    className="form-control"
                    onChange={this.handleChange}
                  >
                    <option value=''>Select atleast one role</option>
                    <option selected={this.state.selectedUser.select_user__c == 'Admin'} value="Admin">Admin</option>
                    <option selected={this.state.selectedUser.select_user__c == 'Other users'} value="Other users">Other User</option>
                  </select>
                </div>

              </div>

              <div className="row justify-content-center mb-2">
                <div className="col-sm-9 form-group">
                  <label className="form-label">
                    Department(s)
                  </label>
                  <select
                    name="department"
                    id=""
                    className="form-control"
                    onChange={this.handleChange}
                  >
                    <option value=''>Select atleast one department</option>
                    <option selected={this.state.selectedUser.department__c == 'Operations'} value="Operations">Operations</option>
                    <option selected={this.state.selectedUser.department__c == 'Sales'} value="Sales">Sales</option>
                    <option selected={this.state.selectedUser.department__c == 'Credit'} value="Credit">Credit</option>
                    <option selected={this.state.selectedUser.department__c == 'Accounts'} value="Accounts">Accounts</option>
                  </select>
                </div>

                {
                  this.state.isError &&
                  <span style={{ color: "red" }} className="text-left">
                    {this.state.errormsg}
                  </span>
                }
              </div>

              <div className="row justify-content-center pt-3 mb-4">
                <Button
                  type="submit"
                  className="btn btn-default_ subBtn"
                  disabled={this.state.isErrorName == false && this.state.username != '' && this.state.role != '' && this.state.department != '' && this.state.email != '' && this.state.isEmailvalid && this.state.mobileNumber != '' && this.state.isValid ? false : true}

                >
                  Save
                </Button>
              </div>
            </Modal.Body>
          </form>
        </Modal>
      </>
    )
  }

}

function mapStateToProps(state) {
  const { edituser_show } = state.model;
  const { user_id } = state.auth;
  const { singleUser } = state.user;
  return {
    edituser_show,
    user_id,
    singleUser
  };
}


export default connect(mapStateToProps)(EditUserModel)