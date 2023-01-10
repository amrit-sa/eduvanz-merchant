import {
    LOADING_FAILD,
    LOADING_SUCCESS,
  } from "./types";
  
  import UserService from "../services/user.service";


export const GET_SELECTED_PLAN  = "GET_SELECTED_PLAN";
export const GET_PLAN_SUCCESS   = "GET_PLAN_SUCCESS";
export const GET_PLAN_FAILD     = "GET_PLAN_FAILD";
export const GET_ACCOUNT_PRODUCT_SUCCESSS   = "GET_ACCOUNT_PRODUCT_SUCCESSS";
export const GET_ACCOUNT_PRODUCT_FAILD      = "GET_ACCOUNT_PRODUCT_FAILD";
export const GET_PLAN_DETAILS_SUCCESS       = "GET_PLAN_DETAILS_SUCCESS";
export const GET_PLAN_DETAILS_FAILD         = "GET_PLAN_DETAILS_FAILD";

export const selectPlan = (getData) => (dispatch) => {
    localStorage.setItem("plan", getData);
    dispatch({
        type: GET_SELECTED_PLAN,
        payload: getData
    });
}

export const getPlanById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getPlanById').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {
          dispatch({
              type: GET_PLAN_DETAILS_SUCCESS,
              payload: response.data
          })
      }
      
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
          type: GET_PLAN_DETAILS_FAILD
      })
    }
  );
};

export const getUserProduct = (givendata) => (dispatch) => {
    dispatch({
      type: LOADING_SUCCESS
    });
    return UserService.post(givendata,'getAccountProduct').then(
      (response) => {
        dispatch({
          type: LOADING_FAILD
        });
        if(response.status ==="success")
        {
            dispatch({
                type: GET_ACCOUNT_PRODUCT_SUCCESSS,
                payload: response.data
            })
        }
        
        return response;
      },
      (error) => {
        dispatch({
          type: LOADING_FAILD
        });
        dispatch({
            type: GET_ACCOUNT_PRODUCT_FAILD
        })
      }
    );
};

export const getPlans = (givendata) => (dispatch) => {
    dispatch({
      type: LOADING_SUCCESS
    });
    return UserService.post(givendata,'palans').then(
      (response) => {
        dispatch({
          type: LOADING_FAILD
        });
        dispatch({
            type: GET_PLAN_SUCCESS,
            payload: response
        })
        return response;
      },
      (error) => {
        dispatch({
          type: LOADING_FAILD
        });
        dispatch({
            type: GET_PLAN_FAILD
        })
      }
    );
};

