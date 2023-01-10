import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from "react-bootstrap"
import { closeSuccessModel,closeCreateLeadSuccess, openLeadProfileModel, updateProId } from "../actions/model"
import { getLeadProfile } from "../actions/user"

class AddedLeadModel extends Component {

    constructor() {
        super()
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,            
        }
    }    

    closeModel = () => {
        const {createLeadData} = this.props
        console.log(createLeadData,'>>>>>>>>>>')
        let opp_id = createLeadData ? createLeadData.opp_sfid : "";
        let sfid = createLeadData ? createLeadData.user_sfid : "";
        let id = createLeadData ? createLeadData.id : "";
        this.props.dispatch(closeCreateLeadSuccess());
        this.props.dispatch(openLeadProfileModel(sfid ,id))
        this.props.dispatch(updateProId(opp_id));
    }

    render() {
      
        const { success_show, lead_limit, lead_name,create_lead_success,createLeadData } = this.props;
           
        
        return (
            <>
                <Modal show={create_lead_success ? create_lead_success : false} className="bulkupload type_1">

                    <form>
                        <Modal.Body>

                            <div className="row">

                                <div className="col-md-12 success-popup text-center">
                                    <img src="images/succ-thumb.png" alt="" className='img-fluid' />
                                    <h6 className='mt-2' style={{ fontWeight: 550 }}>Congratulations !</h6>
                                    <h6 className="mt-3" style={{ fontWeight: 900 }}>You have added a</h6>
                                    <h6 className="" style={{ fontWeight: 900 }}>lead!</h6>
                                    <div className="alert alert-info mt-2 pl-5 pr-5" role="alert">
                                        <h6 style={{ fontWeight: 550, color: "black" }}>{createLeadData && createLeadData.opp_applicant_name ? createLeadData.opp_applicant_name : "--"}</h6>
                                        <p style={{ fontWeight: 600, color: "black" }}>{createLeadData && createLeadData.opp_sfid ? createLeadData.opp_sfid : "--"}</p>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="col-md-12 mt-3 ">
                                <div className="d-block text-center mb-3 ml-2">
                                    <Button onClick={this.closeModel} variant="secondary" className="btn btn-dark">Continue with Application</Button>
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
    const { success_show,create_lead_success,createLeadData } = state.model;
    const { lead_limit, lead_name } = state.user
    return {
        success_show,
        lead_name,
        lead_limit,
        create_lead_success,
        createLeadData
    };
}

export default connect(mapStateToProps)(AddedLeadModel)