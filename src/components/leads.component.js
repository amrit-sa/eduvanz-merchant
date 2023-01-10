import React, { Component } from "react";
import $ from 'jquery';
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Redirect } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { getLeads, getLeadsCount, getMerchantProducts, merchantLeadDownload, setLeadTab,setShowSearched ,setSettlementclickItemId } from "../actions/user";
import { salesForceLogin } from "../actions/auth";
import XlsxPopulate, { Promise } from "xlsx-populate"
import { saveAs } from "file-saver"
import jsPDF from 'jspdf'
import "jspdf-autotable"
import Filter from "../common/filter";
import Sidebar from "../common/sidebar";
import {
    openBulkModel,
    updateProId,
    openLeadProfileModel,
    openFilterModel,
    openEmailModel,
    openRequestModel,
    openPreviewModel,
    openSuccessModel,
    openCreateLeadModel,
    openLeadApplicationModel
} from "../actions/model"
import Topbar from "../common/topbar";

class Leads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            page: 1,
            limit: 10,
            stage: 'Pre Approval',
        };
    }

    componentDidMount() {        
        const { sfid } = this.props
        let objData = `stage=Pre Approval`;
        //let objData = ``;
        this.getLeadsData(objData);
        let getProd = { merchant_id: this.props.user_id }
        this.props.dispatch(getMerchantProducts(getProd));
        let obj = { id: this.props.user_id, token: this.props.token }
        this.props.dispatch(salesForceLogin(obj));

        $('#sidebarToggleTop').click(function () {
            $("#accordionSidebar").toggleClass("open-close")
        })
    }

    handleTabChange = (stage) => {
        this.setState({ stage: stage });
        this.props.dispatch(setLeadTab(stage))
        this.props.dispatch(setShowSearched(false))
     
        // let objData = `stage=${stage}`;
        let objData = `page=1&stage=${stage}&limit=10`;
        this.getLeadsData(objData);
    }

    getLeadsData = (getData) => {
        const { sfid } = this.props
        this.props.dispatch(getLeads(getData, sfid));
        this.props.dispatch(getLeadsCount(getData, sfid));
    }

    openCreateLeads = () => {
        this.props.dispatch(openCreateLeadModel());
    }

    openLeads = (sfid,opp_id , id) => {
        console.log('pre approve :' ,opp_id);
        this.props.dispatch(setSettlementclickItemId(opp_id));
        this.props.dispatch(openLeadProfileModel(sfid , id));
        this.props.dispatch(updateProId(opp_id));
    }
   
     toggle1=(e,id)=>{
            if(e.target.className=="fa fa-angle-up"){
                e.target.style.display="none";
                e.target.className="fa fa-angle-down"
                e.target.style.display="block";
                document.getElementById(id).style.display="none"

         }else{
            e.target.style.display="none";
            e.target.className="fa fa-angle-up"
            e.target.style.display="block";
            document.getElementById(id).style.display="table-row";
            
         }
    
    }

    openLeadApplication = (id, sfid) => {
        console.log("sfid,opp_id ", id,sfid);
        this.props.dispatch(openLeadApplicationModel(id));
        this.props.dispatch(updateProId(sfid));
    }

    openBulkModel = () => {
        this.props.dispatch(openBulkModel());
    }

    openFilter = () => {
        this.props.dispatch(openFilterModel());
    }

    openRequest = () => {
        this.props.dispatch(openRequestModel());
    }

    openEmail = () => {
        localStorage.setItem("lead_stage",this.state.stage)
        this.props.dispatch(openEmailModel());
    }

    openPreview = () => {
        this.props.dispatch(openPreviewModel());
    }

    openSuccess = () => {
        this.props.dispatch(openSuccessModel());
    }

    handleChangePage = (event, value) => {
        const sfid = localStorage.getItem('sfid');
        let data = `page=${value}&stage=${this.state.stage}&limit=${this.state.limit}`;
        this.setState({ page: value });
        this.props.dispatch(getLeads(data, sfid)).then(res=>{
            if(res.status=="success"){
                const accordian1=document.getElementsByClassName("cc1")
                const arrowup=document.getElementsByClassName("fa-angle-up")
                 for(let i=0;i<accordian1.length;i++){
                    accordian1[i].style.display="none"
                }
              for (let index = 0; index < arrowup.length; index++) {
                const element = arrowup[index];
               setTimeout(() => {
                element.classList.remove("fa-angle-up")
                element.classList.add("fa-angle-down")
               }, 1000);

              }

            }
        });
    }

    handleChangelimitOfPage = (event) => {
        let perRowData = event.target.value;
        const sfid = localStorage.getItem('sfid');
        // let data =  `page=${perRowData}`;
        let data = `page=${this.state.page}&stage=${this.state.stage}&limit=${perRowData}`;
        this.setState({ limit: perRowData });
        this.props.dispatch(getLeads(data, sfid));
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
        this.props.dispatch(merchantLeadDownload(obj, sfid)).then((response) => {
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
        this.props.dispatch(merchantLeadDownload(obj, sfid)).then((response) => {
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
                item.sfid ? item.sfid : '-',
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
        console.log("getData", getData);
        await Promise.all(getData.map(async (item, index) => {
            data.push({
                s_no: index + 1,
                sfid: item.sfid ? item.sfid : '-',
                name: item.name ? item.name : '-',
                product_name: item.product_name ? item.product_name : '-',
                product_mrp: item.product_mrp ? item.product_mrp : '-',
                status: item.status ? item.status : '-',
            })
        }));
        let header = ["#", "Application ID", "Application Details", "Product Name", "Order Value", "Status"];
        console.log("data", data);
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
        const { user_id, leadsCount,show_searched,globalSearch } = this.props;
        let { leads } = this.props;


        console.log('leadssss', leads)
        let { leadCount } = leads;
        if (!user_id) {
            return <Redirect to="/login" />
        }
        const totalPages = Math.ceil(leadCount / Number(this.state.limit));
        let searched={}
        leads=show_searched?globalSearch:leads
        console.log('show_searched',show_searched)
        console.log('global search', globalSearch,leads)
        if(show_searched){
            searched['proData']=leads;
            leads=searched
        }

        return (
            <>
                <Helmet>
                    <title>Eduvanz - Leads</title>
                </Helmet>
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar
                                dispatch={this.props.dispatch}
                                title={"Leads"}
                                createLead={true}
                                stage={this.state.stage}
                            />
                            {/* End of Topbar */}
                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                <div className="row flex-lg-row flex-column-reverse">
                                    <div className="col-md-6">
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a
                                                    className="nav-item nav-link active"
                                                    id="nav-application-tab"
                                                    data-toggle="tab"
                                                    href="#nav-pre-approval"
                                                    role="tab"
                                                    aria-controls="nav-pre-approval"
                                                    aria-selected="true"
                                                    onClick={() => this.handleTabChange('Pre Approval')}
                                                >
                                                    Pre Approval
                                                </a>
                                                <a
                                                    className="nav-item nav-link nav-post"
                                                    id="nav-documentation-tab"
                                                    data-toggle="tab"
                                                    href="#nav-post-approval"
                                                    role="tab"
                                                    aria-controls="nav-post-approval"
                                                    aria-selected="false"
                                                    onClick={() => this.handleTabChange('Post Approval')}
                                                >
                                                    Post Approval
                                                </a>
                                                {/* <a
                                                    className="nav-item nav-link nav-wislist"
                                                    id="nav-documentation-tab"
                                                    data-toggle="tab"
                                                    href="#nav-whitelisting-request"
                                                    role="tab"
                                                    aria-controls="nav-whitelisting-request"
                                                    aria-selected="false"
                                                    onClick={() => this.handleTabChange('Whitelisting Request')}
                                                >
                                                    Whitelisting Request
                                                </a> */}
                                                <a
                                                    className="nav-item nav-link nav_addicon">
                                                    {" "}
                                                    <i className="fas fa-plus" onClick={this.openFilter} style={{cursor:"pointer"}}/>{" "}
                                                </a>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-horizontal align-items-center justify-content-end">
                                            <li className="list-group-item">
                                                <span className="nav_icons nav_sorting" onClick={this.openBulkModel} >
                                                    <img src="images/sorting.svg" alt="Sort" />
                                                </span>
                                            </li>
                                            <li className="list-group-item"
                                                onClick={this.openFilter}
                                            >
                                                <span className="nav_icons nav_filter" >
                                                    <img src="img/icon_Filter.svg" alt="Filter" />
                                                </span>
                                            </li>
                                            <li className="list-group-item" id="enableDownloads">
                                                <div className="dropdown">
                                                    <button className="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span className="nav_icons nav_download">
                                                            <img src="img/icon_Download.svg" alt="Download" />
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


                                            <li className="list-group-item" onClick={this.openEmail}>
                                                <span className="nav_icons nav_download" style={{ "fontSize": "20px" }}>
                                                    {/* <img src="images/icons/icon-email.png" alt="Email" /> */}
                                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sorting_values">
                                    <ul>
                                        <li>
                                            <input
                                                type="checkbox"
                                                defaultValue="recentlyUpdated"
                                                name="radio"
                                                id="radio1"
                                            />
                                            <label htmlFor="radio1">Recently Updated</label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                defaultValue="loanAmountHightoLow"
                                                name="radio"
                                                id="radio2"
                                            />
                                            <label htmlFor="radio2">Loan Amount: High to Low</label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                defaultValue="loanAmountLowtoHigh"
                                                name="radio"
                                                id="radio3"
                                            />
                                            <label htmlFor="radio3">Loan Amount: Low to High</label>
                                        </li>
                                    </ul>
                                </div>


                                <div className="row">
                                    <div className="col-md-12 pt-2">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div
                                                        className="tab-pane fade show active"
                                                        id="nav-pre-approval"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-application-tab"
                                                    >
                                                        <div className="table-responsive">
                                                            <table
                                                                className="table"
                                                                // id="dataTable"
                                                                width="100%"
                                                                cellSpacing={0}
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>
                                                                            {/* Application ID  */}
                                                                            <div className="d-flex align-items-center">Application ID
                                                                                {/* <div className="d-flex flex-column">
                                                                                    <button className="up"></button>
                                                                                    <button className="down"></button>
                                                                                </div> */}
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            Applicant Details

                                                                        </th>
                                                                        <th>Product Name</th>
                                                                        <th>
                                                                            {/* Order Value */}
                                                                            <div className="d-flex align-items-center"> Order Value
                                                                                {/* <div className="d-flex flex-column">
                                                                                    <button className="up"></button>
                                                                                    <button className="down"></button>
                                                                                </div> */}
                                                                            </div>
                                                                        </th>
                                                                        <th>Status</th>
                                                                        <th>Actionable</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {leads.proData && leads.proData.length > 0 &&
                                                                        (
                                                                            leads.proData.map((item, index) => (
                                                                                <>
                                                                                <tr className="shown" key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td
                                                                                        data-toggle="modal"
                                                                                        data-target="#myModa20"
                                                                                    >
                                                                                        {/* while clicking open profile for approval */}
                                                                                        {/* <b href={void (0)} onClick={() => this.openLeads(item.sfid)}>{item.sfid}</b> */}
                                                                                        <div className="d-flex" >
                                                                                            <b className="underline d-block cursor-point ">
                                                                                                <a href={void (0)} onClick={() => this.openLeads(item.sfid,item.opp_id,item.id)}>{item.opp_id}</a>
                                                                                            </b>
                                                                                            <button className="ml-3"><i className="fa fa-angle-down" style={{ "fontSize": "20px" }} aria-hidden="true" onClick={(e)=>this.toggle1(e,item.opp_id)}></i></button>

                                                                                        </div>

                                                                                        {/* <b className="d-block">{item.sfid?item.sfid:'-'}</b> */}
                                                                                        <span className="date">{item.created_at ? item.created_at : '-'}</span>
                                                                                    </td>
                                                                                    <td
                                                                                        data-toggle="modal"
                                                                                        data-target="#myModal8"
                                                                                    >
                                                                                        <p><span className="d-block">{item.name ? item.name : "-"}</span></p>
                                                                                        {item.mobile ? item.mobile : '-'}
                                                                                    </td>
                                                                                    <td>{item.product_name ? item.product_name : '-'}</td>
                                                                                    <td>₹ {item.order_value ? item.order_value : '0'}</td>
                                                                                    {/* <td>₹ {item.product_mrp ? item.product_mrp : '0'}</td> */}

                                                                                    <td className="has_btn">
                                                                                        <b>{item.status ? item.status : '-'}</b>
                                                                                        {/* <span className="view_status active">&nbsp;</span> */}
                                                                                    </td>
                                                                                    <td className="has_btn">
                                                                                         {" "} 
                                                                                        {/* Send Agreement Link{" "} */}
                                                                                        {/* <span
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={() => this.openLeadApplication(item.sfid, item.opp_id)}
                                                                                            className="actionable"
                                                                                        >&nbsp;</span> */}
                                                                                        <span />
                                                                                        <img
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={() => this.openLeadApplication(item.sfid, item.opp_id)}
                                                                                            src="images/arrow-left.svg" alt="help" />
                                                                                    </td>
                                                                                </tr>

                                                                                <tr className="cc1" id={item.opp_id} >
                                                                                    <td colSpan="7">
                                                                                             <ul className="timelinerr">
                                                                                                    <li className="completee">
                                                                                                        <span className="leadTitle1">Lead Created<br/><p className="date1">25/05/1998</p></span>
                                                                                                    </li>
                                                                                                    <li className='inProgresss'>
                                                                                                        <span className="leadTitle1">Documentation<br/><p className="date1">25/05/1998</p></span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <span className="leadTitle1">Detailed Verification<br/><p className="date1">25/05/1998</p></span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <span className="leadTitle1">Place Holder<br/><p className="date1">25/05/1998</p></span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <span className="leadTitle1">Place Holder<br/><p className="date1">25/05/1998</p></span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                             </td>
                                                                                    
                                                                                    </tr>
                                                                                </>
                                                                            ))
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        <div className="d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                                                            {/* <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                                                <p>Row per page </p>
                                                                <select page={this.state.page} onChange={this.handleChangelimitOfPage}>
                                                                    <option value={10}>10</option>
                                                                    <option value={20}>20</option>
                                                                    <option value={30}>30</option>
                                                                </select>
                                                            </div> */}
                                                            <div className="d-flex align-items-center pages">
                                                                <Pagination count={totalPages ? totalPages : 0} page={this.state.page} onChange={this.handleChangePage} />

                                                            </div>

                                                        </div>
                                                        </div>
                                                        {/* <div style={{ display: 'block', padding: 30, marginLeft: "76%" }}>
                                                            <Pagination count={totalPages} page={this.state.page} onChange={this.handleChangePage} />
                                                        </div> */}
                                                    </div>


                                                    {/* post-approval */}
                                                    <div
                                                        className="tab-pane fade"
                                                        id="nav-post-approval"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-documentation-tab"
                                                    >
                                                        <div className="table-responsive">
                                                            <table
                                                                className="table"
                                                                // id="dataTable"
                                                                width="100%"
                                                                cellSpacing={0}
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>
                                                                            {/* Application ID */}
                                                                            <div className="d-flex align-items-center">Application ID
                                                                                <div className="d-none">
                                                                                    <button className="up"></button>
                                                                                    <button className="down"></button>
                                                                                </div>
                                                                            </div>

                                                                        </th>

                                                                        <th >Applicant Details</th>
                                                                        <th>Product Name</th>
                                                                        <th>
                                                                            {/* Order Value */}
                                                                            <div className="d-flex align-items-center">Order Value
                                                                                <div className="d-none">
                                                                                    <button className="up"></button>
                                                                                    <button className="down"></button>
                                                                                </div>
                                                                            </div>
                                                                        </th>
                                                                        <th>Status</th>
                                                                        <th>Actionable</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {leads.proData && leads.proData.length > 0 &&
                                                                        (
                                                                            leads.proData.map((item, index) => (
                                                                                <tr className="shown" key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>
                                                                                        <div className="d-flex">

                                                                                            <b data-toggle="modal" style={{ "cursor": "pointer" }}
                                                                                                data-target="#myModa20" className="d-block">
                                                                                                <a href={void (0)} onClick={() =>this.openLeads(item.sfid,item.opp_id,item.id)}>{item.opp_id}</a>

                                                                                            </b>
                                                                                            <button className="ml-3"><i className="fa fa-angle-down" style={{ "fontSize": "20px" }} aria-hidden="true"></i></button>
                                                                                        </div>
                                                                                        <span className="date">{item.created_at ? item.created_at : '-'}</span>

                                                                                    </td>
                                                                                    <td
                                                                                        data-toggle="modal"
                                                                                        data-target="#myModal8"
                                                                                    >
                                                                                        <p><span className="d-block">{item.name ? item.name : "-"}</span></p>
                                                                                        {item.mobile ? item.mobile : '-'}
                                                                                    </td>
                                                                                    <td>{item.product_name ? item.product_name : '-'}</td>
                                                                                    <td>₹ {item.order_value ? item.order_value : '0'}</td>
                                                                                    <td className="has_btn">
                                                                                        <b>{item.status ? item.status : '-'}</b>
                                                                                        {/* <span className="view_status active">&nbsp;</span> */}
                                                                                    </td>

                                                                                    <td className="has_btn">
                                                                                        {" "}
                                                                                        {/* Upload documents{" "} */}
                                                                                        {/* <span
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={() => this.openLeadApplication(item.sfid, item.opp_id)}
                                                                                            className="actionable"
                                                                                        >&nbsp;</span> */}
                                                                                        <span />
                                                                                        <img
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={() => this.openLeadApplication(item.sfid, item.opp_id)}
                                                                                            src="images/arrow-left.svg" alt="help" />
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        <div className="d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
                                                            {/* <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                                                <p>Row per page </p>
                                                                <select page={this.state.page} onChange={this.handleChangelimitOfPage}>
                                                                    <option value={10}>10</option>
                                                                    <option value={20}>20</option>
                                                                    <option value={30}>30</option>
                                                                </select>
                                                            </div> */}
                                                            <div className="d-flex align-items-center pages">
                                                                <Pagination count={totalPages} page={this.state.page} onChange={this.handleChangePage} />

                                                            </div>

                                                        </div>
                                                        </div>
                                                        {/* <div style={{ display: 'block', padding: 30, marginLeft: "76%" }}>
                                                            <Pagination count={totalPages} page={this.state.page} onChange={this.handleChangePage} />
                                                        </div> */}
                                                    </div>
                                                    {/* end */}

                                                    {/* whitelisting-request */}
                                                    <div
                                                        className="tab-pane fade"
                                                        id="nav-whitelisting-request"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-documentation-tab"
                                                    >

                                                        <div className="table-responsive">
                                                            <table
                                                                className="table"
                                                                // id="dataTable"
                                                                width="100%"
                                                                cellSpacing={0}
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>
                                                                            {/* Application ID */}
                                                                            <div className="d-flex align-items-center">Application ID
                                                                                <div className="d-none">
                                                                                    <button className="up"></button>
                                                                                    <button className="down"></button>
                                                                                </div>
                                                                            </div>
                                                                        </th>
                                                                        <th >Applicant Details</th>
                                                                        <th>Product Name</th>
                                                                        <th>
                                                                            {/* Order Value */}
                                                                            <div className="d-flex align-items-center"> Order Value
                                                                                <div className="d-none">
                                                                                    <button className="up"></button>
                                                                                    <button className="down"></button>
                                                                                </div>
                                                                            </div>
                                                                        </th>
                                                                        <th>Status</th>
                                                                        <th>Actionable</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {leads.proData && leads.proData.length > 0 &&
                                                                        (
                                                                            leads.proData.map((item, index) => (
                                                                                <tr className="shown" key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>
                                                                                        <div className="d-flex">
                                                                                            <b data-toggle="modal" style={{ "cursor": "pointer" }}
                                                                                                data-target="#myModa20" className="d-block">
                                                                                                {item.opp_id ? item.opp_id : '-'}
                                                                                            </b>
                                                                                            <button className="ml-3"><i className="fa fa-angle-down" style={{ "fontSize": "20px" }} aria-hidden="true"></i></button>
                                                                                        </div>
                                                                                        <span className="date">{item.created_at ? item.created_at : '-'}</span>

                                                                                    </td>
                                                                                    <td
                                                                                        data-toggle="modal"
                                                                                        data-target="#myModal8"
                                                                                    >
                                                                                        <p><span className="d-block">{item.name ? item.name : "-"}</span></p>
                                                                                        {item.mobile ? item.mobile : '-'}
                                                                                    </td>
                                                                                    <td>{item.product_name ? item.product_name : '-'}</td>
                                                                                    <td>₹ {item.product_mrp ? item.product_mrp : '0'}</td>
                                                                                    <td className="has_btn">
                                                                                        <b>{item.stage ? item.stage : '-'}</b>
                                                                                        {/* <span className="view_status active">&nbsp;</span> */}
                                                                                    </td>
                                                                                    <td className="has_btn">
                                                                                        <button className="mr-3"><i className="fa fa-check" style={{ "color": "#0FD17E" }} aria-hidden="true"></i> Approve</button>
                                                                                        <button className=""><i className="fa fa-times" style={{ "color": "#D51332" }} aria-hidden="true"></i> Reject</button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        <div className="d-flex align-items-center justify-content-lg-end justify-content-center mb-4">

                                                            {/* <div className="d-flex align-items-center row_per_page mr-lg-5 mr-4">
                                                                <p>Row per page </p>
                                                                <select page={this.state.page} onChange={this.handleChangelimitOfPage}>
                                                                    <option value={10}>10</option>
                                                                    <option value={20}>20</option>
                                                                    <option value={30}>30</option>
                                                                </select>
                                                            </div>  */}

                                                            <div className="d-flex align-items-center pages">
                                                                <Pagination count={totalPages} page={this.state.page} onChange={this.handleChangePage} />

                                                            </div>

                                                        </div>
                                                        </div>
                                                        {/* <div style={{ display: 'block', padding: 30, marginLeft: "76%" }}>
                                                            <Pagination count={totalPages} page={this.state.page} onChange={this.handleChangePage} />
                                                        </div> */}

                                                    </div>

                                                    {/* end */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Filter />
            </>
        )
    }
}

function mapStateToProps(state) {
    const { leads, leadsCount,show_searched,globalSearch } = state.user;
    const { user_id, token, sfid } = state.auth;
    const { message } = state.message;
    return {
        sfid,
        leads,
        leadsCount,
        user_id,
        token,
        message,
        show_searched,
        globalSearch
    };
}
export default connect(mapStateToProps)(Leads);