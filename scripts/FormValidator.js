class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError() {
    const errorElement = this._formElement.querySelector(
      `#${this._input.id}-error`
    );

    this._input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = this._input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(
      `#${this._input.id}-error`
    );

    this._input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity() {
    if (!this._input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(
        this._config.inactiveButtonClass
      );

      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(
        this._config.inactiveButtonClass
      );

      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._input = input;

        this._checkInputValidity();
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._input = input;
      this._hideInputError();
    });

    this._toggleButtonState();
  }

  setEventListeners() {
    this._setEventListeners();
  }
}

export default FormValidator;