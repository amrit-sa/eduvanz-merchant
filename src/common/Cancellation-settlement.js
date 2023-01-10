import React from 'react'
// import {
//     getSettlement,
//   } from '../actions/user';
import { closeLoanCanelModal } from "../actions/model"
import { selectedCancelationId ,getSettlement,merchantSettlementDetail,setSettlementclickItemId} from "../actions/user"
import Pagination from '@material-ui/lab/Pagination';


export default class Cancellationsettlement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sellingValue: "",
            page:1,
            limit:10,
            stage:"Cancellation Request"
            
        

        }
    }

    closeCancelModel = (ele) => {
        this.props.dispatch(selectedCancelationId(ele))
        this.props.dispatch(closeLoanCanelModal())
      }

      handleChangePage = (event,value) => {
        const sfid  = localStorage.getItem('sfid');
        let data = `page=${value}&section=${this.state.stage}&limit=${this.state.limit}`;
        this.setState({ page: value });
        this.props.dispatch(getSettlement(data, sfid));
      }
    
      handleChangelimitOfPage = (event) => {
        let perRowData  = event.target.value;
        const sfid  = localStorage.getItem('sfid');
        // let data =  `page=${perRowData}`;
        let data = `page=1&section=${this.state.stage}&limit=${perRowData}`;
        this.setState({ limit: perRowData });
        this.props.dispatch(getSettlement(data, sfid));
      }


      openSettlementDetails = (id) => {
        this.props.dispatch(setSettlementclickItemId(id));
        this.props.dispatch(merchantSettlementDetail(id));
      }
    
    
  
    render() {
        const { userMessage } = this.props
        //const totalPages = userMessage.cancellation_request_count ? Math.ceil(userMessage.cancellation_request_count / Number(this.state.limit)): 1;
        console.log('refundssss', userMessage)
        let totalPages=1
        if(userMessage.leadCount){
          let getArray=userMessage.leadCount[2]
          if(getArray.cancellationCount){
            totalPages = Math.ceil(getArray.cancellationCount / Number(this.state.limit));

          }
          //totalPages = Math.ceil(getArray.cancellationCount / Number(this.state.limit));
       }
        return (
            <>

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
                                        {/*<div className="d-flex flex-column">
                                          <button className="up"></button>
                                          <button className="down"></button>
                                        </div>*/}
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
                                                <div className="new_ribbon">New </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <p
                                              className="ai"
                                              data-toggle="modal"
                                              data-target="#myModal6"
                                              onClick={() => this.openSettlementDetails(item.opp_id)}

                                            >{item.opp_id}</p>
                                            <span className="ai_d">{item.created_at}</span>
                                          </td>
                                          <td>
                                            <p>{item.name}</p>
                                            <span
                                //                   data-toggle="modal"
                                // data-target="#refundModal"
                                >{item.mobile}</span>
                                          </td>
                                          <td>{item.product_name}</td>
                                          <td>₹ {item.amount}</td>
                                          <td>
                                            <div className="d-flex align-items-center">
                                              <div className="mr-2" >
                                                <button onClick={() => this.closeCancelModel(item.opp_id)} >
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
