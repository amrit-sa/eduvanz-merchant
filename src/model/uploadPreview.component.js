import React, { Component } from 'react'
class UploadPreview extends Component {

    constructor(props) {
        super()
    }
    render() {
        var { closeBulkProdModel, uploadProcessing, viewAllSummary, error_upload, uploadingList, uploadingDone, totalCount, uploadedResponseStatus, uploadedResponse, uploadedCount, rejectedCount, type } = this.props;
        const tableData = []
        const responseTableData = []
        let errormsg = ''
        if (uploadingList != null) {
            for (let i = 0; i < uploadingList.length; i++) {
                tableData.push(
                    <tr>
                        <td className='font-weight-bold' style={{ color: "#1251F1" }}>{uploadingList[i].product_id}</td>
                        <td><div className="spinner-border text-warning" role="status" style={{ height: "13px", width: "13px" }}>
                            <span className="sr-only"> </span>
                        </div>  Uploading</td>
                        <td>No warning</td>
                    </tr>


                )
            }

        }
        if (uploadedResponse && uploadedResponseStatus == true && uploadedResponse.status !== 'failed' && uploadedResponse.status !== 'error' && type == "product") {
            let prodata = uploadedResponse.proData;
            errormsg = ''
            for (let i = 0; i < prodata.length; i++) {
                if (prodata[i].status == "success") {
                    responseTableData.push(<tr>
                        <td className='font-weight-bold' style={{ color: "#1251F1" }}>{prodata[i].product_id}</td>
                        <td><i className="fa fa-check-circle" style={{ fontSize: "15px", color: "#00FF00" }}></i>  Product added</td>
                        <td>No error</td>
                    </tr>

                    )

                }
                if (prodata[i].status == "failed") {
                    responseTableData.push(
                        <tr>
                            <td className='font-weight-bold' style={{ color: "#1251F1" }}>{prodata[i].product_id}</td>
                            <td><i className="fa fa-times-circle" style={{ fontSize: "15px", color: "red" }}></i>  Product not added</td>
                            <td>No error</td>
                        </tr>)
                }
            }
        }
        if (uploadedResponse && uploadedResponseStatus == true && uploadedResponse.status == 'failed' && uploadedResponse.status == 'error' && type == "product") {
            errormsg = uploadedResponse.message
        }

        if (uploadedResponseStatus && type == "lead") {
            let prodata = uploadedResponse;
            for (let i = 0; i < prodata.length; i++) {
                if (prodata[i].status == "success") {
                    responseTableData.push(<tr>
                        <td className='font-weight-bold' style={{ color: "#1251F1" }}>{prodata[i].user_sfid}</td>
                        <td><i className="fa fa-check-circle" style={{ fontSize: "15px", color: "#00FF00" }}></i> Lead created</td>
                        <td>No error</td>
                    </tr>
                    )
                }
                if (prodata[i].status == "failed") {
                    responseTableData.push(
                        <tr>
                            <td className='font-weight-bold' style={{ color: "#1251F1" }}>{prodata[i].user_sfid}</td>
                            <td><i className="fa fa-times-circle" style={{ fontSize: "15px", color: "red" }}></i> Lead not created</td>
                            <td>Some error which didn't let lead to be created</td>
                        </tr>)
                }
            }
        }
        return (
            <>
                <div className='pb-5' style={{ width: "900px" }}>
                    <div className='pl-5 mt-n3'>Here's a preview of your products list</div>
                    <div className='d-flex col-6 justify-content-between pl-5 mt-3'>
                        <div className='text-center p-4 rounded' style={{ backgroundColor: "#1824AC" }}>
                            <h5><b className='text-white'>{type == "product" ? 'Total' : 'Total Leads'}</b></h5>
                            <h5 className='mt-2'><b className='text-white'>{totalCount}</b></h5>
                        </div>
                        <div className='text-center p-4'>
                            <h5><b>Uploaded</b></h5>
                            <h5 className='mt-2'><b>{uploadedCount}</b></h5>
                        </div>

                        <div className='text-center p-4'>
                            <h5><b>Rejected</b></h5>
                            <h5 className='mt-2'><b>{errormsg != '' ? totalCount : rejectedCount}</b></h5>
                        </div>
                    </div>

                    {error_upload && error_upload.length > 0 ? 
                    
                    <>
                        <div className='alert alert-danger ml-4 mr-4 mt-4 py-1'>
                            <h6>
                                {error_upload}
                            </h6>
                        </div>
                    </>
                    

                    :
                        <>

                            {/* <div className='d-flex justify-content-end pr-4' style={{ color: "#1251F1", cursor: "pointer" }} onClick={viewAllSummary}>
                                view full summary
                            </div> */}
                            <div className='d-flex justify-content-center pb-2'><h6 style={{ color: 'red' }}>{errormsg}</h6></div>

                            <div className='pl-5 overflow-auto mr-4' style={{ height: '150px' }}>

                                <table className="table">
                                    <thead className='thead-white' style={{ position: "sticky", top: '0px' }}>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Result</th>
                                            <th scope="col">Error/Warnings</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* {tableData} */}
                                        {uploadedResponseStatus ? responseTableData : tableData}
                                    </tbody>
                                </table>
                            </div>

                        </>
                    }

                    <div className='d-flex justify-content-end pr-5 mt-3'>
                        <div className='text-dark pr-2 mt-2' onClick={closeBulkProdModel} style={{ cursor: "pointer" }}><b>Cancel</b></div>&nbsp;&nbsp;
                        <button type="button" className="btn btn-secondary btn-sm pb-2" style={{ height: '35px', width: '70px' }} onClick={closeBulkProdModel} disabled={uploadingDone ? false : true}><p className='mt-n2 ml-n1'>{uploadingDone ? 'Save' : ''}</p></button>
                    </div>

                </div>
            </>
        )
    }

}


export default UploadPreview;