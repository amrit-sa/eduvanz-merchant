import React, { Component } from 'react'
import readXlsxFile from 'read-excel-file'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeModel } from "../actions/model"
import { createBulkLeads, getLeads, bulkCreateLeadRequest } from "../actions/user"
import fileDownload from 'js-file-download'
import axios from 'axios'
import UploadPreview from './uploadPreview.component'



const initialState = {
    isFrontUploading: false,
    isBackUploading: false,
    isSuccess: '',
    successMsg: '',
    leads: '',
    selected: '',
    uploadUpdatedFile: false,
    fileTaken: false,
    selectedFileName: '',
    loadedFile: null,
    uploadingData: null,
    uploadingDone: true,
    totalCount: 0,
    uploadedResponseStatus: false,
    uploadedCount: 0,
    rejectedCount: 0,
    uploadedResponse: {},
    error_upload:''
}

class Bulkupload extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.handleBackFileSelect = this.handleBackFileSelect.bind(this)
        this.uploadProcessing = this.uploadProcessing.bind(this)

    }

    closeModel = () => {
        this.props.dispatch(closeModel())
    }

    handleBackFileSelect = (event) => {
        const files = event.target.files;
        readXlsxFile(files[0]).then((rows) => {
            this.setState({ leads: rows, isSuccess: '', successMsg: '', selected: files[0].name, fileTaken: true, selectedFileName: files[0].name, loadedFile: files[0] });
            //this.uploadLeads()
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.bulk_show !== this.props.bulk_show) {
            this.setState(initialState);
        }
    }

    uploadLeads = () => {
        const { dispatch, user_id, sfid } = this.props
        console.log(this.props, "Props")
        let data = {
            leads: this.state.leads,
            id: parseInt(user_id)
        }
        dispatch(createBulkLeads(data)).then((response) => {
            if (response.status !== undefined && response.status === "success") {
                this.setState({ isSuccess: 1, successMsg: response.message, leads: '', selected: '' });
                setInterval(dispatch(closeModel()), dispatch(getLeads('stage=Pre Approval', sfid)), 5000);
            } else {
                this.setState({ isSuccess: 0, successMsg: response.message, leads: '', selected: '' });
            }
        });
    }

    handleDownload = (url) => {
        const d = new Date()
        const time = d.getTime()
        let filename = 'Bulk-leads-' + time + '.xlsx';
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, filename)
            })
    }

    removeFile = () => {
        this.setState({ isSuccess: '', successMsg: '', leads: '', selected: '' });
    }
    uploadProcessing = () => {
        console.log('trigger 1', this.state.loadedFile)
        readXlsxFile(this.state.loadedFile).then((rows) => {
            //this.uploadingStage(rows)
            this.uploadProducts(rows);
            this.setState({ fileTaken: false, uploadUpdatedFile: false, uploadUpdatedFile: true })
        });
    }
    uploadProducts = async (getData) => {
        console.log('data ok', getData)
        const { dispatch, sfid, user_id } = this.props
        let total = getData ? (getData.length - 1) : 0;
        this.setState({ totalCount: total })
        let now = 0;
        let obj = {
            total: total,
            now: now
        }
        let j = 0;
        let uploadingDatas = []
        for (let i = 1; i < getData.length; i++) {
            let data = {
                fname: getData[i][0],
                lname: getData[i][1],
                email: getData[i][3],
                mobile: getData[i][4],
                loan_amount: getData[i][7],
                
                product_id: getData[i][5],
                merchant_sfid: getData[i][0],
                product_price: getData[i][6],
                
            }
            uploadingDatas.push(data)
            getData[i][4] = String(getData[i][4])
        }
        this.setState({ uploadingData: uploadingDatas })
        let headers = ["merchant_sfid", "fname", "lname", "email", "mobile", "product_id", "product_price", "loan_amount"];
        getData[0] = headers;
        console.log(getData,"final data")
        this.uploadingStage(getData)

        // await Promise.all(getData.map(async (elament) => {
        //     if (j !== 0) {
        //         let data = {

        //             merchant_sfid: elament[0],
        //             fname: elament[1],
        //             lname: elament[2],
        //             email: elament[3],
        //             mobile: elament[4],
        //             product_id: elament[5],
        //             product_price: elament[6],
        //             loan_amount: elament[7],
        //         }
        //         await dispatch(bulkCreateLeadRequest(data)).then((response) => {
        //             console.log('bulk resp', response)
        //             if (response.status !== undefined && response.status === "success") {
        //                 this.setState({ isSuccess: 1, successMsg: response.message, products: '', selected: '' });
        //                 // setInterval(dispatch(getMerchantProducts(getProd)), 5000);
        //             } else {
        //                 this.setState({ isSuccess: 0, successMsg: '', products: '', selected: '' });
        //             }
        //         });
        //         now = now + 1;
        //         // let obj = {
        //         //     total: total,
        //         //     now: now
        //         // }
        //         // let percent = ((now / total) * 100);
        //         // dispatch(bulkUploadData(obj));
        //         // dispatch(bulkUploadProgress(percent));
        //     }
        //     j = j + 1;
        // }));
        // dispatch(bulkUploadEnd());
    }

    uploadingStage = async (getData) => {
        await this.props.dispatch(bulkCreateLeadRequest(getData)).then((response) => {
            console.log('bulk createnew', response)
            if(response.leadData[0]["status"] == 'error'){
                this.setState({error_upload : response.leadData[0]["message"]})
                return
            }
            let uploadCount = response.leadData.length;
            if (uploadCount > 0) {
                let leads = response.leadData
                let totalFailed = 0
                let totalSuccess = 0
                for (let i = 0; i < leads.length; i++) {
                    if (leads[i].status == 'failed') {
                        totalFailed += 1
                    }
                    if (leads[i].status == 'success') {
                        totalSuccess += 1
                    }
                }
                console.log("total", uploadCount)
                console.log("total ok", totalSuccess)
                console.log("total rej", totalFailed)

                this.setState({ totalCount: uploadCount, uploadedResponseStatus: true, uploadedCount: totalSuccess, rejectedCount: totalFailed, uploadedResponse: response.leadData, isSuccess: 1, successMsg: response.leadData[0]["message"], products: '', selected: '' });
            }
            else {
                this.setState({ isSuccess: 0, successMsg: response.message, products: '', selected: '' });

            }

            //    if (response.status !== undefined && response.status === "success") {
            //         let uploadCount=response.statusCount;
            //         let totalFailed=0
            //         let totalSuccess=0
            //         for(let i=0;i<uploadCount.length;i++){
            //             if(uploadCount[i].status=='failed'){
            //                 totalFailed=uploadCount[i].count
            //             }
            //             if(uploadCount[i].status=='success'){
            //                 totalSuccess=uploadCount[i].count
            //             }
            //         }
            //         this.setState({ totalCount:response.totalCount,uploadedResponseStatus:response.status,uploadedCount:totalSuccess,rejectedCount:totalFailed,uploadedResponse:response,isSuccess: 1, successMsg: response.message, products: '', selected: '' });
            //     } else {
            //         this.setState({ isSuccess: 0, successMsg: response.message, products: '', selected: '' });
            //     }
        }).catch(err=>{
            console.log(err,'error')
        })
    }
    render() {
        const { bulk_show } = this.props
        let inputRef
        return (
            <>
                <Modal show={bulk_show} className="bulkupload" style={{ backgroundColor: 'transparent' }}>
                    <Modal.Header>
                        <Modal.Title><button type="button" className="close float-left" onClick={this.closeModel}> <i className="fas fa-times"></i> </button></Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div className="row">
                                {this.state.fileTaken == false && this.state.uploadUpdatedFile == false ?

                                    <div className="col-md-12 bulk-popup text-center">
                                        {this.state.selected === '' ? (
                                            <>  <h5>Bulk upload </h5>
                                                <p>Why upload leads one-by-one when you can hundreds of leads at once </p>
                                                <p className="supportedfile"><span>Supported file type: </span>XLS,XLSX</p>
                                            </>
                                        ) : (
                                            <h6 className="color-pink">{this.state.selected}<span onClick={this.removeFile} className="ml-12 close-btn" >X</span></h6>
                                        )}
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={refParam => inputRef = refParam}
                                            onChange={this.handleBackFileSelect}
                                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        />
                                        {this.state.leads === '' ? (
                                            <>
                                                {/* <button type="button" onClick={() => inputRef.click()} className="btn btn-dark">
                             Upload Bulk Leads
                            </button> */}
                                                <button type="button" onClick={() => inputRef.click()} className="btn btn-dark">
                                                    Upload Bulk Leads
                                                </button>
                                                <br />
                                                <span style={{ cursor: 'pointer' }} onClick={() => this.handleDownload("/bulk_leads.xlsx")} className="downloadbulk">
                                                    Download Bulk Leads Template
                                                </span>
                                            </>
                                        ) : ''}

                                    </div> :
                                    this.state.fileTaken === true && this.state.uploadUpdatedFile === false ?
                                        <div className="col-md-12 bulk-popup text-center" style={{ width: 300 }}>
                                            <h5>Upload file</h5>
                                            <img src="images/icons/xls.png" alt="Download" className="img-fluid" style={{ height: 50, width: 50 }} />
                                            <div className='d-flex justify-content-between mt-4'>
                                                <div>{this.state.selectedFileName}</div>
                                                <div> <img src="images/icons/edit_20.png" alt="" className='img-fluid' style={{ height: 15, width: 15, cursor: "pointer" }} onClick={() => this.setState({ uploadUpdatedFile: false, fileTaken: false })} /></div>
                                            </div>
                                            {/* <button type="button" onClick={() => this.setState({uploadUpdatedFile:true})} className="btn btn-dark mt-4">
                                 Upload
                             </button> */}
                                            <button type="button" onClick={this.uploadProcessing} className="btn btn-dark mt-4">
                                                Upload
                                            </button>
                                            <br />

                                        </div>


                                        :
                                        <UploadPreview closeBulkProdModel={this.closeModel} uploadProcessing={this.uploadProcessing} viewAllSummary={this.viewAllSummary} uploadingList={this.state.uploadingData} uploadingDone={this.state.uploadingDone} totalCount={this.state.totalCount} uploadedResponseStatus={this.state.uploadedResponseStatus} uploadedResponse={this.state.uploadedResponse} uploadedCount={this.state.uploadedCount} rejectedCount={this.state.rejectedCount} error_upload={this.state.error_upload} type="lead" />

                                }
                                {/* <UploadPreview closeBulkProdModel={this.closeBulkProdModel} uploadProcessing={this.uploadProcessing} viewAllSummary={this.viewAllSummary} uploadingList={this.state.uploadingData} uploadingDone={this.state.uploadingDone} totalCount={this.state.totalCount}  uploadedResponseStatus={this.state.uploadedResponseStatus} uploadedResponse={this.state.uploadedResponse} uploadedCount={this.state.uploadedCount} rejectedCount={this.state.rejectedCount}/> */}


                            </div>

                            <div className="row">
                                {
                                    this.state.successMsg != '' && this.state.isSuccess === 0 ? (
                                        <div className="form-group col-md-12" style={{ textAlign: "center" }}>
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.successMsg}
                                            </div>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.state.successMsg != '' && this.state.isSuccess === 1 ? (
                                        <div className="form-group col-md-12" style={{ textAlign: "center" }}>
                                            <div className="alert alert-success" role="alert">
                                                {this.state.successMsg}
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>
                        </Modal.Body>

                    </form>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { bulk_show } = state.model;
    const { user_id, sfid } = state.auth;
    return {
        bulk_show,
        user_id, sfid
    };
}

export default connect(mapStateToProps)(Bulkupload)