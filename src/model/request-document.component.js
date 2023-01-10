import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closeRequestModel } from "../actions/model"

class RequestDocument extends Component {

    constructor() {
        super()
        this.state = {
            onBoarding: 0,
            isBackUploading: false,
        }
    }

    closeModel = () => {
        this.props.dispatch(closeRequestModel())
    }

    render() {
        const { request_show } = this.props
        return (
            <>
             <Modal show={request_show} >
                    <Modal.Header>
                        <Modal.Title>Document Request</Modal.Title>
                    </Modal.Header>
                    <form>
                    <Modal.Body>
                    <div className="row">
                        <div className="col-sm-12 form-group">
                        
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
    const { request_show } = state.model;
    return {
        request_show,
    };
  }

export default connect(mapStateToProps)(RequestDocument)