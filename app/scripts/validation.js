class Validation {
  validators = [];

  addExactLengthValidator(length) {
    const minValidator = (value) => {
      if (!value || `${value}`.length !== length) {
        return `Must contain exactly ${length} characters!`;
      }
    };

    this.validators.push(minValidator);

    return this;
  }

  addRequiredValidator() {
    const requiredValidator = (value) => {
      if (!value) {
        return "This field is required!";
      }
    };

    this.validators.push(requiredValidator);

    return this;
  }

  addEmailValidator() {
    const emailValidator = (value) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(`${value}`.toLowerCase())) {
        return "This is not a proper email!";
      }
    };

    this.validators.push(emailValidator);

    return this;
  }

  addPostalCodeValidator() {
    const postalCodeValidator = (value) => {
      const postalRegex = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;
      if (!postalRegex.test(`${value}`)) {
        return "This is not a proper postal code!";
      }
    };

    this.validators.push(postalCodeValidator);

    return this;
  }

  addPhoneNumberValidator() {
    const phoneNumberValidator = (value) => {
      const phoneNumberRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
      if (!phoneNumberRegex.test(`${value}`)) {
        return "This is not a proper phone number!";
      }
    };

    this.validators.push(phoneNumberValidator);

    return this;
  }

  addCreditCardNumberValidator() {
    const creditCardNumberValidator = (value) => {
      const length = `${value}`.length;
      const simpleRegex = /^[0-9-]*$/;

      if ((length !== 16 && length !== 19) || !simpleRegex.test(`${value}`)) {
        return "This is not a proper credit card number!";
      }
    };

    this.validators.push(creditCardNumberValidator);

    return this;
  }

  validate(value) {
    return this.validators
      .map((validationMethod) => validationMethod(value))
      .filter((value) => value !== undefined);
  }
}
