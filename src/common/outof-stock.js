import React from 'react'
import { updateProductStatusStock, merchentProductStatusUpdate, getMerchantProductsByStatus, merchentProductSellingPriceUpdate,getSingleProductData } from "../actions/user";
import Pagination from '@material-ui/lab/Pagination';


export default class OutofStocks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DataSet: {
                proData: []
            },
            page: 1,
            limit: 10,
            selectedInputTag:'',
            showInputTag:false,
            EditToggle:false

        }
    }

    componentDidMount() {

        let getProd = { merchant_id: this.props.user_id, status: "out of stock", page: this.state.page, limit: this.state.limit }
        this.props.dispatch(updateProductStatusStock(getProd)).then((response) => {
            if (!response.responseCode) {
                this.setState({ DataSet: response });
            }
        });
    }

    handleChangePage = (event, value) => {
        let getProd = { merchant_id: this.props.user_id, page: value, limit: this.state.limit, status: "out of stock" }
        this.setState({ page: value });
        this.props.dispatch(updateProductStatusStock(getProd));
    }

    handleChangelimitOfPage = (event) => {
        let perRowData = event.target.value;
        let getProd = { merchant_id: this.props.user_id, page: this.state.page, limit: perRowData, status: "out of stock" }
        this.setState({ limit: perRowData });
        this.props.dispatch(updateProductStatusStock(getProd));
    }


    updateSellingPrice = (item) => {
        let getProd = { merchant_id: this.props.user_id, product_id: item.sfid, new_selling_price: this.state.sellingValue }
        this.props.dispatch(merchentProductSellingPriceUpdate(getProd)).then((response) => {
            if (!response.responseCode) {
                let get_products = { merchant_id: this.props.user_id, status: "out of stock" }
                this.props.dispatch(updateProductStatusStock(get_products)).then((response) => {
                    if (!response.responseCode) {
                        this.setState({ DataSet: response });
                         this.setState({ EditToggle : ''})
                    }
                });
            }
        })
         this.setState({ sellingValue: "",showInputTag:false })
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
                let get_products = { merchant_id: this.props.user_id, status: "inactive" }
                this.props.dispatch(getMerchantProductsByStatus(get_products)).then((response) => {
                    if (!response.responseCode) {
                        this.setState({ products: response });
                    }
                });
            }
        });
    }
    editprice = async(inputIs) => {
        this.setState({ EditToggle : inputIs})
        await this.setState({showInputTag:true});
       document.getElementById(inputIs).focus();
        this.setState({ selectedInputTag:inputIs})
    }

    render() {
        const { products } = this.props;
        const { DataSet } = this.state;

        const totalPages = products.out_of_stock_count ? Math.ceil(products.out_of_stock_count / Number(this.state.limit)) : 1;
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
                                    <div className="d-flex all_check">
                                        <input type="checkbox" />
                                        <label style={{ color: 'black' }}>All</label>
                                    </div>
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
                                    <div className="d-flex align-items-center">Stock
                                        <div className="d-none">
                                            <button className="up"></button>
                                            <button className="down"></button>
                                        </div>
                                    </div></th>
                                <th>Activation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataSet.proData && DataSet.proData.length > 0 &&
                                (
                                    DataSet.proData.map((item, index) => (
                                        <tr>
                                            <td>
                                                <div className="d-flex">
                                                    <div className="single_check">
                                                        <input type="checkbox" className="" />
                                                        <label></label>
                                                    </div>

                                                    <div>
                                                        <div className="sale_ribbon">Sale</div>
                                                        <div className="new_ribbon">{item.new_arrival}</div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{item.product_sub_category__c}</p>
                                                <span className="sku">{item.sku ? item.sku : "SKU:"}</span>

                                            </td>
                                            {/*<td>{item.product_category__c ? item.product_category__c : ''}</td>*/}
                                            <td>{item.product_sub_category__c ? item.product_sub_category__c : '-'}</td>

                                            <td><p>MRP ₹{item.mrp__c}</p>
                                                <span>MOP ₹{item.price__c}</span></td>

                                            {/* <td>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex">₹ <input type="text" value="1,40,000" /></div>
                                        <div className="d-flex align-items-center">
                                            <button className='edit_btn'>
                                                <img src="images/icons/close-red.png" alt="" className='img-fluid' />
                                            </button>
                                            <div>
                                                <button className='edit_btn'>
                                                    <img src="images/icons/diskette.png" alt="" className='img-fluid' />
                                                </button>
                                            </div>
                                        </div>
                                        <button className='edit_btn'>
                                            <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        </button>
                                    </div>
                                </td> */}
                                            {/* <td>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>{item.loan_amount__c}</div>
                                                    <button className='edit_btn'>
                                                        <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                    </button>
                                                </div>

                                            </td> */}

                                            <td>
                                                {/* <div className="d-flex align-items-center justify-content-between">
                                <div>₹ {item.offer_price__c}</div>   
                                <button className='edit_btn' type='text' >{item.merchant_selling_price_update}
                                <img src="images/icons/edit_20.png" alt="" className='img-fluid'/>
                                </button>
                                </div> */}
                                                <div className="d-flex align-items-center justify-content-between">
                                                   {/* <div className="d-flex">₹{item.loan_amount__c ? item.loan_amount__c : '-'}<input type="text" value={this.state.sellingValue} onChange={(e) => {
                                                        this.setState({ sellingValue: e.target.value })
                                                    }} id={`pirce_input_${index}`} /> </div> */}
                                                    <div className="d-flex" style={{width:'100px'}}>₹ {this.state.showInputTag?<span><input type="text" defaultValue={item.loan_amount__c?item.loan_amount__c:0} onChange={(e) => {
                                                        this.setState({ sellingValue: e.target.value })
                                                    }} id={`pirce_input_${index}`} autoComplete="off" readOnly={this.state.selectedInputTag==`pirce_input_${index}`?false:true}/></span> :''}
                                                    {!this.state.showInputTag?<span >{item.loan_amount__c?item.loan_amount__c:0}</span>:''}

                                                    </div>


                                                    <div className="d-flex align-items-center">
                                                        <button className={`edit_btn ${this.state.EditToggle==`pirce_input_${index}` ? '' : 'd-none'} `} onClick={() => this.updateSellingPrice(item)}>
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
                                                        <button className='edit_btn' onClick={() => { this.editprice(`pirce_input_${index}`) }}>
                                                            <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                        </button>
                                                    </div>

                                                </div>
                                            </td>


                                            <td><div className="d-flex align-items-center justify-content-between">
                                                <div>77</div>
                                                <button className='edit_btn'>
                                                    <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                </button>
                                            </div></td>
                                            {/* <td> <div className="switch_btn d-flex">
                                                <label className="switch mr-3">
                                                    <input type="checkbox" defaultChecked={item.activate_product__c && item.activate_product__c ? true : false} />
                                                    <span className="slider round"></span>
                                                </label>
                                                {item.activate_product__c && item.activate_product__c ? "Active" : "Inactive"}
                                            </div>
                                            </td> */}

                                            <td> <div className="switch_btn d-flex"><div className="switch_btn d-flex" style={{ color: `${item.activate_product__c == true ? '#094588' : ''}` }}>
                                                <label className="switch mr-3" >
                                                    <input type="checkbox"
                                                        onChange={(e) => this.handleSatusChange(item)}
                                                        //    defaultChecked={item.activate_product__c? item.activate_product__c : true}
                                                        // defaultChecked={item.activate_product__c? true:false}
                                                        // current update for teting pursure

                                                        defaultChecked={item.activate_product__c ? true : false}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                {item.activate_product__c}

                                                {item.activate_product__c && item.activate_product__c ? "Active" : "Inactive"}

                                            </div>
                                            </div>
                                            </td>
                                        </tr>
                                        // {/* <tr>
                                        //     <td>
                                        //         <div className="d-flex">
                                        //             <div className="single_check">
                                        //                 <input type="checkbox" className="" />
                                        //                 <label></label>
                                        //             </div>

                                        //             <div>
                                        //                 <div className="sale_ribbon">Sale</div>
                                        //                 <div className="new_ribbon">New</div>
                                        //             </div>
                                        //         </div>
                                        //     </td>
                                        //     <td>
                                        //         <p>Apple Macbook Pro 2021 14 in Silvergray, Apple M1 Pro with 8-core CPU, 14-co...</p>
                                        //         <span className="sku">SKU: 1288374A</span>
                                        //     </td>
                                        //     <td>Laptop</td>
                                        //     <td>MRP ₹ 1,49,000</td>
                                        //     <td>
                                        //         <div className="d-flex align-items-center justify-content-between">
                                        //             <div className="d-flex">₹ <input type="text" value="1,40,000" /></div>
                                        //             <div className="d-flex align-items-center">
                                        //                 <button className='edit_btn'>
                                        //                     <img src="images/icons/close-red.png" alt="" className='img-fluid' />
                                        //                 </button>
                                        //                 <div>
                                        //                     <button className='edit_btn'>
                                        //                         <img src="images/icons/diskette.png" alt="" className='img-fluid' />
                                        //                     </button>
                                        //                 </div>
                                        //             </div>
                                        //             <button className='edit_btn'>
                                        //                 <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        //             </button>
                                        //         </div>
                                        //     </td>
                                        //     <td>
                                        //         <div className="d-flex align-items-center justify-content-between">
                                        //             <div>77</div>
                                        //             <button className='edit_btn'>
                                        //                 <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        //             </button>
                                        //         </div>

                                        //     </td>
                                        //     <td> <div className="switch_btn d-flex">
                                        //         <label className="switch mr-3">
                                        //             <input type="checkbox" />
                                        //             <span className="slider round"></span>
                                        //         </label> Inactive
                                        //     </div>
                                        //     </td>
                                        // </tr> */}
                                        // {/* <tr>
                                        //     <td>
                                        //         <div className="d-flex">
                                        //             <div className="single_check">
                                        //                 <input type="checkbox" className="" />
                                        //                 <label></label>
                                        //             </div>

                                        //             <div>
                                        //                 <div className="sale_ribbon">Sale</div>
                                        //                 <div className="new_ribbon">New</div>
                                        //             </div>
                                        //         </div>
                                        //     </td>
                                        //     <td>
                                        //         <p>Apple Macbook Pro 2021 14 in Silvergray, Apple M1 Pro with 8-core CPU, 14-co...</p>
                                        //         <span className="sku">SKU: 1288374A</span>
                                        //     </td>
                                        //     <td>Laptop</td>
                                        //     <td>MRP ₹ 1,49,000</td>
                                        //     <td>
                                        //         <div className="d-flex align-items-center justify-content-between">
                                        //             <div className="d-flex">₹ <input type="text" value="1,40,000" /></div>
                                        //             <div className="d-flex align-items-center">
                                        //                 <button className='edit_btn'>
                                        //                     <img src="images/icons/close-red.png" alt="" className='img-fluid' />
                                        //                 </button>
                                        //                 <div>
                                        //                     <button className='edit_btn'>
                                        //                         <img src="images/icons/diskette.png" alt="" className='img-fluid' />
                                        //                     </button>
                                        //                 </div>
                                        //             </div>
                                        //             <button className='edit_btn'>
                                        //                 <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        //             </button>
                                        //         </div>
                                        //     </td>
                                        //     <td>
                                        //         <div className="d-flex align-items-center justify-content-between">
                                        //             <div>77</div>
                                        //             <button className='edit_btn'>
                                        //                 <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        //             </button>
                                        //         </div>

                                        //     </td>
                                        //     <td> <div className="switch_btn d-flex">
                                        //         <label className="switch mr-3">
                                        //             <input type="checkbox" />
                                        //             <span className="slider round"></span>
                                        //         </label> Inactive
                                        //     </div>
                                        //     </td>
                                        // </tr> */}
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