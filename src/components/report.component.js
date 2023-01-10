import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Sidebar from "../common/sidebar";
import { getUsers, getRole, getRoleData, getUserData, getReportData, getUserProfile, getEmailsGroup, sendEmailReport } from "../actions/user"
import {
  openAddUser,
  openAddRole,
  openEditRole,
  openEditUser
} from "../actions/model"



import { getRoles } from "@testing-library/react";
import TimePicker from 'react-bootstrap-time-picker';
import Topbar from "../common/topbar";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import XlsxPopulate, { Promise } from "xlsx-populate";
import { saveAs } from "file-saver";
// import { alpha } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


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
const Weekly = "Weekly";
const Monthly = "Monthly";




class Report extends Component {

  constructor() {
    super()
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
    this.selectReport = this.selectReport.bind(this);
    this.DownloadReport = this.DownloadReport.bind(this);
    this.stageReportIs = this.stageReportIs.bind(this);
    this.returnTime = this.returnTime.bind(this);
    this.returnDate = this.returnDate.bind(this);
    this.saveAsExcel = this.saveAsExcel.bind(this);
    this.getSheetData = this.getSheetData.bind(this);
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
      emailSuccessMsg:''
    };

  }

  componentDidMount() {

    $('#sidebarToggleTop').click(function () {
      $("#accordionSidebar").toggleClass("open-close")
    })

    //itinerary
    $('.date').click(function () {
      $(this).parent('.accordion_box').siblings('.accordion_box').children('.date').next().slideUp();
      $(this).parent('.accordion_box').siblings('.accordion_box').children('.date').removeClass('active');
      $(this).toggleClass('active');
      $(this).next('.day_plan').slideToggle();
      $(this).next().find('.nav-item').removeClass('active');
      $(this).next().find('.nav-item').first().addClass('active');
    });

    const { user_id, sfid } = this.props;
    let data = {
      id: user_id,
    }
    this.props.dispatch(getUsers(data));
    let getData = {
      owner_id: user_id
    }
    this.props.dispatch(getRole(getData));
    let userData = {
      user_sfid: localStorage.getItem('sfid')
    }
    this.props.dispatch(getUserProfile(userData))
      .then((response) => {
        if (response.responseCode === 200)
          console.log('email', response.profile.email__c)
        {
          this.setState({ email: response.profile.email__c });
        }

      })
    //
    let usersData = {
      "lender_sfid": localStorage.getItem('sfid')
    }
    this.props.dispatch(getEmailsGroup(usersData))
      .then((response) => {
      })


  }

  handleDateChange = (val, date) => {
    console.log(val, date);

    if (val == "start") {
      this.setState({
        start_date: date,
        range: CUSTOM
      })
    } else {
      this.setState({
        end_date: date,
        range: CUSTOM
      })
    }
    this.setState({ time:"00:00" });

  };
  optionSelected = (opt) => {

    switch (opt) {
      case DAILY:
        this.setState({
          // start_date : new Date(),
          // end_date : new Date(),
          range: TODAY
        })
        break;
      case WEEKLY:
        // let curr = new Date(); // get current date
        // var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        // var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
        this.setState({
          // start_date : firstday,
          // end_date : lastday
          range: THISWEEK
        })
        break;
      case MONTHLY:
        // let date = new Date();
        // let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        // let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.setState({
          // start_date : firstDay,
          // end_date : lastDay,
          range: THISMONTH
        })
        break;
      default:
        break;
    }
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
    this.props.dispatch(getUserData(data)).then((response) => {

    });
    this.props.dispatch(openEditUser(usersid));

  }

  handleTimeChange(time) {
    console.log("time is=", time);     // <- prints "3600" if "01:00" is picked
    this.setState({ time });
  }

  selectReport = (reportIs) => {
    this.setState({
      report: reportIs,
      range: TODAY
    })
  }

  stageReportIs = () => {
    const { report } = this.state
    switch (report) {
      case DISBURSED_CASE:
        return STAGE1
      case DISBURSAL_PENDING:
        return STAGE2
      case REFUND_CACELLATION:
        return STAGE3
      default:
        break;
    }
  }

  returnTime = (value) => {
    let date = new Date(value);
    let hour = date.getHours();
    let minute = date.getMinutes();
    // return hour + ':' + minute
    return value
  }
  returnDate = (value) => {
    let date = new Date(value);
    let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1;
    month = month >= 10 ? month : '0' + month;
    let year = date.getFullYear();
    console.log(date, "convert date", year + '-' + month + '-' + day)
    return year + '-' + month + '-' + day
  }

  DownloadReport = () => {
    const { report, start_date, end_date, time, range } = this.state
    const { sfid } = this.props;
    let stageValue = this.stageReportIs();
    let url
    if (report == LEADS || report == PRODUCT_MASTER || report == WHITELISTED) {
      if (range == TODAY) {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&time=${this.returnTime(time)}`
        // url = 'merchant_sfid=00171000008GurGAAS&start_date=2022-01-01&end_date=2022-07-30&report_section=Product Master&date_range=Custom'
      } else if (range == CUSTOM) {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&start_date=${this.returnDate(start_date)}&end_date=${this.returnDate(end_date)}`
      } else {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}`
      }
    } else {
      if (range == TODAY) {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&time=${this.returnTime(time)}&stage_name=${stageValue}`
      } else if (range == CUSTOM) {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&start_date=${this.returnDate(start_date)}&end_date=${this.returnDate(end_date)}&stage_name=${stageValue}`
      } else {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&stage_name=${stageValue}`
      }
    }
    // console.log(url);
    this.props.dispatch(getReportData(url)).then(response => {
      // console.log(response)
      if (response.status == "success") {
        if (response.proData.length > 0) {
          this.saveAsExcel(response.proData)
        } else {
          alert('No Data found')
        }
      } else {
        alert('Error while fetching data')
      }
    })
      .catch(error => {
        console.log(error)
        alert('Error while fetching data')
      })
  }
  sendEmail = () => {
    const { report, start_date, end_date, time, range } = this.state
    const { sfid } = this.props;
    let stageValue = this.stageReportIs();
    let url

    console.log('user range', range)

    if (report == LEADS || report == PRODUCT_MASTER || report == WHITELISTED) {
      if (range == TODAY) {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&time=${this.returnTime(time)}&email=${this.state.email}`
        // url = 'merchant_sfid=00171000008GurGAAS&start_date=2022-01-01&end_date=2022-07-30&report_section=Product Master&date_range=Custom'
      } else if (range == CUSTOM) {
        console.log('yess custome call')
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&start_date=${this.returnDate(start_date)}&end_date=${this.returnDate(end_date)}&email=${this.state.email}`
      } else {
        if (range == Weekly) {
          
          url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&weekly_day=${this.state.selectedDay}&email=${this.state.email}`
        }
        if (range == Monthly) {
          url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&monthly_date=${this.state.selectedDate}&email=${this.state.email}`
        }

      }
    } else {
      if (range == TODAY) {

        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&time=${this.returnTime(time)}&stage_name=${stageValue}&email=${this.state.email}`
      } else if (range == CUSTOM) {
        url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&start_date=${this.returnDate(start_date)}&end_date=${this.returnDate(end_date)}&stage_name=${stageValue}&email=${this.state.email}`

      } else {
        if (range == Weekly) {
          url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&stage_name=${stageValue}&weekly_day=${this.state.selectedDay}&email=${this.state.email}`
        }
        if (range == Monthly) {
          url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&stage_name=${stageValue}&monthly_date=${this.state.selectedDate}&email=${this.state.email}`
        }

        //url = `merchant_sfid=${sfid}&report_section=${report}&date_range=${range}&stage_name=${stageValue}`
      }
    }
    // console.log(url);
    this.props.dispatch(sendEmailReport(url)).then(response => {
      console.log(response)
      if (response.status == "success") {
        this.setState({emailSuccessMsg:response.message})
        document.getElementById('responseModal').click()

        } else {
        alert('Error while fetching data')
      }
    })
      .catch(error => {
        console.log(error)
        alert('Error while fetching data')
      })



  }
  getSheetData = async (data, header) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  saveAsExcel = async (getData) => {
    var data = getData;
    var header = Object.keys(getData[0])
    const { report } = this.state
    // console.log("data", data);
    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = await this.getSheetData(data, header);
      const totalColumns = sheetData[0].length;
      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, report + ".xlsx");
      });
    });
  }
  // sendEmail = () => {
  //   console.log('user email', this.state.email)
  // }
  // const selectDay=(e)=>{
  //   console.log('selected day')

  // }

  render() {
    const { user_id, users, roles } = this.props;
    const { time, start_date, end_date } = this.state
    if (!user_id) {
      return <Redirect to="/login" />
    }
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
    return (
      <>
        <Helmet>
          <title> Report </title>
        </Helmet>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar
                dispatch={this.props.dispatch}
                title={"Report"}
              />
              <div className="container-fluid">
                <div className="row product_page">
                  <div className="col-lg-12 text-right">
                    <span
                      className="nav_icons nav_download btn_style d-inline-block"
                      data-toggle="modal"
                      data-target="#myModa21"
                    ><img src="img/icon_Settings.svg" alt="Download" /> Configure</span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6">
                    <div className="accordion">
                      <div className="report_accordion">
                        <div className="accordion_box">
                          <div className="date" onClick={() => { this.selectReport(LEADS) }}>
                            <h4>Leads</h4>
                          </div>

                          <div className="day_plan">
                            <label className="report-data-label">Duration</label>

                            <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                              <a
                                className="nav-item nav-link active"
                                id="daily-tab"
                                data-toggle="tab"
                                // href="#daily"
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
                                // href="#weekly"
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
                                // href="#monthly"
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
                                <div className="row">
                                  <div className={`col-6 ${this.state.range == TODAY || this.state.range == CUSTOM ? '' : 'd-none'}`}>
                                    {/* <label className="report-data-label">Time</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardTimePicker
                                        value={time}
                                        onChange={this.handleTimeChange}
                                      />
                                    </MuiPickersUtilsProvider>  */}
                                    <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Time
                                      </InputLabel>
                                      <NativeSelect
                                        defaultValue={'00:00'}
                                        value={this.state.time}
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
                                  {/* this code for date dropdown*/}
                                  <div className={`col-6 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                    {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                    <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                    <div className="row mt-n4">
                                      <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                      <div>
                                        <FormControl style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}>
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
                                      <div style={{ marginTop: "25px", marginLeft: "15px" }}>

                                        of the month
                                      </div>
                                    </div>
                                  </div>

                                  {/* this code for date dropdown end*/}

                                </div>
                                <div className="py-5 text-center or-text"><span className="orTag mr-2"></span>OR<span className="orTag ml-2"></span></div>
                                <div className="row mb-4">
                                  <div className="col-lg-6">
                                    <label htmlFor="from" className="report-data-label">From Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={start_date}
                                        onChange={(date) => { this.handleDateChange("start", date) }}
                                        maxDate={new Date()}

                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                  <div className="col-lg-6">
                                    <label htmlFor="to" className="report-data-label">To Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={end_date}
                                        onChange={(date) => { this.handleDateChange("end", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                                <div className="row justify-content-end">
                                  <div className="col-auto">
                                    <div className="product_page">
                                      <button className="nav_icons nav_download btn_style d-inline-block mr-3" onClick={this.sendEmail}><img src="images/icons/icon-email.png" /> Send Email</button>
                                      <button className="nav_icons nav_download btn_style d-inline-block" onClick={this.DownloadReport}><img src="images/icons/download.png" /> Download</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                        <div className="accordion_box">
                          <div className="date" onClick={() => { this.selectReport(PRODUCT_MASTER) }}>
                            <h4>Product Master</h4>
                          </div>
                          <div className="day_plan">
                            <label className="report-data-label">Duration</label>

                            <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                              <a
                                className="nav-item nav-link active"
                                id="daily-tab"
                                data-toggle="tab"
                                // href="#daily"
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
                                // href="#weekly"
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
                                // href="#monthly"
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
                                <div className="row">
                                  <div className={`col-6 ${this.state.range == TODAY || this.state.range == CUSTOM ? '' : 'd-none'}`}>
                                    {/* <label className="report-data-label">Time</label>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                      value={time}
                                      onChange={()=>this.handleTimeChange}
                                    />
                                  </MuiPickersUtilsProvider> */}
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
                                  {/* this code for date dropdown*/}
                                  <div className={`col-6 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                    {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                    <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                    <div className="row mt-n4">
                                      <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                      <div>
                                        <FormControl style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}>
                                          <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
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
                                      <div style={{ marginTop: "25px", marginLeft: "15px" }}>

                                        of the month
                                      </div>
                                    </div>
                                  </div>

                                </div>
                                <div className="py-5 text-center or-text"><span className="orTag mr-2"></span>OR<span className="orTag ml-2"></span></div>
                                <div className="row mb-4">
                                  <div className="col-lg-6">
                                    <label htmlFor="from" className="report-data-label">From Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={start_date}
                                        onChange={(date) => { this.handleDateChange("start", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                  <div className="col-lg-6">
                                    <label htmlFor="to" className="report-data-label">To Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={end_date}
                                        onChange={(date) => { this.handleDateChange("end", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                                <div className="row justify-content-end">
                                  <div className="col-auto">
                                    <div className="product_page">
                                      <button className="nav_icons nav_download btn_style d-inline-block mr-3" onClick={this.sendEmail}><img src="images/icons/icon-email.png" /> Send Email</button>
                                      <button className="nav_icons nav_download btn_style d-inline-block" onClick={this.DownloadReport}><img src="images/icons/download.png" /> Download</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="accordion_box">
                          <div className="date" onClick={() => { this.selectReport(DISBURSED_CASE) }}>
                            <h4>Disbursed Cases</h4>
                          </div>
                          <div className="day_plan">
                            <label className="report-data-label">Duration</label>

                            <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                              <a
                                className="nav-item nav-link active"
                                id="daily-tab"
                                data-toggle="tab"
                                // href="#daily"
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
                                // href="#weekly"
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
                                // href="#monthly"
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
                                <div className="row">
                                  <div className={`col-6 ${this.state.range == TODAY || this.state.range == CUSTOM ? '' : 'd-none'}`}>
                                    {/* <label className="report-data-label">Time</label>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                      value={time}
                                      onChange={this.handleTimeChange}
                                    />
                                  </MuiPickersUtilsProvider> */}
                                    <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Time
                                      </InputLabel>
                                      <NativeSelect
                                        defaultValue={'00:00'}
                                        value={this.state.time}
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
                                  {/* this code for date dropdown*/}
                                  <div className={`col-6 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                    {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                    <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                    <div className="row mt-n4">
                                      <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                      <div>
                                        <FormControl style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}>
                                          <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
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
                                      <div style={{ marginTop: "25px", marginLeft: "15px" }}>

                                        of the month
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                <div className="py-5 text-center or-text"><span className="orTag mr-2"></span>OR<span className="orTag ml-2"></span></div>
                                <div className="row mb-4">
                                  <div className="col-lg-6">
                                    <label htmlFor="from" className="report-data-label">From Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={start_date}
                                        onChange={(date) => { this.handleDateChange("start", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                  <div className="col-lg-6">
                                    <label htmlFor="to" className="report-data-label">To Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={end_date}
                                        onChange={(date) => { this.handleDateChange("end", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                                <div className="row justify-content-end">
                                  <div className="col-auto">
                                    <div className="product_page">
                                      <button className="nav_icons nav_download btn_style d-inline-block mr-3" onClick={this.sendEmail}><img src="images/icons/icon-email.png" /> Send Email</button>
                                      <button className="nav_icons nav_download btn_style d-inline-block" onClick={this.DownloadReport}><img src="images/icons/download.png" /> Download</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="accordion_box">
                          <div className="date" onClick={() => { this.selectReport(DISBURSAL_PENDING) }}>
                            <h4>Disbursal Pending</h4>
                          </div>
                          <div className="day_plan">
                            <label className="report-data-label">Duration</label>

                            <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                              <a
                                className="nav-item nav-link active"
                                id="daily-tab"
                                data-toggle="tab"
                                // href="#daily"
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
                                // href="#weekly"
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
                                // href="#monthly"
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
                                <div className="row">
                                  <div className={`col-6 ${this.state.range == TODAY || this.state.range == CUSTOM ? '' : 'd-none'}`}>
                                    {/* <label className="report-data-label">Time</label>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                      value={time}
                                      onChange={this.handleTimeChange}
                                    />
                                  </MuiPickersUtilsProvider> */}
                                    <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Time
                                      </InputLabel>
                                      <NativeSelect
                                        defaultValue={'00:00'}
                                        value={this.state.time}
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
                                  {/* this code for date dropdown*/}
                                  <div className={`col-6 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                    {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                    <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                    <div className="row mt-n4">
                                      <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                      <div>
                                        <FormControl style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}>
                                          <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
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
                                      <div style={{ marginTop: "25px", marginLeft: "15px" }}>
                                        of the month
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                <div className="py-5 text-center or-text"><span className="orTag mr-2"></span>OR<span className="orTag ml-2"></span></div>
                                <div className="row mb-4">
                                  <div className="col-lg-6">
                                    <label htmlFor="from" className="report-data-label">From Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={start_date}
                                        onChange={(date) => { this.handleDateChange("start", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                  <div className="col-lg-6">
                                    <label htmlFor="to" className="report-data-label">To Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={end_date}
                                        onChange={(date) => { this.handleDateChange("end", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                                <div className="row justify-content-end">
                                  <div className="col-auto">
                                    <div className="product_page">
                                      <button className="nav_icons nav_download btn_style d-inline-block mr-3" onClick={this.sendEmail}><img src="images/icons/icon-email.png" /> Send Email</button>
                                      <button className="nav_icons nav_download btn_style d-inline-block" onClick={this.DownloadReport}><img src="images/icons/download.png" /> Download</button>
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
                  <div className="col-lg-6">
                    <div className="accordion">
                      <div className="report_accordion">

                        <div className="accordion_box">
                          <div className="date" onClick={() => { this.selectReport(REFUND_CACELLATION) }}>
                            <h4>Refunds/Cancellation</h4>
                          </div>
                          <div className="day_plan">
                            <label className="report-data-label">Duration</label>

                            <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                              <a
                                className="nav-item nav-link active"
                                id="daily-tab"
                                data-toggle="tab"
                                // href="#daily"
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
                                // href="#weekly"
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
                                // href="#monthly"
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
                                <div className="row">
                                  <div className={`col-6 ${this.state.range == TODAY || this.state.range == CUSTOM ? '' : 'd-none'}`}>
                                    {/* <label className="report-data-label">Time</label>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                      value={time}
                                      onChange={this.handleTimeChange}
                                    />
                                  </MuiPickersUtilsProvider> */}
                                    <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Time
                                      </InputLabel>
                                      <NativeSelect
                                        defaultValue={'00:00'}
                                        value={this.state.time}
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
                                  {/* this code for date dropdown*/}
                                  <div className={`col-6 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                    {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                    <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                    <div className="row mt-n4">
                                      <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                      <div>
                                        <FormControl style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}>
                                          <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
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
                                      <div style={{ marginTop: "25px", marginLeft: "15px" }}>

                                        of the month
                                      </div>
                                    </div>
                                  </div>

                                </div>
                                <div className="py-5 text-center or-text"><span className="orTag mr-2"></span>OR<span className="orTag ml-2"></span></div>
                                <div className="row mb-4">
                                  <div className="col-lg-6">
                                    <label htmlFor="from" className="report-data-label">From Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={start_date}
                                        onChange={(date) => { this.handleDateChange("start", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                  <div className="col-lg-6">
                                    <label htmlFor="to" className="report-data-label">To Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={end_date}
                                        onChange={(date) => { this.handleDateChange("end", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                                <div className="row justify-content-end">
                                  <div className="col-auto">
                                    <div className="product_page">
                                      <button className="nav_icons nav_download btn_style d-inline-block mr-3" onClick={this.sendEmail}><img src="images/icons/icon-email.png" /> Send Email</button>
                                      <button className="nav_icons nav_download btn_style d-inline-block" onClick={this.DownloadReport}><img src="images/icons/download.png" /> Download</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="accordion_box">
                          <div className="date" onClick={() => { this.selectReport(WHITELISTED) }}>
                            <h4>Whitelisted Cases</h4>
                          </div>
                          <div className="day_plan">
                            <label className="report-data-label">Duration</label>

                            <div className="nav nav-tabs report_frequency_tabs" id="nav-tab" role="tablist">
                              <a
                                className="nav-item nav-link active"
                                id="daily-tab"
                                data-toggle="tab"
                                // href="#daily"
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
                                // href="#weekly"
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
                                // href="#monthly"
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
                                <div className="row">
                                  <div className={`col-6 ${this.state.range == TODAY || this.state.range == CUSTOM ? '' : 'd-none'}`}>
                                    {/* <label className="report-data-label">Time</label>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                      value={time}
                                      onChange={this.handleTimeChange}
                                    />
                                  </MuiPickersUtilsProvider> */}
                                    <FormControl style={{ width: "100%", marginTop: "10px" }}>
                                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Time
                                      </InputLabel>
                                      <NativeSelect
                                        defaultValue={'00:00'}
                                        value={this.state.time}
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
                                  {/* this code for date dropdown*/}
                                  <div className={`col-6 ${this.state.range == THISMONTH ? '' : 'd-none'}`}>
                                    {/* <div className="row">
                                    <div>Date</div>
                                  </div> */}
                                    <div className="" style={{ color: "#959595", fontSize: "11px", marginTop: "12px" }}>Date</div>

                                    <div className="row mt-n4">
                                      <div className="ml-3" style={{ marginTop: "25px" }}>Every</div>&nbsp;
                                      <div>
                                        <FormControl style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}>
                                          <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
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
                                      <div style={{ marginTop: "25px", marginLeft: "15px" }}>

                                        of the month
                                      </div>
                                    </div>
                                  </div>

                                </div>
                                <div className="py-5 text-center or-text"><span className="orTag mr-2"></span>OR<span className="orTag ml-2"></span></div>
                                <div className="row mb-4">
                                  <div className="col-lg-6">
                                    <label htmlFor="from" className="report-data-label">From Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={start_date}
                                        onChange={(date) => { this.handleDateChange("start", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                  <div className="col-lg-6">
                                    <label htmlFor="to" className="report-data-label">To Date</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        format="dd - MM - yyyy"
                                        value={end_date}
                                        onChange={(date) => { this.handleDateChange("end", date) }}
                                        maxDate={new Date()}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                                <div className="row justify-content-end">
                                  <div className="col-auto">
                                    <div className="product_page">
                                      <button className="nav_icons nav_download btn_style d-inline-block mr-3" onClick={this.sendEmail}><img src="images/icons/icon-email.png" /> Send Email</button>
                                      <button className="nav_icons nav_download btn_style d-inline-block" onClick={this.DownloadReport}><img src="images/icons/download.png" /> Download</button>
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

            </div>

          </div>


        </div>
        <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" id="responseModal">
                                    modal
        </button>


        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body ">
                                <div className='d-flex justify-content-center'>
                                 <h5 className="text-success">{this.state.emailSuccessMsg}</h5>
                            </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { user, user_id, sfid } = state.auth;
  const { users, roles, reportData } = state.user;
  return {
    user,
    user_id,
    users,
    sfid,
    roles,
    reportData
  };
}

export default connect(mapStateToProps)(Report);
