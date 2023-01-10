import React from 'react'
import {
    settlementRefundCancellation,merchantSettlementDownload,sendSettlementRefundsDetail,getSettlement,merchantSettlementDetail,setSettlementclickItemId
  } from '../actions/user';
  import { salesForceLogin } from "../actions/auth";
  import jsPDF from 'jspdf';
import { saveAs } from "file-saver";
import XlsxPopulate, { Promise } from "xlsx-populate";
import Pagination from '@material-ui/lab/Pagination';
import $ from 'jquery';




export default class RefundsSettlements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sellingValue: "",
            userMessage: {
                data: []
            },
            page:1,
            limit:10,
            stage:"Loan Cancelled",

        }
        //$("#example").dataTable();

    }

    componentDidMount() {
        const { merchant_sfid } = this.props
        let objData = `stage=Loan Cancelled`;
    
        this.getSettlementsData(objData);
        let getProd = { merchant_id: this.props.user_id }
       let obj = { id: this.props.user_id, token: this.props.token }
        this.props.dispatch(salesForceLogin(obj));
    
        // $('#sidebarToggleTop').click(function () {
        //   $("#accordionSidebar").toggleClass("open-close")
        // })

      //   let table = new DataTable('#example', {
      //     searching: false, paging: false, info: false,
      //     rowReorder: true,
      //     columnDefs: [
      //         { orderable: true, className: 'reorder', targets: 1 },
      //         { orderable: true, className: 'reorder', targets: 4 },
      //         { orderable: false, targets: '_all' }
      //     ]
      // });
    
    }

    openSettlementDetails = (id) => {
      this.props.dispatch(setSettlementclickItemId(id));
      this.props.dispatch(merchantSettlementDetail(id));
    }


      getSettlementsData = (getData) => {
        const { sfid } = this.props
        this.props.dispatch(settlementRefundCancellation(getData, sfid));
        // this.props.dispatch(getLeadsCount(getData, sfid));
      }
      handleChangePage = (event,value) => {
        const  sfid  = localStorage.getItem('sfid');
        let data = `page=${value}&stage=${this.state.stage}&limit=${this.state.limit}`;
        this.setState({ page: value });
        this.props.dispatch(getSettlement(data, sfid));
      }
    
      handleChangelimitOfPage = (event) => {
        let perRowData  = event.target.value;
        const sfid  = localStorage.getItem('sfid');
        // let data =  `page=${perRowData}`;
        let data = `page=${this.state.page}&stage=${this.state.stage}&limit=${perRowData}`;
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
        console.log("getData", getData);
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

        const { userMessage } = this.props;
        const totalPages = userMessage.refund_count ? Math.ceil(userMessage.refund_count / Number(this.state.limit)): 1;
        console.log('STTTLEMEDUE', userMessage)
        return (
            <>

                    <div className="table-responsive">
                        <table
                            className="table settlement_due_table sortable"
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
                                            <div className="d-none">
                                                <button className="up"></button>
                                                <button className="down"></button>
                                            </div>
                                        </div>

                                    </th>
                                    <th>Applicant Details</th>
                                    <th>Product Name</th>
                                    <th>
                                        <div className="d-flex align-items-center">Refund Amount
                                            <div className="d-none">
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
                                                        onClick={() => this.openSettlementDetails(item.opp_id)}

                                                    > {item.opp_id}</p>
                                                    {/* onClick = {()=>this.props.dispatch(sendSettlementRefundsDetail(item))}*/}
                                                    <span className="ai_d">{item.created_at}</span>
                                                </td>
                                                <td>
                                                    <p>{item.name}</p>
                                                    <span
                                                                      
                                                    >{item.mobile}</span>
                                                </td>
                                                <td>{item.product_name}</td>
                                                <td>₹ {item.amount}</td>
                                                <td>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                   
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

            </>
        );
    }
}
