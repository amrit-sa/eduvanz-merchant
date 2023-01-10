import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closePreviewPdfModel } from "../actions/model"

class PreviewPdf extends Component {

    constructor() {
        super()
        this.state = {
            onBoarding: 0,
            isBackUploading: false,
        }
    }

    closeModel = () => {
        this.props.dispatch(closePreviewPdfModel())
    }

    render() {
        const { preview_pdf_show, pdfString } = this.props        
        return (
            <>
             <Modal show={preview_pdf_show} >
                    <Modal.Header>
                        <Modal.Title>Bank Statement</Modal.Title>
                    </Modal.Header>
                    <form>
                    <Modal.Body>
                    <div className="row iframesty">
                        <div className="col-sm-12 form-group">
                          <iframe style={{display: 'block'}} src={"data:application/pdf;base64," + pdfString} />
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModel} variant="secondary" className="btn btn-default close-btn">Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { preview_pdf_show } = state.model;
    const { pdfString } = state.user
    return {
        preview_pdf_show,
        pdfString
    };
  }

export default connect(mapStateToProps)(PreviewPdf)