import React, { Component } from 'react'
import readXlsxFile from 'read-excel-file'
import { connect } from 'react-redux'
import { Modal } from "react-bootstrap"
import XlsxPopulate, { Promise } from "xlsx-populate";
import { saveAs } from "file-saver";
import { closeBulkProdModel, bulkUploadStart, bulkUploadEnd, bulkUploadProgress, bulkUploadData } from "../actions/model"
import { createBulkProducts, getMerchantProducts, bulkUpdateRequest } from "../actions/user"
import fileDownload from 'js-file-download'
import axios from 'axios'
import UploadPreview from './uploadPreview.component'
import { merchantProductDownload } from '../actions/user';

const initialState = {
    isFrontUploading: false,
    isBackUploading: false,
    isSuccess: '',
    successMsg: '',
    products: '',
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
    uploadedResponse: {}
}

class BulkProductupload extends Component {

    constructor() {
        super()
        this.state = initialState;
        this.handleBackFileSelect = this.handleBackFileSelect.bind(this);
        this.uploadProcessing = this.uploadProcessing.bind(this)
        this.viewAllSummary = this.viewAllSummary.bind(this)


    }
    viewAllSummary = () => {
        this.setState({ fileTaken: true, uploadUpdatedFile: false });
    }
    closeBulkProdModel = () => {
        this.props.dispatch(closeBulkProdModel())
        this.setState({ fileTaken: false, uploadUpdatedFile: false, isSuccess: 0, successMsg: '', totalCount: 0, uploadedCount: 0, rejectedCount: 0, uploadedResponse: {}, uploadedResponseStatus: false })
    }
    uploadProcessing = () => {
        console.log("111111111111111")
        readXlsxFile(this.state.loadedFile).then((rows) => {
            //this.uploadingStage(rows)
            console.log(rows,"final rowsssss");
            this.uploadProducts(rows);
            this.setState({ fileTaken: false, uploadUpdatedFile: false, uploadUpdatedFile: true })
        });
    }

    uploadingStage = async (getData) => {
        await this.props.dispatch(bulkUpdateRequest(getData)).then((response) => {
            console.log('bulk resp new', response)
            if (response.status !== undefined && response.status === "success") {
                let uploadCount = response.statusCount;
                let totalFailed = 0
                let totalSuccess = 0
                for (let i = 0; i < uploadCount.length; i++) {
                    if (uploadCount[i].status == 'failed') {
                        totalFailed = uploadCount[i].count
                    }
                    if (uploadCount[i].status == 'success') {
                        totalSuccess = uploadCount[i].count
                    }
                }
                this.setState({ totalCount: response.totalCount, uploadedResponseStatus: true, uploadedCount: totalSuccess, rejectedCount: totalFailed, uploadedResponse: response, isSuccess: 1, successMsg: response.message, products: '', selected: '' });
            } else {
                this.setState({ isSuccess: 0, successMsg: response.message, products: '', selected: '', uploadedResponseStatus: true, uploadedResponse: response });
            }
        });
    }

    handleBackFileSelect = (event) => {
        const files = event.target.files;
        // this.setState({ selectedFileName: files[0].name, fileTaken: true, loadedFile: files[0] });
        // readXlsxFile(files[0]).then((rows) => {
        //     console.log(rows);
        //     this.uploadProducts(rows);
            // this.setState({ products: rows, isSuccess: '', successMsg:'', selected: files[0].name});
        // });

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

    uploadProducts = async (getData) => {
        console.log('data ok', getData)
        const { dispatch, sfid, user_id } = this.props
        //dispatch(closeBulkProdModel());
        //dispatch(bulkUploadStart());
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
                merchant_id: getData[i][0],
                product_id: getData[i][1],
                new_selling_price: getData[i][2],
                new_status: getData[i][3],
            }
            uploadingDatas.push(data)
        }
        this.setState({ uploadingData: uploadingDatas })
        this.uploadingStage(getData)

        // await Promise.all(getData.map(async (elament) => {
        //     if (j !== 0) {
        //         let data = {
        //             merchant_id: elament[0],
        //             product_id: elament[1],
        //             new_selling_price: elament[2],
        //             new_status: elament[3],
        //         }
        //         await dispatch(createBulkProducts(data)).then((response) => {
        //             console.log('bulk resp', response)
        //             if (response.status !== undefined && response.status === "success") {
        //                 this.setState({ isSuccess: 1, successMsg: response.message, products: '', selected: '' });
        //                 // setInterval(dispatch(getMerchantProducts(getProd)), 5000);
        //             } else {
        //                 this.setState({ isSuccess: 0, successMsg: '', products: '', selected: '' });
        //             }
        //         });
        //         now = now + 1;
        //         let obj = {
        //             total: total,
        //             now: now
        //         }
        //         let percent = ((now / total) * 100);
        //         dispatch(bulkUploadData(obj));
        //         dispatch(bulkUploadProgress(percent));
        //     }
        //     j = j + 1;
        // }));
        dispatch(bulkUploadEnd());
    }

    handleDownload = (url) => {
        
        let obj = { merchant_id: this.props.user_id, "section": '' }
        let getProd = { merchant_id: this.props.user_id }

    //  this.props.dispatch(merchantProductDownload(obj)).then((response) => {
        this.props.dispatch(getMerchantProducts(getProd)).then((response) => {
            console.log('response here product=', response)
              if (response.proData && response.proData.length > 0) {
                
                let getData=[]
                const m_id = localStorage.getItem("sfid") ? localStorage.getItem("sfid") : localStorage.getItem("sfid") 
                for(let i =0 ; i<response.proData.length; i++){
                    let source = response.proData[i];

                    let obj = {
                        name:source.name,
                        // merchant_id : source.id,
                        merchant_id : m_id,
                        product_id : source.sfid,
                        new_selling_price : source.offer_price__c,
                        activation_status : source.activate_product__c,
                        sku:source.sku,
                    }
                    getData.push(obj)
                }

                this.saveAsExcel(getData);
              }
        });

        // const d = new Date()
        // const time = d.getTime()
        // let filename = 'Bulk-products-' + time + '.xlsx';
        // axios.get(url, {
        //     responseType: 'blob',
        // })
        //     .then((res) => {
        //         fileDownload(res.data, filename)
        //     })
    }



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
                activation_status: productDet && productDet.activation_status == false ? 'inactive' : 'active',
                name: productDet && productDet.name ? productDet.name : '',
                sku: productDet && productDet.sku && productDet.sku != null ? productDet.sku : '',
            })
        }));
        let header = ["Merchant Id", "Product Id", "Selling Price", "Activation Status" , "Name" ,  "SKU"];
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

    removeFile = () => {
        this.setState({ isSuccess: '', successMsg: '', products: '', selected: '' });
    }

    render() {
        const { bulk_prod_show } = this.props
        let inputRef
        return (
            <>
                <Modal show={bulk_prod_show} className="bulkupload" style={{backgroundColor:'transparent'}}>
                    <Modal.Header>
                        <Modal.Title><button type="button" className="close float-left" onClick={this.closeBulkProdModel}> <i className="fas fa-times"></i> </button> <h4 className='mt-n2 ml-4'><b>{this.state.fileTaken == true && this.state.uploadUpdatedFile == true ? ' Preview' : ''}</b></h4></Modal.Title>
                    </Modal.Header>
                    <form>
                        <Modal.Body>

                            <div className="row">
                                {this.state.fileTaken == false && this.state.uploadUpdatedFile == false ?
                                    <div className="col-md-12 bulk-popup text-center">
                                        {this.state.selected === '' ? (
                                            <>  <h5>Bulk Update</h5>
                                                <p>Why update products one-by-one when you can hundreds of products at once </p>
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
                                        {this.state.products === '' ? (
                                            <>
                                                {/*<button type="button" onClick={() => inputRef.click()} className="btn btn-dark">
                                                    Upload Updated File
                                        </button>*/}
                                                <button type="button" onClick={() => inputRef.click()} className="btn btn-dark">
                                                    Upload Updated File
                                                </button>
                                                {/*<button type="button" onClick={()=>this.setState({fileTaken:true})} className="btn btn-dark">
                                                    Upload Updated File
                                </button>*/}


                                                <br />
                                                <span style={{ cursor: 'pointer' }} onClick={() => this.handleDownload()} className="downloadbulk">
                                                    Download Available SKUs
                                                </span>
                                            </>
                                        ) : ""}
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

                                        <UploadPreview closeBulkProdModel={this.closeBulkProdModel} uploadProcessing={this.uploadProcessing} viewAllSummary={this.viewAllSummary} uploadingList={this.state.uploadingData} uploadingDone={this.state.uploadingDone} totalCount={this.state.totalCount} uploadedResponseStatus={this.state.uploadedResponseStatus} uploadedResponse={this.state.uploadedResponse} uploadedCount={this.state.uploadedCount} rejectedCount={this.state.rejectedCount} type="product" />
                                }
                            </div>
                            <div className="row">
                                {
                                    this.state.successMsg != '' && this.state.isSuccess === 0 ? (
                                        <div className="pl-4 pr-4 form-group col-md-12" style={{ maxWidth :"900px", textAlign: "center" }}>
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.successMsg}
                                            </div>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.state.successMsg != '' && this.state.isSuccess === 1 ? (
                                        <div className="pl-4 pr-4 form-group col-md-12" style={{ maxWidth :"900px" ,textAlign: "center" }}>
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
    const { bulk_prod_show } = state.model;
    const { user_id, sfid } = state.auth;
    return {
        bulk_prod_show,
        user_id,
        sfid
    };
}

export default connect(mapStateToProps)(BulkProductupload)