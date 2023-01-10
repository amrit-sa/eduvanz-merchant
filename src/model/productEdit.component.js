import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeModel } from "../actions/model";
import { createLeads, getLeads, merchentProductUpdate, getMerchantProductsByStatus, updateLoadingProductData } from "../actions/user";
import { openLeadProfileModel } from "../actions/model"
import { Scrollbar } from "react-scrollbars-custom";



const initialState = {
    mobile: '',
    first_name: '',
    last_name: '',
    email: '',
    product: '',
    product_price: '',
    loan_amount: '',
    isValid: true,
    errorMsg: '',
    isSuccess: '',
    successMsg: '',
    onBoarding: 0,
    categeory: "",
    brand: "",
    Product_Description: "",
    Product_MRP: "",
    Product_MOP: "",
    Stock: "",
    Selling_Price: "-",
    Stock: "-",
    Discounted_Amount: "-",
    Discount_Percentage: "-",
    Delivery_Charges: "-",
    Delivery_TAT: "-",
    productId: "-",
    isActive: null



};

class ProductEdit extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.handleMobile = this.handleMobile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onlyNumbers = this.onlyNumbers.bind(this);
        this.handleSubmitLead = this.handleSubmitLead.bind(this);
        this.testRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.singleProduct != nextProps.singleProduct) {
            if (nextProps.singleProduct && nextProps.singleProduct.proData.length > 0) {
                console.log('item price ok', nextProps.singleProduct.proData[0].price__c)
                let requiredArray = nextProps.singleProduct.proData[0]
                this.setState({
                    Selling_Price: requiredArray.price__c ? requiredArray.price__c : '-',
                    Stock: requiredArray.sku ? requiredArray.sku : '-',
                    //stock:requiredArray.sku?requiredArray.requiredArray.sku:'-',                             
                    Discounted_Amount: requiredArray.discount_amt ? requiredArray.discount_amt : '-',
                    Discount_Percentage: requiredArray.discount_percent ? requiredArray.discount_percent : '-',
                    Delivery_Charges: requiredArray.delivery_charge ? requiredArray.delivery_charge : '-',
                    Delivery_TAT: requiredArray.delivery_tat ? requiredArray.delivery_tat : '-',
                    productId: requiredArray.sfid ? requiredArray.sfid : '',
                    isActive: requiredArray.activate_product__c ? requiredArray.activate_product__c : null
                })

                if (requiredArray.discount_percent && requiredArray.discount_percent > 90) {
                    this.setState({ errorMsg: 'looks like discount is more than 90%' })
                }
                else {
                    this.setState({ errorMsg: '' })
                }

            }



            return true
        } else {
            return true
        }

    }





    onNextBording = (next) => {
        this.setState({ onBoarding: next });
    }

    closeModel = () => {
        this.props.dispatch(closeModel())
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isActiveStatus = (e) => {

        console.log("Status Value", e.target.checked)
    }
    handleMobile = (e) => {
        const reg = /^[0]?[6789]\d{9}$/;
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                this.setState({ isValid: false, errorMsg: "Please enter only number.", mobile: "" });
                document.getElementById('mobile').value = "";
            } else if (e.target.value.length === 10) {
                if (reg.test(e.target.value)) {
                    this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
                } else {
                    this.setState({ isValid: false, errorMsg: "Please enter valid mobile number.", mobile: e.target.value });
                }
            } else {
                this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
            }
        } else {
            this.setState({ isValid: false, errorMsg: "", mobile: e.target.value });
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

    handleSelectProduct = (e) => {
        const { products } = this.props;
        let id = e.target.value;
        if (id != '') {
            var selctedItem = products.find(item => item.id == id);
            this.setState({ product_price: selctedItem.product_price, product: id, loan_amount: selctedItem.loan_amount });
        } else {
            this.setState({ product_price: '', product: '', loan_amount: '' });
        }
    }
    scrollToBottom = () => {
        var objDiv = document.getElementById("create-lead");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleSubmitLead = (e) => {
        e.preventDefault();
        const { activeProductTab } = this.props

        if (this.state.Discount_Percentage > 90) {
            this.setState({ errorMsg: 'looks like discount is more than 90%' })
        }
        else {
            this.setState({ errorMsg: '' })
        }

        let data = {
            fname: this.state.first_name,
            lname: this.state.last_name,
            email: this.state.email,
            mobile: this.state.mobile,
            product: this.state.product,
            product_price: this.state.product_price,
            loan_amount: this.state.loan_amount,
            id: this.props.user_id
        };

        let add_data = {
            "merchant_id": this.props.user_id,
            "product_id": this.state.productId,
            "new_selling_price": this.state.Selling_Price == '-' ? '' : this.state.Selling_Price,
            "discount_amt": this.state.Discounted_Amount == '-' ? null : this.state.Discounted_Amount,
            "discount_rate": this.state.Discount_Percentage == '-' ? null : this.state.Discount_Percentage,
            "delivery_charge": this.state.Delivery_Charges == '-' ? null : this.state.Delivery_Charges,
            "delivery_tat": this.state.Delivery_TAT == '-' ? '' : this.state.Delivery_TAT,
            "section": "Product Details"
        }
        console.log('submit data', add_data)
        // if (this.state.Selling_Price.length>0 && this.state.Selling_Price[0]=='-'){
        //     this.state.Selling_Price.replace("-", "")
        // }
        // if (this.state.Discounted_Amount.length>0 && this.state.Discounted_Amount[0]=='-'){
        //     this.state.Discounted_Amount.replace("-", "")
        // }
        // if (this.state.Discount_Percentage.length>0 && this.state.Discount_Percentage[0]=='-'){
        //     this.state.Discount_Percentage.replace("-", "")
        // }
        // if (this.this.state.Delivery_Charges.length>0 && this.this.state.Delivery_Charges[0]=='-'){
        //     this.this.state.Delivery_Charges.replace("-", "")
        // }
        this.props.dispatch(merchentProductUpdate(add_data)).then((response) => {
            if (!response.responseCode) {
                this.props.dispatch(updateLoadingProductData(true));
                document.getElementById('modalOff').click()


            }
        }).catch((error) => {
            this.setState({ isSuccess: 0, successMsg: error });
        });



        // this.props.dispatch(createLeads(data)).then((response)=>{
        //     if(response.status ==="success")
        //     {
        //         let getData = response.data;
        //         this.setState({isSuccess: 1, successMsg: response.message});
        //         setInterval( document.getElementById("close-create").click(), 5000);
        //         this.props.dispatch(getLeads());
        //         setInterval(this.props.dispatch(openLeadProfileModel(getData.id)), 18000);
        //     }else{
        //         this.scrollToBottom();
        //         this.setState({isSuccess: 0, successMsg: response.message});
        //     }
        // }).catch((error)=>{
        //     this.setState({isSuccess: 0, successMsg: error});
        // });
    }


    render() {
        const { isLoading, products, ProductAlldata, singleProduct, activeProductTab } = this.props
        console.log(singleProduct, '>>>>>>>>. single product value is')
        const item = ProductAlldata
        console.log('tonibabu', ProductAlldata)
        console.log('singleProduct', singleProduct)
        console.log('activeProductTab', activeProductTab)



        return (
            <>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                {/* Modal */}
                <div className="modal right fade myModal" id="myModal7" role="dialog" >
                    <div className="modal-dialog" >
                        {/* Modal content*/}
                        {
                            singleProduct && singleProduct.proData && singleProduct.proData.length > 0 &&
                            singleProduct.proData.map(item => {
                                return (
                                    <form onSubmit={this.handleSubmitLead} className="f_height">

                                        <div className="modal-content" key={item.id} >

                                            <div className="modal-header">
                                                <button type="button" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>
                                                <div className='row justify-content-between w-100'>
                                                    <div className='col-sm-7 d-flex align-items-center'>
                                                        <h5 className="modal-title fz24">{item.sfid ? item.sfid : item.id ? item.id : ''}</h5>
                                                        <div className="switch_btn d-flex ml-4">
                                                            <label className="switch mr-3">
                                                                <input type="checkbox" defaultChecked={this.state.isActive} id="isActiveStatus" onChange={(e) => { this.isActiveStatus(e) }} />
                                                                <span className="slider round"></span>
                                                            </label> Inactive
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-5 d-flex align-items-center justify-content-lg-end'>
                                                        <button type='button' className='viewInStore_btn mr-3'>

                                                            <img src="images/icons/attatchment.png" alt="" className='img-fluid' />
                                                            <a href="/Help"> View in Store</a></button>
                                                        <button type='button' className='qst'>?</button>
                                                    </div>

                                                </div>

                                            </div>
                                            <div id="" className="modal-body pt-0 px-0">

                                                <Scrollbar>
                                                    <div className='px-3'>
                                                        <div className="row justify-content-center mb-2">
                                                            <div className="col-sm-11">
                                                                <div className='v-scroll'>
                                                                    <div className="row justify-content-center mb-2">
                                                                        <div className="col-sm-12 form-group">
                                                                            <label className="form-label">
                                                                                Product
                                                                            </label>
                                                                            {/* <p>{item.name ? item.name : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.name ? item.name : ''} onChange={(e) => { this.setState({ product: e.target.value }) }} readOnly />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row justify-content-center mb-2">
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Category
                                                                            </label>
                                                                            {/* <p>{item.product_category_c ? item.product_category_c : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.product_category_c ? item.product_category_c : ''} onChange={(e) => { this.setState({ categeory: e.target.value }) }} readOnly />


                                                                        </div>
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Brand
                                                                            </label>
                                                                            {/* <p>{item.brand ? item.brand : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.brand ? item.brand : ''} onChange={(e) => { this.setState({ brand: e.target.brand }) }} readOnly />


                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-12 form-group">
                                                                            <label className="form-label">
                                                                                Product Description
                                                                            </label>

                                                                            {/* <p>{item.description ? item.description : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.description ? item.description : ''} onChange={(e) => { this.setState({ Product_Description: e.target.value }) }} readOnly />

                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Product MRP
                                                                            </label>
                                                                            {/* <p><i className='rupee'>`</i>{item.mrp__c ? item.mrp__c : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.mrp__c ? item.mrp__c : ''} onChange={(e) => { this.setState({ Product_MRP: e.target.value }) }} readOnly />

                                                                        </div>
                                                                        <div className="col-sm-6 form-group">
                                                                            <label className="form-label">
                                                                                Product MOP
                                                                            </label>
                                                                            {/* <p><i className='rupee'>`</i>{item.mop ? item.mop : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.mop ? item.mop : ''} onChange={(e) => { this.setState({ Product_MOP: e.target.value }) }} readOnly />

                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-2">

                                                                        <div className="col-sm-6 form-group ">
                                                                            <label className="form-label">
                                                                                Selling Price
                                                                            </label>
                                                                            {/* <p>{item.price__c ? item.price__c : '-'}</p> */}
                                                                            <i className='rupee ' style={{ position: "absolute", borderBottom: "2px solid black", width: '20px' }}>`</i><input style={{ position: "relative", borderBottom: '2px solid black' }} className="ml-3" type="text" placeholder='-' defaultValue={item.loan_amount__c ? item.loan_amount__c : ''} onChange={(e) => { this.setState({ Selling_Price: e.target.value }) }} />

                                                                        </div>
                                                                        <div className="col-sm-6 form-group border-bottom pl-1 d-none">
                                                                            <label className="form-label">
                                                                                Stock
                                                                            </label>
                                                                            {/* <p>{item.sku ? item.sku : '-'}</p> */}
                                                                            <input type="text" placeholder='-' defaultValue={item.sku ? item.sku : ''} onChange={(e) => { this.setState({ Stock: e.target.value }) }} />

                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-4">

                                                                        <div className="col-sm-6 d-flex form-group">
                                                                            <div>
                                                                                <label className="form-label">
                                                                                    Discounted Amount
                                                                                </label>

                                                                                <p>
                                                                                    {/* {item.discount_amt ? item.discount_amt : '-'} */}
                                                                                    <i className='rupee  ' style={{ position: "absolute", borderBottom: "2px solid black", width: '20px' }}>`</i><input type="text" style={{ position: "relative", borderBottom: "2px solid black", width: '170px' }} className="ml-3" placeholder='' defaultValue={item.discount_amt ? item.discount_amt : ''} onChange={(e) => { this.setState({ Discounted_Amount: e.target.value }) }} />

                                                                                </p>
                                                                            </div>
                                                                            <div className='ml-auto mt-1'>
                                                                                <span className='circle-info'><i className="fa fa-info" aria-hidden="true"></i></span>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-sm-6 form-group  border-bottom">
                                                                            <label className="form-label">
                                                                                Discount Percentage
                                                                            </label>
                                                                            <p>
                                                                                {/* <i className='rupee'>`</i> */}
                                                                                {/* {item.discount_percent ? item.discount_percent : '-'} */}
                                                                                <input type="text" style={{ borderBottom: "2px solid black", width: "20%" }} placeholder='' defaultValue={item.discount_percent ? item.discount_percent : ''} onChange={(e) => { this.setState({ Discount_Percentage: e.target.value }) }} />
                                                                                <p style={{ position: "absolute", top: "25px", left: "35px" }}>%</p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="row mb-2" > */}
                                                                    {/* <div className="col-sm-6 form-group border-bottom">
                                   <label className="form-label">
                                   Delivery Charges
                                   </label>
                                  <p>
                                  <input style={{borderBottom: "2px solid black",width: '180px'}} type="text" placeholder='Enter Delivery charges' defaultValue={item.delivery_charge ? item.delivery_charge : ''} onChange={(e)=>{this.setState({Delivery_Charges:e.target.value}) }} />

                                  </p>
                               </div> */}
                                                                    {/* <i className='rupee'>`</i> */}
                                                                    {/* {item.delivery_charge ? item.delivery_charge : '-'} */}
                                                                    {/* <div className="col-sm-6 form-group">
                                   <label className="form-label">
                                   Delivery TAT
                                   </label> */}

                                                                    {/* <i className='rupee'>`</i> */}
                                                                    {/* {item.delivery_tat ? item.delivery_tat : '-'} */}
                                                                    {/* <input type="number" style={{borderBottom: "2px solid black",width:"20%"}} min="1" max="31" placeholder='' defaultValue={item.delivery_tat ? item.delivery_tat : '-'} onChange={(e)=>{this.setState({Delivery_TAT:e.target.value}) }} />
                                  <p style={{position:"absolute",top:"27px",left:"70px"}}>
                                  Days
                                  </p>
                                 
                               </div> */}
                                                                    {/* </div> */}
                                                                    {/* <div className='row'>
                                <div className='col'>
                                    <h5 className='fz20 color_NavyBlue fw600 mb-4'>Offers</h5>
                                    </div>
                                </div>
                           <div className='row align-items-center justify-content-between'>
                               <div className='col'>
                                    <p className='m-0 fz18 fw400 color_jaguar'>1. Single's Offer</p>
                                   </div>
                               <div className='col d-flex align-items-center justify-content-end'>
                                    <span className='online-status off'>Live</span>
                                    <button type='button' className='delete'>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className='edit_btn'>
                                        <img src="images/icons/edit_20.png" alt="" className='img-fluid'/>
                                    </button>
                                </div>
                           </div>

                           <div className='row align-items-center justify-content-between'>
                               <div className='col'>
                                    <p className='m-0 fz18 fw400 color_jaguar'>2. Single's Offer</p>
                                   </div>
                               <div className='col d-flex align-items-center justify-content-end'>
                                    
                                    <button type='button' className='delete'>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className='edit_btn'>
                                        <img src="images/icons/edit_20.png" alt="" className='img-fluid'/>
                                    </button>
                                </div>
                           </div>
                           <div className='row align-items-center justify-content-between mt-4'>
                               <div className='col'>
                                    <div className="switch_btn d-flex">
                                        <label className="switch mr-3">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> Create New Offer
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <div className="row mb-2">
                                    <div className="col-sm-6 form-group">
                                        <label className="form-label">
                                        Offer Name
                                        </label>
                                        <input type="text" className='form-control' placeholder='Enter Offer Name'/>
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <label className="form-label">
                                        Offer Price
                                        </label>
                                        
                                        <input type="text" className='form-control' placeholder='Enter Offer Price'/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-6 form-group">
                                        <label className="form-label">
                                        Offer Duration
                                        </label>
                                        <div className='d-flex align-items-center'>
                                            <span className='fz12 d-block pr-2'>From</span>
                                            <div>
                                            <input type="text" className='form-control' placeholder='dd/mm/yy'/>
                                            </div>
                                            <span className='fz12 d-block pr-2'>To</span>
                                            <div>
                                            <input type="text" className='form-control' placeholder='dd/mm/yy'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 form-group d-flex align-items-end">
                                        <div className="switch_btn d-flex">
                                            <label className="switch mr-3">
                                                <input type="checkbox" />
                                                <span className="slider round"></span>
                                            </label> Create New Offer
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col d-flex'>
                                         <div className='customInputsradio'>
                                            <input
                                                type="checkbox"
                                                defaultValue="datefilter"
                                                name="radio"
                                                id="remember"
                                                defaultChecked="checked"
                                            />
                                            <label htmlFor="remember">Remember this offer</label>
                                        </div>
                                        <div className='ml-auto'>
                                        <Button 
                                            type='button'
                                            className="btn btn-default_ medium"
                                            disabled>Cancel</Button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                                                </div>
                                                                <div className='d-flex justify-content-start text-danger ml-2'>
                                                                    {this.state.errorMsg}
                                                                </div>
                                                                <div className="row justify-content-between align-items-center mt-3">
                                                                    <div className="col-lg-7 form_notes mt-0">
                                                                        <button className='link'>
                                                                            <span className='d-inline-block mr-2'><img src="images/icons/tick-mark.png" alt="tick-mark" /></span>
                                                                            The payment schemes and cancellation/return policy for all products are pre-agreed.
                                                                        </button>
                                                                    </div>

                                                                    <div className='col-lg-5 d-flex justify-content-end'>
                                                                        <Button
                                                                            type='button'
                                                                            className="btn btn-default_"
                                                                            type="submit"
                                                                            disabled={this.state.Selling_Price !== '-' && this.state.Selling_Price !== '' ? false : true}
                                                                            onClick={() => console.log('checke', this.state.product)}>Save</Button>
                                                                        <button id="modalOff" data-dismiss="modal" className='d-none'>modal off</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Scrollbar>
                                            </div>
                                        </div>


                                    </form>
                                )
                            })
                        }
                    </div>
                </div >

                {/*Model Stop*/}
            </>
        )
    }

}

function mapStateToProps(state) {
    const { product_edit_show } = state.model;
    const { isLoading, user_id } = state.auth;
    const { products, ProductAlldata, singleProduct, activeProductTab } = state.user;
    return {
        product_edit_show,
        user_id,
        products,
        isLoading,
        ProductAlldata,
        singleProduct,
        activeProductTab
    };
}

export default connect(mapStateToProps)(ProductEdit)