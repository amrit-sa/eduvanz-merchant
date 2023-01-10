export const OPEN_BULK_MODEL = "OPEN_BULK_MODEL";
export const CLOSE_BULK_MODEL = "CLOSE_BULK_MODEL";
export const OPEN_PROFILE_MODEL = "OPEN_PROFILE_MODEL";
export const OPEN_PASSWORD_MODEL = "OPEN_PASSWORD_MODEL";
export const CLOSE_PASSWORD_MODEL = "CLOSE_PASSWORD_MODEL";
export const CLEAR_USER_MESSAGE = "CLEAR_USER_MESSAGE";
export const OPEN_LEAD_PROFILE_MODEL = "OPEN_LEAD_PROFILE_MODEL";
export const CLOSE_LEAD_PROFILE_MODEL = "CLOSE_LEAD_PROFILE_MODEL";
export const OPEN_FILTER_MODEL = "OPEN_FILTER_MODEL";
export const OPEN_FILTERPRODUCT_MODEL = "OPEN_FILTERPRODUCT_MODEL";
export const CLOSE_FILTERPRODUCT_MODEL = "CLOSE_FILTERPRODUCT_MODEL";
export const CLOSE_FILTER_MODEL = "CLOSE_FILTER_MODEL";
export const OPEN_EMAIL_MODEL = "OPEN_EMAIL_MODEL";
export const CLOSE_EMAIL_MODEL = "CLOSE_EMAIL_MODEL";
export const OPEN_EMAIL_GROUP_MODEL = "OPEN_EMAIL_GROUP_MODEL";
export const CLOSE_EMAIL_GROUP_MODEL = "CLOSE_EMAIL_GROUP_MODEL";
export const OPEN_REQUEST_MODEL = "OPEN_REQUEST_MODEL";
export const CLOSE_REQUEST_MODEL = "CLOSE_REQUEST_MODEL";
export const OPEN_PREVIEW_MODEL = "OPEN_PREVIEW_MODEL";
export const CLOSE_PREVIEW_MODEL = "CLOSE_PREVIEW_MODEL";
export const OPEN_SUCCESS_MODEL = "OPEN_SUCCESS_MODEL";
export const CLOSE_SUCCESS_MODEL = "CLOSE_SUCCESS_MODEL";
export const OPEN_LEAD_CREATE_MODEL = "OPEN_LEAD_CREATE_MODEL";
export const OPEN_IMAGE_EDIT_MODEL = "OPEN_IMAGE_EDIT_MODEL";
export const CLOSE_IMAGE_EDIT_MODEL = "CLOSE_IMAGE_EDIT_MODEL";
export const OPEN_DOCUMENT_DROP_MODEL = "OPEN_DOCUMENT_DROP_MODEL";
export const CLOSE_DOCUMENT_DROP_MODEL = "CLOSE_DOCUMENT_DROP_MODEL";
export const OPEN_PREVIEW_PDF_MODEL = "OPEN_PREVIEW_PDF_MODEL";
export const CLOSE_PREVIEW_PDF_MODEL = "CLOSE_PREVIEW_PDF_MODEL";
export const OPEN_ADD_USER   = "OPEN_ADD_USER";
export const CLOSE_ADD_USER  = "CLOSE_ADD_USER";
export const OPEN_EDIT_USER  = "OPEN_EDIT_USER";
export const CLOSE_EDIT_USER = "CLOSE_EDIT_USER";
export const OPEN_ADD_ROLE  = "OPEN_ADD_ROLE";
export const CLOSE_ADD_ROLE = "CLOSE_ADD_ROLE";
export const OPEN_EDIT_ROLE = "OPEN_EDIT_ROLE";
export const CLOSE_EDIT_ROLE = "CLOSE_EDIT_ROLE";
export const OPEN_ENACH  = "OPEN_ENACH";
export const CLOSE_ENACH = "CLOSE_ENACH";
export const OPEN_ADD_PRODUCT_MODEL = "OPEN_ADD_PRODUCT_MODEL";
export const SETTLEMENT_APPLICATION = "SETTLEMENT_APPLICATION";
export const OPEN_LEAD_APPLICATION_MODEL  = "OPEN_LEAD_APPLICATION_MODEL";
export const CLOSE_LEAD_APPLICATION_MODEL = "CLOSE_LEAD_APPLICATION_MODEL";
export const OPEN_BULK_PROD_MODEL  = "OPEN_BULK_PROD_MODEL";
export const CLOSE_BULK_PROD_MODEL = "CLOSE_BULK_PROD_MODEL";
export const OPEN_BULK_NEW_PROD_MODEL  = "OPEN_BULK_NEW_PROD_MODEL";
export const CLOSE_BULK_NEW_PROD_MODEL = "CLOSE_BULK_NEW_PROD_MODEL";
export const OPEN_LOAN_CANCEL  = "OPEN_LOAN_CANCEL";
export const CLOSE_LOAN_CANCEL = "CLOSE_LOAN_CANCEL";
export const PRODUCT_BULK_UPLOAD_START      = "PRODUCT_BULK_UPLOAD_START";
export const PRODUCT_BULK_UPLOAD_END        = "PRODUCT_BULK_UPLOAD_END";
export const PRODUCT_BULK_UPLOAD_PROGRESS   = "PRODUCT_BULK_UPLOAD_PROGRESS";
export const PRODUCT_BULK_UPLOAD_DATA       = "PRODUCT_BULK_UPLOAD_DATA";
export const OPEN_CONFIGURE_MODEL  = "OPEN_CONFIGURE_MODEL";
export const CLOSE_CONFIGURE_MODEL = "CLOSE_CONFIGURE_MODEL";
export const OPEN_DROP_LEADE_MODEL = "OPEN_DROP_LEADE_MODEL";
export const CLOSE_DROP_LEADE_MODEL = "CLOSE_DROP_LEADE_MODEL";
export const OPEN_RAISE_QUERY_MODEL  = "OPEN_RAISE_QUERY_MODEL";
export const CLOSE_RAISE_QUERY_MODEL = "CLOSE_RAISE_QUERY_MODEL";
export const OPEN_ADD_ACCOUNT  = "OPEN_ADD_ACCOUNT";
export const CLOSE_ADD_ACCOUNT = "CLOSE_ADD_ACCOUNT";
export const OPEN_HELP_FORM = "OPEN_HELP_FORM";
export const CLOSE_HELP_FORM = "CLOSE_HELP_FORM";
export const OPEN_CREATE_LEAD_SUCCESS = 'OPEN_CREATE_LEAD_SUCCESS';
export const CLOSE_CREATE_LEAD_SUCCESS = 'CLOSE_CREATE_LEAD_SUCCESS';
export const OPEN_LOAN_CANCEL_APPROVE2 = 'OPEN_LOAN_CANCEL_APPROVE2';
export const CLOSE_LOAN_CANCEL_APPROVE2 = 'CLOSE_LOAN_CANCEL_APPROVE2';
export const CLOSE_LOAN_CANCEL_REJECT='CLOSE_LOAN_CANCEL_REJECT';
export const OPEN_LOAN_CANCEL_REJECT='OPEN_LOAN_CANCEL_REJECT';
export const CLOSE_LOAN_CANCEL_REJECT2='CLOSE_LOAN_CANCEL_REJECT2';
export const OPEN_LOAN_CANCEL_REJECT2='OPEN_LOAN_CANCEL_REJECT2';
export const OpenLoanCancelRequestModal = 'OpenLoanCancelRequestModal';
export const CloseLoanCancelRequestModal = 'CloseLoanCancelRequestModal';
export const OPEN_RAISE_QUERY_SUCCESS ='OPEN_RAISE_QUERY_SUCCESS';
export const CLOSE_RAISE_QUERY_SUCCESS ='CLOSE_RAISE_QUERY_SUCCESS';
export const OPEN_LEAD_DROP_SUCCESS ='OPEN_LEAD_DROP_SUCCESS';
export const CLOSE_LEAD_DROP_SUCCESS ='CLOSE_LEAD_DROP_SUCCESS';

export const bulkUploadStart = () => (dispatch) => {
    dispatch({
        type: PRODUCT_BULK_UPLOAD_START
    });
}

export const bulkUploadEnd = () => (dispatch) => {
    dispatch({
        type: PRODUCT_BULK_UPLOAD_END
    });
}

export const openQueryModel = () => (dispatch) => {
    dispatch({
        type: OPEN_RAISE_QUERY_MODEL
    });
}

export const closeQueryModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_RAISE_QUERY_MODEL
    });
}

export const openDropModel = () => (dispatch) => {
    dispatch({
        type: OPEN_DROP_LEADE_MODEL
    });
}

export const closeDropModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_DROP_LEADE_MODEL
    });
}

export const bulkUploadProgress = (getData) => (dispatch) => {
    dispatch({
        type: PRODUCT_BULK_UPLOAD_PROGRESS,
        payload: getData
    });
}

export const bulkUploadData = (getData) => (dispatch) => {
    dispatch({
        type: PRODUCT_BULK_UPLOAD_DATA,
        payload: getData
    });
}

export const openPreviewPdfModel = () => (dispatch) => {
    dispatch({
        type: OPEN_PREVIEW_PDF_MODEL
    });
}

export const closePreviewPdfModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_PREVIEW_PDF_MODEL
    });
}

export const openEnach = () => (dispatch) => {
    dispatch({
        type: OPEN_ENACH
    });
}

export const closeEnach = () => (dispatch) => {
    dispatch({
        type: CLOSE_ENACH
    });
}

export const openDocumentDropModel = () => (dispatch) => {
    dispatch({
        type: OPEN_DOCUMENT_DROP_MODEL
    });
}

export const closeDocumentDropModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_DOCUMENT_DROP_MODEL
    });
}

export const openImageEditModel = (data) => (dispatch) => {
    dispatch({
        type: OPEN_IMAGE_EDIT_MODEL,
        payload: data
    });
}

export const closeImageEditModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_IMAGE_EDIT_MODEL
    });
}
export const openSuccessModel = () => (dispatch) => {
    dispatch({
        type: OPEN_SUCCESS_MODEL
    });
}

export const closeSuccessModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_SUCCESS_MODEL
    });
}

export const openPreviewModel = () => (dispatch) => {
    dispatch({
        type: OPEN_PREVIEW_MODEL
    });
}

export const closePreviewModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_PREVIEW_MODEL
    });
}

export const openRequestModel = () => (dispatch) => {
    dispatch({
        type: OPEN_REQUEST_MODEL
    });
}

export const closeRequestModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_REQUEST_MODEL
    });
}

export const openEmailModel = () => (dispatch) => {
    dispatch({
        type: OPEN_EMAIL_MODEL
    });
}

export const closeEmailModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_EMAIL_MODEL
    });
}

export const openEmailGroupModel = () => (dispatch) => {
    dispatch({
        type: OPEN_EMAIL_GROUP_MODEL
    });
}

export const closeEmailGroupModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_EMAIL_GROUP_MODEL
    });
}

export const openFilterModel = () => (dispatch) => {
    dispatch({
        type: OPEN_FILTER_MODEL
    });
}
export const openFilterpModel = () => (dispatch) => {
    dispatch({
        type: OPEN_FILTERPRODUCT_MODEL
    });
}
export const closeFilterpModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_FILTERPRODUCT_MODEL
    });
}

export const closeFilerModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_FILTER_MODEL
    });
}



export const updateProId = (id) => (dispatch) => {
    localStorage.setItem("opp_id", id);
    dispatch({ type: "UPDATE_OPP_ID", payload: id});
}

export const closeLeadProfileModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_LEAD_PROFILE_MODEL
    });
}

export const openBulkModel = () => (dispatch) => {
    dispatch({
        type: OPEN_BULK_MODEL
    });
}

export const closeModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_BULK_MODEL
    });
}

export const openBulkProdModel = () => (dispatch) => {
    dispatch({
        type: OPEN_BULK_PROD_MODEL
    });
}

export const closeBulkProdModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_BULK_PROD_MODEL
    });
}

export const openBulkNewProdModel = () => (dispatch) => {
    dispatch({
        type: OPEN_BULK_NEW_PROD_MODEL
    });
}

export const closeBulkNewProdModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_BULK_NEW_PROD_MODEL
    });
}

export const openCreateLeadModel = () => (dispatch, getState) => {
    let payload = getState().model.create_lead_show?false:true;
    dispatch({
        type: OPEN_LEAD_CREATE_MODEL,
        payload: payload
    });
}

export const openProfileModel = () => (dispatch, getState) => {
    let payload = getState().model.profile_show?false:true;
    dispatch({
        type: CLEAR_USER_MESSAGE
    });
    dispatch({
        type: OPEN_PROFILE_MODEL,
        payload: payload
    });
}

export const openPasswordModel = () => (dispatch) => {
    dispatch({
        type: OPEN_PASSWORD_MODEL
    });
}

export const closePasswordModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_PASSWORD_MODEL
    });
}

export const openAddUser = () => (dispatch) => {
    dispatch({
        type: OPEN_ADD_USER
    });
}

export const openAddAccount = () => (dispatch) => {
    dispatch({
        type: OPEN_ADD_ACCOUNT
    });
}

export const closeAddAccount = () => (dispatch) => {
    dispatch({
        type: CLOSE_ADD_ACCOUNT
    });
}

export const closeAddUser = () => (dispatch) => {
    dispatch({
        type: CLOSE_ADD_USER
    });
}

export const openAddRole = () => (dispatch) => {
    dispatch({
        type: OPEN_ADD_ROLE
    });
}

export const closeAddRole = () => (dispatch) => {
    dispatch({
        type: CLOSE_ADD_ROLE
    });
}

export const openEditRole = (roleid) => (dispatch) => {
    localStorage.setItem("roleid", roleid);
    dispatch({ type: "UPDATE_ROLE_ID", payload: roleid});
    dispatch({
        type: OPEN_EDIT_ROLE
    });
}

export const closeEditRole = () => (dispatch) => {
    dispatch({
        type: CLOSE_EDIT_ROLE
    });
}
export const openEditUser = (usersid) => (dispatch) => {
    localStorage.setItem("usersid", usersid);
    dispatch({ type: "UPDATE_USERS_ID", payload: usersid});
    dispatch({
        type: OPEN_EDIT_USER
    });
}

export const closeEditUser = () => (dispatch) => {
    dispatch({
        type: CLOSE_EDIT_USER
    });
}
export const openLoanCanelModal = (roleid) => (dispatch) => {
    dispatch({
        type: OPEN_LOAN_CANCEL
    });
}

export const closeLoanCanelModal = () => (dispatch) => {
    dispatch({
        type: OPEN_LOAN_CANCEL
    });
}
export const loanModalClose = () => (dispatch) => {
    dispatch({
        type: CLOSE_LOAN_CANCEL
    });
}

export const loanModalApprove2Open = () => (dispatch) => {
    dispatch({type:OPEN_LOAN_CANCEL_APPROVE2})
}
export const loanModalApprove2Close = () => (dispatch) => {
    dispatch({type:CLOSE_LOAN_CANCEL_APPROVE2})
}
export const loanModalRejectClose = () => (dispatch) => {
    dispatch({type:CLOSE_LOAN_CANCEL_REJECT})
}
export const loanModalRejectOpen = () => (dispatch) => {
    dispatch({type:OPEN_LOAN_CANCEL_REJECT})
}
export const loanModalReject2Close = () => (dispatch) => {
    dispatch({type:CLOSE_LOAN_CANCEL_REJECT2})
}
export const loanModalReject2Open = () => (dispatch) => {
    dispatch({type:OPEN_LOAN_CANCEL_REJECT2})
}

export const LoanCancelRequestModalOpen = () => (dispatch) => {
    dispatch({type:OpenLoanCancelRequestModal})
}
export const LoanCancelRequestModalClose = () => (dispatch) => {
    dispatch({type:CloseLoanCancelRequestModal})
}

export const openLeadApplicationModel = (sfid, id) => (dispatch) => {
    localStorage.setItem("lead_id", sfid);
    localStorage.setItem("L_id", id);
    dispatch({ type: "UPDATE_LEAD_ID", payload: sfid});
    dispatch({ type: "UPDATE_L_ID", payload: sfid});
    dispatch({
        type: OPEN_LEAD_APPLICATION_MODEL
    });
}

export const openLeadProfileModel = (sfid , id) => (dispatch) => {
    localStorage.setItem("lead_id", sfid);
    localStorage.setItem("L_id", id);
    dispatch({ type: "UPDATE_LEAD_ID", payload: sfid});
    dispatch({ type: "UPDATE_L_ID", payload: sfid});
    dispatch({
        type: OPEN_LEAD_PROFILE_MODEL
    });
}

export const closeLeadApplicationModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_LEAD_APPLICATION_MODEL
    });
}

export const openConfigureModel = () => (dispatch) => {
    dispatch({
        type: OPEN_CONFIGURE_MODEL
    });
}

export const closeConfigureModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_CONFIGURE_MODEL
    });
}
export const OpenHelpForm = () => (dispatch) => {
    dispatch({
        type: OPEN_HELP_FORM
    });
}
export const closeHelpForm = () => (dispatch) => {
    dispatch({
        type: CLOSE_HELP_FORM
    });
}

export const OpenCreateLeadSuccess = (data) =>(dispatch) => {
    dispatch({
        type:OPEN_CREATE_LEAD_SUCCESS,
        payload:data,
    })
}
export const closeCreateLeadSuccess = () => (dispatch) => {
    dispatch({
        type:CLOSE_CREATE_LEAD_SUCCESS
    })
}

export const openSuccessQueryModal = () => (dispatch) => {
    dispatch({
        type:OPEN_RAISE_QUERY_SUCCESS
    })
}
export const closeSuccessQueryModal = () => (dispatch) => {
    dispatch({
        type:CLOSE_RAISE_QUERY_SUCCESS
    })
}
export const openLeadDropModal = () => (dispatch) => {
    dispatch({
        type:OPEN_LEAD_DROP_SUCCESS
    })
}
export const closeLeadDropModal = () => (dispatch) => {
    dispatch({
        type:CLOSE_LEAD_DROP_SUCCESS
    })
}



  