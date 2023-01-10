import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { uploadDocument, uploadProfile } from "../actions/user"
import { closeDocumentDropModel } from "../actions/model"

const initial = {
    isFileSelected: false,
    isDragg: false,
    documents: [],
    selectedDoc: [],
    selectedOpt: []
}

class DocumentDrop extends Component {

    constructor() {
        super()
        this.state = initial
        this.handleFile = this.handleFile.bind(this)
        this.handleDocumentSelect = this.handleDocumentSelect.bind(this)
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.document_drop_show !== this.props.document_drop_show)
        {
            this.setState(initial);
        }
    }

    closeModel = () => {
        this.props.dispatch(closeDocumentDropModel())
    }

    dragOver = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isDragg: true});
    }
    
    dragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isDragg: true});
    }
    
    dragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isDragg: false});
    }
    
    fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let selectedFile = [];
        this.setState({isDragg: false});
        for(var i = 0; i < files.length; i++)
        {
            selectedFile.push(files[i]);
        }
        this.setState({ documents: selectedFile, selectedDoc: []});
    }

    deleteRow = (row) => {
        let arr = this.state.documents;
        arr = arr.slice(0);
        arr.splice(row, 1);
        this.setState({documents: arr});
     }

    handleFile = e => {
        const files = e.target.files;
        let selectedFile = [];
        this.setState({isDragg: false});
        for(var i = 0; i < files.length; i++)
        {
            selectedFile.push(files[i]);
        }
        this.setState({ documents: selectedFile, selectedDoc: []});
    }

    handleDocumentSelect = (id, e) => {
        let document = this.state.documents;
        let selectDoc = this.state.selectedDoc;
        let selectOpt = this.state.selectedOpt;
        let selected = e.target.value;
        let obj = [];
       /*  if(selectOpt.indexOf(selected) != -1)
        {  
            alert("This document alredy selected try another one");
        } */

        selectDoc.forEach((item)=>{
            if(item.id != id)
            {
                obj.push(item);
            }
        });
        var selctedItem = document[id];
        let selectObj = {
            id: id,
            option: selected
        }
        selectOpt.push(selected);
        obj.push(selectObj);
        this.setState({selectedDoc : obj, selectedOpt: selectOpt});
    }

    renderDocument = (documents) =>{
        let row = [];
        let selectDoc = this.state.selectedDoc;
        documents.map((item, index) => {   
        let selected = '';
        let getData = selectDoc.find(item => item.id == index);
        if(getData != undefined)
        {
            selected = getData.option;
        }
            row.push(
            <li key={`item-${index}`} className="border-bottom list-group-item">
                <span className="ltext"><span className="limitedtext">{item.name}</span> <span 
                style={{cursor:'pointer'}} 
                onClick={() => this.deleteRow(index)}
                ><i className="fas fa-times"></i></span></span>
                <span className="badge badge-pill">
                    <select
                        defaultValue={this.state[`document${index}`]}
                        onChange={e => this.handleDocumentSelect(index, e)}
                    >
                        <option value="" selected={selected ==''?true:false}>Select any document</option>
                        <option value={1} selected={selected =='1'?true:false}>Photo</option>
                        <option value={2} selected={selected =='2'?true:false}>PAN Card</option>
                        <option value={3} selected={selected =='3'?true:false}>Aadhaar Front</option>
                        <option value={4} selected={selected =='4'?true:false}>Aadhaar Back</option>
                        <option value={5} selected={selected =='5'?true:false}>Voter ID Front</option>
                        <option value={6} selected={selected =='6'?true:false}>Voter ID Back</option>
                        <option value={7} selected={selected =='7'?true:false}>Driving License Front</option>
                        <option value={8} selected={selected =='8'?true:false}>Driving License Back</option>
                        <option value={9} selected={selected =='9'?true:false}>Passport First page</option>
                        <option value={10} selected={selected =='10'?true:false}>Passport Last page</option>
                    </select>
                   
                </span>
            </li>
            );
        })
        return row;
    }

    toBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    };

    handleUploadFile = async () =>{
        const { selectedDoc, documents } = this.state
        const { dispatch } = this.props
        let profileBase = "";
        let baseData = [];
        let DataType = [];
        let fileType = [];
        let uplodProfile;
        let uploadOthrs;
        const filePathsPromises = [];
         selectedDoc.forEach(file => {
            let fileData = documents[file.id];
            let type = fileData.type;
            fileType.push(type);
            filePathsPromises.push(this.toBase64(fileData));
          });
        const filePaths = await Promise.all(filePathsPromises);
        let mappedFiles = filePaths.map((base64File) => (base64File));
        selectedDoc.forEach(async (item, index)=>{
            let option = item.option;
            let type = fileType[index];
            let base64File = mappedFiles[index];
            let proBase64 = base64File.replace(`data:${type};base64,`, "");
            if(option =='1')
            {
                profileBase = proBase64;
            }else{
                if(option =='2')
                {
                    baseData.push(proBase64);
                    DataType.push("Pan-Front");
                }else if(option =='3')
                {
                    baseData.push(proBase64);
                    DataType.push("Aadhar-Front");
                }else if(option =='4')
                {
                    baseData.push(proBase64);
                    DataType.push("Aadhar-Back");
                }else if(option =='5')
                {
                    baseData.push(proBase64);
                    DataType.push("Voter-Front");
                }else if(option =='6')
                {
                    baseData.push(proBase64);
                    DataType.push("Voter-Back");
                }else if(option =='7')
                {
                    baseData.push(proBase64);
                    DataType.push("Driving-Front");
                }else if(option =='8')
                {
                    baseData.push(proBase64);
                    DataType.push("Driving-Back");
                }else if(option =='9')
                {
                    baseData.push(proBase64);
                    DataType.push("Passport-Front");
                }else if(option =='10')
                {
                    baseData.push(proBase64);
                    DataType.push("Passport-Back");
                }
            }
        });
        
         let data = {
            base64: baseData,
            doctype: DataType,
            parent_id: "00171000005MEj0AAG", 
            id: this.props.lead_id,
            token: this.props.salesForceToken
        }
        
        if(profileBase !='')
        {
            const d = new Date()
            const time = d.getTime()
            let prodata = {
                base64: profileBase,
                doctype: "photo",
                fname: "eduvan-"+time+'.jpg',
                parent_id: "00171000005MEj0AAG",
                id: this.props.lead_id,
                token: this.props.salesForceToken
            }
            uplodProfile =  await dispatch(uploadProfile(prodata)).then((response)=>{ return response.status});
        }

        if(baseData &&  baseData.length > 0)
        {
            uploadOthrs = await dispatch(uploadDocument(data)).then((response)=>{ return response.status});
        }

        if(uplodProfile=="success" || uploadOthrs=="success")
        {
            this.closeModel();
        }



 
    }

    render() {
        const { document_drop_show } = this.props
        const { documents, selectedDoc } = this.state
        const subBtn = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
        const renderDocument = this.renderDocument(this.state.documents);
        let inputRef;
        return (
            <>
                <Modal show={document_drop_show} className="bulkupload type_1 uploadall">
                    <Modal.Header>
                    <div className="row">
                    <div className="col-md-12">
                    <div className="popupclosebtn">
                        <button type="button" className="close float-left mr-2" onClick={this.closeModel} style={{ marginTop:'-25px' }}> <i className="fas fa-times" ></i> </button>
                        <h5>Upload All</h5>
                        <p>Upload all the KYC documents here</p>
                     </div>
                     </div>
                     </div>
                    </Modal.Header>
                    <form>
                    <Modal.Body>
                    {documents && documents.length === 0 &&(
                    <div className="row" style={{padding: "3px 17px"}}>
                    <div 
                     className={`col-md-12 text-center col-sm drop-container ${this.state.isDragg?"drag-area":""}`}
                     onDragOver={this.dragOver}
                     onDragEnter={this.dragEnter}
                     onDragLeave={this.dragLeave}
                     onDrop={this.fileDrop}
                    >
                        <div 
                           
                        >
                            <h4 className="draganddrop"><b>Drag &amp; Drop files here</b></h4>
                        </div>
                        <input 
                            type='file' 
                            style={{display: 'none'}}
                            ref={refParam => inputRef = refParam}
                            accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            id='profile_pic' 
                            onChange={this.handleFile} 
                            multiple
                        />
                        <div className="or_type1">OR</div>
                        <button type="button" onClick={() => inputRef.click()} className={"btn btn-primary dark-colored"}>
                             Browse
                        </button>
                        <p className="light-weight pb-5 mb-2"><span className="d-block">Select all files to upload them</span>at once</p>
                    </div>
                    </div>
                    )}
                    { documents && documents.length > 0 &&(
                    <div className='col-md-12'>
                        <div className="uploadallfiles">
                            <span className="ltext">File Name</span>
                            <span className="rtext">Document Type</span>
                        </div>
                        <ul className="list-group uploadedfileslist">
                        { renderDocument }
                        </ul>
                        <div className="row justify-content-end align-items-center mt-3 mb-3 mr-3">
                            <button type="button" onClick={this.closeModel} className="btn btn-default">Cancel</button>
                            <button type="button" onClick={this.handleUploadFile} className="btn btn-secondary" style={selectedDoc.length > 0?subBtn:{}}>Upload</button>
                        </div>
                    </div>
                            )
                        }

                    </Modal.Body>
                    </form>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { document_drop_show } = state.model;
    const { lead_id } = state.user;
    const { salesForceToken } = state.auth;
    return {
        document_drop_show,
        lead_id,
        salesForceToken
    };
  }

export default connect(mapStateToProps)(DocumentDrop)