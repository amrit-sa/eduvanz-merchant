import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { Modal, Button } from "react-bootstrap"
import { closeImageEditModel } from "../actions/model"
import { uploadProfile, uploadDocument, getLeadProfileDocuemnt, getLeadOtherDocuemnt, getLeadPanDocuemnt } from "../actions/user"

class ImageEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
          croppedImgSrc: "",
          rawImageScr: "",
          type: "image/png",
          isCropEnable: false,
          selectedNav: 1,
          otherSelected: 1, 
          cropSelected: 0,
          isValidPan: true,
          panType: 0,
          isValidFronImg: true,
          isvalidBackImg: true,
         // aspectRatio: 16 / 9,
          imageSrc: ''
        };
        this.fileInput = React.createRef();
        this.handleFileRead = this.handleFileRead.bind(this);
        this.fileReader = new FileReader();
        this.cropper = React.createRef();
    }

    componentDidUpdate(prevProps)
    {
      const { selectedImageTab } = this.props
        if(prevProps.image_edit_show !== this.props.image_edit_show)
        {
          //  this.handleChange();
          this.setState({otherSelected: selectedImageTab==4?2:1});
        }
    }

    handleFileRead(e) {
        const binaryData = this.fileReader.result;
        const base64Data = window.btoa(binaryData);
        this.setState({ base64: base64Data });
      }
    
      handleChange = () => {
        const imageSrc = this.props.leadProfileImg;
        this.setState({imageSrc: imageSrc, croppedImgSrc: imageSrc, rawImageScr: imageSrc});
        this.fileReader.onloadend = this.handleFileRead;
      }
    
      handleCropChange() {
        const croppedImgData = this.cropper.current.cropper
          .getCroppedCanvas()
          .toDataURL();
    
        this.setState({ croppedImgSrc: croppedImgData });
      }
    
      handleRotate() {
        this.setState({isCropEnable: true});
        this.cropper.current.cropper.rotate(90);
        this.handleCropChange();
      }

      handleLeftRotate() {
        this.setState({isCropEnable: true});
        this.cropper.current.cropper.rotate(-90);
        this.handleCropChange();
      }

      handleCrop = (value) => {
        const { leadProfileImg, leadPanImg, otherFrontImg, otherBackImg } = this.props
        let imageSrc='';
        if(value ===1)
        {
          imageSrc = leadProfileImg;
        }else if(value ===2)
        {
          imageSrc = leadPanImg;
        }else if(value ===3)
        {
          imageSrc = otherFrontImg;
        }else if(value ===4)
        {
          imageSrc = otherBackImg;
        }
        this.setState({isCropEnable: true, cropSelected: value, imageSrc: imageSrc});
      }

      handleCropSave = () => {
        const { dispatch, selectedTab } = this.props
        if(this.state.cropSelected === 1)
        {
          const d = new Date()
          const time = d.getTime()
          let proBase = this.state.croppedImgSrc; 
           const proBase64 = proBase.replace(`data:image/png;base64,`, "");
          let prodata = {
              base64: proBase64,
              doctype: "photo",
              fname: "eduvan-"+time+'.jpg',
              parent_id: "00171000005MEj0AAG",
              id: this.props.lead_id,
              token: this.props.salesForceToken
          }
          dispatch(uploadProfile(prodata)).then((response)=>{
            if(response.status ==="success")
            {
              let proData = {
                id: parseInt(this.props.lead_id),
                token : this.props.salesForceToken
              }
              dispatch(getLeadProfileDocuemnt(proData));
              this.setState({isCropEnable: false});
            }
          });
        }else{
            let fileType = [];
            let mediaFile = [];
            let fileName = selectedTab?selectedTab:"Aadhar";
            if(this.state.cropSelected === 2)
            {
              let proBase = this.state.croppedImgSrc;
              const panBase64 = proBase.replace(`data:image/png;base64,`, "");
              fileType.push("Pan-Front");
              mediaFile.push(panBase64);
            }else if(this.state.cropSelected === 3)
            {
              let proBase = this.state.croppedImgSrc;
              const panBase64 = proBase.replace(`data:image/png;base64,`, "");
              fileType.push(`${fileName}-Front`);
              mediaFile.push(panBase64);
            }else if(this.state.cropSelected === 4)
            {
              let proBase = this.state.croppedImgSrc;
              const panBase64 = proBase.replace(`data:image/png;base64,`, "");
              fileType.push(`${fileName}-Back`);
              mediaFile.push(panBase64);
            }

            let data = {
              base64: mediaFile,
              doctype: fileType,
              parent_id: "00171000005MEj0AAG", 
              id: this.props.lead_id,
              token: this.props.salesForceToken
            }
            console.log("data", data);
            dispatch(uploadDocument(data)).then((response)=>{
              if(response.status === "success")
              {
                let proData = {
                  id: parseInt(this.props.lead_id),
                  token : this.props.salesForceToken
                }
                dispatch(getLeadPanDocuemnt(proData));
                dispatch(getLeadOtherDocuemnt(proData))
                this.setState({isCropEnable: false});
              }
            }); 
        }
      }

      closeModel = () => {
        this.setState({isCropEnable: false});
        this.props.dispatch(closeImageEditModel())
      }

      getOthers = (otherFrontImg, enableCrop) =>{
          let data = [];
          const [,type] = otherFrontImg.split(';')[0].split('/');
          if(otherFrontImg)
          {
            if(type ==="pdf" || type ==="PDF")
            {
              data.push(<img style={{cursor:'pointer', padding: '10px'}} src='./images/pdf.png' />);
            }else{
            data.push(<>
            <img key={"other-1"} src={otherFrontImg} />
            <div key={"roe-1"} className="row mt-2 align-items-center justify-content-center">
                {!this.state.isCropEnable &&  enableCrop ==1 &&(  
                  <button key={"btn-2"} type="button" onClick={() => this.handleCrop(3)} className="btn btn-default"><i className="fas fa-crop-alt"></i></button>
                )}
              </div>
            </>);
            }
          }else{
              data.push(<img key={"other-0"} src="images/dummy.png" />);
          }
          return data;
      }

      getOthersBackDoc = (otherBackImg, enableCrop) =>{
        let data = [];
        const [,type] = otherBackImg.split(';')[0].split('/');
        if(otherBackImg)
        {
          if(type ==="pdf" || type ==="PDF")
          {
            data.push(<img style={{cursor:'pointer', padding: '10px'}} src='./images/pdf.png' />);
          }else{
            data.push(<>
              <img key={"other-2"} src={otherBackImg} />
              <div key={"roe-2"} className="row mt-2 align-items-center justify-content-center">
                  {!this.state.isCropEnable &&  enableCrop ==1 &&(  
                    <button key={"btn-2"} type="button" onClick={() => this.handleCrop(4)} className="btn btn-default"><i className="fas fa-crop-alt"></i></button>
                  )}
                </div>
              </>
              );
          }
           
        }else{
            data.push(<img key={"other-0"} src="images/dummy.png" />);
        }
        return data;
    }

      handleOther = (value) =>{
        this.setState({otherSelected: value});
      }

      handleTabChange = (value) =>{
        this.setState({selectedNav: value});
      }

      renderPandetails = (baseStr) =>{
        const { selectedImageTab, enableCrop } = this.props
        let row = [];
        const [,type] = baseStr.split(';')[0].split('/');
        console.log(type)
        if(baseStr)
        {
          if(type ==="pdf" || type ==="PDF")
          {
            row.push(
            <div className={`carousel-item ${selectedImageTab==2?"active":""}`}>
              <img style={{cursor:'pointer', padding: '10px'}} src='./images/pdf.png' />
            </div>
              );
          }else{
            row.push(<div className={`carousel-item ${selectedImageTab==2?"active":""}`}>
              <img src={baseStr} />
                  <div className="row mt-2 align-items-center justify-content-center">
                  {!this.state.isCropEnable &&  enableCrop ==1 &&(  
                    <button type="button" onClick={() => this.handleCrop(2)} className="btn btn-default"><i className="fas fa-crop-alt"></i></button>
                  )}
                </div>
            </div>);
          }
        }
        return row;
      }

    render() {
        const { selectedImageTab, image_edit_show, leadProfileImg, enableCrop, selectedTab, leadPanImg, otherFrontImg,otherBackImg } = this.props
        const { imageSrc, base64, croppedImgSrc, otherSelected, selectedNav } = this.state;
        const  renderOthers = this.getOthers(otherFrontImg, enableCrop);
        const renderOtherBack = this.getOthersBackDoc(otherBackImg, enableCrop);
        const renderPan = this.renderPandetails(leadPanImg);
        // console.log("selectedImageTab", selectedImageTab);
        // console.log("selectedNav", selectedNav);
        // console.log('leadProfileImge', leadProfileImg)
        return (
            <>
              <Modal show={image_edit_show} className="bulkupload type_2 modelminheight">
                <form>
                  <Modal.Body>
                    <>
                    <div>
                      <div id="icropcaro" className="carousel slide" data-ride="carousel" data-interval="false">
                        <button type="button" className="close float-left" onClick={this.closeModel}> <i className="fas fa-times"></i> </button>
                        <ol className="carousel-indicators">
                          {leadProfileImg && (
                            <li data-target="#icropcaro" onClick={() =>this.handleTabChange(1)} data-slide-to="0" className={`${selectedImageTab==1?"active":""}`}>Photo</li>
                          )}
                          {leadPanImg && (
                            <li data-target="#icropcaro" onClick={() =>this.handleTabChange(2)} data-slide-to="1" className={`${selectedImageTab==2?"active":""}`}>PAN Card</li>
                          )}
                          {
                           otherFrontImg &&  otherBackImg &&(
                             <li data-target="#icropcaro" onClick={() =>this.handleTabChange(3)} data-slide-to="2" className={`${(selectedImageTab==3 || selectedImageTab==4)?"active":""}`}>{selectedTab? selectedTab:"Aadhar"} Card</li>
                           )
                          }
                        </ol>
                      {this.state.isCropEnable === false?(
                      <div className="carousel-inner text-center">
                        {leadProfileImg && (
                        <div className={`carousel-item ${selectedImageTab==1?"active":""}`}>
                              <img src={leadProfileImg} />
                              <div className="row mt-2 align-items-center justify-content-center">
                                {!this.state.isCropEnable &&  enableCrop ==1 &&(  
                                  <button type="button" onClick={() => this.handleCrop(1)} className="btn btn-default"><i className="fas fa-crop-alt"></i></button>
                                )}
                              </div>
                        </div>
                        )}
                        {renderPan}
                      <div className={`carousel-item tabs_type2 ${(selectedImageTab===3 || selectedImageTab===4)?"active":""}`}>
                        
                         <ul className="nav nav-pills justify-content-center mb-3" role="tablist">
                        <li className="nav-item">
                          <a className={`nav-link  ${selectedImageTab===3?'active':selectedImageTab !==4?'active':''}`} data-toggle="pill" href="#panfront" onClick={() => this.handleOther(1)}>Front</a>
                        </li>
                        <li className="nav-item">
                          <a className={`nav-link ${selectedImageTab===4?'active':''}`} data-toggle="pill" href="#panback" onClick={() => this.handleOther(2)}>Back</a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div id="panfront" className={`container tab-pane ${(selectedImageTab===3)?'active':selectedImageTab !==4?'active':''}`}>
                        {renderOthers}
                        </div>
                        <div id="panback" className={`container tab-pane ${selectedImageTab===4?'active':'fade'}`}>
                        {renderOtherBack}
                        </div>
                      </div>
                      </div>
    
                    </div>
                      ):(
                      <>
                      <div className="carousel-inner text-center">
                        <div className="carousel-item active">
                            <Cropper
                                style={{ maxWidth: "600px", height: "300px" }}
                                ref={this.cropper}
                                src={this.state.imageSrc}
                             //   aspectRatio={this.state.aspectRatio}
                                cropend={() => this.handleCropChange()}
                            />
                            <div className="row mt-2 align-items-center justify-content-center">
                              <button type="button" onClick={() => this.handleLeftRotate()} className="btn btn-default"><i className="fas fa-undo"></i> </button>
                              <button type="button" onClick={() => this.handleRotate()} className="btn btn-default"><i className="fas fa-redo"></i></button>
                              <button type="button" onClick={() => this.handleCropSave()} className="btn btn-default"><i className="fas fa-save"></i></button>            
                            </div>
                        </div>
                      </div>
                      </>
                    )}
                    <a className="carousel-control-prev" href="#icropcaro" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#icropcaro" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                </>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModel} className="border-0 btn btn-default">Cancel</Button>
                    <Button onClick={this.closeModel} className="btn btn-secondary">Save</Button>
                </Modal.Footer>
            </form>
          </Modal>
        </>
        )
    }

}

function mapStateToProps(state) {
    const { image_edit_show, enableCrop, selectedImageTab } = state.model;
    const { salesForceToken } = state.auth;
    const { leadProfileImg, leadPanImg, otherFrontImg,otherBackImg, selectedTab, lead_id } = state.user
    return {
        image_edit_show,
        selectedImageTab,
        leadProfileImg,
        enableCrop,
        leadPanImg,
        otherFrontImg,
        otherBackImg,
        selectedTab,
        salesForceToken,
        lead_id
    };
  }

export default connect(mapStateToProps)(ImageEdit)