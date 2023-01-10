import {
  UPDATE_BANK_SUCCESS,
  UPDATE_BANK_FAILD,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILD,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAILD,
  GET_SETTLEMENT_SUCCESS,
  GET_SETTLEMENT_FAILD,
  GET_REFUNDCANCLE_FAILD,
  GET_REFUNDCANCLE_SUCCESS,
  GET_BANK_SUCCESS,
  GET_BANK_FAILD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILD,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILD,
  LOGOUT,
  SET_MESSAGE,
  UPDATE_COMPANY_FAILD,
  LOADING_FAILD,
  LOADING_SUCCESS,
  GET_USERS_FAILD,
  GET_USERS_SUCCESS,
  MERCHANT_PRODUCTS_FAILD,
  MERCHANT_PRODUCTS_SUCCESS,
  GET_CATEGORY_FAILD,
  GET_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAILD,
  PRODUCT_CREATE_SUCCESS,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILD,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILD,
  ROLE_DATA_SUCCESS,
  ROLE_DATA_FAILD,
  USER_DATA_SUCCESS,
  USER_DATA_FAILD,
  GET_BRAND_SUCCESS,
  UPDATE_USER_SFID,
  GET_BRAND_FAILD,
  GET_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_FAILD,
  PRODUCTS_STATUS_UPDATE_FAILD,
  PRODUCTS_STATUS_UPDATE_SUCCESS,
  ALL_NOTIFICATIONS_NEW,
  ALL_NOTIFICATIONS_OLD,
  GET_FAQ_QUESTIONS_SUCCESS,
  GET_FAQ_QUESTIONS_FAILD,
  ACTIVE_SETTLEMENT,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILED,
  GET_LEAD_FUNNEL_DATA_FAILD,
  GET_LEAD_FUNNEL_DATA_SUCCESS,
  ALL_NOTIFICATIONS,
  GET_SALES_INSIGHT_GRAPH_DATA_FAILD,
  GET_SALES_INSIGHT_GRAPH_DATA_SECCESS,
  GET_USER__DATA_TO_UPDATE_SECCESS,
  GET_USER__DATA_TO_UPDATE_FAILD,
  GET_SETTLEMENT_SUMMARY_FAILD,
  GET_SETTLEMENT_SUMMARY_SUCCESS,
  GET_PRODUCT_UN_DATA,
  ORDER_SUMMARY,
  ORDER_SUMMARY_EMPTY,
  LEAD_DATA_LIST,
  GET_GLOBALSEARCH_FAILD,
  GET_GLOBALSEARCH_SUCCESS,
  BULK_UPDATE,
  BULK_LEAD_CREATE,
  SHOW_SEARCHED,
  ACTIVE_PRODUCT_TAB,
  LOAD_PRODUCT_DATA,
  ADD_EMAIL_RECIPIENT,
  EMAILS_GROUP_LIST

} from "./types";


import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import axios from "axios";


export const LEAD_PROFILE_SUCCESS = "LEAD_PROFILE_SUCCESS";
export const LEAD_PROFILE_FAILD = "LEAD_PROFILE_FAILD";
export const LEAD_PROFILE_IMG_SUCCESS = "LEAD_PROFILE_IMG_SUCCESS";
export const LEAD_PAN_IMG_SUCCESS = "LEAD_PAN_IMG_SUCCESS";
export const LEAD_OTHER_FRONT_IMG_SUCCESS = "LEAD_OTHER_FRONT_IMG_SUCCESS";
export const LEAD_OTHER_BACK_IMG_SUCCESS = "LEAD_OTHER_BACK_IMG_SUCCESS";
export const LEAD_PDF_STRING_SUCCESS = "LEAD_PDF_STRING_SUCCESS";
export const LEADS_COUNT_SUCCESS = "LEADS_COUNT_SUCCESS";
export const LEADS_COUNT_FAILD = "LEADS_COUNT_FAILD";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILD = "GET_PRODUCTS_FAILD";
export const ENTITY_SEACH_SUCCESS = "ENTITY_SEACH_SUCCESS";
export const ENTITY_SEACH_FAILD = "ENTITY_SEACH_FAILD";
export const SEARCH_ENTITY_SUCCESS = "SEARCH_ENTITY_SUCCESS";
export const SEARCH_ENTITY_FAILD = "SEARCH_ENTITY_FAILD";
export const SEND_SETTLEMENT_DATA = "SEND_SETTLEMENT_DATA";
export const SEND_SETTLEMENT_DUE_DATA = "SEND_SETTLEMENT_DUE_DATA";
export const SEND_SETTLEMENT_REFUND_DATA = "SEND_SETTLEMENT_REFUND_DATA";
export const SEND_PRODUCT_ALL = "SEND_PRODUCT_ALL";
export const MerchantSettlementCancelId = "MerchantSettlementCancelId";


export const leadPdfStore = (givendata) => (dispatch) => {
  dispatch({
    type: LEAD_PDF_STRING_SUCCESS,
    payload: givendata
  });
};

export const removeDocument = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'removeDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const removeProfile = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'removeProfile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const updateRent = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'rent_update').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateAddress = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'update_user_address').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateProfession = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'update_income').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateEmpType = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'update_employment').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addAddress = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'update_resident').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAddress = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'get_user_address').then(
    (response) => {
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getBankDetails = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'get_account_bank').then(
    (response) => {
      return response;
    });
};

export const updatePan = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givenData, 'update_pan_status').then(
    (data) => {
      //  console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      return data;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const updatePanStatus = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givenData, 'update_pan_status').then(
    (data) => {
      //  console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      return data;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const createBulkLeads = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(givendata, 'bulk_leads').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const createBulkProducts = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(givendata, 'add_product').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const createLeads = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(givendata, 'create_lead').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.status === "success" && response.data) {
        let getData = response.data;
        localStorage.setItem("lead_id", getData.id);
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const getLeads = (givendata, sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(givendata ? `merchant_leads?sfid=${sfid}&${givendata}` : `merchant_leads?sfid=${sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_LEADS_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_LEADS_SUCCESS,
          payload: response
        });
      }
      // return Promise.resolve();
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_LEADS_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSettlement = (givendata, merchant_sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(givendata ? `merchant_settlement?merchant_sfid=${merchant_sfid}&${givendata}` : `merchant_settlement?merchant_sfid=${merchant_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_SETTLEMENT_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_SETTLEMENT_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_SETTLEMENT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSettlementSummary = (givendata, opportunity_sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(givendata ? `merchant_settlement_details?opportunity_sfid=${opportunity_sfid}&${givendata}` : `merchant_settlement_details?opportunity_sfid=${opportunity_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_SETTLEMENT_SUMMARY_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_SETTLEMENT_SUMMARY_SUCCESS,
          payload: response
        });
      }
      return response
      // return Promise.resolve();
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_SETTLEMENT_SUMMARY_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// export const getdashboard = (givendata, merchant_sfid) => (dispatch) => {
//   dispatch({ type: LOADING_SUCCESS});
//   return UserService.get(`merchant_dashboard_summary?merchant_sfid=${merchant_sfid}&dashbaord_section=dashbaord_section=Summary&filter_period=All`).then(
//     (response) => {
//       dispatch({ type: LOADING_FAILD});
//       if(response.responseCode !== undefined && response.responseCode === 400)
//       {    
//         dispatch({
//           type: GET_DASHBOARD_FAILD,
//           payload: response.message,
//         });
//       }else{
//         dispatch({
//           type: GET_DASHBOARD_SUCCESS,
//           payload: response
//         });
//       }
//       return Promise.resolve();
//     },
//     (error) => {
//       dispatch({ type: LOADING_FAILD});
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: GET_DASHBOARD_FAILD,
//         payload: message,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };

export const getdashboard = (selectValuee, rfidd) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_dashboard_summary?merchant_sfid=${rfidd}&filter_period=${selectValuee}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_DASHBOARD_FAILD,
        });
      } else {
        dispatch({
          type: GET_DASHBOARD_SUCCESS,
          payload: response.rowData,
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_DASHBOARD_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}


export const settlementRefundCancellation = (givendata, merchant_sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(givendata ? `merchant_settlement_cancellation_refund?merchant_sfid=${merchant_sfid}&${givendata}` : `merchant_settlement_cancellation_refund?merchant_sfid=${merchant_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {

        dispatch({
          type: GET_REFUNDCANCLE_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_REFUNDCANCLE_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_REFUNDCANCLE_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getGlobalSearch = (merchant_sfid, search_keyword, section, sub_section) => (dispatch) => {
  console.log('>>>>>>>>>>>>>>>>>')
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_search?merchant_sfid=${merchant_sfid}&search_keyword=${search_keyword}&section=${section}&sub_section=${sub_section}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      // if(response.responseCode !== undefined && response.responseCode === 400)
      if (response.status !== "success") {
        // dispatch({
        //   type: GET_GLOBALSEARCH_FAILD,
        // });
        dispatch({
          type: GET_GLOBALSEARCH_SUCCESS,
          payload: response.proData,
          // payload: {},
        });
      } else {
        dispatch({
          type: GET_GLOBALSEARCH_SUCCESS,
          payload: response.proData,
          // payload: response,

        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_GLOBALSEARCH_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}

export const getInvoiceData = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  console.log("APi call 1")
  return UserService.post(getData, 'get_invoice_html').then(
    
    (response) => {
      console.log("Api call 2")
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

export const settlementRefundCancellation_back = (givendata, merchant_sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(givendata ? `merchant_settlement_cancellation_refund?merchant_sfid=${merchant_sfid}&${givendata}` : `merchant_settlement_cancellation_refund?merchant_sfid=${merchant_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_REFUNDCANCLE_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_REFUNDCANCLE_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}

export const merchantSettlementDownload = (givendata, merchant_sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(givendata ? `merchant_settlement_download?merchant_sfid=${merchant_sfid}&${givendata}` : `merchant_settlement_download?merchant_sfid=${merchant_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};
export const sendSettlementDetail = (id) => (dispatch) => {
  dispatch({ type: "SEND_SETTLEMENT_DATA", payload: id });
}
export const sendSettlementDueDetail = (id) => (dispatch) => {
  dispatch({ type: "SEND_SETTLEMENT_DUE_DATA", payload: id });
}

export const sendSettlementRefundsDetail = (id) => (dispatch) => {
  dispatch({ type: "SEND_SETTLEMENT_REFUND_DATA", payload: id });
}

export const sendProductDetail = (id) => (dispatch) => {
  dispatch({ type: "SEND_PRODUCT_ALL", payload: id });
}

export const merchantcancellation = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(givendata, `merchant_settlement_cancellation_status_update`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};
// export const merchantSettlementDownload = (givendata, sfid) => (dispatch) => {
//   dispatch({ type: LOADING_SUCCESS});
//   return UserService.get(givendata?`merchant_lead_download?sfid=${sfid}&${givendata}`:`merchant_lead_download?sfid=${sfid}`).then(
//     (response) => {
//       dispatch({ type: LOADING_FAILD});
//       return response;
//     },
//     (error) => {
//       dispatch({ type: LOADING_FAILD});
//       return Promise.reject();
//     }
//   );
// };

// temp making to download
export const merchantLeadDownload = (givendata, sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(givendata ? `merchant_lead_download?sfid=${sfid}&${givendata}` : `merchant_lead_download?sfid=${sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const getLeadsCount = (givendata, sfid) => (dispatch) => {
  return UserService.get(givendata ? `getLeadCount?sfid=${sfid}&${givendata}` : `getLeadCount?sfid=${sfid}`).then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: LEADS_COUNT_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: LEADS_COUNT_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LEADS_COUNT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getBanks = () => (dispatch) => {
  return UserService.get('banks').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_BANK_FAILD,
          payload: response.message,
        });
      } else {

        dispatch({
          type: GET_BANK_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BANK_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addBank = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(getData, 'add_bank').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const editBank = (getData) => (dispatch) => {
  console.log(getData);
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(getData, `update_bank_account`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};



export const getBrands = () => (dispatch) => {
  return UserService.get('get_brand').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_BRAND_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_BRAND_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BRAND_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getUserBanks = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_user_bank').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const getMerchantProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'merchant_profile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const getMerchantUpdates = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_merchant_updates').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status == "success") {
        const accDet = response && response.accountDet ? response.accountDet : null;
        const sfid = accDet && accDet.sfid ? accDet.sfid : null;
        if (sfid) {
          localStorage.setItem("sfid", sfid);
        }
        dispatch({
          type: UPDATE_USER_SFID,
          payload: sfid
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const updateMerchantProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'merchant_profile_update').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const checkIfsc = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(getData, 'check_ifsc').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const searchEntity = (getData) => (dispatch) => {
  dispatch({ type: ENTITY_SEACH_SUCCESS });
  return UserService.post(getData, 'check_entity').then(
    (response) => {
      dispatch({ type: ENTITY_SEACH_FAILD });
      if (response.status === "success") {
        dispatch({
          type: SEARCH_ENTITY_SUCCESS,
          payload: response.data
        })
      } else {
        dispatch({
          type: ENTITY_SEACH_FAILD
        })
      }
      return response;
    },
    (error) => {
      dispatch({ type: ENTITY_SEACH_FAILD });
      dispatch({
        type: SEARCH_ENTITY_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const clearSearchEntity = () => (dispatch) => {
  dispatch({
    type: SEARCH_ENTITY_FAILD
  });
};

export const checkAccount = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'check_bank_account').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const updateBanks = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'update_bank').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response.responseCode !== undefined && response.responseCode === 500) {
        dispatch({
          type: UPDATE_BANK_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: UPDATE_BANK_SUCCESS,
          payload: response.message
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_BANK_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const herokuUpload = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'heroku_upload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const createTransApp = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'update_trans_app').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const updateIpabureau = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'update_ipabureau').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const checkEnachStatus = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_enach_status').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const checkEnachDownload = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'update_enach_download').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const checkEnachUpload = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'update_enach_upload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updatePassword = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'change_password').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: UPDATE_PASSWORD_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
          payload: response.message
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_PASSWORD_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateUserProfile = (getData) => (dispatch) => {
  return UserService.post(getData, 'update_user_profile').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 500) {
        dispatch({
          type: UPDATE_PROFILE_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: response.message
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_PROFILE_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getUserProfile = (getData) => (dispatch) => {
  return UserService.post(getData, 'get_user_profile').then(
    (response) => {
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const sendUserOtp = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'sentUserOtp').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const verifyUserOtp = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'verify_user_otp').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return data;
    });
};

export const updateMerchantCategory = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givenData, 'merchant_category_update').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return data;
    });
};

export const getLeadProfileDocuemnt = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(getData, 'getProfileDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      if (response.status === "success") {
        let getData = response.data;
        if (getData.base64 !== undefined && getData.base64 !== "") {
          dispatch({
            type: LEAD_PROFILE_IMG_SUCCESS,
            payload: "data:image/jpg;base64," + getData.base64.base64
          });
        } else {
          dispatch({
            type: LEAD_PROFILE_IMG_SUCCESS,
            payload: ""
          });
        }
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const faceMatch = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata, 'face_match').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const validatePan = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata, 'validate_pan').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getBankDocuemnt = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(getData, 'getBankStatement').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const getLeadPanDocuemnt = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(getData, 'getPanDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      if (response.status === "success") {
        let getData = response.data;
        if (getData.pan_front !== undefined && getData.pan_front !== "") {
          let resData = getData.pan_front;
          let DocBase = ""
          if (resData.formate !== null) {
            if (resData.formate === "application/pdf") {
              DocBase = "data:application/pdf;base64," + resData.base;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base;
            }
          }
          dispatch({
            type: LEAD_PAN_IMG_SUCCESS,
            payload: DocBase
          });
        } else {
          dispatch({
            type: LEAD_PAN_IMG_SUCCESS,
            payload: ""
          });
        }
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const getLeadOtherDocuemnt = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(getData, 'getOtherdocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      if (response.status === "success") {
        let getData = response;
        if (getData && getData.aadharfrontdata && getData.aadharfrontdata.length !== 0) {

          let resData = getData && getData.aadharfrontdata && getData.aadharfrontdata.base64 ? getData.aadharfrontdata.base64 : '';
          let DocBase = "";
          if (getData && getData.aadharfrontdata.filetype !== null) {
            if (getData.aadharfrontdata.filetype === "PDF") {
              DocBase = "data:application/pdf;base64," + resData.base64;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base64;
            }

          }
          let data = {
            content: DocBase,
            type: 'Aadhar',
          }
          dispatch({
            type: LEAD_OTHER_FRONT_IMG_SUCCESS,
            payload: data
          });
        } else if (getData && getData.driving_front !== undefined && getData.driving_front !== "") {
          let resData = getData.driving_front;
          let DocBase = "";
          if (resData.formate !== null) {
            if (resData.formate === "application/pdf") {
              DocBase = "data:application/pdf;base64," + resData.base;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base;
            }

          }
          let data = {
            content: DocBase,
            type: 'Driving',
          }
          dispatch({
            type: LEAD_OTHER_FRONT_IMG_SUCCESS,
            payload: data
          });
        } else if (getData && getData.voterfrontdata && getData.voterfrontdata.length !== 0) {
          let resData = getData && getData.voterfrontdata && getData.voterfrontdata.base64 ? getData.voterfrontdata.base64 : '';
          let DocBase = "";
          if (getData.voterfrontdata.filetype !== null) {
            if (getData.voterfrontdata.filetype === "PDF") {
              DocBase = "data:application/pdf;base64," + resData.base64;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base64;
            }

          }
          let data = {
            content: DocBase,
            type: 'Voter'
          }
          dispatch({
            type: LEAD_OTHER_FRONT_IMG_SUCCESS,
            payload: data
          });

        } else if (getData && getData.passport && getData.passport.length !== 0) {
          let resData = getData.passport.base64;
          let DocBase = "";
          if (getData && getData.passport.filetype !== null) {
            if (getData.passport.filetype === "PDF") {
              DocBase = "data:application/pdf;base64," + resData.base64;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base64;
            }

          }
          let data = {
            content: DocBase,
            type: 'Passport'
          }
          dispatch({
            type: LEAD_OTHER_FRONT_IMG_SUCCESS,
            payload: data
          });
        } else {
          let data = {
            content: "",
            type: 'Aadhar'
          }
          dispatch({
            type: LEAD_OTHER_FRONT_IMG_SUCCESS,
            payload: data
          });
        }

        if (getData && getData.aadharbackdata && getData.aadharbackdata.length !== 0) {
          let resData = getData.aadharbackdata && getData.aadharbackdata.base64 ? getData.aadharbackdata.base64 : '';
          let DocBase = "";
          if (getData.aadharbackdata.filetype !== null) {
            if (getData.aadharbackdata.filetype === "PDF") {
              DocBase = "data:application/pdf;base64," + resData.base64;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base64;
            }

          }
          let data = {
            content: DocBase,
            type: 'Aadhar',
          }
          dispatch({
            type: LEAD_OTHER_BACK_IMG_SUCCESS,
            payload: data
          });
        } else if (getData && getData.driving_back !== undefined && getData.driving_back !== "") {
          let resData = getData.driving_back;
          let DocBase = "";
          if (resData.formate !== null) {
            if (resData.formate === "application/pdf") {
              DocBase = "data:application/pdf;base64," + resData.base;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base;
            }

          }
          let data = {
            content: DocBase,
            type: 'Driving',
          }
          dispatch({
            type: LEAD_OTHER_BACK_IMG_SUCCESS,
            payload: data
          });
        } else if (getData && getData.voterbackdata && getData.voterbackdata.length !== 0) {
          let resData = getData && getData.voterbackdata && getData.voterbackdata.base64 ? getData.voterbackdata.base64 : '';
          let DocBase = "";
          if (getData.voterbackdata.filetype !== null) {
            if (getData.voterbackdata.filetype === "PDF") {
              DocBase = "data:application/pdf;base64," + resData.base64;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base64;
            }

          }
          let data = {
            content: DocBase,
            type: 'Voter',
          }
          dispatch({
            type: LEAD_OTHER_BACK_IMG_SUCCESS,
            payload: data
          });

        } else if (getData && getData.passport_back !== undefined && getData.passport_back !== "") {
          let resData = getData.passport_back;
          let DocBase = "";
          if (resData.formate !== null) {
            if (resData.formate === "application/pdf") {
              DocBase = "data:application/pdf;base64," + resData.base;
            } else {
              DocBase = "data:image/jpg;base64," + resData.base;
            }

          }
          let data = {
            content: DocBase,
            type: 'Passport',
          }
          dispatch({
            type: LEAD_OTHER_BACK_IMG_SUCCESS,
            payload: data
          });
        } else {
          let data = {
            content: "",
            type: 'Aadhar',
          }
          dispatch({
            type: LEAD_OTHER_BACK_IMG_SUCCESS,
            payload: data
          });
        }
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const uploadProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.uploadProfile(getData).then(
    (response) => {
      dispatch({
        type: LEAD_PROFILE_IMG_SUCCESS,
        payload: "data:image/jpg;base64," + getData.base64
      });
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const checkLiveliness = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.uploadFile(getData, 'fileupload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const uploadDocument = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.uploadEduDocuments(getData, 'uploadLeadDocument').then(
    (response) => {
      let givenType = getData.doctype;
      if (givenType.length > 0 && givenType[0] != undefined && givenType[0] == "Pan-Front") {
        dispatch({
          type: LEAD_PAN_IMG_SUCCESS,
          payload: "data:image/jpg;base64," + getData.base64[0]
        });
      }

      if (givenType.length > 0 && givenType[0] != undefined && (givenType[0] == "Aadhar-Front" || givenType[0] == "Driving-Front" || givenType[0] == "Voter-Front" || givenType[0] == "Passport-Front")) {
        let data = {
          content: "data:image/jpg;base64," + getData.base64[0],
          type: givenType[0] == "Aadhar-Front" ? 'Aadhar' : givenType[0] == "Driving-Front" ? 'Driving' : givenType[0] == "Voter-Front" ? 'Voter' : givenType[0] == "Passport-Front" ? 'Passport' : ''
        }
        dispatch({
          type: LEAD_OTHER_FRONT_IMG_SUCCESS,
          payload: data
        });
      }

      if (givenType.length > 0 && givenType[0] != undefined && (givenType[0] == "Aadhar-Back" || givenType[0] == "Driving-Back" || givenType[0] == "Voter-Back" || givenType[0] == "Passport-Back")) {
        let data = {
          content: "data:image/jpg;base64," + getData.base64[0],
          type: givenType[0] == "Aadhar-Back" ? 'Aadhar' : givenType[0] == "Driving-Back" ? 'Driving' : givenType[0] == "Voter-Back" ? 'Voter' : givenType[0] == "Passport-Back" ? 'Passport' : ''
        }
        dispatch({
          type: LEAD_OTHER_BACK_IMG_SUCCESS,
          payload: data
        });
      }

      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const statementUpload = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  const { base64, doctype, basetype, fileType, parent_id, fname, id, statement, catType, sfid } = getData
  let obj = {
    "parent_id": parent_id,
    "fname": fname,
    "base64": base64,
    "doctype": fileType,
    "catType": catType
  }
  return UserService.post(obj, 'heroku_upload').then(
    async (response) => {
      const getData = response;
      let resObj = response.data;
      console.log("resObj", resObj);
      if (getData && getData.status !== undefined && getData.status === "success") {
        const resData = getData.data ? getData.data : null;
        var formdata = new FormData();
        formdata.append("files", statement);
        formdata.append("user_sfid", sfid);
        const getRes = await UserService.uploadFile(formdata, "bankstatement_upload");
        if (getRes && getRes.status && getRes.status == "Submitted") {
          let fileObj = {
            document_id: resData.DocumentId ? resData.DocumentId : null,
            document_type: doctype,
            doc__type: basetype,
            id: id
          }
          let analiseObj = {
            user_sfid: sfid,
            doc_id: getRes.docId
          }
          //     await UserService.post(fileObj, "upload_document");
          const ansData = await UserService.post(analiseObj, "bank_statent_upload");
          console.log(ansData);
          if (ansData && ansData.status == "success") {
            const downData = ansData.data;
            resObj.file_status = downData.isvalid;
            resObj.doc_message = downData.message;
            resObj.limit = downData.limit;
          }
        }
      }
      dispatch({
        type: LOADING_FAILD,
      });
      return resObj;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const bankProofUpload = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  const { base64, doctype, basetype, fileType, parent_id, fname, id } = getData
  let obj = {
    "parent_id": parent_id,
    "fname": fname,
    "base64": base64,
    "doctype": fileType,
    "catType": doctype == "Bank Statement" ? "Income Proof" : "Bank Account Proof"
  }
  return UserService.post(obj, 'heroku_upload').then(
    async (response) => {
      const getData = response;
      let resObj = response.data;
      console.log("resObj", resObj);
      if (getData && getData.status !== undefined && getData.status === "success") {
        const resData = getData.data ? getData.data : null;
        let fileObj = {
          document_id: resData.DocumentId ? resData.DocumentId : null,
          document_type: doctype,
          doc__type: basetype,
          id: id
        }
        //   await UserService.post(fileObj, "upload_document");
      }
      dispatch({
        type: LOADING_FAILD,
      });
      return resObj;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const sendLink = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'send_link').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const fraudCheck = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata, 'fraud_check').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateAccount = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  // return UserService.post(getData, 'update_lead_account').then(
  return UserService.post(getData, 'update_account').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateLoan = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(getData, 'loan_update').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return Promise.reject();
    }
  );
};

export const dropLead = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(getData, 'merchant_lead_update').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return Promise.reject();
    }
  );
};

export const getLeadProfile = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'get_lead_profile').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.status === "success") {
        dispatch({
          type: LEAD_PROFILE_SUCCESS,
          payload: response.data
        })
      } else {
        dispatch({
          type: LEAD_PROFILE_FAILD
        })
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: LEAD_PROFILE_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  );
};

export const raiseLeadQuery = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'help_support_request').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

export const getProducts = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get('get_products').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_PRODUCTS_FAILD,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_PRODUCTS_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};




export const update_user_details = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'manage_merchant_users').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const registerNewUser = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return UserService.post(givendata, 'manage_merchant_users').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getUsers_list = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`manage_merchant_users?owner=${getData}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_USERS_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_USERS_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getUser_data = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`manage_merchant_users?id=${getData}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: USER_DATA_FAILD,
        });
      } else {
        dispatch({
          type: USER_DATA_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: USER_DATA_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};




export const getUsers = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'get_merchant_users').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_USERS_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_USERS_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getMerchantProducts = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, getData.page && getData.limit ? `get_merchant_products?page=${getData.page}&limit=${getData.limit}` : 'get_merchant_products').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_PRODUCTS_FAILD,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_PRODUCTS_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const getMerchantProductsByStatus = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, getData.page && getData.limit ? `get_merchant_product_by_status?page=${getData.page}&limit=${getData.limit}` : 'get_merchant_product_by_status').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_PRODUCTS_FAILD,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_PRODUCTS_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};
export const merchentProductStatusUpdate = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_product_status_update').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: PRODUCTS_STATUS_UPDATE_FAILD,
        });
      } else {
        dispatch({
          type: PRODUCTS_STATUS_UPDATE_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_PRODUCTS_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const updateProductStatus = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'product_status_update').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

// stock  part ..

export const updateProductStatusStock = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_product_stock?merchant_id=${getData.merchant_id}&status=${getData.status}&page=${getData.page}&limit=${getData.limit}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

export const updateProductStatusOffer = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_product_offer_list').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};






export const getMerchantProductList = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'get_merchant_product_list').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: MERCHANT_PRODUCTS_FAILD,
        });
      } else {
        dispatch({
          type: MERCHANT_PRODUCTS_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: MERCHANT_PRODUCTS_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const getCategory = (givendata) => (dispatch) => {
  return UserService.post(givendata,'getCategory').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_CATEGORY_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_CATEGORY_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_CATEGORY_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAllSubCategory = (givendata, selectedCatName) => (dispatch) => {
  //return UserService.post(givendata,'get_all_subcategory').then(
  return UserService.post(givendata, 'getCategory').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_SUBCATEGORY_FAILD,
          payload: response.message,
        });
      } else {
        console.log(response);
        let addedParent = response.map(item => ({ ...item, parentCategory: selectedCatName }))
        console.log(addedParent);
        dispatch({
          type: GET_SUBCATEGORY_SUCCESS,
          payload: addedParent
        });

        return response;
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_SUBCATEGORY_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const clearAllSubcategory = () => (dispatch) => {
  dispatch({
    type: GET_SUBCATEGORY_FAILD
  });
};

export const getSubCategory = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'get_related_category').then(
    (response) => {
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_SUBCATEGORY_FAILD,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_SUBCATEGORY_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_SUBCATEGORY_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createProduct = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'create_product').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.status === "error") {
        dispatch({
          type: PRODUCT_CREATE_FAILD,
        });
      } else {
        dispatch({
          type: PRODUCT_CREATE_SUCCESS,
          payload: response.message
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: PRODUCT_CREATE_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const addRole = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'create_role').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: ADD_ROLE_FAILD,
        });
      } else {
        dispatch({
          type: ADD_ROLE_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: ADD_ROLE_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const getRole = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'get_roles').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_ROLE_FAILD,
        });
      } else {
        dispatch({
          type: GET_ROLE_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_ROLE_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const getRoleData = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'get_role_by_id').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: ROLE_DATA_FAILD,
        });
      } else {
        dispatch({
          type: ROLE_DATA_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: ROLE_DATA_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const getUserData = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'get_merchantuser_by_id').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: USER_DATA_FAILD,
        });
      } else {
        dispatch({
          type: USER_DATA_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: USER_DATA_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
};

export const getUserBankList = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'user_bank_list').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: "GET_MERCHANT_BANKS",
        payload : response.data        
      })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const getProfileData = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'account_profile').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const getAllNotificationsNew = (given_merchant_sfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_notification?merchant_sfid=${given_merchant_sfid}&notification_type=New`).then(
    (response) => {
      if (response.status == "success") {
        dispatch({
          type: ALL_NOTIFICATIONS_NEW,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log('error', error)
      return Promise.reject();
    }

  );

};

export const getAllNotificationsOld = (given_merchant_sfid) => (dispatch) => {
  return UserService.get(`merchant_notification?merchant_sfid=${given_merchant_sfid}&notification_type=Old`).then(
    (response) => {
      if (response.status == "success") {
        dispatch({
          type: ALL_NOTIFICATIONS_OLD,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log('error', error)
      return Promise.reject();
    }

  );

};


export const getFAQ = () => (dispatch) => {
  return UserService.get('merchant_help_support_faq').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_FAQ_QUESTIONS_FAILD,
        });
      } else {
        dispatch({
          type: GET_FAQ_QUESTIONS_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_FAQ_QUESTIONS_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}

export const setActiveSettlement = (givenTab) => (dispatch) => {
  dispatch({
    type: ACTIVE_SETTLEMENT,
    payload: givenTab
  });

};
export const CustomerSendHelpRequest = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_send_help_request').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};


export const getLeadFunnelData = (selectValue, rfid) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_dashboard_lead_funnel?merchant_sfid=${rfid}&filter_period=${selectValue}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_LEAD_FUNNEL_DATA_FAILD,
        });
      } else {
        dispatch({
          type: GET_LEAD_FUNNEL_DATA_SUCCESS,
          payload: response.rowData,
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_LEAD_FUNNEL_DATA_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}

export const getReportData = (URLIS) => (dispatch) => {
  // let newUrl = new URL(URLIS)
  // console.log(newUrl)
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(`merchant_report?${URLIS}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_REPORT_FAILED,
          payload: response.message,
        });
      } else {
        dispatch({
          type: GET_REPORT_SUCCESS,
          payload: response
        });
      }
      // return Promise.resolve();
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_REPORT_FAILED,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteBank = (deleteData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.delete(`delete_bank_account?bank_sfid=${deleteData}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      console.log(response, '<<<<<<<<<')
      return response;
    },
    (error) => {
      console.log(error.response, '<<<><><><')
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};
export const getAllNotifications = (given_sfid) => (dispatch) => {
  return UserService.get(`merchant_all_notification?merchant_sfid=${given_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.status == "success") {
        dispatch({
          type: ALL_NOTIFICATIONS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log('error', error)
      return Promise.reject();
    }

  );
};

export const getSalesInsightGraphData = (sfid, range) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_dashboard_sales_chart?merchant_sfid=${sfid}&date_range=${range}`).then(

    (response) => {

      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        dispatch({
          type: GET_SALES_INSIGHT_GRAPH_DATA_FAILD,
        });
      } else {
        dispatch({
          type: GET_SALES_INSIGHT_GRAPH_DATA_SECCESS,
          payload: response,
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      dispatch({
        type: GET_SALES_INSIGHT_GRAPH_DATA_FAILD
      })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}

export const getTopProductGraphData = (sfid, range, prodCat) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_dashboard_top_products?merchant_sfid=${sfid}&date_range=${range}&category=${prodCat}`).then(
    // return  UserService.get(`merchant_dashboard_top_products?merchant_sfid=00171000008GurGAAS&date_range=Custom&start_date=2021-01-01&end_date=2022-08-07`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      console.log('error', error)
      return Promise.reject();
    }

  );
};

export const getCustInsighGraphData = (sfid, range) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.get(`merchant_dashboard_customer_insight?merchant_sfid=${sfid}&date_range=${range}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      console.log('error', error)
      return Promise.reject();
    }

  );
};

export const getBankDetailsOfUser = (bank_sfid) => (dispatch) => {
  console.log(bank_sfid);
  return UserService.get(`edit_bank_account?bank_sfid=${bank_sfid}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      console.log('error', error)
      return Promise.reject();
    }
  );
}



export const getfilterLeadData = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_lead_filter').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response.status == "success") {
        dispatch({
          type: GET_LEADS_SUCCESS,
          payload: response
        });
      }
    })
}

export const getSingleProductData = (bodyD) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(bodyD, `merchant_product_details`).then(

    (response) => {

      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
      } else {
        dispatch({
          type: GET_PRODUCT_UN_DATA,
          payload: response,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject();
    }
  );
}



export const getProductFilterData = (given_data) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(given_data, `merchant_product_filter`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.status == "success") {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};


export const getUpdateUserData = (obj) => (dispatch) => {
  if (Object.keys(obj).length === 0) {
    dispatch({
      type: GET_USER__DATA_TO_UPDATE_FAILD,
    });
  } else {
    dispatch({
      type: GET_USER__DATA_TO_UPDATE_SECCESS,
      payload: obj,
    });
  }
  return obj;
}

export const merchentProductSellingPriceUpdate = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_selling_price_update').then(
    (response) => {
      //console.log(response);
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        return response;
      } else {
        return response;
      }
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });

    })
}

export const merchantSettlementCancellationStatusUpdate = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(getData, 'merchant_settlement_cancellation_status_update').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const selectedCancelationId = (ele) => (dispatch) => {
  dispatch({
    type: MerchantSettlementCancelId,
    payload: ele,
  });
}

export const merchantProductDownload = (given_data) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(given_data, `merchant_product_download`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const updateBankUserStatus = (given_data) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(given_data, `bank_account_status_update`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const getFilterMaster = (merchant_id , filter_type) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  
  return UserService.get(`merchant_product_filter?merchant_id=${merchant_id}&type=${filter_type}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );

}

export const merchantSettlementDetail = (id) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  dispatch({ type: "ORDER_SUMMARY_EMPTY", payload: {} });
  return UserService.get(`merchant_settlement_details?opportunity_sfid=${id}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      if (response.status == "success") {
        dispatch({
          type: ORDER_SUMMARY,
          payload: response.data,
        });
      }
      else {
        return false
      }
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );

}

export const LeadsGetEmailGroup = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(getData, 'merchant_email_group').then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};


export const LeadsAddEmailGroup = (given_data) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS });
  return UserService.post(given_data, `add_email_group`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });
      return Promise.reject();
    }
  );
};

export const setLeadTab = (givenData) => (dispatch) => {
  dispatch({
    type: LEAD_DATA_LIST,
    payload: givenData,
  })
}

export const getRecipientList = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'email_recipients').then(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject();
    }
  );
};

export const groupEmailSearch = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'group_email_search').then(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject();
    }
  );
};

export const addEmailRecipient = (givendata) => (dispatch) => {
  return UserService.post(givendata, 'email_recipients ').then(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject();
    }
  );
};


export const bulkUploadRequest = (given_data) => (dispatch) => {
  let upload_data = { 'product': given_data }
  return UserService.post(upload_data, `merchant_product_bulk_upload`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      dispatch({ type: BULK_UPDATE, payload: response });
      return response
    },
    (error) => {
      dispatch({ type: BULK_UPDATE, payload: null });
      dispatch({ type: LOADING_FAILD });
      return false
    }
  );
};


export const bulkUpdateRequest = (given_data) => (dispatch) => {
  let upload_data = { 'product': given_data }
  return UserService.post(upload_data, `merchant_product_bulk_update`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      dispatch({ type: BULK_UPDATE, payload: response });
      return response
    },
    (error) => {
      dispatch({ type: BULK_UPDATE, payload: null });
      dispatch({ type: LOADING_FAILD });
      return false
    }
  );
};

export const bulkCreateLeadRequest = (given_data) => (dispatch) => {
  let upload_data = { 'lead': given_data }
  console.log('upload data', upload_data)
  return UserService.post(upload_data, `merchant_bulk_lead_create`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      // dispatch({ type: BULK_UPDATE,payload:response });
      return response
    },
    (error) => {
      dispatch({ type: BULK_UPDATE, payload: null });
      // dispatch({ type: LOADING_FAILD });
      return false
    }
  );
};

export const setShowSearched = (given_data) => (dispatch) => {
  dispatch({ type: SHOW_SEARCHED, payload: given_data });

};

export const emptyserachList = () =>  (dispatch) => {
  dispatch({ type: "EMPTY_SEARCH_DATA" });

};

export const setSettlementclickItemId = (id) => (dispatch) => {
  dispatch({ type: 'SET_SETTLEMENT_OPPID', payload: id });

};

export const setProductTab = (given_tab) => (dispatch) => {
  dispatch({ type: ACTIVE_PRODUCT_TAB, payload: given_tab });

};


export const merchentProductUpdate = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_selling_price_update').then(
    (response) => {
      //console.log(response);
      dispatch({ type: LOADING_FAILD })
      if (response.responseCode !== undefined && response.responseCode === 400) {
        return response;
      } else {
        return response;
      }
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });

    })
}

export const updateLoadingProductData = (getData) => (dispatch) => {

  dispatch({ type: LOAD_PRODUCT_DATA, payload: getData });

}

export const addingEmailRecipient= (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'add_email_recipient').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response && response.status=='success') {
        return response;
      } else {
        return response;
      }
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });

    })
}


export const sendleadEmailReport= (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'merchant_lead_send').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response && response.status=='success') {
        
        return response;

      } else {
        dispatch({ type: LOADING_FAILD });
        return response;

      }
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });

    })
}

export const getEmailsGroup= (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'lender_group_list').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      if (response && response.status=='success') {
        
        dispatch({ type: EMAILS_GROUP_LIST ,payload:response.data })
        return response;

      } else {
        dispatch({ type: EMAILS_GROUP_LIST ,payload:[] })
        dispatch({ type: LOADING_FAILD });
        return response;

      }
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });

    })
}

export const sendEmailReport = (URLIS) => (dispatch) => {
  // let newUrl = new URL(URLIS)
  // console.log(newUrl)
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(`merchant_report_send?${URLIS}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      
      return response;
    },
    (error) => {
      
      dispatch({ type: LOADING_FAILD });

      return Promise.reject();
    }
  );
};

export const sendEmailReportConfigure = (URLIS) => (dispatch) => {
  // let newUrl = new URL(URLIS)
  // console.log(newUrl)
  dispatch({ type: LOADING_SUCCESS });
  return UserService.get(`merchant_report_email_send?${URLIS}`).then(
    (response) => {
      dispatch({ type: LOADING_FAILD });
      
      return response;
    },
    (error) => {
      
      dispatch({ type: LOADING_FAILD });

      return Promise.reject();
    }
  );
};
export const sendAgreementSms = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  console.log("APi call 1")
  return UserService.post(getData, 'send_agreement_sms').then(
    
    (response) => {
      console.log("Api call 2")
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

export const downloadNach= (givenData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(givenData,'get_physical_form').then(
    (response) => {
      dispatch({ type: LOADING_FAILD })
      console.log('resp physical',response)
      return response
    },
    (error) => {
      dispatch({ type: LOADING_FAILD });

    })


}
export const getStage = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'account_profile').then(
    
    (response) => {
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );
};

export const getDocData = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'getDocumentByType').then(
    
    (response) => {
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );  
}

export const verifyDoc = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'doc_status_verification').then(
    
    (response) => {
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );  
}

export const enachPay = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS })
  return UserService.post(getData, 'enash_payment').then(
    
    (response) => {
      dispatch({ type: LOADING_FAILD })
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD })
      return Promise.reject();
    }
  );  
}

