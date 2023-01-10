import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModel, openEmailGroupModel } from "../actions/model";
import { createLeads, getLeads, getLeadProfile, addingEmailRecipient, sendEmailReportConfigure } from "../actions/user";
// import { openLeadProfileModel, openSuccessModel, openEmailGroupModel } from "../actions/model"
import { Scrollbar } from "react-scrollbars-custom";
import TimePicker from 'react-bootstrap-time-picker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Modal, Button } from "react-bootstrap"

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const initialState = {

};
const DAILY = "DAILY";
const WEEKLY = "WEEKLY";
const MONTHLY = "MONTHLY";
const TODAY = "Daily";
const THISWEEK = "Weekly";
const THISMONTH = "Monthly"
const CUSTOM = "Custom";
const LEADS = "Leads";
const PRODUCT_MASTER = "Product Master";
const DISBURSED_CASE = "Disbursed Case";
const DISBURSAL_PENDING = "Disbursal Pending";
const REFUND_CACELLATION = "Refunds/Cancellation";
const WHITELISTED = "Whitelisted Cases";
const STAGE1 = "Loan Disbursed";
const STAGE2 = "Ready to disburse";
const STAGE3 = "Loan Cancelled";

class Configure extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.state = { time: 0 };
        this.openEmailgroup = this.openEmailgroup.bind(this)
        this.state = {
            // time: new Date(),
            time: "00:00",
            start_date: new Date(),
            end_date: new Date(),
            range: TODAY,
            report: '',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            all_time: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            dates: Array.from({ length: 31 }, (v, k) => k + 1),
            selectedDay: 'Monday',
            selectedDate: 1,
            email: '',
            emailRecipient: "",
            emailErrorMsg: "",
            selectedEmailsGroups: [],
            selectedReport: "",
            selectedEmailGroup: "",
            emailSuccess: null,
            emailSuccessMsg: ""
        

        };

    }

    componentDidUpdate() {

    }

    closeModel = () => {
        this.props.dispatch(closeModel())
    }

    handleTimeChange(time) {
        console.log(time);     // <- prints "3600" if "01:00" is picked
        this.setState({ time });
    }


    openEmailgroup = () => {
        console.log("bcnnnn")
        this.props.dispatch(openEmailGroupModel())
    }
    optionSelected = (opt) => {

        switch (opt) {
            case DAILY:
                this.setState({
                    range: TODAY
                    //range: Daily
                })
                break;
            case WEEKLY:
                this.setState({
                    range: THISWEEK
                    //range: Weekly
                })
                break;
            case MONTHLY:
                this.setState({
                    range: THISMONTH
                    //range: TODAY
                })
                break;
            default:
                break;
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
                        this.setState({ emailRecipient: '', emailErrorMsg: '' })
                    } else {
                        this.setState({ emailErrorMsg: response.message })
                    }
                })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.emails_group_list != nextProps.emails_group_list) {
            console.log('yess changed', nextProps.emails_group_list)
            return true
        } else {
            return true
        }

    }

    selectingEmail = (e, data) => {
        if (e.target.checked) {
            this.setState({ selectedEmailsGroups: [...this.state.selectedEmailsGroups, data] })
            this.setState({ selectedEmailGroup: data.id })

        }
        else {
            const updatedEmails = this.state.selectedEmailsGroups.filter(item => item.id !== data.id);
            this.setState({ selectedEmailsGroups: updatedEmails })
        }


    }
    returnTime = (value) => {
        let date = new Date(value);
        let hour = date.getHours();
        let minute = date.getMinutes();
        // return hour + ':' + minute
        return value
    }
    saveData = () => {
        const { time, range, selectedReport, selectedEmailGroup, selectedDay, selectedDate } = this.state
        const { sfid } = this.props;
        this.setState({emailSuccessMsg:''})
        //let stageValue = this.stageReportIs();
        let url
        console.log('email group here', this.state.selectedEmailsGroups)
        console.log('slected report', this.state.selectedReport)
        console.log('slected stage', this.state.range)
        console.log('select time', this.state.time)
        console.log('selected day', this.state.selectedDay)
        console.log('selected date', this.state.selectedDate)
        console.log('selected group', this.state.selectedEmailGroup)
        //const THISWEEK = "Weekly";
        //const THISMONTH = "Monthly"
        //merchant_sfid=001C40000030K8KIAU&report_section=Leads&date_range=Daily&groupId=74
        console.log("--------------------")
        console.log('range', range)
        console.log('TODAY', TODAY)
        console.log("--------------------")


        if (range == TODAY) {
            url = `merchant_sfid=${sfid}&report_section=${selectedReport}&date_range=${range}&time=${this.returnTime(time)}&groupId=${selectedEmailGroup}`
        }
        else if (range == THISWEEK) {
            url = `merchant_sfid=${sfid}&report_section=${selectedReport}&date_range=${range}&time=${this.returnTime(time)}&groupId=${selectedEmailGroup}&weekly_day=${selectedDay}`
        }
        else {

            url = `merchant_sfid=${sfid}&report_section=${selectedReport}&date_range=${range}&time=${this.returnTime(time)}&groupId=${selectedEmailGroup}&monthly_date=${this.state.selectedDate}`
        }

        this.props.dispatch(sendEmailReportConfigure(url)).then(response => {
            console.log(response)
            if (response.status == "success") {
                this.setState({ emailSuccess: true, emailSuccessMsg: 'Scheduler created successfully',selectedEmailsGroups:[],selectedReport:"", selectedEmailGroup:''})
                alert('Scheduler created successfully');
                //const myTimeout = setTimeout(this.setState({emailSuccessMsg:''}), 5000);

                //responseModal
                //document.getElementById('responseModal').click()
            } else {
                //alert('Error while fetching data')
                this.setState({ emailSuccess: false, emailErrorMsg: response.message })
                //document.getElementById('responseModal').click()


            }
        })
            .catch(error => {
                console.log(error)
                alert('Error while fetching data')
            })


    }
    render() {
        const timeArray = []
        timeArray.push(<><option value="00:00">12.00 AM</option>
            <option value="00:30">12.30 AM</option>
            <option value="01:00">01.00 AM</option>
            <option value="01:30">01.30 AM</option>
            <option value="02:00">02.00 AM</option>
            <option value="02:30">02.30 AM</option>
            <option value="03:00">03.00 AM</option>
            <option value="03:30">03.30 AM</option>
            <option value="04:00">04.00 AM</option>
            <option value="04:30">04.30 AM</option>
            <option value="05:00">05.00 AM</option>
            <option value="05:30">05.30 AM</option>
            <option value="06:00">06.00 AM</option>
            <option value="06:30">06.30 AM</option>
            <option value="07:00">07.00 AM</option>
            <option value="07:30">07.30 AM</option>
            <option value="08:00">08.00 AM</option>
            <option value="08:30">08.30 AM</option>
            <option value="09:00">09.00 AM</option>
            <option value="09:30">09.30 AM</option>
            <option value="10:00">10.00 AM</option>
            <option value="10:30">10.30 AM</option>
            <option value="11:00">11.00 AM</option>
            <option value="11:30">11.30 AM</option>
            <option value="12:00">12.00 PM</option>
            <option value="12:30">12.30 PM</option>
            <option value="13:00">01.00 PM</option>
            <option value="13:30">01.30 PM</option>
            <option value="14:00">02.00 PM</option>
            <option value="14:30">02.30 PM</option>
            <option value="15:00">03.00 PM</option>
            <option value="15:30">03.30 PM</option>
            <option value="16:00">04.00 PM</option>
            <option value="16:30">04.30 PM</option>
            <option value="17:00">05.00 PM</option>
            <option value="17:30">05.30 PM</option>
            <option value="18:00">06.00 PM</option>
            <option value="18:30">06.30 PM</option>
            <option value="19:00" selected="">07.00 PM</option>
            <option value="19:30">07.30 PM</option>
            <option value="20:00">08.00 PM</option>
            <option value="20:30">08.30 PM</option>
            <option value="21:00">09.00 PM</option>
            <option value="21:30">09.30 PM</option>
            <option value="22:00">10.00 PM</option>
            <option value="22:30">10.30 PM</option>
            <option value="23:00">11.00 PM</option>
            <option value="23:30">11.30 PM</option></>);

        const { emails_group_list } = this.props;
        console.log('email in configure', emails_group_list)
        return (
            <>

                {/* Modal */}
                <div className="modal right fade myModal" id="myModa21" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}

                        <div className="modal-content create-lead-model">
                            <Scrollbar>
                                <div className="modal-header d-flex align-items-center px-lg-5 px-4">
                                    <button type="button" className="close mr-3" data-dismiss="modal" onClick={()=>this.setState({emailSuccessMsg:''})}>
                                        <img src="images/icons/icon-close2.png" alt="close" />
                                    </button>
                                    <h5 className="modal-title fz24">Configure Report</h5>
                                </div>
                                <div id="create-lead" className="modal-body pt-0">

                                    <div className='v-scroll_st px-lg-5 px-4'>

                                        <h5 className='font-weight-bold mb-3'>Select Report(s)</h5>

                                        <div className='row report_checkbox mb-4'>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Leads" onClick={(e) => this.setState({ selectedReport: "Leads" })} checked={this.state.selectedReport == "Leads" ? true : false} />
                                                    <label className="custom-control-label" htmlFor="Leads">Leads</label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Product Master" onClick={(e) => this.setState({ selectedReport: "Product Master" })} checked={this.state.selectedReport == "Product Master" ? true : false} />
                                                    <label className="custom-control-label" htmlFor="Product Master">Product Master</label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Disbursed" name="Report" onClick={(e) => this.setState({ selectedReport: "Disbursed Case" })} checked={this.state.selectedReport == "Disbursed Case" ? true : false} />
                                                    <label className="custom-control-label" htmlFor="Disbursed">Disbursed</label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Cancellation" name="" onClick={(e) => this.setState({ selectedReport: "Refunds/Cancellation" })} checked={this.state.selectedReport == "Refunds/Cancellation" ? true : false} />
                                                    <label className="custom-control-label" htmlFor="Cancellation">Cancellation</label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Disbursal" name="" onClick={(e) => this.setState({ selectedReport: "Disbursal Pending" })} checked={this.state.selectedReport == "Disbursal Pending" ? true : false} />
                                                    <label className="custom-control-label" htmlFor="Disbursal">Disbursal</label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Closed Loan" name="" onClick={(e) => this.setState({ selectedReport: "Whitelisted Cases" })} checked={this.state.selectedReport == "Whitelisted Cases" ? true : false} />
                                                    <label className="custom-control-label" htmlFor="Closed Loan">Whitelisted Cases</label>
                                                </div>
                                            </div>
                                        </div>

                                        <h5 className='font-weight-bold mb-3'>Report Frequency</h5>
                                        <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                                            <a
                                                className="nav-item nav-link active"
                                                id="daily-tab"
                                                data-toggle="tab"
                                                href="#daily"
                                                role="tab"
                                                aria-controls="daily"
                                                aria-selected="true"
                                                onClick={() => { this.optionSelected(DAILY) }}
                                            >
                                                Today

                                            </a>
                                            <a
                                                className="nav-item nav-link"
                                                id="weekly-tab"
                                                data-toggle="tab"
                                                href="#weekly"
                                                role="tab"
                                                aria-controls="weekly"
                                                aria-selected="false"
                                                onClick={() => { this.optionSelected(WEEKLY) }}
                                            >
                                                This Week

                                            </a>
                                            <a
                                                className="nav-item nav-link"
                                                id="monthly-tab"
                                                data-toggle="tab"
                                                href="#monthly"
                                                role="tab"
                                                aria-controls="monthly"
                                                aria-selected="false"
                                                onClick={() => { this.optionSelected(MONTHLY) }}

                                            >
                                                This Month

                                            </a>
                                        </div>

                                        <div className="tab-content mt-3 mb-4" id="nav-tabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="daily"
                                                role="tabpanel"
                                                aria-labelledby="daily-tab"
                                            >
                                                {/* <div>
                                    <small>Time</small>    
                                    <TimePicker onChange={this.handleTimeChange} value={this.state.time} />
                                    </div> */}
                                                <div className="row">
                                                    <div className={`col-6 ${this.state.range == TODAY ? '' : 'd-none'}`}>
                                                        <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                                Time
                                                            </InputLabel>
                                                            <NativeSelect
                                                                defaultValue={'00:00'}
                                                                inputProps={{
                                                                    name: 'time',
                                                                    id: 'uncontrolled-native',
                                                                }}
                                                                // onChange={(e) => this.setState({ selectedDay: e.target.value })}
                                                                onChange={(e) => this.handleTimeChange(e.target.value)}
                                                            >
                                                                {timeArray}
                                                            </NativeSelect>
                                                        </FormControl>


                                                    </div>
                                                    <div className={`col-6 ${this.state.range == THISWEEK ? '' : 'd-none'}`}>
                                                        <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                                Day
                                                            </InputLabel>
                                                            <NativeSelect
                                                                defaultValue={'Monday'}
                                                                inputProps={{
                                                                    name: 'day',
                                                                    id: 'uncontrolled-native',
                                                                }}
                                                                onChange={(e) => this.setState({ selectedDay: e.target.value })}
                                                            >
                                                                {
                                                                    this.state.days.map((item, index) => (
                                                                        <option value={item} >{item}</option>
                                                                    ))
                                                                }

                                                            </NativeSelect>
                                                        </FormControl>
                                                    </div>
                                                    <div className={`col-8 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                                        {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                                        <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                                        <div className="row mt-n4">
                                                            <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                                            <div>
                                                                <FormControl style={{ width: "98%", marginTop: "5px", marginLeft: "1px" }}>
                                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ marginLeft: "10px" }}></InputLabel>
                                                                    <NativeSelect
                                                                        defaultValue={1}
                                                                        inputProps={{
                                                                            name: 'dates',
                                                                            id: 'uncontrolled-native',
                                                                        }}
                                                                        onChange={(e) => this.setState({ selectedDate: e.target.value })}

                                                                    >
                                                                        {
                                                                            this.state.dates.map((item, index) => (
                                                                                <option value={item}>{item}</option>
                                                                            ))
                                                                        }

                                                                    </NativeSelect>
                                                                </FormControl>
                                                            </div>
                                                            <div style={{ marginTop: "25px", marginLeft: "1px" }}>

                                                                of the month
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>

                                            </div>


                                        </div>

                                        {/* <h5 className='font-weight-bold mb-3'>Add Recipients</h5>

                                        <div className='position-relative mb-4'>
                                            <input type="text" className='input-style' placeholder='Enter Email ID' value={this.state.emailRecipient} onChange={(e) => this.setState({ emailRecipient: e.target.value })} />
                                            <button className='add' onClick={this.addEmailRecipient}>+</button>
                                        </div> */}


                                        <h5 className='font-weight-bold mb-3'>Email Groups</h5>
                                        <div className='row report_checkbox mb-4'>
                                            {
                                                emails_group_list.length > 0 &&
                                                emails_group_list.map((data, index) => {
                                                    return (
                                                        <>
                                                            {/* <h6 key={index} className="mt-4">{data.email}</h6> */}
                                                            <div className='col-md-6 mb-2'>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id={`${data.id}`} onChange={(e) => this.selectingEmail(e, data)} checked={this.state.selectedEmailGroup == data.id ? true : false} />
                                                                    <label className="custom-control-label" htmlFor={`${data.id}`}>{data.title}</label>
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                })

                                            }

                                            {/* <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Management" />
                                                    <label className="custom-control-label" htmlFor="Management">Management</label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 mb-2'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="Accounts" />
                                                    <label className="custom-control-label" htmlFor="Accounts">Accounts</label>
                                                </div>
                                            </div> */}

                                        </div>
                                        <div className='mb-4'>
                                            <button className='link fz16 font-weight-bold' onClick={this.openEmailgroup}>Create a new group</button>
                                        </div>



                                    </div>
                                </div>
                                <div className='text-danger mt-2 pb-2 ml-5'>{this.state.emailErrorMsg}</div>

                                {/* <div className={`${this.state.emailSuccess!=null?'':'d-none'}`}>
                                <div className={`alert alert-danger ml-2 mr-2 ${this.state.emailSuccess==true?'alert-success'}`} role="alert">
                                    This is a success alert with
                                </div>
                                </div> */}
                                <div className='ml-5'><h5 className='text-success'>{this.state.emailSuccessMsg} </h5></div>


                                <div className="modal-footer mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        data-dismiss="modal"
                                        id="close-create"
                                        onClick={()=>this.setState({selectedEmailsGroups:[],selectedReport:"", selectedEmailGroup:'',emailSuccessMsg:''})}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-dark"
                                        onClick={this.saveData}
                                        disabled={this.state.selectedReport =='' || this.state.selectedEmailGroup ==''?true:false}
                                    >
                                        Save
                                    </button>
                                </div>
                                <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" id="responseModal">
                                    modal
                                </button>

                                

                            </Scrollbar>
                        </div>
                    </div>

                </div>



               



                {/*Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { emails_group_list } = state.user;
    const { user, user_id, sfid } = state.auth;



    return {
        emails_group_list,
        sfid
    };
}

export default connect(mapStateToProps)(Configure);