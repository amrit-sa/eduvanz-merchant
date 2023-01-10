import {
  SALESFORCE_LOGIN_SUCCESS,
  SALESFORCE_LOGIN_FAILD,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILD,
  MERCHANT_LOGIN_SUCCESS,
  MERCHANT_LOGIN_FAILD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILD,
  PROFILE_UPDATE_FAILD,
  PROFILE_UPDATE_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILD,
  CLEAR_AUTH_MESSAGE,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILD,
  LOADING_SUCCESS,
  LOADING_FAILD,
  REGISTER_SUCCESS,
  UPDATE_USER_SFID,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const userData = localStorage.getItem("user");
const user     = userData?JSON.parse(userData):'';
const sales_force_token = localStorage.getItem("force_token");
const log_id   = localStorage.getItem('log');
const userId  = localStorage.getItem("user_id");
const sfId = localStorage.getItem("sfid");
const token    = localStorage.getItem('token');
const initialState = {
  user: user?user:null,
  user_id: userId?userId:0,
  sfid: sfId?sfId:null,
  token: token?token:'',
  isLoggedIn: user?true:false,
  salesForceToken: sales_force_token?sales_force_token:null,
  isNewUser: false,
  verificationType: '',
  log_id: log_id,
  isLoading: false,
  isSuccess: '',
  authMessage:'',
  nextPage: '',
  onBording: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) { 
    case UPDATE_USER_SFID:
      return {
        ...state,
        sfid: payload,
      };
    case SALESFORCE_LOGIN_SUCCESS:
      return {
        ...state,
        salesForceToken: payload,
      };
    case SALESFORCE_LOGIN_FAILD:
      return {
        ...state,
        salesForceToken: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,  
        isNewUser: payload.isNew,
        verificationType: payload.type,
        log_id: payload.log_id,
        isSuccess: 1,
        nextPage: 'profile_details',
        authMessage: payload.message,
        onBording: payload.onBording
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isSuccess: 0,
      };
    case MERCHANT_LOGIN_SUCCESS:
      return {
          ...state,
          authMessage: payload.message,
          user_id: payload.id,
          token: payload.token,
          sfid: payload.sfid,
          onBording:payload.onBoard,
          isSuccess: 1,
          isLoading: false,
          user: payload.user
        };
    case MERCHANT_LOGIN_FAILD:
        return {
          ...state,
          authMessage: payload,
          isSuccess: 0,
          isLoading: false,
        };
    case VERIFY_OTP_SUCCESS:
      return {
          ...state,
          authMessage: payload.message,
          user_id: payload.id,
          token: payload.token,
          sfid: payload.sfid,
          isSuccess: 1,
          isLoading: false,
        };
    case VERIFY_OTP_FAILD:
        return {
          ...state,
          authMessage: payload,
          isSuccess: 0,
          isLoading: false,
        };
    case CHANGE_PASSWORD_SUCCESS:
      return {
          ...state,
          authMessage: payload,
          isSuccess: 1,
          isLoading: false,
        };
    case CHANGE_PASSWORD_FAILD:
        return {
          ...state,
          authMessage: payload,
          isSuccess: 0,
          isLoading: false,
        };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        authMessage: payload,
        isSuccess: 1,
        isLoading: false,
      };
    case UPDATE_COMPANY_FAILD:
      return {
            ...state,
            authMessage: payload,
            isSuccess: 0,
            isLoading: false,
          };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        isSuccess: 1,
        verificationType: payload.verificationType,
        log_id: payload.id,
        authMessage: payload.message,
        onBording: payload.onBoard
      };
    case RESEND_OTP_FAILD:
      return {
        ...state,
        authMessage: payload,
        isSuccess: 0,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSuccess: 1,
        verificationType: payload.verificationType,
        log_id: payload.id,
        nextPage: 'home',
        authMessage: payload.message,
        onBording: payload.onBoard
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authMessage: payload,
        isSuccess: 0,
        isLoading: false,
      };
    case LOADING_SUCCESS:
      return {
            ...state,
            isSuccess: '',
            isLoading: true,
          };
    case LOADING_FAILD:
       return {
            ...state,
            isLoading: false,
          };
    case CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        isSuccess: '',
        authMessage:'',
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
