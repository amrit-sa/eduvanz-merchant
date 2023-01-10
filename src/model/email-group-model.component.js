import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeEmailGroupModel } from "../actions/model"
import { LeadsGetEmailGroup, LeadsAddEmailGroup, groupEmailSearch,getEmailsGroup,addingEmailRecipient,addEmailRecipient } from "../actions/user"
import Accordion from 'react-bootstrap/Accordion';

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

class EmailGroupReport extends Component {

    constructor() {
        super()
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            groupname: "",
            email: "",
            emailarr: [],
            isEmailValid: false,
            selectedEmails:[],
            errorMsg:"",
            emailRecipient:"",
            isaddEmailValid:false,
            emailSuccessMsg:'',
            emailGroup: []
        }
        this.handlechange = this.handlechange.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    closeModel = () => {
        this.setState({ errorMsg: '', groupname: '', selectedEmails: [], emailarr: [], email: '' });
        this.props.dispatch(closeEmailGroupModel())

    }

    addEmail = (e) => {
        this.setState({
            emailSuccessMsg: '',errorMsg:''
        })
        if (validateEmail(e.target.value)) {
            this.getEmailSearch(e.target.value)
            this.setState({
                isEmailValid: false
            })
        } else {
            this.setState({
                isEmailValid: true
            })
        }
        this.setState({
            email: e.target.value
        })
    }

    verifyEmail = (e) => {
        //onChange={(e) => this.setState({ emailRecipient: e.target.value })}
        if (validateEmail(e.target.value)) {
            this.setState({
                isaddEmailValid: false
            })
        } else {
            this.setState({
                isaddEmailValid: true
            })
        }
        this.setState({
            emailRecipient: e.target.value
        })
    }

    getEmailSearch = (emailIs) => {
        let dataObj = { search_name: emailIs }
        this.props.dispatch(groupEmailSearch(dataObj)).then(response => {
            console.log(response, '>>>>>>>>>>>')
            this.setState({ emailarr: [...this.state.emailarr, ...response] })


        })
            .catch(error => {
                console.log(error, '>>>>>>>>. error while getting email')
            })
    }

    handlechange = () => {
        //console.log(this.state.isEmailValid)
        let { sfid } = this.props
        this.setState({ email: '' })
        // if (!this.state.isEmailValid) {
        //     // this.setState({
        //     //     emailarr: [...this.state.emailarr, this.state.email],
        //     //     email: ""
        //     // }, () => { console.log(this.state.emailarr) })
        //     let dataObj = { user_sfid: sfid }
        //     this.props.dispatch(addEmailRecipient(dataObj)).then(response => {
        //         console.log(response, '>>>>>>>>>>>>>')
        //         if (response.status == "success") {
        //             this.getEmailSearch(this.state.email)
        //         }
        //     })
        //         .catch(error => {
        //             console.log(error, 'while adding email')
        //         })
        // }
    }

    createGroup = () => {
        const { sfid } = this.props
        // {
        //     "email": [43],
        //     "user_sfid": "001C4000002zEGIIA2",
        //     "title": "Marketing"
        // }
        let selectedEmailId = []
        if (this.state.selectedEmails.length > 0) {
            for (let i = 0; i < this.state.selectedEmails.length; i++) {
                selectedEmailId.push(this.state.selectedEmails[i].recipient_id)
            }
        }

        var dataObj = {
            title: this.state.groupname,
            email: selectedEmailId,
            user_sfid: sfid
        }
        this.props.dispatch(LeadsAddEmailGroup(dataObj)).then(response => {
            console.log(response, '>>>>>>>>>>>>>>.')
            if(response.status=='success'){
                this.setState({errorMsg:'',groupname:'',selectedEmails:[],emailarr:[],email:'',emailSuccessMsg:''});
                this.closeModel();
                let usersData = {
                    "lender_sfid": localStorage.getItem('sfid')
                }
                this.props.dispatch(getEmailsGroup(usersData))
                    .then((response) => {
                        console.log(response)
                    })

            }
            else {
                this.setState({ errorMsg: response.message })
            }
        })
            .catch(error => {
                console.log(error, 'error is')
            })
    }

    selectingEmail = (e, data) => {
        if (e.target.checked) {
            this.setState({ selectedEmails: [...this.state.selectedEmails, data] })
        }
        else {
            const updatedEmails = this.state.selectedEmails.filter(item => item.recipient_id !== data.recipient_id);
            this.setState({ selectedEmails: updatedEmails })
        }


    }


    addEmailRecipient = () => {
        if (this.state.emailRecipient != '') {
            let emailData = {
                //user_sfid: localStorage.getItem('sfid'),
                "email": this.state.emailRecipient,
                "user_sfid": localStorage.getItem('sfid'),
            }
            this.props.dispatch(addingEmailRecipient(emailData))
                .then((response) => {

                    if (response && response.status == 'success') {
                        this.setState({ emailRecipient: '', emailErrorMsg: '',emailSuccessMsg:response.message,errorMsg:''})

                    } else {
                        this.setState({ emailErrorMsg: response.message ,emailSuccessMsg:'',errorMsg:response.message})
                    }
                })
        }
    }


    componentDidMount() {

        let usersData = {
            "lender_sfid": localStorage.getItem('sfid')
        }
        this.props.dispatch(getEmailsGroup(usersData))
            .then((response) => {
                console.log(response)
                if (response.status === "success") {
                    this.setState({ emailGroup: response.data })
                }
            })
    }


    // closeModel = () => {
    //     this.props.dispatch(closeFilerModel())
    // }

    render() {
        const { email_group_show } = this.props
        const { emailarr } = this.state;
        const emailList = emailarr.filter((v, i, a) => a.findIndex(v2 => (v2.recipient_id === v.recipient_id)) === i)

        console.log(this.props, "ssssssssssssss1232")

        return (
            <>
                <Modal show={email_group_show} className='right myModal filter_modal' id="emailGroup">
                    <div className="srContent" style={{overflowY:'auto'}}>
                        <form>
                            <div className="buttonsBottom">
                                <div className="srHeader align-items-center">
                                    <div className='d-flex justify-content-between align-items-center w-100'>
                                        <div className='d-flex align-items-center'>
                                            <button type="button" onClick={this.closeModel} className="close">
                                                <img src="images/icons/icon-close2.png" alt="close" />
                                            </button>
                                            <h4 className="modal-title fz24">Email Groups</h4>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>

                                {/* {this.state.emailGroup && this.state.emailGroup.length > 0 && this.state.emailGroup.map((item, index) =>

                                    <div className="card">
                                        <div className="card-header">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                    onClick={() => { this.setState({ dropOptSel: 1 }) }}
                                                >
                                                    {item.title}
                                                </button>
                                            </h2>
                                        </div>
                                        <div
                                            id="collapseOne"
                                            className="collapse show"
                                            aria-labelledby="headingOne"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                <ul className="customInputsradio approvalBased">
                                                    {item.email && item.email.length > 0 ? item.email.map((ele, i) => {
                                                        if (ele != null) {

                                                            return (
                                                                <li key={i}>
                                                                    {ele.email}
                                                                </li>

                                                            )
                                                        }
                                                    }) : null
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                )} */}









                                 <div className='ml-2'><h5 className='text-success'>{this.state.emailSuccessMsg} </h5></div>

                                {/* <div className="srBody">

                                <div className='email_send'>
                                <div className='d-flex justify-content-between align-items-center my-4 title__'>
                                    <h4>Add Recipients</h4>
                                </div>
                                
                                <div className=' d-flex align-items-center mb-3'>
                                    <div className='emial_input'><input tyle="text"  placeholder='Enter Email ID'/></div>
                                    <button className='plus_btn'><i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
                                </div>

                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <div className='email-box'>ramesh.patel@gmail.com</div>
                                    <button className='delete'><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <div className='email-box'>ramesh.patel@gmail.com</div>
                                    <button className='delete'><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>

                                <button className='save__'>Save as a group </button>

                                <div className='d-flex justify-content-between align-items-center my-4 title__'>
                                    <h4>Email Reports to Groups</h4>
                                    <button className='delete'><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                </div>

                                <ul className="customInputsradio">
                                        <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="emailgroup"
                                            name="radio"
                                            id="Stakeholders"
                                            defaultChecked="checked"
                                        />
                                        <label htmlFor="Stakeholders">Stakeholders</label>
                                        </li>
                                        <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="emailgroup"
                                            name="radio"
                                            id="Management"
                                        />
                                        <label htmlFor="Management">Management</label>
                                        </li>
                                        <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="emailgroup"
                                            name="radio"
                                            id="Accounts"
                                        />
                                        <label htmlFor="Accounts">Accounts</label>
                                        </li>
                                       
                                     
                                </ul>

                                <button className='save__'>Create a new group </button>

                                </div>
                            </div>
                            <div className="srFooter">
                            <button type="button" onClick={this.closeModel} className="closefilter">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary btn-dark">
                                Send Email
                            </button>
                            </div> */}



                                <div className="srHeader  pt-1 container">



                                    <Accordion defaultActiveKey="0" >

                                        {this.state.emailGroup && this.state.emailGroup.length > 0 && this.state.emailGroup.map((item, index) =>

                                            <Accordion.Item eventKey={index} className="mb-3">
                                                <Accordion.Header className=" d-flex justify-content-between"><h4 className='font-weight-bold'>{item.title}</h4> </Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='ml-2 fs-17 font-weight-bold mt-2'>
                                                        <ul className="customInputsradio approvalBased">
                                                            {item.email && item.email.length > 0 ? item.email.map((ele, i) => {
                                                                if (ele != null) {

                                                                    return (
                                                                        <li key={i} className="mb-1">
                                                                            {ele.email}
                                                                        </li>

                                                                    )
                                                                }
                                                            }) : null
                                                            }
                                                        </ul>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )}

                                    </Accordion>

                                <hr></hr>


                                    {/* <div id="accordion" className="accordion-wrapper">
                                        <div className="card mt-4">
                                            <div className="p-1" id="heading-2">
                                                <h5 className="mb-0">
                                                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                        General Issues
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                <div className="pt-2">
                                                    <div className='accrodian-inner-two d-flex justify-content-between'>
                                                        <div>demo@gmail.com</div>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mt-4">
                                            <div className="p-1" id="heading-2">
                                                <h5 className="mb-0">
                                                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                        General Issues
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                <div className="pt-2">
                                                    <div className='accrodian-inner-two d-flex justify-content-between'>
                                                        <div>demo@gmail.com</div>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mt-4">
                                            <div className="p-1" id="heading-2">
                                                <h5 className="mb-0">
                                                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                        General Issues
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id="collapse-2" className="collapse" data-parent="#accordion" aria-labelledby="heading-2">
                                                <div className="pt-2">
                                                    <div className='accrodian-inner-two d-flex justify-content-between'>
                                                        <div>demo@gmail.com</div>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                        <i class="fa fa-plus-square" aria-hidden="true"></i>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className='mt-3'>
                                        <h4 className="modal-title fz24">Create a new email group</h4>

                                        {/* <h4>Create a New Group</h4> */}
                                        <div className='mt-2' style={{ position: "relative" }}>
                                            <h5><b>Add Recipients</b></h5>
                                            <input type="text" className='form-control' placeholder='Enter Email ID' value={this.state.emailRecipient}  onChange={(e) => this.verifyEmail(e)} />
                                            <i class="fa fa-plus-square" aria-hidden="true" onClick={this.addEmailRecipient} style={{ position: "absolute", bottom: "10px", right: "10px", cursor: "pointer" }}></i>
                                        </div>
                                        {
                                            this.state.isaddEmailValid &&
                                            <p style={{ color: "red" }}>Enter Valid Email</p>
                                        }
                                        <div className='mt-4'>
                                            <h5><b>Email Group Name</b></h5>
                                            <input type="text" placeholder='Enter Group Name' className='form-control' value={this.state.groupname} onChange={(e) => this.setState({ groupname: e.target.value })} />
                                        </div>
                                        {/* <div className='position-relative mb-4'>
                                            <input type="text" className='input-style' placeholder='Enter Email ID' value={this.state.emailRecipient} onChange={(e) => this.setState({ emailRecipient: e.target.value })} />
                                            <button className='add' onClick={this.addEmailRecipient}>+</button>
                                        </div> */}

                                      

                                        <div className='mt-4' style={{ position: "relative" }}>
                                            <h5><b>Add Email </b></h5>
                                            <input type="text" placeholder='Enter Email ID' className='form-control' value={this.state.email} onChange={(e) => this.addEmail(e)} />
                                            <i class="fa fa-plus-square" aria-hidden="true" onClick={this.handlechange} style={{ position: "absolute", bottom: "10px", right: "10px", cursor: "pointer" }}></i>
                                        </div>
                                        {
                                            this.state.isEmailValid &&
                                            <p style={{ color: "red" }}>Enter Valid Email</p>
                                        }
                                        <div className='mt-3' style={{height:"100px",overflowY:'auto'}}>
                                        {
                                            emailList.length > 0 &&
                                            emailList.map((data, index) => {
                                                return (
                                                    <>
                                                        {/* <h6 key={index} className="mt-4">{data.email}</h6> */}
                                                        <div className="form-check ml-2"key={index}>
                                                        <input className="form-check-input " type="checkbox" value="" id="defaultCheck1" onChange={(e)=>this.selectingEmail(e,data)}/>
                                                            <label className="form-check-label" for="defaultCheck1" >
                                                            {data.email}
                                                            </label>
                                                            </div>

                                                        </>
                                                    )
                                                })
                                            }
                                        </div>


                                    </div>
                                    <p style={{ color: "red" }}>{this.state.errorMsg}</p>
                                    {
                                        this.state.selectedEmails.length > 0 &&
                                        <button type="button" className="btn btn-primary btn-dark" style={{ float: "right", marginTop: "20px" }}
                                            onClick={this.createGroup}>Create</button>
                                    }

                                </div>





                            </div>
                        </form>
                    </div>
                </Modal>
               
            </>
        )
    }

}

function mapStateToProps(state) {
    const { email_group_show } = state.model;
    const { sfid } = state.auth;
    return {
        email_group_show,
        sfid
    };
}

export default connect(mapStateToProps)(EmailGroupReport)