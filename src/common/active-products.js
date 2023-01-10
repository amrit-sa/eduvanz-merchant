import React from 'react'
import { getMerchantProductsByStatus, merchentProductStatusUpdate, merchentProductSellingPriceUpdate, getSingleProductData, updateLoadingProductData } from "../actions/user";
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';

class ActiveProducts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sellingValue: "",
            products: {
                proData: []
            },
            page: 1,
            limit: 10,
            selectedInputTag: '',
            showInputTag: false,
            EditToggle: false
        }
    }

    handleSatusChange = (item) => {
        let merchantId = localStorage.getItem('user_id')
        let getProd = {}
        let status = ''
        if (!item.activate_product__c) {
            status = 'true'
        } else {
            status = 'false'
        }
        getProd.merchant_id = merchantId
        getProd.product_id = item.sfid
        getProd.status = status


        this.props.dispatch(merchentProductStatusUpdate(getProd)).then((response) => {
            if (!response.responseCode) {
                let get_products = { merchant_id: this.props.user_id, page: this.state.page, limit: this.state.limit, status: "active" }
                this.props.dispatch(getMerchantProductsByStatus(get_products)).then((response) => {
                    if (!response.responseCode) {
                        this.setState({ products: response });
                    }
                });
            }
        });
    }
    editprice = async (inputIs) => {
        this.setState({ EditToggle: inputIs })
        await this.setState({ showInputTag: true });
        document.getElementById(inputIs).focus();
        this.setState({ selectedInputTag: inputIs })

    }

    handleChangePage = (event, value) => {
        let getProd = { merchant_id: this.props.user_id, page: value, limit: this.state.limit, status: "active" }
        this.setState({ page: value });
        this.props.dispatch(getMerchantProductsByStatus(getProd));
    }

    handleChangelimitOfPage = (event) => {
        let perRowData = event.target.value;
        let getProd = { merchant_id: this.props.user_id, page: this.state.page, limit: perRowData, status: "active" }
        this.setState({ limit: perRowData });
        this.props.dispatch(getMerchantProductsByStatus(getProd));
    }

    updateSellingPrice = (item) => {
        let getProd = { merchant_id: this.props.user_id, product_id: item.sfid, new_selling_price: this.state.sellingValue, "section": "Product Details" }
        if (this.state.sellingValue != '') {
            this.props.dispatch(merchentProductSellingPriceUpdate(getProd)).then((response) => {
                if (!response.responseCode) {
                    let get_products = { merchant_id: this.props.user_id, status: "active" }
                    this.props.dispatch(getMerchantProductsByStatus(get_products)).then((response) => {
                        if (!response.responseCode) {
                            //this.setState({ products: [] });
                            this.setState({ products: response });
                            this.setState({ EditToggle: '' })
                        }
                    });
                }
            })
        }
        this.setState({ sellingValue: "", showInputTag: false })
    }

    componentDidMount() {
        let getProd = { merchant_id: this.props.user_id, page: this.state.page, limit: this.state.limit, status: "active" }
        this.props.dispatch(getMerchantProductsByStatus(getProd)).then((response) => {
            if (!response.responseCode) {
                this.setState({ DataSet: response });
            }
        });
        if (this.props.products) {
            this.setState({ products: this.props.products })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products != this.props.products) {
            this.setState({ products: this.props.products })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.load_product_data != nextProps.load_product_data) {
            let get_products = { merchant_id: this.props.user_id, status: "active" }
            this.props.dispatch(getMerchantProductsByStatus(get_products)).then((response) => {
                if (!response.responseCode) {
                    //this.setState({ products: [] });
                    this.setState({ products: response });
                    this.props.dispatch(updateLoadingProductData(false));


                }
            });
            return true
        }
        else {
            return true
        }
    }


    render() {
        const { globalSearch, globalseraching } = this.props;
        const { products } = this.state;
        const totalPages = products.active_product_count ? Math.ceil(products.active_product_count / Number(this.state.limit)) : 1;
        console.log('req products', products)
        return (
            <>
                <div className="table-responsive">
                    <table
                        className="table product_table"
                        id="dataTable"
                        cellSpacing={0}
                    >
                        <thead>
                            <tr>
                                <th>
                                    #{/* <div className="d-flex all_check">
                                        <input type="checkbox" />
                                        <label style={{ color: 'black' }}>All</label>
                                    </div> */}
                                </th>
                                <th>Product Details</th>
                                <th>Category</th>
                                <th>MRP/MOP</th>
                                <th>
                                    <div className="d-flex align-items-center">Selling Price
                                        <div className="d-none">
                                            <button className="up"></button>
                                            <button className="down"></button>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    {/* <div className="d-flex align-items-center">Stock 
                            <div className="d-flex flex-column">
                                    <button className="up"></button>
                                    <button className="down"></button>
                                </div>
                            </div> */}
                                </th>
                                <th>Activation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {globalseraching == true ?
                                <>
                                    {globalSearch && globalSearch.length > 0 ?
                                        (
                                            globalSearch.map((item, index) => (
                                                <tr className="shown" key={index}>
                                                    <td>
                                                        <div className="d-flex">
                                                            <div className="single_check">
                                                                {/* <input type="checkbox" className="" /> */}

                                                                <label>{index + 1}</label>
                                                            </div>

                                                            <div>
                                                                <div className="sale_ribbon">Sale</div>
                                                                <div className="new_ribbon">New</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                    >
                                                        <p>{item.name ? item.name : ''}</p>
                                                        {/* <b href={void (0)} onClick={() => this.SendProduct(item.id)}>{item.id}</b> */}
                                                        <span
                                                            className="sku"

                                                            data-toggle="modal"
                                                            data-target="#myModal7"
                                                            onClick={() => this.props.dispatch(getSingleProductData({ merchant_id: this.props.user_id, product_id: item.sfid }))}
                                                        >{item.sfid ? item.sfid : item.id ? item.id : ''}</span>
                                                    </td>
                                                    {/*<td>{item.product_category__c ? item.product_category__c : ''}</td>*/}
                                                    <td>{item.product_category__c ? item.product_category__c : '-'}</td>

                                                    {/* <td>MRP ₹ {item.mrp__c?item.mrp__c:''}</td> */}
                                                    <td><p>MRP ₹{item.mrp__c}</p>

                                                        <span>MOP ₹{item.price__c}</span></td>


                                                    <td>

                                                        <div className="d-flex align-items-center justify-content-around">

                                                            <div className="d-flex" >₹{this.state.showInputTag ? <span><input type="number" defaultValue={item.loan_amount__c ? item.loan_amount__c : 0} onChange={(e) => {
                                                                this.setState({ sellingValue: e.target.value })
                                                            }} id={`pirce_input_${index}`} autoComplete="off" readOnly={this.state.selectedInputTag == `pirce_input_${index}` ? false : true} /></span> : ''}
                                                                {!this.state.showInputTag ? <span >{item.loan_amount__c ? item.loan_amount__c : 0}</span> : ''}
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                {/* {this.state.EditToggle ? ( */}
                                                                <button id={`pirce_input_${index}`} className={`edit_btn ${this.state.EditToggle == `pirce_input_${index}` ? '' : 'd-none'} `} onClick={() => this.updateSellingPrice(item)}>
                                                                    {/*<img src="images/icons/close-red.png" alt="" className='img-fluid' />*/}
                                                                    <i className="fa fa-save" style={{ fontSize: "15px" }}></i>
                                                                </button>

                                                                <button className='edit_btn' onClick={() => { this.editprice(`pirce_input_${index}`) }}   >
                                                                    <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                                </button>


                                                            </div>

                                                        </div>
                                                    </td>

                                                    <td>


                                                    </td>

                                                    <td> <div className="switch_btn d-flex" style={{ color: `${item.activate_product__c == true ? '#094588' : ''}` }}>
                                                        <label className="switch mr-3 ">
                                                            <input type="checkbox"

                                                                onChange={(e) => this.handleSatusChange(item)}
                                                                checked={item.activate_product__c == true ? true : false}
                                                                id={item.id}
                                                            />

                                                            <span className="slider round"></span>
                                                        </label>
                                                        {item.activate_product__c}

                                                        {item.activate_product__c && item.activate_product__c == true ? "Active" : "Inactive"}

                                                    </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                        : 
                                        <tr className="odd">
                                            <td valign="top" colspan="7" className="dataTables_empty text-center">No data available in table</td>
                                        </tr>

                                    }
                                </>
                                :
                                <>

                                    {products.proData && products.proData.length > 0 &&
                                        (
                                            products.proData.map((item, index) => (

                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex">
                                                            <div className="single_check">
                                                                {/* <input type="checkbox" className="" /> */}
                                                                <label>{index + 1}</label>
                                                            </div>

                                                            <div>
                                                                <div className="sale_ribbon">Sale</div>
                                                                <div className="new_ribbon">{item.new_arrival}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{item.name}</p>
                                                        <span className="sku"
                                                            data-toggle="modal"
                                                            data-target="#myModal7"
                                                            onClick={() => this.props.dispatch(getSingleProductData({ merchant_id: this.props.user_id, product_id: item.sfid }))}
                                                        >{item.sfid ? item.sfid : item.id ? item.id : ''}</span>
                                                        <br />
                                                        <span className="date"> {item.createddate}</span>
                                                    </td>
                                                    {/*<td>{item.product_category__c ? item.product_category__c : ''}</td>*/}
                                                    <td>{item.product_sub_category__c ? item.product_sub_category__c : '-'}</td>

                                                    <td><p>MRP ₹{item.mrp__c}</p>

                                                        <span>MOP ₹{item.price__c}</span></td>
                                                    <td>
                                                        {/* <div className="d-flex align-items-center justify-content-around">
                                <div>₹ {item.loan_amount__c}</div>   
                                <button className='edit_btn' type='text' >{item.merchant_selling_price_update}
                                <img src="images/icons/edit_20.png" alt="" className='img-fluid'/>
                                </button>
                                </div> */}
                                                        <div className="d-flex align-items-center justify-content-around">
                                                            {/* <div className="d-flex">₹{item.loan_amount__c ? item.loan_amount__c : '-'}<input type="text" defaultValue={item.loan_amount__c} onChange={(e) => {
                                                        this.setState({ sellingValue: e.target.value })
                                                    }} id={`pirce_input_${index}`} /> </div> */}
                                                            <div className="d-flex" >₹{this.state.showInputTag ? <span><input type="number" defaultValue={item.loan_amount__c ? item.loan_amount__c : 0} onChange={(e) => {
                                                                this.setState({ sellingValue: e.target.value })

                                                            }} id={`pirce_input_${index}`} autoComplete="off" readOnly={this.state.selectedInputTag == `pirce_input_${index}` ? false : true} /></span> : ''}
                                                                {!this.state.showInputTag ? <span >{item.loan_amount__c ? item.loan_amount__c : 0}</span> : ''}
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <button className={`edit_btn ${this.state.EditToggle == `pirce_input_${index}` ? '' : 'd-none'} `} onClick={() => this.updateSellingPrice(item)}>
                                                                    {/* <img src="images/icons/close-red.png" alt="" className='img-fluid' /> */}
                                                                    <i className="fa fa-save" style={{ fontSize: "15px" }}></i>

                                                                </button>
                                                                <div>
                                                                    {/* <button 
                                        onClick={()=>{
                                         {item.merchant_selling_price_edit}
                                        }} className='edit_btn'>{item.merchant_selling_price_update}
                                        <img src="images/icons/diskette.png" alt="" className='img-fluid'/>
                                        </button> */}
                                                                </div>
                                                            </div>
                                                            <button className='edit_btn' onClick={() => { this.editprice(`pirce_input_${index}`) }}>
                                                                <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* <div className="d-flex align-items-center justify-content-around">
                                <div>99</div>   
                                <button className='edit_btn'>
                                <img src="images/icons/edit_20.png" alt="" className='img-fluid'/>
                                </button>
                                </div> */}

                                                    </td>
                                                    <td> <div className="switch_btn d-flex" style={{ color: `${item.activate_product__c == true ? '#094588' : ''}` }}>
                                                        <label className="switch mr-3">
                                                            <input type="checkbox"
                                                                onChange={(e) => this.handleSatusChange(item)}
                                                                //    defaultChecked={item.activate_product__c? item.activate_product__c : true}
                                                                // defaultChecked={item.activate_product__c? true:false}
                                                                // current update for teting pursure

                                                                defaultChecked={item.activate_product__c ? item.activate_product__c : true}
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                        {item.activate_product__c}

                                                        {item.activate_product__c && item.activate_product__c ? "Active" : "Inactive"}

                                                    </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </>
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

function mapStateToProps(state) {
    const { user_id } = state.auth;
    const { load_product_data, globalSearch, globalseraching } = state.user;



    return {
        user_id,
        load_product_data,
        globalSearch,
        globalseraching
    };
}

export default connect(mapStateToProps)(ActiveProducts)