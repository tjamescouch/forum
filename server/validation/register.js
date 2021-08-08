const Validator = require('validator');


function validateRegistrationData(inputData) {
  let errors = {};

  let data = {
    name: inputData.name || '',
    email: inputData.email || '',
    password: inputData.password || '',
    password2: inputData.password2 || '',
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = "Name is a required field";
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "Email is a required field";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password is a required field";
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is a required field";
  }

  if(!Validator.isLength(data.password, {min: 7, max: 30})) {
    errors.password = "Password must be at least 7 characters";
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password = "Password must be equal";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}

module.exports = validateRegistrationData;
