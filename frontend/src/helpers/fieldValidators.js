import React from "react";
import { isEmail } from "validator";

export const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  export const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  export const vcode = (value) => {
    if (value.length !== 6) {
      return (
        <div className="alert alert-danger" role="alert">
          The code must be of 6 characters.
        </div>
      );
    }
  };

  export const vpassword = (value) => {
    var re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if (value.length < 8 || value.length > 15) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 8 and 15 characters.
        </div>
      );
    }
    else if(!re.test(value)){
      return (
        <div className="alert alert-danger" role="alert">
          Minimum eight characters, at least one uppercase, one lowercase, one number and one special character
        </div>
      );
    }
  };
  export const vname = (value) => {
    if (value.length < 3 || value.length > 25) {
      return (
        <div className="alert alert-danger" role="alert">
          The name must be between 3 and 25 characters.
        </div>
      );
    }
  };