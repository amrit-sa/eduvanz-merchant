import React from 'react'
import {
    getSettlement,merchantSettlementDownload,sendSettlementDueDetail,merchantSettlementDetail
  } from '../actions/user';
  import { salesForceLogin } from "../actions/auth";
  import { connect } from "react-redux";
  import XlsxPopulate, { Promise } from "xlsx-populate";
import Topbar from "../common/topbar";
import jsPDF from 'jspdf';
import { saveAs } from "file-saver";
import { closeLoanCanelModal } from "../actions/model";
import {
    openBulkModel,
    openLeadProfileModel,
  
  } from "../actions/model"
import Pagination from '@material-ui/lab/Pagination';







 class SettlementDuee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            page:1,
            limit:10,
            stage:"Settlement Due",
        
          
          };
    }

    componentDidMount() {
        const { merchant_sfid } = this.props
        //let objData = `stage=Ready to disburse`;
        let objData = `section=Settlement Due`;
    
        this.getSettlementsData(objData);
        let getProd = { merchant_id: this.props.user_id }
       let obj = { id: this.props.user_id, token: this.props.token }
        this.props.dispatch(salesForceLogin(obj));
    
        // $('#sidebarToggleTop').click(function () {
        //   $("#accordionSidebar").toggleClass("open-close")
        // })

      //   let table = new DataTable('#settlement_due_table_dataTable', {
      //     searching: false, paging: false, info: false,
      //     rowReorder: true,
      //     columnDefs: [
      //         { orderable: true, className: 'reorder', targets: 1 },
      //         { orderable: true, className: 'reorder', targets: 4 },
      //         { orderable: false, targets: '_all' }
      //     ]
      // });
    }
    
    
      getSettlementsData = (getData) => {
        const { sfid } = this.props
        this.props.dispatch(getSettlement(getData, sfid));
      }
    
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
        const { leads, user_id, userMessage,leadsCount } = this.props
        console.log('dueeeeeeeeeeee', this.props.userMessage);
        let totalPages=1
        if(userMessage.leadCount){
          let getArray=userMessage.leadCount[1]
          if(getArray.settlementCount){
            totalPages = Math.ceil(getArray.settlementCount / Number(this.state.limit));

          }
       }
        console.log('settle due totalPages',totalPages)

        //const totalPages = userMessage.disbursalPendingCount ? Math.ceil(userMessage.disbursalPendingCount / Number(this.state.limit)): 1;

        return (
            <>
                    <div className="table-responsive">
                        <table
                            className="table settlement_due_table"
                            id="settlement_due_table_dataTable"
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
                                        <div className="d-flex align-items-center">Order Value
                                            <div className="d-none">
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
                            {/* <tbody>
                                {userMessage && userMessage.data.length > 0 &&
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
                                                    > {item.opp_id ? item.opp_id: '-' }</p>
                                                    <span className="ai_d">{item.created_at ? item.created_at : '-'}</span>
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
                            </tbody> */}
                             <tbody>
                                  {userMessage && userMessage.data.length > 0 &&
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
                                                <div className="new_ribbon">New</div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <p
                                              className="ai"
                                              data-toggle="modal"
                                              data-target="#myModal5"
                                              onClick={() => this.props.dispatch(merchantSettlementDetail(item.opp_id))}

                                            >{item.opp_id ? item.opp_id : '-'}</p>
                                            {/* <b className="d-block"></b> */}
                                            {/* <a href={void(0)} onClick={() => this.openLeads(item.item.opp_id)}>{item.item.opp_id}</a> */}
                                            {/*onClick = {()=>this.props.dispatch(sendSettlementDueDetail(item))}*/}

                                            {/* <b className="d-block">{item.sfid?item.sfid:'-'}</b> */}
                                            <span className="ai_d">{item.created_at ? item.created_at : '-'}</span>
                                          </td>
                                          <td>
                                            <p
                                            >{item.name ? item.name : '-'}</p>
                                            <span>{item.mobile ? item.mobile : '-'}</span>
                                          </td>
                                          <td>{item.product_name ? item.product_name : '-'}</td>
                                          <td>₹ {item.amount ? item.amount : '-'}</td>
                                          <td>
                                            {/* <p className="utr"> UTR: HDFC4564755675</p> */}
                                            <span className="ai_d">{item.created_at ? item.created_at : '-'}</span>
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
                

            </>
        );
    }
}

function mapStateToProps(state) {
  const { leadsCount } = state.user;
    const { token, user, sfid, user_id } = state.auth;

    const { message } = state.message;
    return {
      user,
      token,
      user_id,
      sfid,
      message,
      leadsCount
    };
  }
  
  export default connect(mapStateToProps)(SettlementDuee);
  