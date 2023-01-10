import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from "react-bootstrap"
import { closeSuccessModel } from "../actions/model"
import { getLeadProfile } from "../actions/user"

class SuccessModel extends Component {

    constructor() {
        super()
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
        }
        this.closeModel = this.closeModel.bind(this);
    }

    closeModel = () => {
        this.props.dispatch(closeSuccessModel())
    }

    render() {
        const { success_show, lead_limit, lead_name } = this.props
        return (
            <>
                <Modal show={success_show} className="bulkupload type_1">
                    
                    <form>
                    <Modal.Body>

                    <div className="row">

                        <div className="col-md-12 success-popup text-center">
                                <h5>Congratulations!</h5>
                                <p className="t1">{lead_name?lead_name:'Test'} has successfully received a limit of</p>
                                <div className="row align-items-center justify-content-center"><div className="col-md-12 prizeamt"><i className="fas fa-rupee-sign"></i> {lead_limit.toLocaleString()} <i className="fas fa-check-circle"></i></div></div>
                                <p className="t2" style={{color:"#1824AC"}}><span className="d-block">Applicant can continue using the approved limit from Eduvanz and,</span>the balance amount can be paid as downpayment by the applicant.</p>
                                {/* <p className="t2"><span className="d-block">User can also apply for a higher amount,</span>by providing few additional details.</p> */}
                    </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="col-md-12">
                        <div className="d-block text-center mb-3">
                        <Button onClick={this.closeModel} variant="secondary" className="btn btn-dark">Continue with <i className="fas fa-rupee-sign"></i> {lead_limit.toLocaleString()}</Button>
                        </div>
                        <div className="d-block text-center mb-3">
                        <span style={{cursor:'pointer'}} onClick={this.closeModel} className="downloadbulk">
                                Get a Higher Limit
                            </span>
                            </div>
                        </div>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { success_show } = state.model;
    const { lead_limit, lead_name } = state.user
    return {
        success_show,
        lead_name,
        lead_limit
    };
  }

export default connect(mapStateToProps)(SuccessModel)