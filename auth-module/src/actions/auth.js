import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import AuthService from "../services/auth.service";
  
  export const register = (name, email, password) => (dispatch) => {
    return AuthService.register(name, email, password).then(
      (response) => {
        console.log("inner respose", response)
        if (response.statusCode === 200) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: { user: response.data }
          });
    
          return Promise.resolve();
        }
        else {
          console.log("inner error", response)
          const message = response.message || "Something went wrong!"
  
          dispatch({
            type: REGISTER_FAIL,
          });
  
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
  
          return Promise.reject();
        }
      }
    );
  };
    

  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (response => {
        if (response.statusCode === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: response.data },
          });
    
          return Promise.resolve();
        }
        else {
        const message = response.message || "Something went wrong!"
          dispatch({
            type: LOGIN_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
        }
      })
    )
  };
  
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
  