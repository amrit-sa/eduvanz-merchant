
const initialState = {
  bulk_show: false,
  profile_show: false,
  password_show: false,
  lead_profile_show: false,
  create_lead_show: false,
  filter_show: false,
  filterp_show: false,
  email_show: false,
  email_group_show: false,
  request_show: false,
  preview_show: false,
  success_show: false,
  image_edit_show: false,
  document_drop_show: false,
  preview_pdf_show: false,
  editrole_show: false,
  edituser_show: false,
  enableCrop: 0,
  selectedImageTab: 0,
  edituser_show: false,
  lead_application_show: false,
  open_enach: false,
  bulk_prod_show: false,
  bulk_new_prod_show: false,
  productBulkStart: false,
  productBilkLoading: false,
  productBulkProgress: 0,
  productBulkTotal: 0,
  productBulkNow: 0,
  add_account: false,
  leade_drop: false,
  raise_query: false,
  help_form_show: false,
  create_lead_success: false,
  loancancel_show2: false,
  cancelLoanRejectModal2: false,
  cancelLoanRejectModal: false,
  showLoanCancelRequestModal: false,
  createLeadData: null,
  showraiseQuerySuccess: false,
  showLeadDropSuccess: false

};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log(action)
  switch (type) {
    case 'OPEN_RAISE_QUERY_MODEL':
      return {
        ...state,
        raise_query: true,
      };
    case 'CLOSE_RAISE_QUERY_MODEL':
      return {
        ...state,
        raise_query: false
      };
    case 'OPEN_DROP_LEADE_MODEL':
      return {
        ...state,
        leade_drop: true,
      };
    case 'CLOSE_DROP_LEADE_MODEL':
      return {
        ...state,
        leade_drop: false
      };
    case 'PRODUCT_BULK_UPLOAD_START':
      return {
        ...state,
        productBulkStart: true,
        productBilkLoading: true
      };
    case 'PRODUCT_BULK_UPLOAD_END':
      return {
        ...state,
        productBilkLoading: false
      };
    case 'PRODUCT_BULK_UPLOAD_PROGRESS':
      return {
        ...state,
        productBulkProgress: payload
      };
    case 'PRODUCT_BULK_UPLOAD_DATA':
      return {
        ...state,
        productBulkTotal: payload.total,
        productBulkNow: payload.now
      };
    case 'OPEN_ENACH':
      return {
        ...state,
        open_enach: true
      };
    case 'CLOSE_ENACH':
      return {
        ...state,
        open_enach: false
      };
    case 'OPEN_PREVIEW_PDF_MODEL':
      return {
        ...state,
        preview_pdf_show: true
      };
    case 'CLOSE_PREVIEW_PDF_MODEL':
      return {
        ...state,
        preview_pdf_show: false
      };
    case 'OPEN_DOCUMENT_DROP_MODEL':
      return {
        ...state,
        document_drop_show: true
      };
    case 'CLOSE_DOCUMENT_DROP_MODEL':
      return {
        ...state,
        document_drop_show: false
      };
    case 'OPEN_IMAGE_EDIT_MODEL':
      return {
        ...state,
        image_edit_show: true,
        enableCrop: payload.value,
        selectedImageTab: payload.tab
      };
    case 'CLOSE_IMAGE_EDIT_MODEL':
      return {
        ...state,
        image_edit_show: false
      };
    case 'OPEN_LEAD_CREATE_MODEL':
      return {
        ...state,
        create_lead_show: payload
      };
    case 'OPEN_SUCCESS_MODEL':
      return {
        ...state,
        success_show: true
      };
    case 'CLOSE_SUCCESS_MODEL':
      return {
        ...state,
        success_show: false
      };
    case 'OPEN_PREVIEW_MODEL':
      return {
        ...state,
        preview_show: true
      };
    case 'CLOSE_PREVIEW_MODEL':
      return {
        preview_show: false
      };
    case 'OPEN_REQUEST_MODEL':
      return {
        ...state,
        request_show: true
      };
    case 'CLOSE_REQUEST_MODEL':
      return {
        ...state,
        request_show: false
      };
    case 'OPEN_EMAIL_MODEL':
      return {
        ...state,
        email_show: true
      };
    case 'CLOSE_EMAIL_MODEL':
      return {
        ...state,
        email_show: false
      };
    case 'OPEN_EMAIL_GROUP_MODEL':
      return {
        ...state,
        email_group_show: true
      };
    case 'CLOSE_EMAIL_GROUP_MODEL':
      return {
        ...state,
        email_group_show: false
      };
    case 'OPEN_FILTER_MODEL':
      return {
        ...state,
        filter_show: true
      };
    case 'OPEN_FILTERPRODUCT_MODEL':
      return {
        ...state,
        filterp_show: true
      };
    case 'CLOSE_FILTERPRODUCT_MODEL':
      return {
        ...state,
        filterp_show: false
      };
    case 'CLOSE_FILTER_MODEL':
      return {
        ...state,
        filter_show: false
      };
    case 'OPEN_LEAD_PROFILE_MODEL':
      return {
        ...state,
        lead_profile_show: true
      };
    case 'CLOSE_LEAD_PROFILE_MODEL':
      return {
        ...state,
        lead_profile_show: false
      };
    case 'OPEN_LEAD_APPLICATION_MODEL':
      return {
        ...state,
        lead_application_show: true
      };
    case 'CLOSE_LEAD_APPLICATION_MODEL':
      return {
        ...state,
        lead_application_show: false
      };
    case 'OPEN_BULK_MODEL':
      return {
        bulk_show: true
      };
    case 'CLOSE_BULK_MODEL':
      return {
        ...state,
        bulk_show: false
      };
    case 'OPEN_BULK_PROD_MODEL':
      return {
        bulk_prod_show: true
      }; 
    case 'CLOSE_BULK_PROD_MODEL':
      return {
        ...state,
        bulk_prod_show: false
      };
    case 'OPEN_BULK_NEW_PROD_MODEL':
      return {
        bulk_new_prod_show: true
      };
    case 'CLOSE_BULK_NEW_PROD_MODEL':
      return {
        ...state,
        bulk_new_prod_show: false
      };
    case 'OPEN_PROFILE_MODEL':
      return {
        ...state,
        profile_show: payload
      };
    case 'OPEN_PASSWORD_MODEL':
      return {
        password_show: true
      };
    case 'CLOSE_PASSWORD_MODEL':
      return {
        password_show: false
      };
    case 'OPEN_ADD_USER':
      return {
        adduser_show: true
      };
    case 'CLOSE_ADD_USER':
      return {
        ...state,
        adduser_show: false
      };
    case 'OPEN_ADD_ROLE':
      return {
        addrole_show: true
      };
    case 'CLOSE_ADD_ROLE':
      return {
        ...state,
        addrole_show: false
      };
    case 'OPEN_EDIT_ROLE':
      return {
        editrole_show: true
      };
    case 'CLOSE_EDIT_ROLE':
      return {
        ...state,
        editrole_show: false
      };
    case 'OPEN_EDIT_USER':
      return {
        edituser_show: true
      };
    case 'CLOSE_EDIT_USER':
      return {
        ...state,
        edituser_show: false
      };
    case 'OPEN_LOAN_CANCEL':
      return {
        loancancel_show: true
      };
    case 'OPEN_LOAN_CANCEL_APPROVE2':
      return {
        loancancel_show2: true
      };

    case 'CLOSE_LOAN_CANCEL_REJECT':
      return {
        cancelLoanRejectModal: false
      };
    case 'OPEN_LOAN_CANCEL_REJECT':
      return {
        cancelLoanRejectModal: true
      };
    case 'CLOSE_LOAN_CANCEL_REJECT2':
      return {
        cancelLoanRejectModal2: false
      };
    case 'OPEN_LOAN_CANCEL_REJECT2':
      return {
        cancelLoanRejectModal2: true
      };


    case 'CLOSE_LOAN_CANCEL':
      return {
        ...state,
        loancancel_show: false
      };
    case 'CLOSE_LOAN_CANCEL_APPROVE2':
      return {
        loancancel_show2: false
      };
    case 'OPEN_ADD_ACCOUNT':
      return {
        add_account: true
      };
    case 'CLOSE_ADD_ACCOUNT':
      return {
        ...state,
        add_account: false
      };
    case 'OPEN_HELP_FORM':
      return {
        ...state,
        help_form_show: true
      };
    case 'OPEN_HELP_FORM':
      return {
        ...state,
        help_form_show: false
      };
    case 'OPEN_CREATE_LEAD_SUCCESS':
      return {
        ...state,
        create_lead_success: true,
        createLeadData: payload,
      };
    case 'CLOSE_CREATE_LEAD_SUCCESS':
      return {
        ...state,
        create_lead_success: false
      };
    case 'OpenLoanCancelRequestModal':
      return {
        ...state,
        showLoanCancelRequestModal: false,
      };
    case 'CloseLoanCancelRequestModal':
      return {
        ...state,
        showLoanCancelRequestModal: true,
      };
    case 'OPEN_RAISE_QUERY_SUCCESS':
      return {
        ...state,
        showraiseQuerySuccess: true,
      };
    case 'CLOSE_RAISE_QUERY_SUCCESS':
      return {
        ...state,
        showraiseQuerySuccess: false,
      };
    case 'OPEN_LEAD_DROP_SUCCESS':
      return {
        ...state,
        showLeadDropSuccess: true,
      };
    case 'CLOSE_LEAD_DROP_SUCCESS':
      return {
        ...state,
        showLeadDropSuccess: false,
      };
    default:
      return state;
  }
}


