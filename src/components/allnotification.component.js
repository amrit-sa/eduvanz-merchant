import React from 'react'
import Topbarlogo from "../common/topbarwithlogo";
import { connect } from "react-redux";
import { getAllNotifications, setActiveSettlement } from '../actions/user';
import { Link } from "react-router-dom";



class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      totalPages: 0,
      showPagination: false,
      perPage: 5

    }

  }
  componentDidMount() {
    const { sfid } = this.props
    this.props.dispatch(getAllNotifications(sfid));
  }

  prePage = () => {
    let currentpage = this.state.activePage;
    if (currentpage != 0) {
      this.setState({ activePage: currentpage - 1 });
    }
  }
  nextPage = () => {
    let currentpage = this.state.activePage;
    this.setState({ activePage: currentpage + 1 });
  }

  arrDivide = (inputArray) => {
    let devideArray = []
    const result = inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / this.state.perPage)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      devideArray = resultArray
      return resultArray
    }, [])
    return devideArray
  }

  render() {
    const { allNotificationsData, activeSettlement } = this.props;
    const noticationCount = []
    const noticationCountdetail = []
    for (let i = 0; i < allNotificationsData.length; i++) {
      let given_object = allNotificationsData[i];
      delete given_object["status"];
      delete given_object["message"];
      let allKeys = Object.keys(given_object);
      let countKeys = allKeys.filter((item) => item.includes('Count') && !item.includes('CountData'))
      let countKeysData = allKeys.filter((item) => item.includes('CountData'))
      for (let j = 0; j < countKeys.length; j++) {
        let settlementType = null;
        if (countKeys[j] == "settlementDisbursedCount") {
          settlementType = 'settlementDisbursed';
        }
        if (countKeys[j] == "settlementCancellationRequestCount") {
          settlementType = 'settlementCancellationRequestCount';
        }
        if (countKeys[j] == "settlementRefundCount") {
          settlementType = 'settlementRefundCount'
        }
        if (given_object[countKeys[j]][0] != '0') {
          noticationCount.push(
            <li>
              <div class="drodown-listing cancel-bg">
                <div class="left-column-notification"><span class="notification-title">{given_object[countKeys[j]]}</span>
                  <div class="small">Just Now</div></div>
                {settlementType == null ?
                  <Link to="/leads" className='viewall'>View All</Link>
                  : <Link to="/settlement" className='viewall' onClick={() => this.props.dispatch(setActiveSettlement(settlementType))}>View All</Link>
                }
              </div>
            </li>

          )
        }
      }
      for (let k = 0; k < countKeysData.length; k++) {
        let settlementType = null;
        if (countKeysData[k] == "disburseCountData") {
          settlementType = 'settlementDisbursed';
        }
        if (countKeysData[k] == "cancellationRequestCountData") {
          settlementType = 'settlementCancellationRequestCount';
        }
        if (countKeysData[k] == "refundCountData") {
          settlementType = 'settlementRefundCount'
        }
        if (given_object[countKeysData[k]].length > 0) {
          let requiredData = given_object[countKeysData[k]];
          for (let m = 0; m < requiredData.length; m++) {
            if (requiredData[m].amount != null) {
              noticationCountdetail.push(
                <li>
                  <div class="drodown-listing">
                    <div class="left-column-notification"><span class="notification-title">{`₹ ${requiredData[m].amount} ${requiredData[m].stagename} for app id ${requiredData[m].sfid} `}</span>
                      <div class="small">{requiredData[m].createddate}</div></div>
                    {settlementType == null ?
                      <Link to="/leads" className='viewall'>View All</Link>
                      : <Link to="/settlement" className='viewall' onClick={() => this.props.dispatch(setActiveSettlement(settlementType))}>View All</Link>
                    }
                  </div>
                </li>
              )
            }
          }
        }
      }

    }
    let finalRender = noticationCount.concat(noticationCountdetail);
    const dividedArray = this.arrDivide(finalRender);
    return (
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
                    <h2>Notifications</h2>

                    <figure className='middle-img'><img src="images/icons/notification-img.png" alt="" /></figure>

                    <div className='notification-left-footer'>
                      <h2>Eduvanz</h2>
                    </div>
                  </div>
                </div>
                <div className='col-xl-9 col-md-7'>
                  <div className='notification-right-card' >
                    <ul className='notification-list' style={{ minHeight: '400px' }}>
                      {dividedArray[this.state.activePage]}
                      {/*<li>
                        <div class="drodown-listing cancel-bg">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
                      </li>
                      <li>
                        <div class="drodown-listing cancel-bg">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
                      </li>
                      <li>
                        <div class="drodown-listing cancel-bg">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
                      </li>
                      <li>
                        <div class="drodown-listing cancel-bg">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
                      </li>
                      <li>
                        <div class="drodown-listing">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
                      </li>
                      <li>
                        <div class="drodown-listing">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
                      </li>
                      <li>
                        <div class="drodown-listing">
                          <div class="left-column-notification"><span class="notification-title">12 Cancellation requests received.</span>
                            <div class="small">Just Now</div></div><a class="viewall" href="#">View</a>
                        </div>
    </li>*/}
                    </ul>
                    {dividedArray.length > 0 ?
                      <div className='d-flex justify-content-center pb-5 mt-5' >
                        <nav aria-label="">
                          <ul className="pagination border border-primary">
                            <li className={`page-item border-right border-primary ${this.state.activePage == 0 ? 'disabled' : ''}`} style={{ cursor: `${this.state.activePage == 0 ? 'not-allowed' : 'pointer'}` }}><a className="page-link" onClick={this.prePage}><b>Prev</b></a></li>
                            <li className="page-item border-right border-primary pl-3 pr-3"><a className="page-link disabled"><b>{this.state.activePage + 1}</b></a></li>
                            <li className={`page-item ${(this.state.activePage + 1) == dividedArray.length ? 'disabled' : ''}`} style={{ cursor: `${(this.state.activePage + 1) == dividedArray.length ? 'not-allowed' : 'pointer'}` }}><a className="page-link" onClick={this.nextPage}><b>Next</b></a></li>
                          </ul>
                        </nav>
                      </div> : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user_id, allNotificationsData, activeSettlement } = state.user;
  const { sfid } = state.auth;

  return {
    user_id,
    allNotificationsData,
    activeSettlement,
    sfid
  };
}
//export default (Notification);
export default connect(mapStateToProps)(Notification);

//export default Notification()