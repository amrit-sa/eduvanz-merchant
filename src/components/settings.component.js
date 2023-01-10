import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BankDetails from "../common/bank-details";
import Sidebar from "../common/sidebar";
import { getUsers, getUser_data, getUsers_list, update_user_details, getRole, getRoleData, getUserData, updateMerchantProfile, getMerchantProfile, getCategory, getSubCategory, getAllSubCategory } from "../actions/user"
import moment from 'moment'
import {
  openAddUser,
  openAddRole,
  openEditRole,
  openEditUser
} from "../actions/model"
import { getRoles } from "@testing-library/react";
import Topbar from "../common/topbar";
import { Button } from "react-bootstrap";



class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profileEdit: false,
      created_date: "",
      merchant_name: "",
      brand_name: "",
      entity_name: "",
      website: "",
      pan_no: "",
      gst: "",
      cin: "",
      region_service: "",
      address: "",
      SubCatArr: [],
      isGst: true,
      isCin: true,
      failMessage: '',
      failMessageGst: '',
      failMessageCin: '',
      isValidPan: true,
      errorMsg: '',
      successMsg: '',
      isSuccess: '',
      failMessagePan: '',
      isPanValid: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    $('#sidebarToggleTop').click(function () {
      $("#accordionSidebar").toggleClass("open-close")
    })
    const { user_id, sfid } = this.props;
    let data = {
      owner: sfid,
    }
    // this.props.dispatch(getUsers(data));
    this.props.dispatch(getUsers_list(sfid))
    let getData = {
      owner_id: user_id
    }
    this.props.dispatch(getRole(getData));
    this.props.dispatch(getCategory());
    let mdata = {
      user_sfid: sfid
    }
    this.props.dispatch(getMerchantProfile(mdata)).then((response) => {
      if (response.status === "success") {
        let obj = response.accountDet;
        let bdata = obj && obj.brand;
        const addressDet = obj && obj.address ? obj.address : null
        const brandDet = obj && obj.brand ? obj.brand : null
        console.log("res", obj)
        console.log("bdata", bdata)
        this.setState({
          created_date: obj && obj.createddate ? obj.createddate : '',
          merchant_name: obj && obj.first_name__c ? obj.first_name__c : '',
          brand_name: obj && obj.brand_name__c ? obj.brand_name__c : '',
          entity_name: obj && obj.entity_name__c ? obj.entity_name__c : '',
          website: obj && obj.website ? obj.website : '',
          pan_no: obj && obj.pan_number__c ? obj.pan_number__c : '',
          gst: obj && obj.gstin__c ? obj.gstin__c : '',
          cin: obj && obj.cin_no__c ? obj.cin_no__c : '',
          //region_service:obj && obj.region_of_service__c?obj.region_of_service__c:'',
          //region_service:"Mumbai, Pune",
          region_service: obj && obj.billingcity ? obj.billingcity : '',
          address: addressDet && addressDet.address__c ? addressDet.address__c : '',
          communication_address__c: obj && obj.communication_address__c? obj.communication_address__c: ''
        });
      }
    });
  }

  handleChange = (e) => {
    console.log("res", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePanChange = (e) => {
    e.persist();
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/i;
    console.log(e.target.value);
    if (e.target.name == 'pan_no') {
      if (regex.test(e.target.value)) {
        this.setState({
          isPanValid: true,
          failMessagePan: '',
        })
      } else {
        this.setState({
          isPanValid: false,
          failMessagePan: 'Invalid Pan Number',
        })
      }
    }
    this.setState(
      { [e.target.name]: e.target.value }
    );
  }

  handleGSTAndCIN = (e) => {
    let regexCin = new RegExp(/^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/)
    let regexGst = new RegExp(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/);
    if (e.target.name == 'cin') {
      if (regexCin.test(e.target.value)) {
        this.setState({
          isCin: true,
          failMessageCin: '',
        })
      } else {
        this.setState({
          isCin: false,
          failMessageCin: 'Invalid CIN Number',
        })
      }
    } else if (e.target.name == 'gst') {
      if (regexGst.test(e.target.value)) {
        this.setState({
          isGst: true,
          failMessageGst: '',
        })
      } else {
        this.setState({
          isGst: false,
          failMessageGst: 'Invalid GST Number',
        })
      }
    }
    this.setState(
      { [e.target.name]: e.target.value }
    );
  }

  cateChange = (e) => {
    let data = {
      parent_id: e.target.value,
    }
    this.props.dispatch(getAllSubCategory(data)).then(res => {
      this.setState({ SubCatArr: res });
    });
  }

  chgProfile = () => {
    this.setState({ profileEdit: true });
    $('html, body').animate({
      scrollTop: $("#profileDiv").offset().top
    }, 1000);


  }

  openAddUser = () => {
    this.props.dispatch(openAddUser());
  }

  openAddRole = () => {
    this.props.dispatch(openAddRole());
  }

  openEditRole = (roleid) => {
    const { user_id } = this.props;
    let data = {
      owner_id: user_id,
      role_id: roleid
    }
    this.props.dispatch(getRoleData(data)).then((response) => {
      console.log("res", response);
      console.log("efe", response.data.roleDetail.role_name);
    });
    this.props.dispatch(openEditRole(roleid));
  }

  openEditUser = (usersid) => {
    const { user_id } = this.props;
    let data = {
      owner_id: user_id,
      id: usersid
    }
    this.props.dispatch(getUser_data(usersid)).then((response) => {
      // this.props.dispatch(getUserData(data)).then((response) => {

    });
    this.props.dispatch(openEditUser(usersid));
  }

  handleRegister = (e) => {
    e.preventDefault();
    const { sfid } = this.props
    let obj = {
      user_sfid: sfid,
      first_name: this.state.merchant_name,
      brand_name: this.state.brand_name,
      entity_name: this.state.entity_name,
      website: this.state.website,
      pan_no: this.state.pan_no,
      gst: this.state.gst,
      cin: this.state.cin,
      address: this.state.address,
      communication_address__c: this.state.communication_address__c,
      region: this.state.region_service
    }



    console.log("website------->", this.state.website);
    console.log("obj------->", obj);
    this.props.dispatch(updateMerchantProfile(obj)).then((response) => {
      if (response && response.status && response.status == "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  }


  handleUpdateProfile = (e) => {
    e.preventDefault();
    return;

    this.props.update_merchant_profile((data) => {

    })

  }


  handleActive_status = (e, id) => {
    const { users } = this.props;
    e.persist();

    const oneuser = users.find((item) => {
      return item.id === id
    });

    let active_status = false;
    if (e.target.checked) {
      active_status = true;
    }
    let givenData = {}
    // console.log(oneuser, 'oneuser')
    if (oneuser.sfid === null) {
      givenData = {
        mobileNumber: oneuser.mobile__c,
        username: oneuser.name__c,
        role: oneuser.select_user__c,
        department: oneuser.department__c,
        email: oneuser.email__c,
        owner: localStorage.getItem('sfid'),
        active_status: active_status,
        id: oneuser.id
      }
    }
    else {

      givenData = {
        mobileNumber: oneuser.mobile__c,
        username: oneuser.name__c,
        role: oneuser.select_user__c,
        department: oneuser.department__c,
        email: oneuser.email__c,
        owner: localStorage.getItem('sfid'),
        active_status: active_status,
        sfid: oneuser.sfid
      }
    }

    this.props
      .dispatch(
        update_user_details(givenData)
      )
      .then(() => {
        const { sfid } = this.props;
        this.props.dispatch(getUsers_list(sfid))
      })
      .catch(() => {

      });

  }


  render() {
    const { user_id, users, roles, add_account, category, sub_cat, isLoading, merchant_banks } = this.props;
    const { SubCatArr } = this.state;
    const subBtn = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    if (!user_id) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Helmet>
          <title> Settings </title>
        </Helmet>
        {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        {/* {this.state.merchant_name == '' ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}  */}
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <Topbar
                dispatch={this.props.dispatch}
                title={"Settings"}
              /> */}

              <div className="container-fluid leads_header">
                <div className="row align-items-center">
                  <div className="col-md-7 d-flex flex-wrap">

                    <h1 className="mr-3 min-width150">
                      <button id="sidebarToggleTop" className="btn btn-link d-lg-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                      </button>{"Settings"}</h1>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row flex-lg-row flex-column-reverse">
                  <div className="col-md-8">
                    <div className="product_page_tabs_wrapper">
                      <nav className="product_page_tabs">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <a
                            className="nav-item nav-link active"
                            id="nav-profile-tab"
                            data-toggle="tab"
                            href="#nav-profile"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="true"
                          >Profile</a>
                          <a
                            className="nav-item nav-link"
                            id="nav-user-role-management-tab"
                            data-toggle="tab"
                            href="#nav-user-role-management"
                            role="tab"
                            aria-controls="nav-user-role-management"
                            aria-selected="false"
                          >User Role Management</a>
                          <a
                            className="nav-item nav-link"
                            id="nav-bank-details-tab"
                            data-toggle="tab"
                            href="#nav-bank-details"
                            role="tab"
                            aria-controls="nav-bank-details"
                            aria-selected="false"
                          > Bank Details</a>

                          <a
                            className="nav-item nav-link"
                            id="nav-API-keys-tab"
                            data-toggle="tab"
                            href="#nav-API-keys"
                            role="tab"
                            aria-controls="nav-API-keys"
                            aria-selected="false"
                          >API Keys</a>
                          {/* <a
                                className="nav-item nav-link"
                                id="nav-cat-tab"
                                data-toggle="tab"
                                href="#nav-cat-details"
                                role="tab"
                                aria-controls="nav-cat-details"
                                aria-selected="false"
                              > Manage Category</a> */}
                          {/* <a
                                className="nav-item nav-link"
                                id="nav-manage-session-tab"
                                data-toggle="tab"
                                href="#nav-manage-session"
                                role="tab"
                                aria-controls="nav-manage-session"
                                aria-selected="false"
                              >Manage Session</a>
                              <a
                                className="nav-item nav-link"
                                id="nav-API-keys-tab"
                                data-toggle="tab"
                                href="#nav-API-keys"
                                role="tab"
                                aria-controls="nav-API-keys"
                                aria-selected="false"
                              >API Keys</a> */}
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="tab-content pt-4" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                          >

                            <div className="col-lg-10 col-12 shadow p-4" id="profileDiv">

                              {!this.state.profileEdit ? (
                                <>
                                  <div className="row">
                                    <div className="col-12">
                                      {/* <button onClick={() => this.chgProfile()} className="edit-setting-profile-btn">
                                        <img src="images/icons/edit_20.png" />
                                      </button> */}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <h5>Profile</h5>

                                      <div className="pt-lg-5 mt-lg-5 text-center">
                                        <img src="images/icons/logo-croma.png" />
                                      </div>
                                    </div>
                                    <div className="col-lg-9">
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <div className="pro-data mb-3">
                                            <label>Onboarded On</label>
                                            <input value={this.state.created_date} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>Brand Name</label>
                                            <input value={this.state.brand_name} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>Website URL</label>
                                            <input value={this.state.website} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>GST</label>
                                            <input value={this.state.gst} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>Region of Service</label>
                                            <input value={this.state.region_service ? this.state.region_service : ''} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>
                                              Communication Address
                                            </label>
                                            <textarea value={this.state.communication_address__c ? this.state.communication_address__c : ''} disabled />
                                          </div>
                                        </div>
                                        <div className="col-lg-6">

                                          <div className="pro-data mb-3">
                                            <label>PM Name</label>
                                            <input value={this.state.merchant_name} disabled />
                                          </div>

                                          <div className="pro-data mb-3">
                                            <label>Entity Name</label>
                                            <input value={this.state.entity_name} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>PAN</label>
                                            <input value={this.state.pan_no} disabled />
                                          </div>
                                          <div className="pro-data mb-3">
                                            <label>CIN</label>
                                            <input value={this.state.cin} disabled />
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) :
                                <>
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <h5>Profile</h5>

                                      <div className="pt-lg-5 mt-lg-5 text-center">
                                        <img src="images/icons/logo-croma.png" />
                                      </div>
                                    </div>
                                    <form className="col-lg-9" onSubmit={this.handleRegister} >
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <div className="pro-data m-b-20">
                                            <label>Onboarded On</label>
                                            <input value={this.state.created_date} disabled />
                                          </div>
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="brand_name">Brand Name</label>
                                            <input onChange={this.handleChange} name="brand_name" id="brand_name" value={this.state.brand_name} type="text" />
                                          </div>
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="website">Website URL</label>
                                            <input name="website" id="website" onChange={this.handleChange} value={this.state.website ? this.state.website : ''} />
                                          </div>
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="gst">GST</label>
                                            <input onChange={this.handleGSTAndCIN} name="gst" id="gst" value={this.state.gst} />
                                          </div>
                                          {
                                            !this.state.isGst ?
                                              <span style={{
                                                color: '#EA4335', position: 'absolute', top: '265px'
                                              }}>{this.state.failMessageGst}</span>
                                              : ''
                                          }
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="region_service">Region of Service</label>
                                            <input onChange={this.handleChange} name="region_service" id="region_service" value={this.state.region_service ? this.state.region_service : ''} />
                                          </div>
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="address">
                                              Communication Address
                                            </label>
                                            <textarea onChange={this.handleChange} name="address" id="address" value={this.state.address ? this.state.address : ''} />
                                          </div>

                                        </div>
                                        <div className="col-lg-6">

                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="merchant_name">PM Name</label>
                                            <input onChange={this.handleChange} name="merchant_name" id="merchant_name" value={this.state.merchant_name} />
                                          </div>

                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="entity_name">Entity Name</label>
                                            <input onChange={this.handleChange} name="entity_name" id="entity_name" value={this.state.entity_name} />
                                          </div>
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="pan_no">PAN</label>
                                            <input onChange={this.handlePanChange} name="pan_no" id="pan_no" value={this.state.pan_no} />
                                          </div>
                                          {
                                            !this.state.isPanValid ?
                                              <span style={{ color: '#EA4335', position: 'absolute', top: '195px' }}>{this.state.failMessagePan}</span>
                                              : ''
                                          }
                                          <div className="bor8 m-b-20 how-pos4-parent">
                                            <label htmlFor="cin">CIN</label>
                                            <input onChange={this.handleGSTAndCIN} name="cin" id="cin" value={this.state.cin} />
                                          </div>
                                          {
                                            !this.state.isCin ?
                                              <span style={{ color: '#EA4335', position: 'absolute', top: '265px' }}>{this.state.failMessageCin}</span>
                                              : ''
                                          }
                                        </div>
                                      </div>
                                      <button
                                        type="submit"
                                        disabled={this.state.merchant_name != '' && this.state.address != '' && this.state.region_service != '' && this.state.website != '' && this.state.entity_name != '' && this.state.brand_name != '' && (this.state.cin != '' && this.state.isCin) && (this.state.gst != '' && this.state.isGst) && (this.state.pan_no != '' && this.state.isPanValid) ? true : false}
                                        style={this.state.merchant_name != '' && this.state.address != '' && this.state.region_service != '' && this.state.website != '' && this.state.entity_name != '' && this.state.brand_name != '' && (this.state.cin != '' && this.state.isCin) && (this.state.gst != '' && this.state.isGst) && (this.state.pan_no != '' && this.state.isPanValid) ? subBtn : {}}
                                        className={`flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty`} onClick={this.handleUpdateProfile}>Save </button>
                                    </form>
                                  </div>
                                </>
                              }
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-user-role-management"
                            role="tabpanel"
                            aria-labelledby="nav-user-role-management-tab"
                          >
                            <div className="accordion__" id="accordionSettings">
                              <div className="card">
                                <div className="card-header">
                                  <h2 className="mb-0 position-relative">
                                    <button
                                      className="btn btn-link accordion_btn collapsed"
                                      type="button"
                                      data-toggle="collapse"
                                      data-target="#collapseOne"
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    >User Management
                                    </button>
                                    <button className="d-sm-inline-block btn btn-sm btn-primary btn-dark add_btn_pos" onClick={this.openAddUser}>
                                      <i className="fas fa-plus"></i>Add New User</button>
                                  </h2>
                                </div>
                                {/* <div
                                  id="collapseOne"
                                  className="collapse show"
                                  aria-labelledby="headingOne"
                                  data-parent="#accordionSettings"
                                > */}
                                {/* <div className="card-body"> */}
                                <div className="table-responsive">
                                  <table
                                    className="table  no-footer"
                                    id=""
                                    cellSpacing={0}
                                  >
                                    <thead>
                                      <tr>
                                        <th><div className="hash">#</div></th>
                                        <th>
                                          <div className="d-flex align-items-center">User Name
                                            <div className="d-none">
                                              <button className="up"></button>
                                              <button className="down"></button>
                                            </div>
                                          </div>
                                        </th>
                                        <th>User Details</th>

                                        <th>
                                          Last Login
                                        </th>
                                        <th>
                                          <div className="d-flex align-items-center">Role(s)
                                            <div className="d-none">
                                              <button className="up"></button>
                                              <button className="down"></button>
                                            </div>
                                          </div></th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {users && users.length > 0 && (
                                        users.map((item, index) => (
                                          <tr key={index}>
                                            <td>
                                              <div className="d-flex">
                                                <div className="t_r_number">{index + 1}</div>
                                                {/* <div>
                                                          <div className="sale_ribbon">Sale</div>
                                                          <div className="new_ribbon">New</div>
                                                        </div> */}
                                              </div>
                                            </td>
                                            <td>
                                              <p className="link_">{item.name__c}</p>
                                            </td>
                                            <td>
                                              <p className="email_ID">{item.email__c}</p>
                                              <span>{item.mobileNumber}</span>
                                            </td>

                                            <td>
                                              <div>{item.lastmodifieddate && item.lastmodifieddate.substring(0, 10)}</div>
                                              <div>{item.lastmodifieddate &&
                                                moment(item.lastmodifieddate.substring(12, 17), 'hh:mm a').format('hh:mm a')
                                              }</div>
                                            </td>
                                            <td>
                                              <div className="">
                                                {item.select_user__c}
                                                {/* {(() => {
                                                      if (item.role == 1) {
                                                        return (
                                                          <>Admin</>
                                                        )
                                                      } else if (item.role == 2) {
                                                        return (
                                                          <>Sales</>
                                                        )
                                                      } else if (item.role == 3) {
                                                        return (
                                                          <>Operations</>
                                                        )
                                                      } else if (item.role == 4) {
                                                        return (
                                                          <>Credit</>
                                                        )
                                                      } else {
                                                        return (
                                                          <>Accounts</>
                                                        )
                                                      }
                                                    })()} */}
                                              </div>


                                            </td>
                                            <td>
                                              <div className="d-flex align-items-center">
                                                <div className="switch_btn d-flex" style={{ color: `${item.activate__c == true ? '#094588' : ''}`  , width:"8rem"}}>

                                                  <label className="switch mr-3">
                                                    <input type="checkbox"
                                                      onChange={(e) => this.handleActive_status(e, item.id)}
                                                      name="active_status" value="1"
                                                      checked={item.activate__c}
                                                    />
                                                    <span className="slider round"></span>
                                                  </label> {item.activate__c == true ? "Active" : "Inactive"}

                                                </div>
                                                <button
                                                  className='edit_btn'
                                                  onClick={() => this.openEditUser(item.id)}>
                                                  <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        ))
                                      )
                                      }
                                    </tbody>
                                  </table>
                                </div>
                                {/* </div> */}
                                {/* </div> */}
                              </div>


                              <div className="card">
                                <div className="card-header">
                                  <h2 className="mb-0 position-relative">
                                    <button
                                      className="btn btn-link accordion_btn"
                                      type="button"
                                      data-toggle="collapse"
                                      data-target="#collapseTwo"
                                      aria-expanded="false"
                                      aria-controls="collapseTwo"
                                    >
                                      Role Management
                                    </button>
                                    <button className="d-sm-inline-block btn btn-sm btn-primary btn-dark add_btn_pos" onClick={this.openAddRole}>
                                      <i className="fas fa-plus"></i>Add New Role</button>
                                  </h2>
                                </div>
                                <div
                                  id="collapseTwo"
                                  className="collapse"
                                  aria-labelledby="headingTwo"
                                  data-parent="#accordionSettings"
                                >
                                  <div className="card-body">
                                    <div className="row justify-content-between pr-5 mr-3">
                                      {roles && roles.length > 0 && (
                                        roles.map((item, index) => (
                                          <div key={index} className="col-sm-5">

                                            <div className="d-flex justify-content-between role_management_box">
                                              <div>{item.role_name__c}</div>
                                              <div className="d-flex align-items-center">
                                                <div className="switch_btn d-flex">
                                                  <label className="switch mr-3">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                  </label> Inactive
                                                </div>
                                                <button className='edit_btn' onClick={() => this.openEditRole(item.id)}>
                                                  <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        ))
                                      )}

                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-bank-details"
                            role="tabpanel"
                            aria-labelledby="nav-bank-details-tab"
                          >
                            <BankDetails
                              user_id={this.props.user_id}
                              dispatch={this.props.dispatch}
                              add_account={this.props.add_account}
                              banks={this.props.banks}
                              sfid={this.props.sfid}
                              merchant_banks={merchant_banks}
                            />
                          </div>


                          {/* <div
                                className="tab-pane fade"
                                id="nav-cat-details"
                                role="tabpanel"
                                aria-labelledby="nav-cat-tab"
                            >
                               <h5>Category</h5>
                               <select name='category' onChange={this.cateChange}>
                                  <option value="">Select Category</option>
                                  {category && category.length > 0 && category.map((items, index) => (
                                      <option value={items.category_id} key={`category-${index}`}>{items.category_name}</option>
                                  ))}
                        </select>
                        <h5>Sub Category</h5>
                               <select name='category' >
                                  <option value="">Select Category</option>
                                  {SubCatArr && SubCatArr.length > 0 && SubCatArr.map((items, index) => (
                                      <option value={items.category_id} key={items.category_id}>{items.category_name}</option>
                                  ))}
                        </select>
                            </div> */}


                          <div
                            className="tab-pane fade"
                            id="nav-manage-session"
                            role="tabpanel"
                            aria-labelledby="nav-manage-session-tab"
                          >manage-session</div>
                          <div
                            className="tab-pane fade"
                            id="nav-API-keys"
                            role="tabpanel"
                            aria-labelledby="nav-API-keys-tab"
                          >
                            <div className="row shadow mr-4" id="apiDiv"
                              style={{ padding: "2rem 2rem" }}
                            >

                              <h4 className="col-12 mb-4 pb-2 fs-20">API Keys</h4>
                              <div className="col-8">

                                <h5>
                                  API keys let you see Stride merchant dashboard from within other tools on your own software.
                                </h5>
                              </div>
                              <div className="col-4 text-center">
                                <a href="./assets/Eduvanz - Unified Merchant API.pdf" download>
                                  <button
                                    style={{ padding: "0.75rem 3rem" }}
                                    className="btn btn-default_ subBtn btn btn-primary">
                                    Download PDF
                                  </button>
                                </a>

                              </div>

                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    )
  }
}

function mapStateToProps(state) {
  const { user, user_id, sfid, isLoading } = state.auth;
  const { users, roles, banks, category, sub_cat, merchant_banks } = state.user;
  const { add_account } = state.model;
  return {
    user,
    user_id,
    users,
    sfid,
    roles,
    banks,
    isLoading,
    add_account,
    category,
    sub_cat,
    merchant_banks
  };
}

export default connect(mapStateToProps)(Settings);
