import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closePasswordModel } from "../actions/model";
import { updatePassword } from "../actions/user";
import { Modal } from "react-bootstrap"

class ChangePassword extends Component {

    constructor() {
        super()
        this.state = {
          old_password: "",
          new_password: "",
          confirm_password: "",
          successful: false,
          isDisabled: true,
          isValid: true,
          message: '',
        }
        
        this.handleUpdPwd = this.handleUpdPwd.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.password_show !== this.props.password_show) 
      {
        this.setState({ isValid: true, message: '',old_password:'', new_password:'', confirm_password:''});
      }
    }

    handleChange = (e) => {
      e.persist();
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

    handleCPwd = (e) => {
      this.setState({ message: '', isValid: true});
      if(e.target.value == this.state.new_password)
      {
          this.setState({confirm_password : e.target.value});
          this.handleChange = this.handleChange.bind(this);
      }
      else
      {
          this.setState({confirm_password : e.target.value});
          this.setState({message: 'New password and confirm password must be same', isValid: false});
      }
       
      }

      handleUpdPwd(e) {
        e.preventDefault();
        const { sfid } = this.props;
        this.setState({
          successful: false,
        });
       
        let givenData = {
          existingPassword: this.state.old_password,
          newPassword: this.state.new_password,
          user_sfid: sfid
        }
        this.props.dispatch(updatePassword(givenData));
        e.target.reset();
      }

    handleClose = () => {
        this.props.dispatch(closePasswordModel())
    }

    render() {
        const { isSuccess, userMessage, password_show, isLoading } = this.props;
        return (
            <>
            {/*Password Modal */}
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
            ):''}
            <Modal show={password_show} className="right myModal">
                    <form onSubmit={this.handleUpdPwd} className="ml-4">
                    <Modal.Header>
                        <button type="button" className="close" 
                        onClick={this.handleClose}
                        >
                         <i className="fas fa-close fa-sm fa-fw mr-3" /> 
                        </button>
                        <h4 className="modal-title fz24">Change Password</h4>
                    </Modal.Header>
                    <Modal.Body>
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
                       {userMessage!="" && isSuccess == 1 && (
                        <div className="form-group">
                          <div className={"alert alert-success" } role="alert">
                            {userMessage}
                          </div>
                        </div>
                      )}
                        <div className="row">
                        <div className="col-sm-12 form-group">
                            <label className="form-label">
                           Old Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Old Password"
                            name="old_password"
                            value={this.state.old_password}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label  className="form-label">
                            New Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            name="new_password"
                            value={this.state.new_password}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label  className="form-label">
                            Confirm new password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                            name="confirm_password"
                            value={this.state.confirm_password}
                            onChange={this.handleCPwd}
                            />
                        </div>
                       
                        </div>   
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                        type="button"
                        className="btn btn-default_ subBtn"
                        onClick={this.handleClose}
                        >
                        Cancel
                        </button>
                        <button  
                        disabled={this.state.old_password !='' && this.state.new_password && this.state.confirm_password !='' && this.state.isValid ?false:true} type="submit" className="btn btn-default_ subBtn">
                        Save
                        </button>
                    </Modal.Footer>
                    </form>
            </Modal>
            {/*Password Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
  const { user_id, token, sfid, isLoading } = state.auth;
  const { message } = state.message;
  const { userMessage, isSuccess } = state.user;
  const { password_show } = state.model;
  return {
    user_id,
    token,
    sfid,
    message,
    userMessage,
    isSuccess,
    isLoading,
    password_show
  };
}

export default connect(mapStateToProps)(ChangePassword)