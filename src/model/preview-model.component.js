import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap"
import { closePreviewModel } from "../actions/model"

class Preview extends Component {

    constructor() {
        super()
        this.state = {
            onBoarding: 0,
            isBackUploading: false,
        }
    }

    closeModel = () => {
        this.props.dispatch(closePreviewModel())
    }

    render() {
        const { preview_show } = this.props
        return (
            <>
                <Modal show={preview_show} >
                    <Modal.Header>
                        <div class="d-flex">
                            <div class="mr-auto p-2"><b>Notification</b></div>
                            <a class="p-2 pe-auto" href="#"><p>view All</p></a>
                        </div>
                        <Modal.Title>
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-2 bd-highlight " href="#"><p>New</p></div>&nbsp;&nbsp;
                                <div class="p-2 bd-highlight" href="#" ><p>Old</p></div>
                            </div>
                        </Modal.Title>

                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div className="row list-group">
                                <div className="col-sm-12 form-group align-items-stretch p-3">
                                    <a className="dropdown-item d-flex align-items-center list-group-item-action " >
                                        <div class="mr-auto p-2">
                                            <div className="border-bottom border-top">
                                                <span className="font-weight-bold ">
                                                    A new monthly report is ready to download!
                                                </span>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                            </div>
                                        </div>
                                        <a class="p-2" href="#">view</a>
                                    </a>

                                    <a className="dropdown-item d-flex align-items-center list-group-item-action" href="#">

                                        <div class="mr-auto p-2">
                                            <div className="border-bottom">
                                                <span className="font-weight-bold">
                                                    A new monthly report is ready to download!
                                                </span>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                            </div>
                                        </div>
                                        <a class="p-2" href="#">view</a>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center  list-group-item-action" href="#">

                                        <div class="mr-auto p-2">
                                            <div className="border-bottom ">
                                                <span className="font-weight-bold">
                                                    A new monthly report is ready to download!
                                                </span>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                            </div>
                                        </div>
                                        <a class="p-2" href="#">view</a>
                                    </a>

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
    const { preview_show } = state.model;
    return {
        preview_show,
    };
}

export default connect(mapStateToProps)(Preview)