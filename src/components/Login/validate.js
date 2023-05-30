export default function validateInputs(inputs) {
  let errors = {};

  // console.log(inputs, "inputs validate funcion");

  if (inputs.email || inputs.password) {
    if (
      (inputs.email.length > 0 && !/\S+@\S+\.\S+/.test(inputs.email)) ||
      inputs.email.length >= 35
    )
      errors.email = "Must be a email";
    if (
      inputs.password.length > 0 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        inputs.password
      )
    )
      errors.password =
        "Must be more than 6 characters with 1 uppercase character 1 lowercase character and 1 special character";
  }

  if (inputs.firstName ||inputs.lastName ||inputs.phoneNumber || inputs.emailUser ||inputs.emailConfirm ||inputs.passwordUser ||inputs.passwordConfirm) {
    if (inputs.firstName.length > 0 && !/^[A-Za-z\s]+$/.test(inputs.firstName)) errors.firstName = "The field must not contain foreign characters";
    if (inputs.lastName.length > 0 && !/^[A-Za-z\s]+$/.test(inputs.lastName))errors.lastName = "The field must not contain foreign characters";
    if (inputs.phoneNumber.length > 0 && /^(?!-?\d*$)[A-Za-z\d-]+$/.test(inputs.phoneNumber)) errors.phoneNumber = "The field must not contain foreign number";

    if ((inputs.emailUser.length > 0 && !/\S+@\S+\.\S+/.test(inputs.emailUser)) || inputs.emailUser.length >= 35) errors.emailUser = "Must be a email";
    if ((inputs.emailConfirm.length > 0 && !/\S+@\S+\.\S+/.test(inputs.emailConfirm)) ||inputs.emailConfirm.length >= 35)
      errors.emailConfirm = "Must be a email";

    if (inputs.emailUser || inputs.emailConfirm) {
      if (inputs.emailUser !== inputs.emailConfirm)
        errors.emailConfirm = "Email cannot be different";
    }

    if (inputs.passwordUser.length > 0 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputs.passwordUser)) errors.passwordUser = "Must be more than 6 characters with 1 uppercase character 1 lowercase character and 1 special character";
    if ( inputs.passwordUser.length > 0 && inputs.passwordUser !== inputs.passwordConfirm)errors.passwordConfirm = "Passwords cannot be different";
  }

  return errors;
}
