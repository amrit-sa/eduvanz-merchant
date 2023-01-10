import React, { Component } from "react";
import $ from 'jquery';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import Sidebar from "../common/sidebar";
import { saveAs } from "file-saver";
import { Redirect } from "react-router-dom";
import jsPDF from 'jspdf';
import "jspdf-autotable"
import {
  getSettlement,
  merchantSettlementDownload, sendSettlementDetail, setActiveSettlement,merchantSettlementDetail
} from '../actions/user';
import { salesForceLogin } from "../actions/auth";
import XlsxPopulate, { Promise } from "xlsx-populate";
import Topbar from "../common/topbar";
import { closeLoanCanelModal } from "../actions/model"
import RefundsSettlements from "../common/refunds-settlement"
import SettlementDuee from "../common/settlementDuee-settlement";
import Cancellationsettlement from "../common/Cancellation-settlement";
import Pagination from '@material-ui/lab/Pagination';



import {
  openBulkModel,
  openLeadProfileModel,

} from "../actions/model"

class Settlement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: "",
      page: 1,
      limit:10,
      stage: 'Disbursed',
      notiStage: 'settlementDisbursed'
    };
  }


  componentDidMount() {

    const { merchant_sfid, activeSettlement } = this.props
    // let objData = `stage=Loan Disbursed`;
    //stages section=Disbursed,section=Settlement Due,section=Cancellation
    //var stagevalue = activeSettlement == "settlementDisbursed" ? "Loan Disbursed" : activeSettlement == "settlementRefundCount" ? "Loan Cancelled" : "Loan Declined";
    // this.getSettlementsData(objData);
    var stagevalue = activeSettlement == "settlementDisbursed" ? "Disbursed" : activeSettlement == "settlementRefundCount" ? "Settlement Due" : "Cancellation Request";

    this.handsleTabChange(stagevalue);
    let getProd = { merchant_id: this.props.user_id }
    // this.props.dispatch(getSettlementsData(getProd));
    let obj = { id: this.props.user_id, token: this.props.token }
    this.props.dispatch(salesForceLogin(obj));

    $('#sidebarToggleTop').click(function () {
      $("#accordionSidebar").toggleClass("open-close")
    })
  }

  componentWillUnmount() {
    this.props.dispatch(setActiveSettlement("settlementDisbursed"));
  }

  shouldComponentUpdate(nextProps) {
    //   console.log("active state",this.props.activeSettlement );
    if (this.props.activeSettlement != nextProps.activeSettlement) {
      let given_stage
      let objData
      switch (nextProps.activeSettlement) {
        case "settlementDisbursed":
          given_stage = 'Disbursed';
          objData = `section=${given_stage}`;
          break;
        case "settlementRefundCount":
          given_stage = 'Settlement Due';
          objData = `section=${given_stage}`;
          break;
        case "settlementCancellationRequestCount":
          given_stage = 'Cancellation Request';
          objData = `section=${given_stage}`;
          break;
        default:
          break;
      }
      this.setState({ stage: given_stage }, () => {
        this.handsleTabChange(given_stage)
      });
      return true
    } else {
      return true
    }

  }


  handsleTabChange = (stage) => {
    console.log("stage : ",stage);
    this.setState({ stage: stage });

    // let objData = `stage=${stage}`;
    let objData = `page=1&section=${stage}&limit=10`;
    this.getSettlementsData(objData);
  }

  getSettlementsData = (getData) => {
    const { sfid } = this.props
    this.props.dispatch(getSettlement(getData, sfid));
    // this.props.dispatch(getLeadsCount(getData, sfid));
  }

  // openLeads = (id) => {
  //   this.props.dispatch(openLeadProfileModel(id));
  // }

  closeCancelModel = () => {

    this.props.dispatch(closeLoanCanelModal())
  }


  openBulkModel = () => {
    this.props.dispatch(openBulkModel());
  }
  //download documents in settlement form here .



  handleChangePage = (event,value) => {
    const { sfid } = this.props;
    let data = `page=${value}&section=${this.state.stage}&limit=${this.state.limit}`;
    this.setState({ page: value });
    this.props.dispatch(getSettlement(data, sfid));
  }

  handleChangelimitOfPage = (event) => {
    let perRowData  = event.target.value;
    const { sfid } = this.props
    // let data =  `page=${perRowData}`;
    let data = `page=1&section=${this.state.stage}&limit=${perRowData}`;
    this.setState({ limit: perRowData });
    this.props.dispatch(getSettlement(data, sfid));
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

  generatePDF = () => {

    const { sfid } = this.props
    let stage = this.state.stage;
    let obj = `stage=${stage}`;
    this.props.dispatch(merchantSettlementDownload(obj, sfid)).then((response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
      } else {
        const getData = response;
        this.generatePDFData(getData);
      }
    });
  }

  generateCsv = () => {
    const { sfid } = this.props
    let stage = this.state.stage;
    let obj = `stage=${stage}`;
    this.props.dispatch(merchantSettlementDownload(obj, sfid)).then((response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {

      } else {
        const getData = response;
        this.saveAsExcel(getData);
      }
    });
  }


  generatePDFData = async getData => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Application ID", "Application Details", "Product Name", "Order Value", "Status"];
    const tableRows = [];
    await Promise.all(getData.map((item, index) => {
      const leadData = [
        index + 1,
        item.opp_id ? item.opp_id : '-',
        item.name ? item.name : '-',
        item.product_name ? item.product_name : '-',
        item.product_mrp ? item.product_mrp : '-',
        item.status ? item.status : '-',
      ];
      tableRows.push(leadData);
    }));
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Closed tickets within the last one month.", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  }

  saveAsExcel = async (getData) => {
    var data = [];
    await Promise.all(getData.map(async (item, index) => {
      data.push({
        s_no: index + 1,
        opp_id: item.opp_id ? item.opp_id : '-',
        name: item.name ? item.name : '-',
        product_name: item.product_name ? item.product_name : '-',
        product_mrp: item.product_mrp ? item.product_mrp : '-',
        status: item.status ? item.status : '-',
      })
    }));
    let header = ["#", "Application ID", "Application Details", "Product Name", "Order Value", "Status"];
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
        saveAs(res, "report.xlsx");
      });
    });
  }



  render() {
    const { leads, user_id, activeSettlement, leadsCount,show_searched,globalSearch  } = this.props
    const { stage } = this.state
    //const userMessage={}
    let {userMessage}=this.props
    console.log('new resp',userMessage.leadCount)
    let disbursedCount=0;
    let settlementCount=0;
    let cancellationCount=0;
    if(userMessage.leadCount){
      let getArray=userMessage.leadCount;
      console.log('get array',getArray)
      disbursedCount=getArray[0].disbursedCount;
      settlementCount=getArray[1].settlementCount;
      cancellationCount=getArray[2].cancellationCount;

    }
    console.log('counts',disbursedCount,settlementCount,cancellationCount)
    // console.log(this.state.stage, 'settlement date is', this.props.userMessage)
    // console.log('current active settle', activeSettlement)
    

    if (!user_id) {
      return <Redirect to="/login" />
    }
    //userMessage=show_searched ?globalSearch:userMessage
    let totalPages=1;
    if(this.state.stage=="Disbursed"){
     totalPages =  Math.ceil(disbursedCount / Number(this.state.limit));

    }
    if(this.state.stage=="Settlement Due"){
    totalPages = Math.ceil(userMessage.settlementCount / Number(this.state.limit));
    }
    if(this.state.stage=="Cancellation Request"){
      totalPages = Math.ceil(userMessage.cancellationCount / Number(this.state.limit));
    }
    
    console.log('totalpages',totalPages)
    //const totalPages = userMessage &&userMessage.disbursedCount ? Math.ceil(userMessage.disbursedCount / Number(this.state.limit)): 1;
    //const totalPages = userMessage &&userMessage.disbursedCount ? Math.ceil(userMessage.disbursedCount / Number(this.state.limit)): 1;


    // if(activeSettlement!=null && activeSettlement=="settlementRefundCount"){
    //   const b= ()=>{this.handsleTabChange('Ready to disburse')}
    //   //document.getElementById('nav-refunds').style.backgroundColor="red";
    // }

    return (
      <>
        <Helmet>
          <title> Settlement </title>
        </Helmet>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar
                dispatch={this.props.dispatch}
                title={"Settlements"}
                stage={this.state.stage}
              />
              <div className="container-fluid">

                <div className="row flex-lg-row flex-column-reverse">
                  <div className="col-md-8">
                    <div className="product_page_tabs_wrapper">
                      <nav className="product_page_tabs">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <a
                            className={`nav-item nav-link ${this.state.stage == "Disbursed" ? "active" : ""}`}
                            id="nav-disbursed-tab"
                            data-toggle="tab"
                            href="#nav-disbursed"
                            role="tab"
                            aria-controls="nav-disbursed"
                            aria-selected="true"
                            onClick={() => this.handsleTabChange('Disbursed')}
                          >
                            Disbursed
                            <span>({disbursedCount && disbursedCount})</span>
                          </a>
                          <a
                            className={`nav-item nav-link nav-settlement ${this.state.stage == "Settlement Due" ? "active" : ""}`}
                            id="nav-settlements-due-tab"
                            data-toggle="tab"
                            href="#nav-settlements-due"
                            role="tab"
                            aria-controls="nav-settlements-due"
                            aria-selected="false"
                            onClick={() => this.handsleTabChange('Settlement Due')}
                          >
                            Settlements Due
                            <span>({settlementCount && settlementCount})</span>
                          </a>
                          {/* <a
                            className={`nav-item nav-link nav-refunds ${this.state.stage == "Loan Cancelled" ? "active" : ""}`}
                            id="nav-refunds-tab"
                            data-toggle="tab"
                            href="#nav-refunds"
                            role="tab"
                            aria-controls="nav-refunds"
                            aria-selected="false"
                            onClick={() => this.handsleTabChange('Loan Cancelled')}
                          >
                            Refunds
                            <span>({userMessage.refund_count})</span>
                          </a> */}
                          <a
                            className={`nav-item nav-link  nav-cancellation  ${this.state.stage == "Cancellation Request" ? "active" : ""}`}
                            id="nav-cancellation-request-tab"
                            data-toggle="tab"
                            href="#nav-cancellation-request"
                            role="tab"
                            aria-controls="nav-cancellation-request"
                            aria-selected="false"
                            onClick={() => this.handsleTabChange('Cancellation Request')}

                          >
                            Cancellation Request
                            <span>({cancellationCount && cancellationCount})</span>
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>

                  <div className="col-md-4 d-flex justify-content-end">
                    <ul className="list-group list-group-horizontal align-items-center product_page">
                      <li className="list-group-item" id="enableDownloads">
                        <div className="dropdown">
                          <button className="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="nav_icons nav_download btn_style">
                              <img src="img/icon_Download.svg" alt="Download" /> Download
                            </span>
                          </button>
                          <div className="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                            <div className="d-flex">
                              <button type="button" onClick={this.generateCsv} className="doc-dowlload-btn">
                                <img src="images/icons/xls.png" alt="Download" className="img-fluid" />
                              </button>
                              <button type="button" onClick={this.generatePDF} className="doc-dowlload-btn">
                                <img src="images/icons/pdf.png" alt="Download" className="img-fluid" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </li>
                      {/* <li className="list-group-item"  onClick={this.openBulkModel}> */}
                      {/* <li className="list-group-item"  >
                            <span className="nav_icons nav_download btn_style">
                              <img src="img/icon_Download.svg" alt="Download" /> Download
                            </span>
                        </li> */}
                    </ul>
                  </div>
                </div>
                {/* settlement section */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-disbursed"
                            role="tabpanel"
                            aria-labelledby="nav-disbursed-tab"
                          >
                            <div className="table-responsive">
                              <table
                                className="table settlement_due_table"
                                id="dataTable"
                                cellSpacing={0}
                              >
                                <thead>
                                  <tr>
                                    <th>
                                      <div className="d-flex all_check ">
                                        <input type="checkbox" />
                                        <label style={{ color: 'black' }}>All </label>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">Application ID
                                        <div className="d-none">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>

                                    </th>
                                    <th>Applicant Details</th>
                                    <th>Product Name</th>
                                    <th>
                                      <div className="d-flex align-items-center">Order Value
                                        <div className="d-none">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                      </div>
                                      </div>
                                    </th>
                                    <th>
                                      UTR/Payment Reference
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userMessage && Object.keys(userMessage).length !== 0 && userMessage.data.length > 0 &&
                                    (
                                      userMessage.data.map((item, index) => (

                                        <tr className="shown" key={index} >
                                          <td>
                                            <div className="d-flex">
                                              <div className="single_check">
                                                <input type="checkbox" className="" />
                                                <label></label>
                                              </div>
                                              <div>
                                                <div className="new_ribbon">New </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <p
                                              className="ai"
                                              data-toggle="modal"
                                              data-target="#myModaxl3"
                                              onClick={() => this.props.dispatch(merchantSettlementDetail(item.opp_id))}


                                            >{item.opp_id ? item.opp_id : '-'}</p>
                                            {/* <b className="d-block"></b> */}
                                            {/* onClick={() => this.props.dispatch(sendSettlementDetail(item)) } */}

                                            {/* <a href={void(0)} onClick={() => this.openLeads(item.item.opp_id)}>{item.item.opp_id}</a> */}

                                            {/* <b className="d-block">{item.sfid?item.sfid:'-'}</b> */}
                                            <span className="ai_d">{item.created_at ? item.created_at : '-'}</span>
                                          </td>
                                          <td>
                                            <p
                                            // data-toggle="modal"
                                            // data-target="#myModal9"
                                            >{item.name ? item.name : '-'}</p>
                                            <span>{item.mobile ? item.mobile : '-'}</span>
                                          </td>
                                          <td>{item.product_name ? item.product_name : '-'}</td>
                                          <td>₹ {item.amount ? item.amount : '-'}</td>
                                          <td>
                                            {/*<p className="utr"> UTR: HDFC4564755675</p>*/}
                                            <p className="utr">{item.utr && item.utr !== null ? `UTR: ${item.utr}`:'UTR is not available '}</p>
                                            <span className="ai_d">{item.utr_date? item.utr_date:'-'}</span>

                                            {/*<span className="ai_d">{item.created_at ? item.created_at : '-'}</span>*/}
                                          </td>
                                        </tr>
                                      ))
                                    )
                                  }

                                </tbody>
                              </table>
                            </div>
                            {/* <div className="pagination-section d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                              <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                <p>Row per page</p>
                                <select>
                                  <option>10</option>
                                  <option>20</option>
                                  <option>30</option>
                                </select>
                              </div>
                              <div className="d-flex align-items-center pages">
                                <p>Page</p>
                                <span className="first">1</span>
                                of
                                <span className="last">52</span>
                                <button className="prev_page"></button>
                                <button className="next_page"></button>
                              </div>

                            </div> */}

                            <div className="d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                              <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                <p>Row per page</p>
                                <select page={this.state.page} onChange={this.handleChangelimitOfPage}>
                                  <option value={10}>10</option>
                                  <option value={20}>20</option>
                                  <option value={30}>30</option>
                                </select>
                              </div>
                              <div className="d-flex align-items-center pages">
                                <Pagination count={totalPages} page={this.state.page} onChange={this.handleChangePage} />

                              </div>

                            </div>
                          </div>

                          {/* settlement_due_table start from here  */}
                          <div
                            className="tab-pane fade"
                            id="nav-settlements-due"
                            role="tabpanel"
                            aria-labelledby="nav-settlements-due-tab"
                          >

                            {this.state.stage === "Settlement Due" && (
                              <SettlementDuee
                                userMessage={userMessage}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}
                            {/* <div className="table-responsive">
                              <table
                                className="table settlement_due_table"
                                id="dataTable"
                                cellSpacing={0}
                              >
                                <thead>
                                  <tr>
                                    <th>
                                      <div className="d-flex all_check">
                                        <input type="checkbox" />
                                        <label>All</label>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">Application ID
                                        <div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>

                                    </th>
                                    <th>Applicant Details</th>
                                    <th>Product Name</th>
                                    <th>
                                      <div className="d-flex align-items-center">Order Value
                                        <div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>
                                    </th>
                                    <th>
                                      Payment Expected On
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userMessage.data && userMessage.data.length > 0 &&
                                    (
                                      userMessage.data.map((item, index) => (
                                        <tr>
                                          <td>
                                            <div className="d-flex" key={index}>
                                              <div className="single_check">
                                                <input type="checkbox" className="" />
                                                <label></label>
                                              </div>
                                              <div>
                                                <div className="new_ribbon">New</div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                         
                                            <p
                                              className="ai"
                                              data-toggle="modal"
                                              data-target="#myModal5"
                                            >{item.opp_id}</p>

                                            <span className="ai_d">{item.created_at}</span>
                                          </td>
                                          <td>
                                            <p>{item.name}</p>
                                            <span>{item.mobile}</span>
                                          </td>
                                          <td>{item.product_name}</td>
                                          <td>₹ {item.product_mrp}</td>
                                          <td>


                                          </td>
                                        </tr>
                                      ))
                                    )
                                  }
                                </tbody>
                              </table>
                            </div> */}
                            {/* <div className="pagination-section d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                              <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                <p>Row per page</p>
                                <select>
                                  <option>10</option>
                                  <option>20</option>
                                  <option>30</option>
                                </select>
                              </div>
                              <div className="d-flex align-items-center pages">
                                <p>Page</p>
                                <span className="first">1</span>
                                of
                                <span className="last">52</span>
                                <button className="prev_page"></button>
                                <button className="next_page"></button>
                              </div>

                            </div> */}

                          </div>
                          {/* settlement_due_table end from here  */}

                          {/* this section is for refunds -- start */}
                          <div
                            className="tab-pane fade"
                            id="nav-refunds"
                            role="tabpanel"
                            aria-labelledby="nav-refunds-tab"
                          >
                            {this.state.stage === "Settlement Dues" && (
                              <RefundsSettlements
                                userMessage={userMessage}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}

                            {/* this section is for refunds -- end */}
                          </div>
                          {/* <div
                            className="tab-pane fade"
                            id="nav-refunds"
                            role="tabpanel"
                            aria-labelledby="nav-refunds-tab"
                          >
                            <div className="table-responsive">
                              <table
                                className="table settlement_due_table"
                                id="dataTable"
                                cellSpacing={0}
                              >
                                <thead>
                                  <tr>
                                    <th>
                                      <div className="d-flex all_check">
                                        <input type="checkbox" />
                                        <label>All</label>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">Application ID
                                        <div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>

                                    </th>
                                    <th>Applicant Details</th>
                                    <th>Product Name</th>
                                    <th>
                                      <div className="d-flex align-items-center">Refund Amount
                                        <div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>
                                    </th>
                                    <th>
                                      Cancellation Date
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userMessage.data && userMessage.data.length > 0 &&
                                    (
                                      userMessage.data.map((item, index) => (
                                        <tr>
                                          <td>
                                            <div className="d-flex" key={index}>
                                              <div className="single_check">
                                                <input type="checkbox" className="" />
                                                <label></label>
                                              </div>
                                              <div>
                                                <div className="new_ribbon">New</div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <p
                                              className="ai"
                                              data-toggle="modal"
                                              data-target="#myModal4"
                                            > {item.opp_id}</p>
                                            <span className="ai_d">{item.created_at}</span>
                                          </td>
                                          <td>
                                            <p>{item.name}</p>
                                            <span>{item.mobile}</span>
                                          </td>
                                          <td>{item.product_name}</td>
                                          <td>₹ {item.product_mrp}</td>
                                          <td>
                                          </td>
                                        </tr>
                                      ))
                                    )
                                  }
                                </tbody>
                              </table>
                            </div>
                            <div className="pagination-section d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                              <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                <p>Row per page</p>
                                <select>
                                  <option>10</option>
                                  <option>20</option>
                                  <option>30</option>
                                </select>
                              </div>
                              <div className="d-flex align-items-center pages">
                                <p>Page</p>
                                <span className="first">1</span>
                                of
                                <span className="last">52</span>
                                <button className="prev_page"></button>
                                <button className="next_page"></button>
                              </div>

                            </div>
                          </div> */}
                          {/* settlement cancelation start from here  */}
                          <div
                            className="tab-pane fade"
                            id="nav-cancellation-request"
                            role="tabpanel"
                            aria-labelledby="nav-cancellation-request-tab"
                          >

                            {this.state.stage === "Cancellation Request" && (
                              <Cancellationsettlement
                                userMessage={userMessage}
                                dispatch={this.props.dispatch}
                                user_id={this.props.user_id}
                              />
                            )}

                            {/* settlement cancelation end from here  */}

                            {/* <div className="table-responsive">
                              <table
                                className="table settlement_due_table"
                                id="dataTable"
                                cellSpacing={0}
                              >
                                <thead>
                                  <tr>
                                    <th>
                                      <div className="d-flex all_check">
                                        <input type="checkbox" />
                                        <label>All</label>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">Application ID
                                        <div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>

                                    </th>
                                    <th>Applicant Details</th>
                                    <th>Product Name</th>
                                    <th>
                                      <div className="d-flex align-items-center">Refund Amount
                                        <div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>
                                      </div>
                                    </th>
                                    <th>
                                      Actionable
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userMessage.data && userMessage.data.length > 0 &&
                                    (
                                      userMessage.data.map((item, index) => (

                                        <tr>
                                          <td>
                                            <div className="d-flex" key={item}>
                                              <div className="single_check">
                                                <input type="checkbox" className="" />
                                                <label></label>
                                              </div>
                                              <div>
                                                <div className="new_ribbon">New</div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <p
                                              className="ai"
                                              data-toggle="modal"
                                              data-target="#myModal6"
                                            >{item.opp_id}</p>
                                            <span className="ai_d">{item.created_at}</span>
                                          </td>
                                          <td>
                                            <p>{item.name}</p>
                                            <span>{item.mobile}</span>
                                          </td>
                                          <td>{item.product_name}</td>
                                          <td>₹ {item.product_mrp}</td>
                                          <td>
                                            <div className="d-flex align-items-center">
                                              <div className="mr-2" >
                                                <button onClick={this.closeCancelModel} >
                                                  <i className="fa fa-check" style={{ "color": "#0FD17E" }} aria-hidden="true" /> Approve </button></div>
                                              <div>
                                                <i className="fa fa-times" style={{ "color": "#D51332" }} aria-hidden="true"></i> Reject</div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                      ))
                                  }
                                </tbody>
                              </table>
                            </div> */}
                            {/* <div className="pagination-section d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                              <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                <p>Row per page</p>
                                <select>
                                  <option>10</option>
                                  <option>20</option>
                                  <option>30</option>
                                </select>
                              </div>
                              <div className="d-flex align-items-center pages">
                                <p>Page</p>
                                <span className="first">1</span>
                                of
                                <span className="last">52</span>
                                <button className="prev_page"></button>
                                <button className="next_page"></button>
                              </div>

                            </div> */}
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

      </>
    )
  }
}

function mapStateToProps(state) {
  const { leads, userMessage, activeSettlement, leadsCount,orderSummary,show_searched,globalSearch } = state.user;
  const { token, user, sfid, user_id } = state.auth;
  const { message } = state.message;

  return {
    user,
    leads,
    token,
    user_id,
    userMessage,
    sfid,
    message,
    leadsCount,
    activeSettlement,
    orderSummary,
    show_searched,
    globalSearch
  };
}

export default connect(mapStateToProps)(Settlement);
