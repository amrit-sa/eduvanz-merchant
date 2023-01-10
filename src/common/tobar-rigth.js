import React from 'react';
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { openPasswordModel } from "../actions/model"
import { getAllNotificationsNew, getAllNotificationsOld, setActiveSettlement } from "../actions/user";
import { connect } from "react-redux";



export class TopBarRight extends React.Component {
    constructor() {
        super();
        this.state = {
            newNotificationList: [],
            oldNotificationList: [],
        }
    }
    componentDidMount() {
        const { sfid } = this.props
        this.props.dispatch(getAllNotificationsNew(sfid));
        this.props.dispatch(getAllNotificationsOld(sfid));
    }

    handleLogout = () => {
        this.props.dispatch(logout());
        window.location.href = "/login";
    }

    handleOpenPwd = () => {
        this.props.dispatch(openPasswordModel());
    }

    saveSettelment = (given_notification_name) => {
        this.props.dispatch(setActiveSettlement(given_notification_name));
    }
    dateFiltered = (given_data) => {
        let data_splited = given_data.split(" ");
        let dateData = data_splited.pop()
        return dateData
    }
    countHeadingFiltered = (given_data) => {
        let data_splited = given_data.split(" ");
        data_splited.pop()
        return data_splited.join(" ")
    }
    render() {
        const noDataNew = []
        const noDataOld = []
        const { allNotificationsNew, allNotificationsOld, merchant_sfid, sfid } = this.props;
        if (Object.keys(allNotificationsNew).length !== 0) {
            if (allNotificationsNew.settlementRefundCount[0] == '0' && allNotificationsNew.settlementRefundCount[0] == '0' && allNotificationsNew.settlementCancellationRequestCount[0] == '0' && allNotificationsNew.allLeadCount[0] == '0') {
                noDataNew.push(<div className='drodown-listing'>
                    <p>No any notification</p>
                </div>)
            }
        }
        if (Object.keys(allNotificationsOld).length !== 0) {
            if (allNotificationsOld.settlementDisbursedCount[0] == '0' && allNotificationsOld.settlementRefundCount[0] == '0' && allNotificationsOld.settlementCancellationRequestCount[0] == '0' && allNotificationsOld.allLeadCount[0] == '0') {
                noDataOld.push(<div className='drodown-listing'>
                    <p>No any notification</p>
                </div>)
            }
        }
        return (
            <>
                <li className="dropdown header-dropdown-menu" >
                    <form>
                        <button className="dropdown-toggle header_icons" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {/* <span className="bell"> */}
                            {/* <i className="fa fa-bell-o"></i> */}
                            <img src="images/Notification.svg" alt="notification" />
                            <small className='notificatio-sign'></small>
                            {/* </span> */}
                        </button>
                        <div className="dropdown-menu top-header-menu" aria-labelledby="dropdownMenuButton">
                            <div className='drop-header'>
                                <h4>Notifications</h4>
                                <Link to="/allnotification" className='viewall'>View All</Link>

                            </div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">New</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Old</a>
                                </li>

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    {allNotificationsNew.settlementDisbursedCount && allNotificationsNew.settlementDisbursedCount[0] != 0 ?
                                        <div className='drodown-listing cancel-bg'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{this.countHeadingFiltered(allNotificationsNew.settlementDisbursedCount)}</span>
                                                <div className="small text-gray-500">{this.dateFiltered(allNotificationsNew.settlementDisbursedCount)}</div>
                                            </div>
                                            <Link to="/settlement" className='viewall' onClick={() => this.saveSettelment("settlementDisbursed")}>View All</Link>

                                            {/*<a className="p-2 viewall" href="#" >View All</a>*/}
                                        </div> : ''}
                                    {allNotificationsNew.settlementRefundCount && allNotificationsNew.settlementRefundCount[0] != 0 ?
                                        <div className='drodown-listing cancel-bg'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{this.countHeadingFiltered(allNotificationsNew.settlementRefundCount)}</span>
                                                <div className="small text-gray-500">{this.dateFiltered(allNotificationsNew.settlementRefundCount)}</div>
                                            </div>
                                            <Link to="/settlement" className='viewall' onClick={() => this.saveSettelment("settlementRefundCount")}>View All</Link>

                                        </div> : ''}
                                    {allNotificationsNew.settlementCancellationRequestCount && allNotificationsNew.settlementCancellationRequestCount[0] != 0 ?
                                        <div className='drodown-listing'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{this.countHeadingFiltered(allNotificationsNew.settlementCancellationRequestCount)}</span>
                                                <div className="small text-gray-500">{this.dateFiltered(allNotificationsNew.settlementCancellationRequestCount)}</div>
                                            </div>
                                            <Link to="/settlement" className='viewall' onClick={() => this.saveSettelment("settlementCancellationRequestCount")}>View All</Link>

                                        </div> : ''}
                                    {allNotificationsNew.allLeadCount && allNotificationsNew.allLeadCount[0] != 0 ?
                                        <div className='drodown-listing'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{this.countHeadingFiltered(allNotificationsNew.allLeadCount)}</span>
                                                <div className="small text-gray-500">{this.dateFiltered(allNotificationsNew.allLeadCount)}</div>
                                            </div>
                                            <Link to="/leads" className='viewall'>View All</Link>

                                        </div> : ''}

                                    {noDataNew}
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    {allNotificationsOld.settlementDisbursedCount && allNotificationsOld.settlementDisbursedCount[0] != '0' ?
                                        <div className='drodown-listing'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{allNotificationsOld.settlementDisbursedCount}</span>
                                            </div>
                                            <Link to="/settlement" className='viewall' onClick={() => this.saveSettelment("settlementDisbursed")}>View All</Link>
                                        </div> : ''}

                                    {allNotificationsOld.settlementRefundCount && allNotificationsOld.settlementRefundCount[0] != '0' ?
                                        <div className='drodown-listing'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{allNotificationsOld.settlementRefundCount}</span>
                                            </div>
                                            <Link to="/settlement" className='viewall' onClick={() => this.saveSettelment("settlementRefundCount")}>View All</Link>
                                        </div> : ''}

                                    {allNotificationsOld.settlementCancellationRequestCount && allNotificationsOld.settlementCancellationRequestCount[0] != '0' ?

                                        <div className='drodown-listing'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{allNotificationsOld.settlementCancellationRequestCount}</span>
                                            </div>
                                            <Link to="/settlement" className='viewall' onClick={() => this.saveSettelment("settlementCancellationRequestCount")}>View All</Link>
                                        </div> : ''}
                                    {allNotificationsOld.allLeadCount && allNotificationsOld.allLeadCount[0] != '0' ?

                                        <div className='drodown-listing'>
                                            <div className="left-column-notification">
                                                <span className="font-weight-bold ">{allNotificationsOld.allLeadCount}</span>
                                            </div>
                                            <Link to="/leads" className='viewall'>View All</Link>
                                        </div> : ''}
                                    {noDataOld}

                                </div>
                            </div>

                        </div>
                    </form>
                </li>
                {/* <li>
                <a
                href="#"
                className="header_icons"
                >
                <i className="fa fa-user-circle-o"></i>
                </a>
            </li> */}
                <li className="dropdown header-dropdown-menu dropdown-logout-card">
                    <button className="dropdown-toggle header_icons" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* <i className="fa fa-user-circle-o"></i> */}
                        <img src="images/icons/Profile.svg" alt="Profile" />

                    </button>
                    <div className="dropdown-menu top-header-menu logout-dropdown" aria-labelledby="dropdownMenuButton">

                        <ul className="menu-lists">
                            <li >
                                <a href="/settings" className="nav-link ">My Profile</a>
                            </li>
                            <li >
                                <a href={void (0)} onClick={this.handleOpenPwd} className="nav-link active cursor-point">Change Password</a>
                            </li>
                            <li >
                                <a href={void (0)} onClick={this.handleLogout} className="nav-link active cursor-point">Logout</a>
                            </li>


                        </ul>
                    </div>
                </li>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { allNotificationsNew, allNotificationsOld } = state.user;
    const { token, user, sfid, user_id } = state.auth;
    return {
        allNotificationsNew,
        allNotificationsOld,
        sfid
    };
}
//export default (Notification);
export default connect(mapStateToProps)(TopBarRight);