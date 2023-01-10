import React, { Component } from 'react'
import $ from 'jquery';
import Select from 'react-select'
import { Modal, Button } from "react-bootstrap"
import { closeAddAccount } from "../actions/model"
import { getBanks, addBank } from "../actions/user";
import { Scrollbar } from "react-scrollbars-custom";



class BankListModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bank: '',
            bank_icon: "",
            showAll: ''
        };

        //   console.log("Componet addAccount props : ",this.props,props);
    }



    // handlebank = (value, bankicon) => {
    //     this.setState({ bank: value, bank_icon: bankicon, showAll: false });
    //     console.log("bank name", value)
    //     console.log("bank icon", bankicon)

    // }


    render() {
        const { banks } = this.props;

        return (
            <>

                {/* new modal account add */}
                <div className="modal right fade myModal" id="bankListModal" role="dialog">
                    <div className="modal-dialog modal-lg" style={{ width: "800px" }}>
                        <div className="modal-content">

                            <div className="modelbg_1 p-4">
                                <div className='d-flex justify-content-between align-items-center w-100 pt-2'>
                                    <div className='adduser_header d-flex align-items-center'>
                                        {/* <button type="button" className="adduser close" onClick={this.closeAddModel}> <i className="fas fa-times"></i> </button> */}
                                        <button type="button" id="close-add-btn" className="abs_close close" data-dismiss="modal"> <i className="fas fa-times"></i> </button>

                                        <h4 className='ml-3'>Select Bank Account</h4>
                                    </div>
                                
                                </div>
                            </div>




                            {/*  */}
                            <div id="" className="modal-body pt-0 px-0">
                                <Scrollbar>
                                    <div className='v-scroll_st px-4'>
                                        <div className="row mb-2">
                                            <div className="col-sm-12 form-group">
                                                <div className='d-flex flex-wrap mt-4'>


                                                    {banks && banks.length > 0 && (
                                                        banks.map((item, index) => (
                                                            <div key={"bank-" + index} className={` cursor-point text-center mobile-viewport-icon ${this.state.bank === item.bank_name ? 'bank-active' : ''}`}
                                                                onClick={() => this.props.handlebank(item.bank_name, item.bank_icon)}>
                                                                <span className="fs-8">
                                                                    {item.bank_icon && item.bank_icon.length > 0 ?
                                                                        <img src={item.bank_icon} />
                                                                        :
                                                                        <>
                                                                            {item.bank_name}
                                                                        </>
                                                                    }
                                                                </span>
                                                            </div>

                                                        ))
                                                    )
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </Scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end */}



            </>
        )
    }

}

export default BankListModal;
