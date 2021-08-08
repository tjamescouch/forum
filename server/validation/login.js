const Validator = require('validator');


function validateLoginData(inputData) {
  let errors = {};

  let data = {
    email: inputData.email || '',
    password: inputData.password || '',
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "Email is a required field";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password is a required field";
  }


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}

module.exports = validateLoginData;
