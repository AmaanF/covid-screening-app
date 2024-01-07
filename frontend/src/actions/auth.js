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
      const message = "Registration Successfull!";
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Registration Failed";
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

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

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Email or password incorrect";

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const verifyAccount = (username, code) => (dispatch) => {
  return AuthService.verifyAccount(username, code).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Account verified successfully',
      });

      return Promise.resolve();
    },
    (error) => {
   
      dispatch({
        type: SET_MESSAGE,
        payload: 'Account verified Failed',
      });

      return Promise.reject();
    }
  );
};

export const forgotPassword = (username) => (dispatch) => {
  return AuthService.forgotPassword(username).then(
    (data) => {
      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: SET_MESSAGE,
        payload: 'Check your inbox for varification code.',
      });

      return Promise.reject();
    }
  );
};

export const confirmPassword = (username, password, code) => (dispatch) => {
  return AuthService.confirmPassword(username, password, code).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Password reset successfull',
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Failed to reset password',
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
