import React from 'react'
import Topbarlogo from "../common/topbarwithlogo";
import { getFAQ, CustomerSendHelpRequest } from '../actions/user';
import { connect } from "react-redux";

const formopen = false;

class Help extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            helpFormOpen: false,
            formQueryType: "Order Related",
            formSubject: "",
            formDiscription: "",
        };

    }

    handleFormSelect = (event) => {
        this.setState({ formQueryType: event.target.value });
    }

    handleDiscription = (event) => {
        this.setState({ formDiscription: event.target.value });
    }

    handleSubmitForm = () => {

        let sfid = localStorage.getItem('sfid');
        const { formDiscription, formQueryType, formSubject } = this.state;
        let obj = {
            merchant_sfid: sfid,
            issue_type: formQueryType,
            subject: formSubject,
            description: formDiscription
        }
        if (obj.description != "" && obj.subject != "") {
            this.props.dispatch(CustomerSendHelpRequest(obj)).then((res) => {
                if (res.status === 'success') {
                    this.setState({ helpFormOpen: false });
                    // document.getElementById("disc").value = ""
                    // this.setState({ formQueryType:"Order Related" });
                    // this.setState({ formSubject: "" });
                    // this.setState({ formDiscription: "" });
                    alert("Form Submitted Successfully");

                }
            });
        }
        else {
            alert("Subject and Description cannot be empty")
        }

        this.setState({ formQueryType: "" });
        this.setState({ formSubject: "" });
        this.setState({ formDiscription: "" });
    }

    componentDidMount() {
        this.props.dispatch(getFAQ());
        let res = this.props.dispatch(CustomerSendHelpRequest({
            "merchant_sfid": "00171000008GurGAAS",
            "issue_type": "Order Related",
            "subject": "Make & Manage Payment",
            "description": "How can I extend my due date"
        }));
        res.then(data => {
            console.log(data);
        })



    }

    render() {
        console.log(this.props.FAQ_question.merchantFaq);
        return (
            <>
                <div>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content" className='notificaion-wrapper'>
                            <div className='logo-open-sidebar'>
                                <Topbarlogo
                                    history={this.props.history}
                                />
                            </div>

                            <div className='container-fluid'>
                                <div className='row notifcation-row-card'>
                                    <div className='col-xl-3 col-md-5'>
                                        <div className='notification-left-bar'>
                                            <a href={void (0)} onClick={() => this.props.history.goBack()} className='back-to-page cursor-point'><img src="images/icons/back-icon.png" alt="" /> Back</a>
                                            <h3>Help &amp; Support</h3>

                                            <figure className='middle-img'><img src="images/icons/help-img.png" alt="" /></figure>


                                        </div>
                                    </div>
                                    <div className='col-xl-9 col-md-7 position-relative'>
                                        <div className='notification-right-card help-page-right-content'>
                                            <div className="container">
                                                <div id="accordion" className="accordion-wrapper">

                                                    <div className="card">
                                                        <div className="card-header" id="heading-1">
                                                            <h5 className="mb-0">
                                                                <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="false" aria-controls="collapse-1">
                                                                    <img src="images/icons/user-icon.png" alt="" /> Managing my Account
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i add/ deactivate user
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-1" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can deactivate the user by:
                                                                                                    1. Select settings
                                                                                                    2. Click on the tab of user role
                                                                                                    3. Click on active toggle.

                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-1" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-2" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i change the user role of the existing user
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-2" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To change the user role of existing user:
                                                                                                    1.Click on the setting
                                                                                                    2.Click on the user role management
                                                                                                    3.click on the edit icon
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>






                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-2" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-3" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How do I add my bank account
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-3" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To add a bank account:
                                                                                                    1.Select Settings
                                                                                                    2. Click on an add bank account tab
                                                                                                    3. Click on add bank account
                                                                                                    4. Complete the process and verify the bank details.
                                                                                                    The bank account will be successfully added.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-3" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-4" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i add a product
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-4" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If SKU is already available, You can add a product by:
                                                                                                    1.Click on products tab
                                                                                                    2.Click on add new product.

                                                                                                    If the SKU is not already available, you can add a new product by:
                                                                                                    1. Click on Product Tab
                                                                                                    2. Click on add new products
                                                                                                    3. Select Can't find your Product
                                                                                                    4.Submit the details of the product to get it approved.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-4" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-5" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i modify my product details
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-5" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To modify the Product details:
                                                                                                    1. Click on the products tab
                                                                                                    2. Edit the product you want to
                                                                                                    OR
                                                                                                    You can bulk update the products by:
                                                                                                    1. Click on the bulk update icon on the top of products table
                                                                                                    2. Upload an Excel file containing all the product details (template of the same can be downbloaded from the system).
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-5" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-6" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can I update my GST no.
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-6" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can update your GST No. by clicking on the profile
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-6" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-7" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How do I log in to the portal
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-7" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To login into the portal, Select "Merchant" form the top row and after that you just have to enter the following details.
                                                                                                    Name
                                                                                                    Mail Id
                                                                                                    Mobile No.
                                                                                                    Brand Name
                                                                                                    Category and sub category of your product
                                                                                                    Bank details
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-1" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-1-7" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-8" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i Register myself as a Merchant
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-8" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    For getting yourself registered as Merchant you just have to upload the following:
                                                                                                    Name
                                                                                                    Mail Id
                                                                                                    Mobile No.
                                                                                                    Brand Name
                                                                                                    Category and sub category of your product
                                                                                                    Bank details
                                                                                                </a>
                                                                                            </h5>
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



                                                    {/*2*/}

                                                    <div className="card">
                                                        <div className="card-header" id="heading-1">
                                                            <h5 className="mb-0">
                                                                <a role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                                    <img src="images/icons/book-icon.png" alt="" />Dashboard Features related
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-2" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-1" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Where can i find the lead i created ??
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-1" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Select "lead" from the side bar, which will display all your leads
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-1" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-2" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Can I edit the application?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-2" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To edit the application submitted
                                                                                                    Select “Leads”
                                                                                                    Select the application to edit
                                                                                                    On the Right top of the screen you can find editing option
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>






                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-2" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-3" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Can i customise reports?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-3" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Yes you can customise your reports according to Date of upload, Brand, etc.
                                                                                                    Select "Leads" from the Dashboard
                                                                                                    Select "Filter(Symbol)" from the top row
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-3" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-4" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can I download/email my own report?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-4" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Yes, you can get your Reports on Email.
                                                                                                    Select “leads”
                                                                                                    Selecting the envelope sign on the right top, will enable you to get your reports by email.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-4" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-5" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    how can i find the payment details against each application?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-5" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To find details of each product
                                                                                                    You can click on Leads
                                                                                                    Select the application to view
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-5" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-6" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    how can i configure my reports?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-6" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can configure all your reports by:
                                                                                                    Select “Leads”
                                                                                                    Select “Filter” from the top row to arrange all the reports in the desired manner.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-6" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-7" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Can i get my reports on mail?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-7" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Yes, you can get your Reports on Email.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-2-7" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-8" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i make/ edit email groups?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-8" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can edit or make a new email group by:
                                                                                                    Select ”Lead”
                                                                                                    Selecting the envelope sign on the right top, will enable you with an option to make a new email group or edit the existing email group.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-9" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-10" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i Whitelist a particular case?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-10" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can whitelist a particular case by:
                                                                                                    Selecting “Product”
                                                                                                    In Filter section, you can find an option to whitelist a Product
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-10" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-11" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i sent an approval for DRF?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-11" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    DRF is Disbursement request form. You have to fill the form of your bank either online or offline. Once the form is filled you can submit it to the bank for approval.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-11" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-12" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i create a Customised tab for viewing my leads?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-12" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can customise your leads by
                                                                                                    Select "Leads" from the Dashboard
                                                                                                    Select "Filters(Symbol)" from the top Row to get your leads customised according to Date of upload, Brand, Category, etc.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-12" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-13" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i find the summary of the application?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-1-13" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Summary of the application can be checked by:
                                                                                                    Select "Leads"
                                                                                                    Select the application to be viewed
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-13" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-14" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i check my cancelled loans?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-14" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can check your canceled loans by:
                                                                                                    Selecting “Settlements”
                                                                                                    Select “Cancellation requests” from the top bar
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-14" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-15" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i check the status of refunds initiated to Eduvanz?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-15" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can check your refund status by:
                                                                                                    Select “Settlements”
                                                                                                    Then select “Refunds” to check the status of your refunds.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                            <div className="card-body">
                                                                <div id="accordion-2-15" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-16" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What to do if the customer does the upfront payment to me directly?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-16" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If the cusotmer Pays you directly, that amount is deducted from the amount disbursed from Stride to you.
                                                                                                </a>
                                                                                            </h5>
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








                                                    <div className="card">
                                                        <div className="card-header" id="heading-1">
                                                            <h5 className="mb-0">
                                                                <a role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                                                                    <img src="images/icons/box-icon.png" alt="" />Glossary
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            <div className="card-body">
                                                                <div id="accordion-3" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-1" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What is whitelisting?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-1" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    White list is a list of products which are trusted, known or explicitly permitted.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-1" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-2" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Why do we need to upload bulk leads?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-2" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    It is not mandatory for you to upload bulk leads, you can upload single lead as well. But when you have to upload a long list of products, you can simply add an excel sheet, which contains all the required details of the product.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>






                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-2" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-3" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What is the use of configuring reports?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-3" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can use the option to line your products according to date or month or value or approval status etc.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-3" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-4" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What is the use of making a customised tab?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-4" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    By creating a customised tab you can view the products according to their Date of upload, Brands, category, etc
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-4" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-5" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How will the dashboard help me in business?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-5" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Dashboard is the place where you can find all your product as listed with their status, approved or not. at the same time on dashboard you ca bulk upload all your products that you want to list on Stride.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-5" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-6" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What does the pre-approval and post-approval mean?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-6" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    The product/s that you will upload on Stride, will be checked from our end. Till your product is under review, it will be shown under "Pre approval". Once the product is approved by our team, it will be visible under " Post Approved"
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-6" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-7" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Where can I cancel  the listing of a product?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-7" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can cancel the listing of a product by:
                                                                                                    Select "settlements" from the Dashboard
                                                                                                    Select "Cancellation Request" from the top row.
                                                                                                    Then approve the products that you wist to delist/cancel.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-7" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-8" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What if stride fails to verify my bank account?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-8" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If we at Stride fail to verify your  account, then you have to upload either of:
                                                                                                    1. Bank Statement
                                                                                                    2. Cancelled Cheque
                                                                                                    3. Bank Passbook
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-9" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-10" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How to add new stock of product when it runs out?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-10" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If want to refill the products listed:
                                                                                                    1. Select Products
                                                                                                    2.  Select the product you want to refill
                                                                                                    3. Edit the Stock of the required Product
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-10" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-11" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How to turn inactive orders live?                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-11" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If you want the product to go live:
                                                                                                    1. Select Products
                                                                                                    2. turn on the activation status for the required product                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-11" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-12" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How to edit the offer on a product?                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-12" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can change the offer on the product by:
                                                                                                    1. Select Products
                                                                                                    2. Click on the SKU of the product you want to edit.
                                                                                                    3. You can create new offer or make any of the previous offers go live.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-12" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-13" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Where will i find out of stock items?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-13" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can find, out of Stock items by selecting 'Products'.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-13" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-14" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Can can i edit the offer on a product/s?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-14" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Yes, you can edit the offer on listed product.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-14" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-15" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can get to check the Leads with pending application?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-15" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    You can check the leads with pending applications at Pre approval section in Leads.
                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-15" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-16" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What do you mean by Lead?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-16" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    Leads are your customers who want to buy the products at easy and low EMIs. You have to register the customer on Stride website as Leads, and after confirming their eligibity , we disburse the loan amount to you.                                                                                                 </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-16" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-17" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    If my customer is below 21 years of age, what do I do?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-17" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If the buyer is below the age of 21, then you have to register a  Co-borrower in order to avail a credit amount.                                                                         </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-17" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-18" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    What if my customer's E-Mandate fails?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-18" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If  resitration for the E-Mandate fails due to some reasons, customer can download a NACH Mandate form  and after signing it, one can upload it.                                                                                            </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-18" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-19" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Where can i file my query?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-19" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To raise a  query:
                                                                                                    1.  Select Lead
                                                                                                    2. Click on any lead
                                                                                                    3. On the right top, select (Symbol).                                                                                          </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-19" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-20" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    Do I need an approval before uploading a product?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-20" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    If SKU of the product is already available on Stride, then no approval is required.
                                                                                                    When SKU is not available on Stride, then the product will be reviewed by our team and then it will go live.</a>                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-20" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-21" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How to complete my incomplete application?                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-21" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    For completing your pending application :
                                                                                                    1. select "Leads"
                                                                                                    2.  Click on the  required Lead                                                                                                </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-3-21" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3-22" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can i approve the application for loans cancellation?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-3-22" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    For approving  or rejecting the loan cancellation request:
                                                                                                    1. Select 'Settlements'
                                                                                                    2. Click on 'Cancellation Requests' from the top row
                                                                                                    3. Approve or reject the required applications                                                                                                  </a>
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="collapse-3" className="collapse" data-parent="#accordion" aria-labelledby="heading-3">
                                                            <div className="card-body">
                                                                <div id="accordion-2-22" className='accrodian-inner-one'>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-1-1">
                                                                            <h5 className="mb-0">
                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2-23" aria-expanded="false" aria-controls="collapse-1-1">
                                                                                    How can I edit the role of the lead?
                                                                                </a>
                                                                            </h5>
                                                                        </div>
                                                                        <div id="collapse-2-23" className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                                                                            <div className="card-body">
                                                                                <div id="accordion-1-1" className='inner-content-second-level'>
                                                                                    <div className="card">
                                                                                        <div className="card-header" id="heading-1-1-1">
                                                                                            <h5 className="mb-0">
                                                                                                <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1-1" aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                    To edit the Role of the Lead:
                                                                                                    1. Go to settings
                                                                                                    2. On the extreme left , select(Symbol)
                                                                                                    3. Edit the required roles            </a>                                                                                </h5>
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







                                                    <div className="card">

                                                        {/* <div id="collapse-5" className="collapse" data-parent="#accordion" aria-labelledby="heading-5"> */}
                                                        {/* <div className="card-body">
                                                            <div className='accrodian-inner-one padd-top'>
                                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                                            </div>
                                                            
                                                        </div> */}

                                                        <div id="collapse-5" className="collapse" data-parent="#accordion" aria-labelledby="heading-1">
                                                            {
                                                                this.props.FAQ_question.merchantFaq && this.props.FAQ_question.merchantFaq.map((ele, i) => {
                                                                    return (
                                                                        <>
                                                                            <div className="card" key={i}>
                                                                                <div className="card-header" id="heading-1-2">
                                                                                    <h5 className="mb-0">
                                                                                        <a className="collapsed" role="button" data-toggle="collapse" href={`#collapse-1-2-${i}`} aria-expanded="false" aria-controls="collapse-1-2">
                                                                                            {ele.name}
                                                                                        </a>
                                                                                    </h5>
                                                                                </div>
                                                                                <div id={`collapse-1-2-${i}`} className="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-2">
                                                                                    <div className="card-body">
                                                                                        <div id="accordion-1-2" className='inner-content-second-level'>
                                                                                            <div className="card">
                                                                                                <div className="card-header" id="heading-1-1-1">
                                                                                                    <h5 className="mb-0">
                                                                                                        <a className="collapsed" role="button" data-toggle="collapse" href={`#collapse-1-1-1-${i}`} aria-expanded="false" aria-controls="collapse-1-1-1">
                                                                                                            {ele.question__c}
                                                                                                        </a>
                                                                                                    </h5>
                                                                                                </div>
                                                                                                <div id={`collapse-1-1-1-${i}`} className="collapse" data-parent="#accordion-1-1" aria-labelledby="heading-1-1-1">
                                                                                                    <div className="card-body">
                                                                                                        <div className="inner-body-content">
                                                                                                            <p className="paragrpah-title">{ele.answer__c}
                                                                                                            </p>

                                                                                                            {/* <div className="accordain-footer">
                                                                                                        <div className="footer-left">
                                                                                                            <p>Was this answer helpful?</p>
                                                                                                            <a href='' className="outer-icon like"><i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                                                                                            </a>
                                                                                                            <a href='' className="outer-icon dislike"><i className="fa fa-thumbs-down" aria-hidden="true"></i>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                        <div className="help-footer"><h3>Still need help? <b>Contact us</b></h3><a href="" className="contact-us">Write to us</a></div>
                                                                                                    </div> */}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                        </>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-xl-3'>
                                        <div className='notification-left-footer'>
                                            <h2>Eduvanz</h2>
                                        </div>
                                    </div>
                                    <div className='col-xl-9'>
                                        <div className='help-footer'>
                                            <h3>Still need help? <b>Contact us</b></h3>
                                            <div className='contact-us' onClick={() => this.setState({ helpFormOpen: true })}>Write to us</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.helpFormOpen &&
                            <div className='helpform w-50 mx-auto border border-dark' >
                                {/* <span className='text-right' style={{ position: "absolute", top: 0, right: 0, cursor: "pointer", fontSize: "30px" }}>&times;</span> */}
                                <button type="button" class="close" aria-label="Close" onClick={() => this.setState({ helpFormOpen: false })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="container p-4">
                                    {/* <form> */}
                                    <div className="row justify-content-center ">
                                        <div class="form-group col-sm-11 my-2 mb-4">
                                            <label htmlFor="exampleFormControlSelect1" className='form-label'>Query Type</label>
                                            <select class="form-control shadow-none" id="exampleFormControlSelect1" value={this.state.formQueryType} onChange={this.handleFormSelect} required>
                                                <option value="Order Related">Order Related</option>
                                                <option value="General Issues">General Issues</option>
                                                <option value="Legal Terms">Legal Terms</option>
                                                <option value="Partner Onboarding"> Partner Onboarding</option>
                                                <option value="Conditions as per help">Conditions as per help</option>
                                                <option value="support screen">support screen</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-11 my-2 mb-4">
                                            <label htmlFor="subject" className='form-label mb-0'>Subject</label>
                                            <input type="text" id="subject" className='form-control shadow-none' value={this.state.formSubject} required onChange={(e) => this.setState({ formSubject: e.target.value })} />
                                        </div>
                                        <div className="col-sm-11 my-2">
                                            <label htmlFor="disc" className='form-label mb-0'>Description</label>
                                            <textarea type="text" id="disc" className='form-control shadow-none' rows="3" value={this.formDiscription} required onChange={(e) => this.setState({ formDiscription: e.target.value })}></textarea>
                                        </div>
                                        <div className='col-sm-11 my-2'>
                                            <button className='btn btn-primary' onClick={this.handleSubmitForm}>Submit</button>
                                        </div>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </>
        )
    }
}


function mapStateToProps(state) {
    const { FAQ_question } = state.user;
    return {
        FAQ_question
    };
}

export default connect(mapStateToProps)(Help);
