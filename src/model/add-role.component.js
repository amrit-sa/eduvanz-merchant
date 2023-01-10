import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeAddRole } from "../actions/model"
import { addRole, getRole } from "../actions/user"

const initialState = {
    isFrontUploading: false,
    isBackUploading: false,
    isSuccess: '',
    successMsg: '',
    leads: '',
    selected: '',
    active_status: 0,
    role_name: '',
    dashboard_create: 0,
    dashboard_read: 0,
    dashboard_update: 0,
    leads_create: 0,
    leads_read: 0,
    leads_update: 0,
    settlements_create: 0,
    settlements_read: 0,
    settlements_update: 0,
    products_read: 0,
    products_create: 0,
    products_update: 0,
    settings_read: 0,
    settings_create: 0,
    settings_update: 0,
}

class AddRoleModel extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleAddRole = this.handleAddRole.bind(this);
    }

    closeAddRole = () => {
        this.props.dispatch(closeAddRole())
    }

    componentDidUpdate(prevProps){
        if(prevProps.addrole_show !== this.props.addrole_show)
        {
            this.setState(initialState);
        }
    }

    handleChange = (e) => {
        e.persist();
        this.setState(
          {[e.target.name]: e.target.value}
        );
    }
    
    handleCheckBoxChange = (e) => {
      e.persist();
      if(e.target.checked) {
        this.setState(
          {[e.target.name]: 1}
        );
      }
      else {
        this.setState(
          {[e.target.name]: 0}
        );
      }
      
  }

  handleAddRole(e) {
    e.preventDefault();
    const { user_id } = this.props;
    let givenData = {
        active_status: this.state.active_status,
        role_name: this.state.role_name,
        dashboard_create: this.state.dashboard_create,
        dashboard_read: this.state.dashboard_read,
        dashboard_update: this.state.dashboard_update,
        leads_create: this.state.leads_create,
        leads_read: this.state.leads_read,
        leads_update: this.state.leads_update,
        settlements_create: this.state.settlements_create,
        settlements_read: this.state.settlements_read,
        settlements_update: this.state.settlements_update,
        products_read: this.state.products_read,
        products_create: this.state.products_create,
        products_update: this.state.products_update,
        settings_read: this.state.settings_read,
        settings_create: this.state.settings_create,
        settings_update: this.state.settings_update,
        owner_id: user_id,
        createdby_id : user_id
    }
      this.props
        .dispatch(
            addRole(givenData)
        )
        .then(() => {
          this.closeAddRole();
          let getData = {
              owner_id: user_id
          }
          this.props.dispatch(getRole(getData));
           
        })
        .catch(() => {
            //this.closeAddRole();
         
        });
    
  }

//   componentWillMount(){
//     const { user_id } = this.props;
//     let getData = {
//         owner_id: user_id
//     }
//     this.props.dispatch(getRole(getData));
//   }


    render() {
        const { addrole_show, user_id } = this.props
        console.log('model role',addrole_show)
        return (
            <>
                <Modal show={addrole_show} className="adduser">
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center w-100 pt-2'>
                            <div className='adduser_header d-flex align-items-center'>
            <button type="button" className="adduser close" onClick={this.closeAddRole}> <i className="fas fa-times"></i> </button>
                                <h4 className='ml-3'>Add New Role</h4>   
                            </div>
                            <div>
                                <div className="switch_btn d-flex">
                                    <label className="switch mr-3">
                                        <input type="checkbox" onChange={this.handleCheckBoxChange} name="active_status" value="1"/>
                                        <span className="slider round"></span>
                                    </label> Inactive
                                </div>
                            </div>
                        </div>
                    </Modal.Header>
                    <form onSubmit={this.handleAddRole}>
                    <Modal.Body>
                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9 form-group">
                            <label className="form-label">
                            Name
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Role Name"
                            name="role_name"
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center mb-2">
                        <div className="col-sm-9">
                        <div className='role_modules_table'>
                        <table className='w-100'>
                            <thead>
                            <tr>
                                <th>Modules</th>
                                <th>Create</th>
                                <th>Read</th>
                                <th>Update</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Dashboard</td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="dashboard_create" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="dashboard_read" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="dashboard_update" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Leads</td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="leads_create" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="leads_read" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="leads_update" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Settlements</td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settlements_create" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="Settlements_read" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settlements_update" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Products</td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="products_create" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="products_read" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="products_update" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Settings</td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settings_create" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settings_read" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settings_update" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Reports</td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settings_create" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settings_read" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div className='single_check'>
                                        <input type="checkbox" name="settings_update" onChange={this.handleCheckBoxChange} value="1"/>
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                        </div>
                    </div>
                   
                    
                        <div className="row justify-content-center pt-4">
                        <Button 
                         type="submit"
                        className="btn btn-default_ subBtn"
                        disabled={this.state.role_name ? false : true}
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
    const { addrole_show } = state.model;
    const { user_id, sfid } = state.auth;
    return {
        addrole_show,
        user_id,
        sfid,
    };
  }


export default connect(mapStateToProps)(AddRoleModel)