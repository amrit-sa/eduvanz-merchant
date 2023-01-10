import {
  UPDATE_BANK_SUCCESS,
  UPDATE_BANK_FAILD,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILD,
  GET_SETTLEMENT_SUCCESS,
  GET_SETTLEMENT_FAILD,
  GET_SETTLEMENT_SUMMARY_SUCCESS,
  GET_SETTLEMENT_SUMMARY_FAILD,
  GET_DASHBOARD_FAILD,
  GET_DASHBOARD_SUCCESS,
  GET_BANK_SUCCESS,
  GET_BANK_FAILD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILD,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILD,
  CLEAR_USER_MESSAGE,
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
  GET_BRAND_FAILD,
  GET_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_FAILD,
  PRODUCTS_STATUS_UPDATE_FAILD,
  PRODUCTS_STATUS_UPDATE_SUCCESS,
  GET_FAQ_QUESTIONS_SUCCESS,
  GET_FAQ_QUESTIONS_FAILD,
  SEND_SETTLEMENT_DATA,
  GET_LEAD_FUNNEL_DATA_SUCCESS,
  GET_LEAD_FUNNEL_DATA_FAILD,

  // GET_REFUNDCANCLE_FAILED,
  // GET_REFUNDCANCLE_SUCCESS,
  ALL_NOTIFICATIONS_NEW,
  ALL_NOTIFICATIONS_OLD,
  ACTIVE_SETTLEMENT,
  GET_REPORT_FAILED,
  GET_REPORT_SUCCESS,
  ALL_NOTIFICATIONS,
  GET_SALES_INSIGHT_GRAPH_DATA_SECCESS,
  GET_SALES_INSIGHT_GRAPH_DATA_FAILD,
  GET_USER__DATA_TO_UPDATE_SECCESS,
  GET_USER__DATA_TO_UPDATE_FAILD,
  GET_PRODUCT_UN_DATA,
  ORDER_SUMMARY,
  ORDER_SUMMARY_EMPTY,
  LEAD_DATA_LIST,
  BULK_UPDATE,
  BULK_LEAD_CREATE,
  SHOW_SEARCHED,
  ACTIVE_PRODUCT_TAB,
  LOAD_PRODUCT_DATA,
  EMAILS_GROUP_LIST
} from "../actions/types";

let L_id = localStorage.getItem("L_id");
let lead_id = localStorage.getItem("lead_id");
let role_id = localStorage.getItem("roleid");
let usersid = localStorage.getItem("usersid");
const opp_id = localStorage.getItem("opp_id");

const initialState = {
  leads: [],
  leadsCount: 0,
  lead_profile: {},
  lead_limit: 0,
  userMessage: '',
  isSuccess: 0,
  banks: [],
  L_id: L_id ? parseInt(L_id) : null,
  lead_id: lead_id ? parseInt(lead_id) : null,
  opp_id: opp_id ? opp_id : 0,
  roleid: role_id ? parseInt(role_id) : null,
  usersid: usersid ? parseInt(usersid) : null,
  leadProfileImg: '',
  leadPanImg: '',
  otherFrontImg: '',
  otherBackImg: '',
  selectedTab: '',
  pdfString: '',
  products: [],
  mproducts: [],
  category: [],
  sub_cat: [],
  entity: [],
  entitySearch: false,
  users: [],
  roles: [],
  singleUser: [],
  lead_name: null,
  brands: [],
  allNotificationsNew: {},
  allNotificationsOld: {},
  FAQ_question: [],
  dashboardData: {},
  activeSettlement: "settlementDisbursed",
  settlementData: {},
  settlementDataDue: {},
  settlementDataRefund: {},
  ProductAlldata: {},
  reportData: [],
  leadFunnelData: {},
  allNotificationsData: [],
  salesInsightGraphData: [],
  BankDetailsUpdateUser: {},
  summaryDetails: {},
  singleProduct: null,
  globalSearch: [],
  globalseraching: false,
  MerchantCancelId: "",
  orderSummary: {},
  leadTab: "Pre Approval",
  bulk_update_data: null,
  bulk_lead_create: null,
  show_searched: false,
  seettlemt_opp_id: '',
  merchant_banks: [],
  activeProductTab: "all",
  load_product_data: false,
  emails_group_list: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log("Payload", type, payload);
  switch (type) {
    case "GET_MERCHANT_BANKS":
      return {
        ...state,
        merchant_banks: payload
      };
    case "ENTITY_SEACH_SUCCESS":
      return {
        ...state,
        entitySearch: true,
      };
    case "ENTITY_SEACH_FAILD":
      return {
        ...state,
        entitySearch: false,
      };
    case "SEARCH_ENTITY_SUCCESS":
      return {
        ...state,
        entity: payload,
        entitySearch: false,
      };
    case "SEARCH_ENTITY_FAILD":
      return {
        ...state,
        entity: [],
        entitySearch: false,
      };
    case "SEND_SETTLEMENT_DATA":
      console.log('settl', payload)
      return {
        ...state,
        settlementData: payload,
      };

    case "SEND_SETTLEMENT_DUE_DATA":
      return {
        ...state,
        settlementDataDue: payload,
      };

    case "SEND_SETTLEMENT_REFUND_DATA":
      return {
        ...state,
        settlementDataRefund: payload,
      };

    case "SEND_PRODUCT_ALL":
      return {
        ...state,
        ProductAlldata: payload,
      };
    case "GET_DASHBOARD_SUCCESS":
      return {
        ...state,
        dashboardData: payload
      };
    case "GET_DASHBOARD_FAILD":
      return {
        ...state,
        dashboardData: payload
      };


    case "GET_GLOBALSEARCH_SUCCESS":
      return {
        ...state,
        globalseraching: true,
        globalSearch: payload
      };

    case "EMPTY_SEARCH_DATA":
      return {
        ...state,
        globalseraching: false,
        globalSearch: []
      };
    case "GET_GLOBALSEARCH_FAILD":
      return {
        ...state,
        globalSearch: payload
      };

    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: payload
      };
    case "GET_PRODUCTS_FAILD":
      return {
        ...state,
        products: []
      };
    case "LEADS_COUNT_SUCCESS":
      return {
        ...state,
        leadsCount: payload
      };
    case "LEAD_PDF_STRING_SUCCESS":
      return {
        ...state,
        pdfString: payload
      };
    case "LEAD_PROFILE_IMG_SUCCESS":
      return {
        ...state,
        leadProfileImg: payload
      };
    case "LEAD_PAN_IMG_SUCCESS":
      return {
        ...state,
        leadPanImg: payload
      };
    case "LEAD_OTHER_FRONT_IMG_SUCCESS":
      return {
        ...state,
        otherFrontImg: payload.content,
        selectedTab: payload.type
      };
    case "LEAD_OTHER_BACK_IMG_SUCCESS":
      return {
        ...state,
        otherBackImg: payload.content
      };
    case "LEAD_PROFILE_SUCCESS":
      return {
        ...state,
        lead_limit: payload.ipa_basic_bureau__c ? payload.ipa_basic_bureau__c : 0,
        lead_profile: payload,
        lead_name: payload.first_name__c ? payload.first_name__c : null,
      };
    case "LEAD_PROFILE_FAILD":
      return {
        ...state,
        lead_limit: 0,
        lead_profile: {}
      };
    case "UPDATE_OPP_ID":
      return {
        ...state,
        opp_id: payload
      };
    case "UPDATE_LEAD_ID":
      return {
        ...state,
        lead_id: payload
      };
    case "UPDATE_L_ID":
      return {
        ...state,
        L_id: payload
      };
    case "UPDATE_ROLE_ID":
      return {
        ...state,
        roleid: payload
      };
    case "UPDATE_USERS_ID":
      return {
        ...state,
        usersid: payload
      };
    case CLEAR_USER_MESSAGE:
      return {
        ...state,
        userMessage: '',
        isSuccess: 0
      };
    case UPDATE_BANK_SUCCESS:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 1
      };

    case UPDATE_BANK_FAILD:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 0
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 1
      };

    case UPDATE_PASSWORD_FAILD:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 0
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 1
      };

    case UPDATE_PROFILE_FAILD:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 0
      };
    case GET_LEADS_SUCCESS:
      return {
        ...state,
        leads: payload
      };

    case GET_LEADS_FAILD:
      return {
        ...state,
        userMessage: payload
      };
    // case GET_REFUNDCANCLE_SUCCESS:
    //   return{
    //     ...state,
    //     userMessage: payload
    //   }
    //   case GET_REFUNDCANCLE_FAILED:
    //     return{
    //       ...state,
    //       userMessage: payload
    //     }

    case GET_SETTLEMENT_SUMMARY_SUCCESS:
      return {
        ...state,
        summaryDetails: payload
      };
    case GET_SETTLEMENT_SUMMARY_FAILD:
      return {
        ...state,
        summaryDetails: payload
      };
    case GET_SETTLEMENT_SUCCESS:
      return {
        ...state,
        userMessage: payload
      };
    case GET_SETTLEMENT_FAILD:
      return {
        ...state,
        userMessage: payload
      };

    case GET_BANK_SUCCESS:
      return {
        ...state,
        banks: payload
      };

    case GET_BANK_FAILD:
      return {
        ...state,
        userMessage: payload
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload
      };

    case GET_USERS_FAILD:
      return {
        ...state,
        userMessage: payload
      };
    case MERCHANT_PRODUCTS_SUCCESS:
      return {
        ...state,
        mproducts: payload
      };
    case MERCHANT_PRODUCTS_FAILD:
      return {
        ...state,
        mproducts: []
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: payload
      };
    case GET_CATEGORY_FAILD:
      return {
        ...state,
        category: []
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 1
      };

    case PRODUCT_CREATE_FAILD:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 0
      };
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 1
      };

    case ADD_ROLE_FAILD:
      return {
        ...state,
        userMessage: payload,
        isSuccess: 0
      };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        roles: payload
      };
    case GET_ROLE_FAILD:
      return {
        ...state,
        roles: []
      };
    case ROLE_DATA_SUCCESS:
      return {
        ...state,
        roledata: payload
      };
    case ROLE_DATA_FAILD:
      return {
        ...state,
        roledata: []
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        singleUser: payload
      };
    case USER_DATA_FAILD:
      return {
        ...state,
        singleUser: []
      };
    case GET_BRAND_SUCCESS:
      return {
        ...state,
        brands: payload
      };
    case GET_BRAND_FAILD:
      return {
        ...state,
        brands: []
      };
    case GET_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        ///sub_cat: payload
        sub_cat: [...state.sub_cat, ...payload]
      };
    case GET_SUBCATEGORY_FAILD:
      return {
        ...state,
        sub_cat: []
      };
    case PRODUCTS_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        productStatus: payload
      };
    case PRODUCTS_STATUS_UPDATE_FAILD:
      return {
        ...state,
        productStatus: payload
      };
    case ALL_NOTIFICATIONS_NEW:

      return {
        ...state,
        allNotificationsNew: payload
      };
    case ALL_NOTIFICATIONS_OLD:
      return {
        ...state,
        allNotificationsOld: payload
      };

    case GET_FAQ_QUESTIONS_SUCCESS:
      return {
        ...state,
        FAQ_question: payload
      };
    case ACTIVE_SETTLEMENT:
      console.log('settlepayload', payload)
      return {
        ...state,
        activeSettlement: payload
      };

    case GET_REPORT_SUCCESS:
      return {
        ...state,
        reportData: payload
      }
    case GET_REPORT_FAILED:
      return {
        ...state,
        reportData: []
      }
    case GET_FAQ_QUESTIONS_FAILD:
      return {
        ...state,
        FAQ_question: [],
      };

    case GET_LEAD_FUNNEL_DATA_SUCCESS:
      return {
        ...state,
        leadFunnelData: payload,
      };
    case GET_LEAD_FUNNEL_DATA_FAILD:
      return {
        ...state,
        leadFunnelData: {},
      };
    case ALL_NOTIFICATIONS:
      return {
        ...state,
        allNotificationsData: [payload],
      };

    case GET_SALES_INSIGHT_GRAPH_DATA_SECCESS:
      return {
        ...state,
        salesInsightGraphData: payload,
      };
    case GET_SALES_INSIGHT_GRAPH_DATA_FAILD:
      return {
        ...state,
        salesInsightGraphData: [],
      };
    case GET_USER__DATA_TO_UPDATE_SECCESS:
      return {
        ...state,
        BankDetailsUpdateUser: payload,
      };
    case GET_USER__DATA_TO_UPDATE_FAILD:
      return {
        ...state,
        BankDetailsUpdateUser: {},
      };
    case GET_PRODUCT_UN_DATA:
      return {
        ...state,
        singleProduct: payload
      }
    case 'MerchantSettlementCancelId':
      return {
        ...state,
        MerchantCancelId: payload,
      };
    case ORDER_SUMMARY:
      return {
        ...state,
        orderSummary: payload,
      };
    case ORDER_SUMMARY_EMPTY:
      return {
        ...state,
        orderSummary: payload,
      };

    case LEAD_DATA_LIST:
      return {
        ...state,
        LEAD_DATA_LIST: payload,
      }
    case BULK_UPDATE:
      return {
        ...state,
        bulk_update_data: payload,
      }
    case SHOW_SEARCHED:
      return {
        ...state,
        show_searched: payload,
      }
    case 'SET_SETTLEMENT_OPPID':
      return {
        ...state,
        seettlemt_opp_id: payload,
      }
    case ACTIVE_PRODUCT_TAB:
      return {
        ...state,
        activeProductTab: payload,
      }
    case LOAD_PRODUCT_DATA:
      return {
        ...state,
        load_product_data: payload,
      }
    case EMAILS_GROUP_LIST:
      return {
        ...state,
        emails_group_list: payload,
      }


    default:
      return state;
  }
}
