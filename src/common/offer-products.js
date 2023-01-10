import React from 'react'
import { updateProductStatusOffer } from "../actions/user";
import { connect } from "react-redux";



 class OfferProducts extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let getProd = { merchant_id: this.props.user_id, status: "offer" }
        this.props.dispatch(updateProductStatusOffer(getProd)).then((response) => {
            if (!response.responseCode) {
                this.setState({ DataSet: response });
            }
        });
    }

    render() {
        const {offer_details  } = this.props
        console.log('offeres ', offer_details)
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
                                        <label>All</label>
                                    </div>
                                </th>
                                <th>Product Details</th>
                                <th>Category</th>
                                <th>MRP/MOP</th>
                                <th>
                                    <div className="d-flex align-items-center">Selling Price
                                        <div className="d-flex flex-column">
                                            <button className="up"></button>
                                            <button className="down"></button>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex align-items-center">Stock
                                        <div className="d-flex flex-column">
                                            <button className="up"></button>
                                            <button className="down"></button>
                                        </div>
                                    </div></th>
                                <th>Activation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {offer_details && offer_details.length > 0 &&
                                (
                                    offer_details.map((item, index) => (
                            <tr>
                                <td>
                                    <div className="d-flex" key={index}>
                                        <div className="single_check">
                                            <input type="checkbox" className="" />
                                            <label></label>
                                        </div>

                                        <div>
                                            <div className="sale_ribbon">Sale</div>
                                            <div className="new_ribbon">New</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{item.id}</p>
                                    {/* <span className="sku">SKU: {item.id}</span> */}
                                </td>
                                {/* <td>{item.name}</td> */}
                                <td>MRP ₹ 1,49,000</td>
                                {/* <td>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex">₹ <input value="1,40,000" /></div>
                                        <div className="d-flex">
                                            <button className='edit_btn'>
                                                <img src="images/icons/close-red.png" alt="" className='img-fluid' />
                                            </button>
                                            <button className='edit_btn'>
                                                <img src="images/icons/diskette.png" alt="" className='img-fluid' />
                                            </button>
                                        </div>
                                        <button className='edit_btn'>
                                            <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        </button>
                                    </div>
                                </td> */}
                                <td>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>77</div>
                                        <button className='edit_btn'>
                                            <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                        </button>
                                    </div>

                                </td>
                                <td> <div className="switch_btn d-flex">
                                    <label className="switch mr-3">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label> Inactive
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
                            //             <div>₹ 1,40,000</div>
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
                            //             <div>₹ 1,40,000</div>
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
                <div className="pagination-section d-flex align-items-center justify-content-lg-end justify-content-center mb-4">
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
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { offer_details, leadsCount } = state.user;
    const { user_id, token, sfid } = state.auth;
    const { message } = state.message;
    return {
        sfid,
        offer_details,
        leadsCount,
        user_id,
        token,
        message
    };
}
export default connect(mapStateToProps)(OfferProducts);