import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeFilerModel, } from "../actions/model"
import { getMerchantProducts, getLeads, getfilterLeadData } from "../actions/user";
import { Scrollbar } from "react-scrollbars-custom";

const TODAY = "Today";
const MONTH = "This Month";
const WEEK = "This Week";
const QUATER = "This Quarter"
const TIME = "Time";
const STATUS = "Status";
const ACTION = "Action";
const PRODUCT = "Product";

class FilterLead extends Component {

    constructor() {
        super()
        this.unquiArray = this.unquiArray.bind(this);
        this.checkBoxClick = this.checkBoxClick.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            DataSet: {
                proData: [],
            },
            statusD: [],
            actionD: [],
            productD: [],
            time: null,
            statusApi: [],
            actionApi: [],
            productApi: [],
            openOption: TIME,
        }
    }

    componentDidMount() {
        const { sfid } = this.props
        const stage = `stage=PreApproval`;
        let statusData = [];
        let actionData = [];
        let productData = [];
        this.props.dispatch(getLeads("", sfid)).then(response => {
            // console.log(response,'>>>>>>>>> without parameter');
            if (response.status == "success") {
                response.proData.map(data => {
                    if (data.status) {
                        statusData.push(data.status)
                    }
                    if (data.product_name) {
                        productData.push(data.product_name);
                    }
                })
                this.setState({
                    statusD: statusData.filter(this.unquiArray),
                    productD: productData.filter(this.unquiArray)
                })
            }
        })
            .catch(error => {
                console.log(error)
            })

        this.props.dispatch(getLeads(stage, sfid)).then(response => {
            // console.log(response,'>>>>>>>>> with parameter');
            if (response.status == "success") {
                response.proData.map(data => {
                    if (data.status) {
                        actionData.push(data.status)
                    }
                })
                this.setState({
                    actionD: actionData.filter(this.unquiArray)
                })
            }
        })
            .catch(error => {
                console.log(error)
            })
        // console.log(statusData, actionData, productData,'manish')        
        // let new1 = statusData.filter(this.unquiArray)
        // let new2 = actionData.filter(this.unquiArray)
        // let new3 = productData.filter(this.unquiArray)
        // console.log(new1, new2, new3,'thakur')
        let getProd = { merchant_id: this.props.user_id }
        this.props.dispatch(getMerchantProducts(getProd)).then((response) => {
            if (!response.responseCode) {
                this.setState({ DataSet: response }, () => {
                    // console.log('this.state.DataSet',JSON.stringify(this.state.DataSet))
                });
            }
        });

    }

    unquiArray = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    closeModel = () => {
        this.props.dispatch(closeFilerModel())
        this.setState({
            time: null,
            statusApi: [],
            actionApi: [],
            productApi: []
        })
    }

    checkBoxClick = (e) => {
        let check = e.target.checked;
        let value = e.target.name;

        switch (this.state.openOption) {
            case TIME:
                this.setState({
                    time: e.target.value
                })
                break;

            case STATUS:
                if (check) {
                    this.setState({
                        statusApi: [...this.state.statusApi, e.target.name]
                    })
                } else {
                    let data = this.state.statusApi.filter(ele => ele !== value)
                    this.setState({
                        statusApi: data
                    })
                }

                break;
            case ACTION:
                if (check) {
                    this.setState({
                        actionApi: [...this.state.actionApi, e.target.name]
                    })
                } else {
                    let data = this.state.actionApi.filter(ele => ele !== value)
                    this.setState({
                        actionApi: data
                    })
                }
                break;

            case PRODUCT:
                if (check) {
                    this.setState({
                        productApi: [...this.state.productApi, e.target.name]
                    })
                } else {
                    let data = this.state.productApi.filter(ele => ele !== value)
                    this.setState({
                        productApi: data
                    })
                }

                break;

        }
    }

    applyFilter = () => {
        const { productApi, actionApi, statusApi, time } = this.state;
        const { leadTab, user_id } = this.props;
        const filterArray = []
        const searchOpt = [...productApi, ...actionApi, ...statusApi];
        if (productApi.length > 0) { filterArray.push("Product"); }
        if (actionApi.length > 0) { filterArray.push("Action"); }
        if (statusApi.length > 0) { filterArray.push("Status"); }
        if (time) { filterArray.push("Date"); searchOpt.push(time); }
        console.log(filterArray, searchOpt, leadTab)
        const dataObj = {
            "merchant_id": user_id,
            "filter_type": filterArray,
            "search_keyword": searchOpt,
            "section": leadTab
        }
        this.props.dispatch(getfilterLeadData(dataObj)).then(response => {
            this.closeModel();
        })
    }

    clearFilter = (e) => {
        e.preventDefault();
        // document.getElementsByClassName('clearFilterInput').forEach(el => el.checked = false);
        // for (let i = 0; i < list.length; i++) {
        //    list.checked = false;   
        const id = ['today', 'thisWeek', 'thisMonth', 'thisQuarter'];
        for (let i = 0; i < id.length; i++) {
            document.getElementById(id[i]).checked = false;
        }
        document.querySelectorAll('input[type="checkbox"]')
            .forEach(el => el.checked = false);

        const chbx = document.getElementsByName("datefilter");
        for (let i = 0; i < chbx.length; i++) {
            chbx[i].checked = false;
        }

        this.setState({ time: null, statusApi: [], actionApi: [], productApi: [] });

    }

    render() {
        const { filter_show, products } = this.props;
        console.log(this.state.time, this.state.statusApi, this.state.actionApi, this.state.productApi);
        // console.log(this.state,'>>>>>>>>>>>>>>>>>>> state value is')
        return (
            <>
                <Modal show={filter_show} className='right myModal filter_modal' id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="srContent">
                        <form>
                            <div className="buttonsBottom">
                                <div className="srHeader align-items-center">
                                    <div className='d-flex justify-content-between align-items-center w-100'>
                                        <div className='d-flex align-items-center'>
                                            <button type="button" onClick={this.closeModel} className="close">
                                                <img src="images/icons/icon-close2.png" alt="close" />
                                            </button>
                                            <h4 className="modal-title fz24">Filters</h4>
                                        </div>

                                        <button className="btn btn-reset" onClick={this.clearFilter}><i className="fa fa-repeat" aria-hidden="true"></i> Reset All</button>
                                    </div>


                                </div>
                                <Scrollbar>
                                    <div className="srBody">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link collapsed"
                                                            type="button"
                                                            data-toggle="collapse"
                                                            data-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                            onClick={() => { this.setState({ openOption: TIME }) }}
                                                        >
                                                            Date
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div
                                                    id="collapseOne"
                                                    className="collapse show"
                                                    aria-labelledby="headingOne"
                                                    data-parent="#accordionExample"
                                                >
                                                    <div className="card-body">
                                                        <ul className="customInputsradio">
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    defaultValue="datefilter"
                                                                    name="radio"
                                                                    value={TODAY}
                                                                    onChange={(e) => { this.checkBoxClick(e) }}
                                                                    id="today"
                                                                    className='clearFilterInput'
                                                                />
                                                                <label htmlFor="today">Today</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    defaultValue="datefilter"
                                                                    name="radio"
                                                                    value={WEEK}
                                                                    onChange={(e) => { this.checkBoxClick(e) }}
                                                                    id="thisWeek"
                                                                    className='clearFilterInput'
                                                                />
                                                                <label htmlFor="thisWeek">This Week</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    defaultValue="datefilter"
                                                                    name="radio"
                                                                    value={MONTH}
                                                                    onChange={(e) => { this.checkBoxClick(e) }}
                                                                    id="thisMonth"
                                                                    className='clearFilterInput'
                                                                />
                                                                <label htmlFor="thisMonth">This Month</label>
                                                            </li>
                                                            <li>
                                                                <input
                                                                    type="radio"
                                                                    defaultValue="datefilter"
                                                                    name="radio"
                                                                    value={QUATER}
                                                                    onChange={(e) => { this.checkBoxClick(e) }}
                                                                    id="thisQuarter"
                                                                    className='clearFilterInput'
                                                                />
                                                                <label htmlFor="thisQuarter">This Quarter</label>
                                                            </li>
                                                            {/* <li>
                                        <input
                                            type="radio"
                                            defaultValue="datefilter"
                                            name="radio"
                                        />
                                        <label htmlFor="allTime">All Time</label>
                                        </li> */}
                                                            {/* <li>
                                        <input
                                            type="radio"
                                            defaultValue="datefilter"
                                            name="radio"
                                            id="custom"
                                        />
                                        <label htmlFor="custom">Custom</label>
                                        </li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            type="button"
                                                            data-toggle="collapse"
                                                            data-target="#collapseTwo"
                                                            aria-expanded="false"
                                                            aria-controls="collapseTwo"
                                                            onClick={() => { this.setState({ openOption: STATUS }) }}
                                                        >
                                                            Status
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div
                                                    id="collapseTwo"
                                                    className="collapse"
                                                    aria-labelledby="headingTwo"
                                                    data-parent="#accordionExample"
                                                >
                                                    <div className="card-body">
                                                        <h5>Pre-Approval</h5>
                                                        <ul className="customInputsradio approvalBased">
                                                            {
                                                                this.state.statusD && this.state.statusD.length > 0 &&
                                                                this.state.statusD.map((data, index) => {
                                                                    return (
                                                                        <li>
                                                                            <input
                                                                                type="checkbox"
                                                                                defaultValue="statusfilter"
                                                                                name={data}
                                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                                                id={`status_${index}`}
                                                                                // defaultChecked="checked"
                                                                                className='clearFilterInput'
                                                                            />
                                                                            <label htmlFor={`status_${index}`}>
                                                                                {data}
                                                                                {/* <span className="nums">666</span> */}
                                                                            </label>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                        {/* <h5>Post-Approval</h5>
                                    <ul className="customInputsradio approvalBased">
                                        <li>
                                        <input
                                            type="checkbox"
                                            defaultValue="statusfilter"
                                            name="radio"
                                            id="loanBookPending"
                                        />
                                        <label htmlFor="loanBookPending">
                                            Loan Booking Pending{" "}
                                            <span className="nums">346</span>
                                        </label>
                                        </li>
                                    </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            type="button"
                                                            data-toggle="collapse"
                                                            data-target="#collapseThreer"
                                                            aria-expanded="false"
                                                            aria-controls="collapseThree"
                                                            onClick={() => { this.setState({ openOption: ACTION }) }}
                                                        >
                                                            Actionable
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div
                                                    id="collapseThreer"
                                                    className="collapse"
                                                    aria-labelledby="headingThree"
                                                    data-parent="#accordionExample"
                                                >
                                                    <div className="card-body">
                                                        <ul className="customInputsradio approvalBased">
                                                            {
                                                                this.state.actionD && this.state.actionD.length > 0 &&
                                                                this.state.actionD.map((data, index) => {
                                                                    return (
                                                                        <li>
                                                                            <input
                                                                                type="checkbox"
                                                                                defaultValue="statusfilter"
                                                                                name={data}
                                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                                                id={`action_${index}`}
                                                                                className='clearFilterInput'
                                                                            // defaultChecked="checked"
                                                                            />
                                                                            <label htmlFor={`action_${index}`}>
                                                                                {data}
                                                                                {/* <span className="nums">666</span> */}
                                                                            </label>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                        {/* <p
                                        style={{
                                        textAlign: "center",
                                        fontSize: "16pt",
                                        padding: "20px 0"
                                        }}
                                    >
                                        Will be updated soon...
                                    </p> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-header">
                                                    <h2 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            type="button"
                                                            data-toggle="collapse"
                                                            data-target="#productThree"
                                                            aria-expanded="false"
                                                            aria-controls="collapseThree"
                                                            onClick={() => { this.setState({ openOption: PRODUCT }) }}
                                                        >
                                                            Product
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div
                                                    id="productThree"
                                                    className="collapse"
                                                    aria-labelledby="headingThree"
                                                    data-parent="#accordionExample"
                                                >

                                                    <div className="card-body">
                                                        {/* <form > */}
                                                        {/* <i class="fa fa-search" aria-hidden="true"></i> */}
                                                        {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
                                                        {/* </form> */}


                                                        <ul className="customInputsradio approvalBased">
                                                            {
                                                                this.state.productD && this.state.productD.length > 0 &&
                                                                this.state.productD.map((data, index) => {
                                                                    return (
                                                                        <li>
                                                                            <input
                                                                                type="checkbox"
                                                                                defaultValue="statusfilter"
                                                                                name={data}
                                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                                                id={`product_${index}`}
                                                                                className='clearFilterInput'
                                                                            // defaultChecked="checked"
                                                                            />
                                                                            <label htmlFor={`product_${index}`}>
                                                                                {data}
                                                                                {/* <span className="nums">666</span> */}
                                                                            </label>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end mt-4">
                                        <button type="button" onClick={this.closeModel} className="closefilter mr-3">
                                            Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary btn-dark mx-3" onClick={this.applyFilter}>
                                            Apply
                                        </button>
                                    </div>
                                </Scrollbar>
                            </div>
                        </form>
                    </div>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { user_id, sfid } = state.auth;
    const { filter_show, products } = state.model;
    const { leadTab } = state.user
    return {
        filter_show,
        products,
        user_id,
        sfid,
        leadTab
    };
}

export default connect(mapStateToProps)(FilterLead)