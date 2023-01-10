import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Notification from "./components/allnotification.component";
import Help from "./components/help.component";
import VerifyOtp from './components/signin-otp.component';
import RegisterOtp from './components/register-otp.component';
import Details from './components/details.component';
import Createpassword from './components/createpassword.component';
import ProductDetails from './components/product-details.component';
import BankDetails from './components/bank-details.component';
import SignOtp from "./components/signOtp.component";
import FindBank from './components/find-bank.component';
import Success from './components/success.component';
import Dontgetotp from './components/edit-mobile.component';
import PersonalDetails from "./components/personal-details.component";
import Leads from "./components/leads.component";
import Product from "./components/product.component";
import Settings from "./components/settings.component";
import Settlement from "./components/settlement.component";
// Model Section
import BulkProductupload from "./model/bulk-prod-model.component";
import BulkNewProductupload from "./model/bulk-new-prod-upload";
import Bulkupload from "./model/bulk-model.component";
import CreateLead from "./model/create-lead.component";
import ChangePassword from "./model/change-password.component";
import Profile from "./model/profile-model.component";
import LeadsProfile from "./model/leads-profile.component";
import Filter from "../src/common/filter";
import FilterProduct from "./model/filter-model.component"
import FilterLead from "./model/filter-lead-model.component"
import EmailReport from "./model/email-model.component";
import EmailGroupReport from "./model/email-group-model.component";
import RequestDocument from "./model/request-document.component";
import Preview from "./model/preview-model.component";
import SuccessModel from "./model/success-model.component";
import ImageEdit from "./model/image-crop-model.component";
import DocumentDrop from "./model/document-drop.component";
import PreviewPdf from "./model/pdf-preview.component";
import AddNewUser from "./model/add-newuser.component";
import EditUserModel from "./model/edit-user.component"
import AddRoleModel from "./model/add-role.component";
import EditRoleModel from "./model/edit-role.component"
import AddNewProdct from "./model/add-newproduct.component"
import SettlementApplication from "./model/settlement-application.component"
import RefundApplication from './model/refundApplication.component'
import SettlementDue from './model/settlementDue.component'
import CancellationRequest from './model/cancellationRequest.component'
import ProductEdit from './model/productEdit.component'
import LeadApplicationDetails from './model/lead-application-details.component'
import Configure from "./model/configure.model.component";

import LoanCancellationModal from './model/loan-cancelation.component'
import PaymentModel from './model/payment-model.component'
import ApprovalModel from './model/approval.component'
import AddedLeadModel from "./model/added-lead-model.component";


// Lender Section
import LenderLogin from "./lender/login";
import LenderVerifyOtp from "./lender/verify-otp";
import LenderBulkUpload from "./lender/bulk-upload.component";
import LenderUploadedFiles from "./lender/uploaded-files.component";

import { changePassword, logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import FilteredTwo from './components/filtered-two.component'
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Report from "./components/report.component"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { user_id } = this.props;
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => {
              return (
                user_id ?
                  <Redirect to="/home" /> :
                  <Redirect to="/login" />
              )
            }} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/allnotification" component={Notification} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/verify_otp" component={VerifyOtp} />
            <Route exact path="/register_otp" component={RegisterOtp} />
            <Route exact path="/leads" component={Leads} />
            <Route exact path="/company_details" component={Details} />
            <Route exact path="/profile_details" component={PersonalDetails} />
            <Route exact path="/findbank" component={FindBank} />
            <Route exact path="/login_mobile" component={SignOtp} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/editmobile" component={Dontgetotp} />
            <Route exact path="/bankdetails" component={BankDetails} />
            <Route exact path="/credentails" component={Createpassword} />
            <Route exact path="/productdetails" component={ProductDetails} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/lender_login" component={LenderLogin} />
            <Route exact path="/lender_verifyotp" component={LenderVerifyOtp} />
            <Route exact path="/lender_bulkupload" component={LenderBulkUpload} />
            <Route exact path="/lender_uploads" component={LenderUploadedFiles} />
            <Route exact path="/products" component={Product} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/settlement" component={Settlement} />
            <Route exact path="/filtered-two" component={FilteredTwo} />
            <Route exact path="/report" component={Report} />
            


            <Route exact path="*" component={Login} />
          </Switch>
        </Router>
        {user_id &&
          <>

            <Bulkupload />
            <CreateLead />
            <ChangePassword />
            {/* <Profile /> */}
            <LeadsProfile />
            <Filter />
            <FilterLead />
            <FilterProduct />
            <EmailReport />
            <EmailGroupReport />
            <RequestDocument />
            <Preview />
            <SuccessModel />
            <ImageEdit />
            <DocumentDrop />
            <PreviewPdf />
            <AddNewUser />
            <EditUserModel />
            <AddRoleModel />
            <EditRoleModel />
            <AddNewProdct />
            <SettlementApplication />
            <RefundApplication />
            <SettlementDue />
            <CancellationRequest />
            <ProductEdit />
            <LeadApplicationDetails />
            <LoanCancellationModal />
            <PaymentModel />
            <ApprovalModel />
            <BulkProductupload />
            <BulkNewProductupload />
            <Configure />
            <AddedLeadModel />
          </>}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, user_id } = state.auth;
  return {
    user,
    user_id
  };
}

export default connect(mapStateToProps)(App);
