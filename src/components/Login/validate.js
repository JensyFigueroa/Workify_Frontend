export default function validateInputs(inputs) {
    let errors = {}

    if (inputs.email.length > 0 && !/\S+@\S+\.\S+/.test(inputs.email) || inputs.email.length >= 35) errors.email = 'Must be a email';
    // if (inputs.password.length >0  && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z]{6,10}$/.test(inputs.password)) errors.password = 'Must be more than 6 characters with 1 uppercase character 1 lowercase character and 1 special character'
    if (inputs.password.length >0  && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputs.password)) errors.password = 'Must be more than 6 characters with 1 uppercase character 1 lowercase character and 1 special character'
   /*  It must contain at least 8 characters.
    Must contain at least one lowercase letter.
    Must contain at least one capital letter.
    Must contain at least one digit.
    Must contain at least one of the following special characters: @$!%*?&. */
    return errors
}

