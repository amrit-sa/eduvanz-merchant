import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeEmailModel, openEmailGroupModel } from "../actions/model"
import { getEmailsGroup, sendleadEmailReport, addingEmailRecipient, groupEmailSearch } from "../actions/user"

const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}

class EmailReport extends Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteReci = this.deleteReci.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            recipientsData: [],
            isEmail: true,
            failMessage: "",
            email: "",
            emailGroup: [],
            selectedGroup: [],
            suggestion_email: [],
            recipients_emailids: []
        }
    }

    closeModel = () => {

        this.props.dispatch(closeEmailModel())
    }

    handleReset=()=>{
        this.setState({
            recipientsData: [],
            isEmail: true,
            failMessage: "",
            email: "",
            emailGroup: [],
            selectedGroup: [],
            suggestion_email: [],
            recipients_emailids: []
        })
    }



    openGroupModel = (e) => {
        e.preventDefault()
        // console.log("CLICKED MODAL");
        this.closeModel();
        this.props.dispatch(openEmailGroupModel());
    }

    // closeModel = () => {
    //     this.props.dispatch(closeFilerModel())
    // }

    deleteReci = (e, val) => {
        e.preventDefault();
        let array = [...this.state.recipientsData]; // make a separate copy of the array
        let index = array.indexOf(val)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ recipientsData: array });
        }
    }

    addEmail = (e) => {
        e.preventDefault();
        if (this.state.isEmail && this.state.email != '') {
            let emailData = {
                //user_sfid: localStorage.getItem('sfid'),
                "email": this.state.email,
                "user_sfid": localStorage.getItem('sfid'),
            }
            this.props.dispatch(addingEmailRecipient(emailData))
                .then((response) => {

                    if (response && response.status == 'success') {
                        this.setState({
                            recipientsData: [... this.state.recipientsData, this.state.email], email: '',
                            // recipients_emailids:[...this.state.recipients_emailids , response.id]
                        })
                    } else {
                        this.setState({ failMessage: response.message })
                    }
                })

        }
        // if (this.state.isEmail) {
        //     this.setState({
        //         recipientsData: [... this.state.recipientsData, this.state.email],
        //         email: "",
        //     }, () => {
        //         console.log(document.getElementsByClassName('input-email'), '>>>>>>>>>>')
        //         document.getElementsByClassName('input-email')[0].value = "";
        //     })
        // }
    }

    componentDidMount = () => {
        this.handleReset();
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

    handleSend_email = () => {

        const { emailGroup, selectedGroup , recipients_emailids } = this.state;
        let data = {
            "email_recipient": recipients_emailids,
            "group_id": selectedGroup,
            "merchant_sfid": localStorage.getItem('sfid'),
            "report_section": localStorage.getItem("lead_stage")
        }

        this.props.dispatch(sendleadEmailReport(data))
            .then((response) => {
                this.closeModel()
                console.log(response, 'rrrrrrr');
            })
    }

    selectGroup = (e) => {
        let value = Number(e.target.value);
        let olddata = this.state.selectedGroup;
        if (e.target.checked) {
            olddata.push(value)
        } else {
            olddata.splice(olddata.indexOf(value), 1)
        }
        this.setState({
            selectedGroup: olddata
        })
    }


    selectingEmail = (e, data) => {

        this.setState({ recipientsData: [... this.state.recipientsData, data.email], email: '', suggestion_email: [] })
        this.setState({ recipients_emailids: [... this.state.recipients_emailids, data.recipient_id] })

    }




    handleChange = (e) => {
        e.persist();
        // if (e.target.name == 'email') {

        if (e.target.value.length == 0) {
            this.setState({
                isEmail: false,
                failMessage: ""
            })
            return;
        }

        if (!isValidEmail(e.target.value)) {
            this.setState({
                isEmail: false,
                failMessage: "Enter Valid email"
            })
        } else {
            this.setState({
                isEmail: true,
                failMessage: "",
                [e.target.name]: e.target.value
            })


            this.getEmailSearch(e.target.value);
        }





        // } else {
        //   const result = e.target.value.replace(/[^a-z]/gi, '');
        //   this.setState(
        //     { [e.target.name]: result }
        //   );
        // }
    }

    getEmailSearch = (email) => {
        let dataObj = { search_name: email }
        this.props.dispatch(groupEmailSearch(dataObj)).then(response => {
            console.log(response, '>>>>>>>>>>>')
            if (response) {

                this.setState({ suggestion_email: response })
            }


        })
            .catch(error => {
                console.log(error, '>>>>>>>>. error while getting email')
            })
    }

    render() {
        const { email_show } = this.props
        return (
            <>
                <Modal show={email_show} className='right myModal filter_modal'>
                    <div className="srContent">
                        <form style={{ overflow: "auto" }}>
                            <div className="buttonsBottom">
                                <div className="srHeader align-items-center">
                                    <div className='d-flex justify-content-between align-items-center w-100'>
                                        <div className='d-flex align-items-center'>
                                            <button type="button" onClick={this.closeModel} className="close">
                                                <img src="images/icons/icon-close2.png" alt="close" />
                                            </button>
                                            <h4 className="modal-title fz24">Email Report</h4>
                                        </div>
                                    </div>


                                </div>
                                <div className="srBody">

                                    <div className=''>
                                        <div className='d-flex justify-content-between align-items-center my-4 title__'>
                                            <h4>Add Recipients</h4>
                                        </div>

                                        <div className=' d-flex align-items-center mb-2'>
                                            <div className='emial_input'><input tyle="text" placeholder='Enter Email ID' name="email" onChange={this.handleChange} value={this.state.email} className="input-email" /></div>
                                            <button className='plus_btn'><i className="fa fa-plus-square-o" aria-hidden="true" onClick={this.addEmail}></i></button>
                                        </div>
                                        {
                                            !this.state.isEmail && <p style={{ fontSize: "15px", color: "red" }}>{this.state.failMessage}</p>
                                        }




                                        {this.state.suggestion_email.length > 0 &&
                                            <div className='mb-2' style={{ height: "100px", overflowY: 'auto', background: "aliceblue" }}>
                                                {

                                                    this.state.suggestion_email.map((data, index) => {
                                                        return (
                                                            <>
                                                                {/* <h6 key={index} className="mt-4">{data.email}</h6> */}
                                                                <div className="form-check ml-2" key={index}>

                                                                    <label className="form-check-label cursor-point" for="defaultCheck1"
                                                                        onClick={(e) => this.selectingEmail(e, data)}
                                                                    >
                                                                        {data.email}
                                                                    </label>
                                                                    <hr></hr>
                                                                </div>

                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }






                                        {
                                            this.state.recipientsData.map((data, index) => {
                                                return (
                                                    <div className='d-flex justify-content-between align-items-center mb-2' kye={index}>
                                                        <div className='email-box'>{data}</div>
                                                        <button className='delete' onClick={(e) => { this.deleteReci(e, data) }}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    </div>
                                                )
                                            })
                                        }

                                        {/* <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <div className='email-box'>ramesh.patel@gmail.com</div>
                                    <button className='delete'><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <div className='email-box'>ramesh.patel@gmail.com</div>
                                    <button className='delete'><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div> */}

                                        {/* HIDED AS PER DISCUSSION ON 23 SEPT */}
                                        {/* {
                                            this.state.recipientsData.length > 0 && <button className='save__'>Save as a group </button>
                                        } */}

                                        <div className='d-flex justify-content-between align-items-center my-4 title__'>
                                            <h4>Email Reports to Groups</h4>
                                            <button className='delete' onClick={this.openGroupModel}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                        </div>

                                        {/* <ul className="customInputsradio">
                                        <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="emailgroup"
                                            name="radio"
                                            id="Stakeholders"
                                            defaultChecked="checked"

                                            
                                        />
                                        <label htmlFor="Stakeholders">Stakeholders</label>
                                        </li> */}
                                        <ul className="customInputsradio">
                                            {
                                                this.state.emailGroup.map((data, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <input
                                                                type="checkbox"
                                                                name="radio"
                                                                id={`grp_${data.id}`}
                                                                onChange={this.selectGroup}
                                                                value={data.id}
                                                            />
                                                            <label htmlFor={`grp_${data.id}`}>{data.title}</label>
                                                        </li>
                                                    )
                                                })
                                            }

                                            {/* <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="emailgroup"
                                            name="radio"
                                            id="Management"
                                        />
                                        <label htmlFor="Management">Management</label>
                                        </li> */}
                                            {/* <li>
                                                <input
                                                    type="checkbox"
                                                    defaultValue="datefilter"
                                                    name="radio"
                                                    id="thisManagement"
                                                />
                                                <label htmlFor="thisManagement">Management</label>
                                            </li> */}
                                            {/* <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="emailgroup"
                                            name="radio"
                                            id="Accounts"
                                        />
                                        <label htmlFor="Accounts">Accounts</label>
                                        </li> */}
                                            {/* <li>
                                                <input
                                                    type="checkbox"
                                                    defaultValue="datefilter"
                                                    name="radio"
                                                    id="thisAccounts"
                                                />
                                                <label htmlFor="thisAccounts">Accounts</label>
                                            </li> */}


                                        </ul>

                                        <button type="button" onClick={this.openGroupModel} className='save__'>Create a new group </button>

                                    </div>
                                </div>
                                <div className="srFooter" style={{ position: "relative" }}>
                                    <button type="button" onClick={this.closeModel} className="closefilter">
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary btn-dark"
                                        disabled={(this.state.selectedGroup.length > 0 || this.state.recipientsData.length > 0) ? false : true}
                                        onClick={this.handleSend_email}
                                    >
                                        Send Email
                                    </button>
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
    const { email_show } = state.model;
    return {
        email_show,
    };
}

export default connect(mapStateToProps)(EmailReport)