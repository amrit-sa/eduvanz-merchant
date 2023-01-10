import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModel } from "../actions/model";
import { getUserProfile } from "../actions/user";
import { updateUserProfile } from "../actions/user";

class Profile extends Component {

    constructor() {
        super()
        this.state = {
          old_password: "",
          new_password: "",
          confirm_password: "",
          first_name:"",
          last_name:"",
          email:"",
          mobile_number: "",
          successful: false,
          isDisabled: true,
          isValid: true,
          message: '',
          pin_code: '',
        }

      this.handleUpdProfile = this.handleUpdProfile.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount()
    {
      
    }

    componentDidUpdate(prevProps) {
      const { user_id } = this.props;
      let userData = {
        user_sfid: localStorage.getItem('sfid')
      }
      if (prevProps.profile_show !== this.props.profile_show) {
        this.props.dispatch(getUserProfile(userData))
        .then((response) => {
          if(response.responseCode !== 500){
            this.setState({
              first_name : response.first_name?response.first_name:'',
              last_name : response.last_name?response.last_name:'',
              email : response.email?response.email:'',
              mobile_number : response.mobile?parseInt(response.mobile):'',
              pin_code:'',
              message: '',
              isValid: ''
            });
          }
        })
      }
    }

    handleChange = (e) => {
      e.persist();
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

    handleMobile = (e) => {
      this.setState({ message: '', isValid: true});
      var pattern = new RegExp(/^[0-9\b]+$/);
      if(e.target.value !=='')
      {
          if(pattern.test(e.target.value))
          {
          if(e.target.value.length === 10)
          {
              this.setState({mobile_number : e.target.value});
          }else{
              this.setState({message: 'Enter valid Number', isValid: false});
          }
          }else{
              this.setState({mobile_number : '', message: 'Enter number only', isValid: false});
          }
      }
      }  

    handleUpdProfile(e) {
      e.preventDefault();
  
      const { user_id } = this.props;
      this.setState({
        successful: false,
      });
     
      let givenData = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.mobile_number,
        id: parseInt(user_id)
      }
  
        this.props
          .dispatch(
              updateUserProfile(givenData)
          );
    }

    closeModel = () => {
        this.props.dispatch(closeModel())
    }

    render() {
      const { isSuccess, userMessage } = this.props;
        return (
            <>
            {/*Profile Modal */}
            <div className="modal right fade myModal" id="profileModal" role="dialog">
                <div className="modal-dialog">
                {/* Modal content*/}
                <div className="modal-content">
                    <form onSubmit={this.handleUpdProfile}>
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                        <i className="fas fa-close fa-sm fa-fw mr-3" /> 
                        </button>
                        <h4 className="modal-title fz24">Profile</h4>
                    </div>
                    <div className="modal-body">
                    {this.state.message!="" && this.state.isValid==false && (
                        <div className="form-group">
                          <div className={"alert alert-danger" } role="alert">
                            {this.state.message}
                          </div>
                        </div>
                      )}
                    {userMessage!="" && isSuccess==0 && (
                        <div className="form-group">
                          <div className={"alert alert-danger" } role="alert">
                            {userMessage}
                          </div>
                        </div>
                      )}
                       {userMessage!="" && isSuccess==1 && (
                        <div className="form-group">
                          <div className={"alert alert-success" } role="alert">
                            {userMessage}
                          </div>
                        </div>
                      )}
                        <div className="row">
                        <div className="col-sm-6 form-group">
                            <label className="form-label">
                            First Name
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label  className="form-label">
                            Last Name
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label  className="form-label">
                            Email ID
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label  className="form-label">
                            Mobile Number
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="9999 999 999"
                            name="mobile_number"
                            value={this.state.mobile_number}
                            maxLength={"10"}
                            onChange={this.handleMobile}
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label  className="form-label">
                            Pin Code (Optional)
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter current resident pin code"
                            name="pin_code"
                            value={this.state.pin_code}
                            onChange={this.handleChange}
                            />
                        </div>
                        </div>
                       
                       
                    </div>
                    <div className="modal-footer">
                        <button
                        type="button"
                        className="btn btn-default close-btn"
                        data-dismiss="modal"
                        >
                        Cancel
                        </button>
                        <button type="submit" className="btn btn-success btn-create-ping">
                        Save
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            {/*Profile Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
  const { user_id, token } = state.auth;
  const { message } = state.message;
  const { userMessage, isSuccess } = state.user;
  const { profile_show } = state.model;
  return {
    user_id,
    token,
    message,
    userMessage,
    isSuccess,
    profile_show
  };
}

export default connect(mapStateToProps)(Profile)