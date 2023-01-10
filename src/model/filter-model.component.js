import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeFilterpModel, } from "../actions/model"
import { getMerchantProducts, getProductFilterData } from "../actions/user";
import { getFilterMaster } from '../actions/user'
import { Scrollbar } from "react-scrollbars-custom";

class FilterProduct extends Component {

    constructor() {
        super()
        this.checkBoxClick = this.checkBoxClick.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            brandData: [],
            categoryData: [],
            productData: [],
            DataSet: {
                proData: []
            },
            brandOptSel: [],
            proOptSel: [],
            catOptSel: [],
            timeOptSel: [],
            offOptSel: [],
            dropOptSel: 1
        }
    }

    componentDidMount() {

        let getProd = { merchant_id: this.props.user_id }

        this.props.dispatch(getFilterMaster(this.props.user_id, 'brand')).then((response) => {
            console.log(response, 'brand response')
            this.setState({ brandData: response.data })
        })

        this.props.dispatch(getFilterMaster(this.props.user_id, 'product')).then((response) => {
            console.log(response, 'product response')
            this.setState({ productData: response.data })
        })

        this.props.dispatch(getFilterMaster(this.props.user_id, 'category')).then((response) => {
            console.log(response, 'category response')
            this.setState({ categoryData: response.data })
        })
        // this.props.dispatch(getFilterMaster(this.props.user_id , 'product'))
        // this.props.dispatch(getFilterMaster(this.props.user_id , 'category'))

        this.props.dispatch(getMerchantProducts(getProd)).then((response) => {
            if (response.status == 'error') {
                return;
            }
            if (!response.responseCode) {
                this.setState({ DataSet: response }, () => {
                    // let brandarray = []

                    // let categoryarray = []
                    // let productarray = []

                    // let offerarray = []

                    // console.log('this.state.DataSet', JSON.stringify(this.state.DataSet))
                    // this.state.DataSet && this.state.DataSet.proData.length > 0 && this.state.DataSet.proData.map(ele => {
                    //     let found = brandarray.find(obj => (obj.name == ele.name))
                    //     if (!found) {
                    //         brandarray.push(ele)
                    //     }

                    //     let foundcategory = categoryarray.find(obj => (obj.name == ele.name))
                    //     if (!foundcategory) {
                    //         categoryarray.push(ele)
                    //     }

                    //     let fbrand = productarray.find(obj => (obj.product_category__c == ele.product_category__c))
                    //     if (!fbrand) {
                    //         productarray.push(ele)
                    //     }

                    //     let Oferrf = offerarray.find(obj => (obj.offer_price__c == ele.offer_price__c))
                    //     if (!Oferrf) {
                    //         offerarray.push(ele)
                    //     }


                    // })


                    // this.setState({
                    //     categoryData: categoryarray,
                    //     brandData: brandarray,
                    //     productData: productarray,
                    //     offerdata: offerarray
                    // }, () => {
                    //     console.log('valueeeeeee', JSON.stringify(this.state.brandData))
                    // })
                });

            }
        });

    }


    closeModel = () => {
        this.props.dispatch(closeFilterpModel())
    }

    checkBoxClick = (e) => {

        switch (this.state.dropOptSel) {
            case 1:
                let olddata = this.state.brandOptSel;
                if (e.target.checked) {
                    olddata.push(e.target.name)
                } else {
                    olddata.splice(olddata.indexOf(e.target.name), 1)
                }
                this.setState({
                    brandOptSel: olddata
                })
                break;
            case 2:
                let oldproddata = this.state.proOptSel;
                if (e.target.checked) {
                    oldproddata.push(e.target.name)
                } else {
                    oldproddata.splice(oldproddata.indexOf(e.target.name), 1)
                }
                this.setState({
                    proOptSel: oldproddata
                })
                break;
            case 3:
                let oldcatdata = this.state.catOptSel;
                if (e.target.checked) {
                    oldcatdata.push(e.target.name)
                } else {
                    oldcatdata.splice(oldcatdata.indexOf(e.target.name), 1)
                }
                this.setState({
                    catOptSel: oldcatdata
                })
                break;
            case 4:

                // let oldtimedata = e.target.value;
                // if (e.target.checked) {
                //     oldtimedata.push(e.target.name)
                // } 
                // else {
                //     oldtimedata.splice(oldtimedata.indexOf(e.target.name), 1)
                // }
                this.setState({
                    timeOptSel: e.target.value
                })





                break;
            case 5:
                let oldoffdata = this.state.offOptSel;
                if (e.target.checked) {
                    oldoffdata.push(e.target.name)
                } else {
                    oldoffdata.splice(oldoffdata.indexOf(e.target.name), 1)
                }
                this.setState({
                    offOptSel: oldoffdata
                })
                break;

            default:
                break;
        }
    }

    clearFilter = (e) => {
        e.preventDefault();

        document.querySelectorAll('input[type="checkbox"]')
            .forEach(el => el.checked = false);

        document.querySelectorAll('input[name="datefilter"]')
            .forEach(et => et.checked = false);
    }

    applyFilter = () => {
        const { user_id } = this.props
        const { brandOptSel, proOptSel, catOptSel, offOptSel, timeOptSel } = this.state
        const filterArray = []
        const searchKey = [...brandOptSel, ...proOptSel, ...catOptSel, ...offOptSel, timeOptSel]
        if (brandOptSel.length > 0) { filterArray.push("Brands"); }
        if (proOptSel.length > 0) { filterArray.push("Product"); }
        if (catOptSel.length > 0) { filterArray.push("Category"); }
        if (offOptSel.length > 0) { filterArray.push("Offer"); }
        if (timeOptSel.length > 0) { filterArray.push("Listing Time"); }
        console.log(filterArray, searchKey, '>>>>>>>>>> filter dwata is')
        let dataObj = { "merchant_id": user_id, "search_keyword": searchKey, "filter_type": filterArray }

        if (searchKey.length == 0 && filterArray.length == 0) {

            let getProd = { merchant_id: this.props.user_id }
            this.props.dispatch(getMerchantProducts(getProd)).then((response) => {
                if (response.status == 'error') {
                    return;
                }
                if (!response.responseCode) {
                    this.setState({ DataSet: response })
                }
            });
        } else {


            this.props.dispatch(getProductFilterData(dataObj)).then(response => {
                console.log(response, "product filter response");
            })
                .catch(error => {
                    console.log('product filtere error', error)
                })
        }
    }


    render() {
        const { filterp_show, products } = this.props
        return (
            <>
                <Modal show={filterp_show} className='right myModal filter_modal product_filter_modal'>

                    <div className="srContent">
                        {/* <form> */}
                        <div className="buttonsBottom" style={{ overflow: "auto" }}>
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
                            <Modal.Body>

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
                                                        onClick={() => { this.setState({ dropOptSel: 1 }) }}
                                                    >
                                                        Brands
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
                                                    <ul className="customInputsradio approvalBased">
                                                        {this.state.brandData && this.state.brandData.length > 0 ? this.state.brandData.map((ele, i) => {
                                                            if (ele != null) {

                                                                return (
                                                                    <li key={i}>
                                                                        <input
                                                                            type="checkbox"
                                                                            // defaultValue="statusfilter"
                                                                            name={ele.name}
                                                                            onChange={(e) => { this.checkBoxClick(e) }}
                                                                            id={`brand_${i}`}
                                                                        // defaultChecked="checked"
                                                                        />
                                                                        <label htmlFor={`brand_${i}`}>{ele.name}</label>
                                                                    </li>

                                                                )
                                                            }
                                                        }) : null
                                                        }
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
                                                        onClick={() => { this.setState({ dropOptSel: 2 }) }}
                                                    >
                                                        Product
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
                                                    <ul className="customInputsradio approvalBased">
                                                        {this.state.productData && this.state.productData.length > 0 ? this.state.productData.map((ele, index) => {

                                                            return (
                                                                <li>
                                                                    <input
                                                                        type="checkbox"
                                                                        defaultValue="statusfilter"
                                                                        name={ele.name}
                                                                        id={`product_${index}`}
                                                                        onChange={(e) => { this.checkBoxClick(e) }}
                                                                    // defaultChecked="check"
                                                                    />
                                                                    <label htmlFor={`product_${index}`}>{ele.name}</label>


                                                                </li>
                                                            )
                                                        }) : null
                                                        }
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
                                                        data-target="#collapseThreer"
                                                        aria-expanded="false"
                                                        aria-controls="collapseThree"
                                                        onClick={() => { this.setState({ dropOptSel: 3 }) }}
                                                    >
                                                        Category
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
                                                        {this.state.categoryData && this.state.categoryData.length > 0 ? this.state.categoryData.map((ele, index) => {

                                                            return (
                                                                <li>
                                                                    <input
                                                                        type="checkbox"
                                                                        defaultValue="statusfilter"
                                                                        name={ele.name}
                                                                        id={`cat_${index}`}
                                                                        onChange={(e) => { this.checkBoxClick(e) }}
                                                                    // defaultChecked="checked"
                                                                    />
                                                                    <label htmlFor={`cat_${index}`}>

                                                                        <span className="">{ele.name}</span>
                                                                    </label>
                                                                </li>

                                                            )
                                                        }) : null
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseOne1"
                                                        aria-expanded="false"
                                                        aria-controls="collapseOne"
                                                        onClick={() => { this.setState({ dropOptSel: 4 }) }}
                                                    >
                                                        Listing Time
                                                    </button>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseOne1"
                                                className="collapse"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    <ul className="customInputsradio approvalBased">
                                                        <li>
                                                            <input
                                                                type="radio"
                                                                defaultValue="datefilter"
                                                                value="Today"
                                                                name="datefilter"
                                                                id="today1"
                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                            // defaultChecked="checked"
                                                            />
                                                            <label htmlFor="today1">Today</label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                type="radio"
                                                                defaultValue="datefilter"
                                                                value="This Week"
                                                                name="datefilter"
                                                                id="thisWeek1"
                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                            />
                                                            <label htmlFor="thisWeek1">This Week</label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                type="radio"
                                                                defaultValue="datefilter"
                                                                value="This Month"
                                                                name="datefilter"
                                                                id="thisMonth1"
                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                            />
                                                            <label htmlFor="thisMonth1">This Month</label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                type="radio"
                                                                defaultValue="datefilter"
                                                                value="This Quarter"
                                                                name="datefilter"
                                                                id="thisQuarter1"
                                                                onChange={(e) => { this.checkBoxClick(e) }}
                                                            />
                                                            <label htmlFor="thisQuarter1">This Quarter</label>
                                                        </li>
                                                        {/* <li>
                                                            <input
                                                                type="radio"
                                                                defaultValue="datefilter"
                                                                name="radio"
                                                                id="allTime1"
                                                            />
                                                            <label htmlFor="allTime1">All Time</label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                type="radio"
                                                                defaultValue="datefilter"
                                                                name="radio"
                                                                id="custom1"
                                                            />
                                                            <label htmlFor="custom1">Custom</label>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="card">
                                        <div className="card-header">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#productThree"
                                                    aria-expanded="false"
                                                    aria-controls="collapseThree"
                                                    onClick={() => { this.setState({ dropOptSel: 5 }) }}
                                                >
                                                    Offer
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
                                              
                                                <ul className="customInputsradio approvalBased">

                                                    {
                                                        this.state.offerdata && this.state.offerdata.length > 0 ? this.state.offerdata.map((ele, index) => {
                                                            if (ele.offer_price__c) {
                                                                return (

                                                                    <li>
                                                                        <input
                                                                            type="checkbox"
                                                                            defaultValue="statusfilter"
                                                                            name={ele.offer_price_c}
                                                                            id={`offer_${index}`}
                                                                            onChange={(e) => { this.checkBoxClick(e) }}
                                                                        // defaultChecked="checked"
                                                                        />
                                                                        <label htmlFor={`offer_${index}`}>
                                                                            {ele.offer_price__c}
                                                                        </label>
                                                                    </li>
                                                                )
                                                            }
                                                        }) : null
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}

                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>

                                <div className="srFooter" style={{ position: "relative" }}>
                                    <button type="button" onClick={this.closeModel} className="closefilter btn btn-dark">
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary btn-dark" onClick={this.applyFilter}>
                                        Apply
                                    </button>
                                </div>
                            </Modal.Footer>
                        </div>
                        {/* </form> */}
                    </div>

                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { user_id } = state.auth;
    const { filterp_show, products } = state.model;
    return {
        filterp_show,
        products,
        user_id,
    };
}

export default connect(mapStateToProps)(FilterProduct)