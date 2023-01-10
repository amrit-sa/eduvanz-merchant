import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { closeModel } from "../actions/model";
import { getMerchantProductList, getCategory, createProduct, getMerchantProducts } from "../actions/user";
import { openBulkNewProdModel } from "../actions/model";
import { Scrollbar } from "react-scrollbars-custom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import XlsxPopulate, { Promise } from "xlsx-populate";
import { saveAs } from "file-saver";
import readXlsxFile from 'read-excel-file'

const SECTION1 = 0;
const SECTION2 = 1;
const SECTION3 = 2;
const initialState = {
    product: '',
    product_price: '',
    product_name: '',
    category: '',
    brand: '',
    description: '',
    isValid: true,
    errorMsg: '',
    isSuccess: '',
    successMsg: '',
    onBoarding: SECTION1,
    showErr: false,
    loanerrmsg: ''
};

class AddNewProdct extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.testRef = React.createRef();

    }

    componentDidMount() {

        let getProd = { merchant_id: this.props.user_id }
        this.props.dispatch(getMerchantProductList(getProd));
        this.props.dispatch(getCategory());

    }

    componentDidUpdate(prevProps) {
        if (prevProps.add_new_product_show !== this.props.add_new_product_show) {
            this.setState(initialState);
        }
    }

    onNextBording = (next) => {
        this.setState({ onBoarding: next });
    }

    closeModel = () => {
        this.props.dispatch(closeModel())
    }
    // openSuccessModel = () => {
    //     this.props.dispatch(openSuccessModel())
    // }


    openNewbulkUpload_modal = (e) => {
        e.preventDefault();
        this.props.dispatch(openBulkNewProdModel())
    }

    handleChange = (e) => {
        // this.setState({ [e.target.name]: e.target.value });
        if(e.target.name === 'brand'){

            this.setState({ [e.target.name]: e.target.value.replace(/[^a-z]/gi, '') });
        }else{
            this.setState({ [e.target.name]: e.target.value});
        }
    }

    handleClose = () => {
        // this.setState({ state: SECTION1 });
        this.setState(initialState);
    }


    onlyNumbers = (e) => {
        var pattern = new RegExp(/^(?!(0))\d+$/);
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                // this.setState({ [e.target.name]: "" });
            } else {
                this.setState({ [e.target.name]: e.target.value });
            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    // onlyNumbers = (e) => {
    //     var pattern = new RegExp(/^[0-9\b]+$/);
    //     if(e.target.value !=='')
    //     {
    //       if(!pattern.test(e.target.value))
    //       {
    //         this.setState({[e.target.name] : ""});
    //       }else{
    //         this.setState({[e.target.name] : e.target.value});
    //       }
    //     }else{
    //       this.setState({[e.target.name] : e.target.value});
    //     }
    //   }

    handleSelectProduct = (e) => {
        const { mproducts } = this.props;
        let id = e.value;
        if (id != '') {
            var selctedItem = mproducts.find(item => item.sfid == id);
            this.setState({ product: id, product_price: selctedItem.mrp__c, category: selctedItem.product_sub_category__c, product_name: selctedItem.name, brand: selctedItem.brand__c });
            this.setState({ onBoarding: SECTION2 });
        } else {
            this.setState({ product_price: '', product: '', product_name: '', brand: '' });
        }
    }
    scrollToBottom = () => {
        var objDiv = document.getElementById("create-lead");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleSubmitProd = (e) => {
        e.preventDefault();
        let data = {
            product_id: this.state.product ? this.state.product : '',
            price: this.state.product_price,
            product_name: this.state.product_name,
            brand: this.state.brand,
            category: this.state.category,
            description: this.state.description,
            merchant_id: this.props.sfid
        };
        console.log('prod add data==', data)
        this.props.dispatch(createProduct(data)).then((response) => {
            if (response.status === "success") {
                console.log('add prod rponse', response)
                this.setState({ isSuccess: 1, onBoarding: SECTION3, successMsg: response.message });
                // setInterval(document.getElementById("close-create").click(), 5000);
                let getProd = { merchant_id: this.props.user_id }
                this.props.dispatch(getMerchantProductList(getProd));
                //window.location.reload();

            } else {
                if (response.status === "error") {
                    this.setState({ showErr: true, loanerrmsg: response.message })
                }
                else {
                    this.scrollToBottom();
                    this.setState({ isSuccess: 0, onBoarding: SECTION1, successMsg: response.message });
                }

            }
        }).catch((error) => {
            this.setState({ isSuccess: 0, onBoarding: SECTION1, successMsg: error });
        });

    }
    /*
    url=https://eduvanz-api-01.herokuapp.com/api/create_product
    brand: "bajaj"
category: "2-Wheelers"
description: ""
merchant_id: "00171000008GurGAAS"
price: "21000"
product_id: "01t7100DMTTT10313"
product_name: "Demo Test 314"
    
    */



    handleDownload = (url) => {

        let obj = { merchant_id: this.props.user_id, "section": '' }
        let getProd = { merchant_id: this.props.user_id }
        const {mproducts} = this.props;
        //  this.props.dispatch(merchantProductDownload(obj)).then((response) => {
        // this.props.dispatch(getMerchantProductList(getProd)).then((response) => {
            console.log('response here product=', mproducts)
            // if (response.proData && response.proData.length > 0) {

                let getData = []
                const m_id = localStorage.getItem("sfid") ? localStorage.getItem("sfid") : localStorage.getItem("sfid")
                for (let i = 0; i < mproducts.length; i++) {
                    let source = mproducts[i];

                    let obj = {
                        // name:source.name,
                        // // merchant_id : source.id,
                        // merchant_id : m_id,
                        // product_id : source.sfid,
                        // new_selling_price : source.offer_price__c,
                        // activation_status : source.activate_product__c,
                        // sku:source.sku,

                        merchant_id: m_id,
                        product_id: source.sfid,
                        new_selling_price: source.price__c,
                        activation_status: 'active',
                        brand: '',
                        name: source.name,
                        description: '',
                        category: source.product_sub_category__c
                        // merchant_id : source.id,
                    }
                    getData.push(obj)
                }

                this.saveAsExcel(getData);
            }
    //     });
    // }





    // saveAsExcel = async (getData) => {
    //     var data = [];
    //     await Promise.all(getData.map(async (elament) => {
    //         const productDet = elament
    //         data.push({
    //             merchant_id: productDet && productDet.merchant_id && productDet.merchant_id != null ? productDet.merchant_id : '',
    //             P_id: productDet && productDet.product_id ? productDet.product_id : '',
    //             // category: productDet && productDet.product_sub_category ? productDet.product_sub_category : '',
    //             // mrp: productDet && productDet.mrp && productDet.mrp != null ? productDet.mrp : '',
    //             // mop: productDet && productDet.mop && productDet.mop != null ? productDet.mop : '',
    //             selling_price: productDet && productDet.new_selling_price && productDet.new_selling_price != null ? productDet.new_selling_price : '',
    //             activation_status: productDet && productDet.activation_status == false ? 'inactive' : 'active',
    //             name: productDet && productDet.name ? productDet.name : '',
    //             sku: productDet && productDet.sku && productDet.sku != null ? productDet.sku : '',
    //         })
    //     }));
    //     let header = ["Merchant Id", "Product Id", "Selling Price", "Activation Status", "Name", "SKU"];
    //     //let header = ["Category","Sub Category","Brand","Product Name","Selling Price","Description"];
    //     XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    //         const sheet1 = workbook.sheet(0);
    //         const sheetData = await this.getSheetData(data, header);
    //         const totalColumns = sheetData[0].length;
    //         sheet1.cell("A1").value(sheetData);
    //         const range = sheet1.usedRange();
    //         const endColumn = String.fromCharCode(64 + totalColumns);
    //         sheet1.row(1).style("bold", true);
    //         sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
    //         range.style("border", true);
    //         return workbook.outputAsync().then((res) => {
    //             saveAs(res, "product_report.xlsx");
    //         });
    //     });
    // }

    // getSheetData = async (data, header) => {
    //     var fields = Object.keys(data[0]);
    //     var sheetData = data.map(function (row) {
    //         return fields.map(function (fieldName) {
    //             return row[fieldName] ? row[fieldName] : "";
    //         });
    //     });
    //     sheetData.unshift(header);
    //     return sheetData;
    // }

    saveAsExcel = async (getData) => {
        var data = [];
        await Promise.all(getData.map(async (elament) => {
            const productDet = elament
            data.push({
                merchant_id: productDet && productDet.merchant_id && productDet.merchant_id != null ? productDet.merchant_id : '',
                P_id: productDet && productDet.product_id ? productDet.product_id : '',
                // category: productDet && productDet.product_sub_category ? productDet.product_sub_category : '',
                // mrp: productDet && productDet.mrp && productDet.mrp != null ? productDet.mrp : '',
                // mop: productDet && productDet.mop && productDet.mop != null ? productDet.mop : '',
                selling_price: productDet && productDet.new_selling_price && productDet.new_selling_price != null ? productDet.new_selling_price : '',
                activation_status: 'Active',
                brand: productDet && productDet.brand && productDet.brand != null ? productDet.brand : '',
                name: productDet && productDet.name ? productDet.name : '',
                description: productDet && productDet.description && productDet.description ? productDet.description : '',
                category: productDet && productDet.category && productDet.category != null ? productDet.category : '',
            })
        }));
        let header = ["Merchant Id", "Product Id", "Selling Price", "Activation Status", "Brand", "Name", "Description", "Category"];
        //let header = ["Category","Sub Category","Brand","Product Name","Selling Price","Description"];
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
                saveAs(res, "product_report.xlsx");
            });
        });
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

    render() {
        const { isLoading, mproducts, category } = this.props;
        let prodOptions = [];
        if (mproducts) {
            for (var i = 0; i < mproducts.length; i++) {
                let pname = String(mproducts[i].name).slice(0, 15);
                prodOptions.push({ value: mproducts[i].sfid, label: pname });
            }
        }
        return (
            <>
                {/* {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''} */}
                {/* Modal */}
                <div className="modal right fade myModal" id="myModal2" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <form onSubmit={this.handleSubmitProd} className="f_height">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <button onClick={this.handleClose} type="button" id="close-create" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                                    <div className='d-flex justify-content-between w-100'>
                                        <h5 className="modal-title fz24">Add New Product</h5>
                                        <button type="button" className='qst'>?</button>
                                    </div>

                                </div>

                                <div id="" className="modal-body pt-0 px-0">

                                    <Scrollbar>

                                        <div className='px-4'>

                                            {this.state.onBoarding == SECTION1 ? (
                                                <>

                                                    <div className="row justify-content-center mb-2">
                                                        <div className="col-sm-11 form-group">
                                                            <label className="form-label">
                                                                Product/SKU
                                                            </label>

                                                            <Select
                                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                                options={prodOptions}
                                                                placeholder="Enter Product Name/SKU"
                                                                name="sel_product"
                                                                onChange={this.handleSelectProduct}
                                                            />
                                                            <button type="button" className='search_btn'><i className="fa fa-search" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-center mb-2 ">
                                                        <div className="col-sm-11">
                                                            {/* <div className='text-right'>
                                                                <button onClick={() => this.onNextBording(1)} variant="secondary" className="link_">Can't find my product</button>
                                                            </div> */}


                                                            <div className='text-center or my-5'>-OR-</div>

                                                            <div className='d-flex justify-content-between w-100 mb-2'>
                                                                <h5 className='font-weight-bold'>Bulk upload</h5>
                                                                <span>

                                                                    <OverlayTrigger
                                                                        key={'left'}
                                                                        placement={'left'}
                                                                        overlay={
                                                                            <Tooltip >
                                                                                Supported file type: XLS
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <img src="images/icons/info.png" />
                                                                    </OverlayTrigger>

                                                                </span>
                                                            </div>
                                                            <p>Why upload products one-by-one when you can add hundreds at once.</p>

                                                            <div className='row align-items-center mt-4'>
                                                                <div className='col-sm-6'>
                                                                    <span style={{ cursor: 'pointer' }} onClick={() => this.handleDownload()} className="downloadbulk">
                                                                        Download Available SKUs
                                                                    </span>

                                                                    {/* <a className='link_ w-100 text-center' onClick={() => this.handleDownload("/bulk_product_upload.xlsx")} >Download Template</a> */}
                                                                </div>
                                                                <div className='col-sm-6'>
                                                                    <button className='btn_outline w-100' onClick={this.openNewbulkUpload_modal}>Upload Bulk Products</button></div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>) : this.state.onBoarding == SECTION2 ? (
                                                    <>


                                                        <div className="row justify-content-center mb-2">
                                                            <div className="col-sm-11">
                                                                <div className='v-scroll'>
                                                                    <div className="row justify-content-center mb-2">
                                                                        <div className="col-sm-6 form-group">
                                                                            {/* <label className="form-label">
                                                                                Category*
                                                                            </label> */}

                                                                            {/* <select
                                                                                name="category"
                                                                                id="category"
                                                                                className="form-control xx"
                                                                                value={this.state.category ? this.state.category : ''}
                                                                                onChange={this.handleChange}

                                                                            >

                                                                                <option style={{ color: "#6e707e" }}>Select Product Category</option>
                                                                                {category && category.length > 0 &&
                                                                                    (
                                                                                        category.map((item, index) => (
                                                                                            item.sub_cat.map((subcat, ii) => (
                                                                                                <option style={{ color: "#6e707e" }} key={subcat.category_id} value={subcat.category_name} >{subcat.category_name}</option>
                                                                                            ))
                                                                                        ))
                                                                                    )
                                                                                }
                                                                            </select> */}

                                                                            <label className="form-label">
                                                                                Category*
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Select Product Category"
                                                                                name="category"
                                                                                value={this.state.category ? this.state.category : ''}
                                                                                // onChange={this.handleChange}
                                                                                readonly
                                                                            />




                                                                        </div>
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Brand*
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Select Brand"
                                                                                name="brand"
                                                                                value={this.state.brand ? this.state.brand : ''}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <button type="button" className='search_btn'><i className="fa fa-search" aria-hidden="true"></i></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center mb-2">
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Product*
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Product Name"
                                                                                name="product_name"
                                                                                value={this.state.product_name ? this.state.product_name : ''}
                                                                                onChange={this.handleChange}
                                                                                readOnly
                                                                            />

                                                                        </div>
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                SKU*
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter SKU"
                                                                                name="SKU"
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center mb-2">
                                                                        <div className="col-sm-12 form-group">
                                                                            <label className="form-label">
                                                                                Product URL
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Product URL"
                                                                                name="ProductURL"
                                                                            />

                                                                            <OverlayTrigger
                                                                                key={'left'}
                                                                                placement={'left'}
                                                                                overlay={
                                                                                    <Tooltip >
                                                                                        Enter the URL of the product from other ecommerce platform
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <p className='info__'>
                                                                                    <img src="images/icons/info.png" />
                                                                                </p>

                                                                            </OverlayTrigger>


                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Selling Price
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Selling Price"
                                                                                name="product_price"
                                                                                value={this.state.product_price ? this.state.product_price : ''}
                                                                                onChange={this.onlyNumbers}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center mb-2">
                                                                        <div className="col-sm-12 form-group">
                                                                            <label className="form-label mb-3">
                                                                                Product Description
                                                                            </label>
                                                                            <textarea className="form-control border" maxLength={4000} onChange={this.handleChange} name="description" id="exampleFormControlTextarea1" rows="3" placeholder='Start typing...'></textarea>
                                                                            <p style={{ float: "right" }} class="float-end">0/4000 Characters</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {this.state.showErr &&
                                                                    <div className="form-group"><div className='alert alert-danger' role='alert'>{this.state.loanerrmsg}</div></div>
                                                                }
                                                                <div className="row justify-content-end mb-2 mt-4" title={this.state.name}>
                                                                    <button
                                                                        type="submit"
                                                                        className='btn btn-default_ btn btn-secondary'
                                                                        disabled={this.state.product_price && this.state.product_name && this.state.brand && this.state.category ? false : true}

                                                                    >Request Approval</button>
                                                                </div>
                                                                <div className="modal fade" id="loanBooked">
                                                                    <div className="modal-dialog modal-dialog-centered dr-modal">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header border-0 pb-0">
                                                                                <button type="button" className="close ml-auto" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body text-center">
                                                                                <img src="images/wallet.png" className="img-fluid"></img>
                                                                                <h4 className="success-msg mt-5">Loan Booked Succesfully !</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </>
                                                ) : this.state.onBoarding == SECTION3 ? (
                                                    <div className='row'>
                                                        <div className="col-11 shadowleadsucc mx-auto mb-3">
                                                            <div className="mb-2 d-flex align-items-center justify-content-center">

                                                                <div className='d-flex align-items-center'>
                                                                    <img src="images/succ-thumb.png" className="img-fluid mr-3"></img>
                                                                </div>
                                                                <div className='d-flex flex-column justify-content-center '>
                                                                    <h5 className="success-msg">Request sent successfully!</h5>
                                                                    <p>Sit back & relax while our team checks product & then proceed accordingly</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-11 mx-auto mt-3">
                                                            <button type="button" className='btn-sm btn-primary btn-dark bor-red' onClick={() => this.setState(initialState)}>
                                                                <i className="fas fa-plus" /> Add another Product
                                                            </button>
                                                        </div>


                                                    </div>
                                                ) : ''

                                            }

                                        </div>


                                    </Scrollbar>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                {/*Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { add_new_product_show } = state.model;
    const { isLoading, user_id, sfid } = state.auth;
    const { mproducts, category } = state.user;
    return {
        add_new_product_show,
        user_id,
        mproducts,
        isLoading,
        sfid,
        category,
    };
}

export default connect(mapStateToProps)(AddNewProdct)