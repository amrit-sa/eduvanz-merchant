import React from 'react';
import $ from 'jquery';
import { openAddAccount } from "../actions/model";
import AddNewAccount from '../model/add-account.component';
import { getUserBankList, deleteBank, getUpdateUserData, getBankDetailsOfUser, updateBankUserStatus } from "../actions/user";
import EditNewAccount from '../model/edit-account.components';


export default class BankDetails extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBankDetails = this.deleteBankDetails.bind(this);
        this.state = {
            userData: null,
            bank_account: null,
            editData: {},
            bankEditSfid: '',
            bankData: [],
        }
    }

    componentDidMount() {
        this.getBankList();
        let data = {
            user_sfid: this.props.sfid
        }

        this.props.dispatch(getUserBankList(data)).then(res => {
            if (res.status === "success") {
                this.setState({ bankData: res.data });
            }
        })
        /* this.props.dispatch(getProfileData(data)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({userData: response.accountDet});
            }
        }); */
    }

    getBankList = () => {
        let data = {
            user_sfid: this.props.sfid
        }
        this.props.dispatch(getUserBankList(data)).then((response) => {
            if (response && response.status == 'success') {
                this.setState({ bank_account: response.data });
            } else {
                this.setState({ bank_account: null });
            }
        });
    }

    handleSatusChange = (status, id) => {
        let data = {
            user_sfid: this.props.sfid
        }
        let obj = {
            "account_id": id,
            "status": !status
        }
        this.props.dispatch(updateBankUserStatus(obj)).then(res => {
            if (res.status === "success") {
                this.props.dispatch(getUserBankList(data)).then(res => {
                    if (res.status === "success") {
                        this.setState({ bankData: res.data });
                    }
                });
            }
        })
    }

    openAddModel = () => {
        this.props.dispatch(openAddAccount());
    }

    deleteBankDetails = (bank_sfid) => {
        this.props.dispatch(deleteBank(bank_sfid)).then(response => {
            if (response.status == "success") {
                this.getBankList();
            } else {
                alert(response.message)
            }
        })
            .catch(error => {
                console.log(error, '>>>>>>>>')
            })
    }

    updateBankDetails = (item) => {
        this.props.dispatch(getBankDetailsOfUser(item.id)).then(res => {
            if (res.status === 'success') {
                this.props.dispatch(getUpdateUserData(res.bankAccDet[0]));
            }
        })

    }


    handlebankModal = () => {
        $('#banklist_btn').trigger('click');
    }



    render() {
        const {merchant_banks} =this.props;
        const { bank_account } = this.state
        console.log(merchant_banks,"rrrrrrrrrrrrrrrrrrr");
        return (
            <>
                           
                <div className="card">
                    <div className="card-header">
                        <h2 className="mb-0 position-relative">
                            <button
                                className="btn btn-link accordion_btn collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >Bank Details
                            </button>
                            {/* <button type='button' onClick={this.openAddModel} className="d-sm-inline-block btn btn-sm btn-primary btn-dark add_btn_pos" >
                    <i className="fas fa-plus"></i>Add New Account</button> */}
                            <button type='button' data-toggle="modal" data-target="#addNewAccountModal" className="d-sm-inline-block btn btn-sm btn-primary btn-dark add_btn_pos" >
                                <i className="fas fa-plus"></i>Add New Account</button>
                                <button type='button' data-toggle="modal" id="banklist_btn" data-target="#bankListModal" className="d-none" >
                                <i className="fas fa-plus"></i>x</button>
                        </h2>
                    </div>
  
                    <div className="card-body mt-3">
                        <div className="table-responsive">
                            <table
                                className="table product_table dataTable no-footer"
                                id="dataTable"
                                cellSpacing={0}
                                accountDetaills={this.accountDetaills}
                            >
                                <thead>
                                    <tr>
                                        <th><div className="hash">#</div></th>
                                        <th>
                                            <div className="d-flex align-items-center">Account Name
                                                <div className="d-none">
                                                    <button className="up"></button>
                                                    <button className="down"></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th>Account Number</th>
                                        <th>
                                            Bank Name
                                        </th>
                                        <th>Branch Name</th>
                                        <th>IFSC Code</th>
                                        <th className='text-center'>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {merchant_banks && merchant_banks.length > 0 && (
                                        merchant_banks.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex">
                                                        <div className="t_r_number">{index + 1}</div>
                                                        {/* <div>
                                    <div className="sale_ribbon">Sale</div>
                                    <div className="new_ribbon">New</div>
                                </div> */}
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="link_">{item.account_name__c}</p>
                                                </td>
                                                <td>
                                                    <p className="email_ID">{item.account_number__c}</p>
                                                </td>

                                                <td>
                                                    <span>{item.bank_name__c}</span>
                                                </td>
                                                <td>
                                                    <div className="">
                                                        <span>{item.branch_name__c}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="">
                                                        <span>{item.ifsc__c}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex justify-content-center align-items-center table_action'>
                                                        {/* <button className='edit_btn'>
                                                            <img src="images/icons/edit_20.png" alt="" className='img-fluid' />
                                                        </button> */}
                                                        <div className="switch_btn d-flex justify-content-center align-items-center" style={{ color: `${item.bank_txn_status__c == true ? '#094588' : ''}` }}>
                                                            <label className="switch mr-3">
                                                                <input type="checkbox"
                                                                    onChange={(e) => this.handleSatusChange(item.bank_txn_status__c, item.id)}

                                                                    // defaultChecked={item.activate_product__c? item.activate_product__c : true}

                                                                    // defaultChecked={item.activate_product__c? true:false}

                                                                    // current update for teting pursure

                                                                    //defaultChecked={()=>{item.activate_product__c == true ? true :false}}

                                                                    //defaultChecked={item.activate_product__c && item.activate_product__c == true ? true : false}

                                                                    checked={item.bank_txn_status__c == true ? true : false}

                                                                />
                                                                <span className="slider round"></span>
                                                            </label>

                                                            {item.bank_txn_status__c == true ? "Active" : "Inactive"}
                                                        </div>
                                                        &nbsp;&nbsp; &nbsp;&nbsp;


                                                        <button type='button' data-toggle="modal" data-target="#editNewAccountModal" onClick={() => { this.updateBankDetails(item) }} >
                                                            <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>

                                                        </button>
                                                        {/* &nbsp;&nbsp; */}
                                                        {/* <button type='button' data-toggle="modal" onClick={() => {this.deleteBankDetails(item.id)}}  >
                                                        <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                                                       </button> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <AddNewAccount
                    handlebankModal={this.handlebankModal}
                    add_account={this.props.add_account}
                    dispatch={this.props.dispatch}
                    banks={this.props.banks}
                    user_sfid={this.props.sfid}
                    getBankList={this.getBankList}
                />
                <EditNewAccount
                    edit_account={this.props.edit_account}
                    dispatch={this.props.dispatch}
                    banks={this.props.banks}
                    user_sfid={this.props.sfid}
                    getBankList={this.getBankList}
                    bankEditSfid={this.state.bankEditSfid}
                />
                
                {/* <BankListModal
                    handlebank={this.handlebank}
                    banks={this.props.banks}
                /> */}


            </>
        );
    }

}