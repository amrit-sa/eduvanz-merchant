import {
  SALESFORCE_LOGIN_SUCCESS,
  SALESFORCE_LOGIN_FAILD,
  MERCHANT_LOGIN_SUCCESS,
  MERCHANT_LOGIN_FAILD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILD,
  PROFILE_UPDATE_FAILD,
  PROFILE_UPDATE_SUCCESS,
  UPDATE_COMPANY_SUCCESS,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILD,
  UPDATE_COMPANY_FAILD,
  CLEAR_USER_MESSAGE,
  CLEAR_AUTH_MESSAGE,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILD,
  REGISTER_SUCCESS,
  LOADING_SUCCESS,
  LOADING_FAILD,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  CLEAR_MESSAGE,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const clearMessage = () => (dispatch) =>{
    dispatch({
      type: CLEAR_MESSAGE,
    });
    dispatch({
      type: CLEAR_USER_MESSAGE,
    });
    dispatch({
      type: CLEAR_AUTH_MESSAGE,
    });
}

export const salesForceLogin = (getData) => (dispatch) => {
  return AuthService.post(getData, 'salesforce_auth').then(
    (response) => {
      if(response.status ==="success")
      {
        localStorage.setItem("force_token", response.data.access_token);
        dispatch({
          type: SALESFORCE_LOGIN_SUCCESS,
          payload: response.data.access_token,
        });
      }else{
        dispatch({
          type: SALESFORCE_LOGIN_FAILD
        });
      }

      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SALESFORCE_LOGIN_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const register = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return AuthService.register(givendata).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      let getData = response.data;
      if(getData.responseCode !== undefined && getData.responseCode === 200)
      {
        localStorage.setItem('log', getData.id);
        let data = {
            isNew : getData.isNewUser,
            log_id: getData.id,
            type: getData.verificationType,
            message: getData.message,
            onBording: getData.onBoard
        }
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data
        });

        dispatch({
          type: SET_MESSAGE,
          payload: getData.message.toString(),
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
          type: LOADING_FAILD
        });

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

      return Promise.reject();
    }
  );
};

export const resendOtp = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return AuthService.post(getData, 'resendlogin_otp').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
     if(data.status ==='success')
     {
        let payload = {
          verificationType: data.verificationType,
          message: data.message,
          id: data.id,
          onBoard: data.onBoard
        }
        dispatch({
          type: RESEND_OTP_SUCCESS,
          payload: payload,
        });
     }else{
        dispatch({
          type: SET_MESSAGE,
          payload: data.message,
        });
     }
      return data.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        dispatch({
          type: LOADING_FAILD,
        });

      dispatch({
        type: RESEND_OTP_FAILD,
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

export const merchantLogin = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return AuthService.post(getData, 'merchant_login').then(
    (data) => {
      console.log('merchant_login', data);
      dispatch({
        type: LOADING_FAILD,
      });
      let user = {
        mobile: data.mobile,
        fname: data.first_name,
        lname: data.last_name,
        email: data.email
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem('user_id', data.id);
      localStorage.setItem('token', data.token);
      localStorage.setItem('sfid', data.sfid);
      let payload = {
        token: data.token,
        message: data.message,
        id: data.id,
        sfid: data.sfid,
        onBoard: data.onBoard,
        user: user
      }
      dispatch({
        type: MERCHANT_LOGIN_SUCCESS,
        payload: payload,
      });

      return data.onBoard;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        dispatch({
          type: LOADING_FAILD,
        });
      dispatch({
        type: MERCHANT_LOGIN_FAILD,
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

export const login = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return AuthService.login(getData).then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      localStorage.setItem('log', data.id);
      let payload = {
        verificationType: data.verificationType,
        message: data.message,
        id: data.id,
        onBoard: data.onBoard
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: payload,
      });

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
          type: LOADING_FAILD,
        });

      dispatch({
        type: LOGIN_FAIL,
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

export const verifyOtp = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'verify_merchant_otp').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.status === 'success')
      {
        let user = {
          fname: data.data.first_name__c,
          lname: data.data.last_name__c,
          email: data.data.email_c
        }
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('sfid', data.sfid);
        let res = {
            message: data.message,
            id: data.id,
            sfid: data.sfid,
            token: data.token
        }
        dispatch({
          type: VERIFY_OTP_SUCCESS,
          payload: res,
        });
       
      }else{
        dispatch({
          type: VERIFY_OTP_FAILD,
          payload: data.message,
        });
      }
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

      dispatch({
        type: VERIFY_OTP_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updateProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return AuthService.post(getData, 'account_basic').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
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
        type: PROFILE_UPDATE_FAILD,
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

export const updateCompnay = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'update_company').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.responseCode ===500 )
      {
        dispatch({
          type: UPDATE_COMPANY_FAILD,
          payload: data.message,
        });
      }else{
        dispatch({
          type: UPDATE_COMPANY_SUCCESS,
          payload: data.message,
        });
      }
      return Promise.resolve();
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

      dispatch({
        type: UPDATE_COMPANY_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const changePassword = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'create_password').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.responseCode ===500 )
      {
        dispatch({
          type: CHANGE_PASSWORD_FAILD,
          payload: data.message,
        });
      }else{
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: data.message,
        });
      }
      return Promise.resolve();
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

      dispatch({
        type: CHANGE_PASSWORD_FAILD,
        payload: message,
      });
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
