export class FormValidator {
  constructor(settingObj, formElement) {
    this.formSelector = settingObj.formSelector
    this.inputSelector = settingObj.inputSelector
    this.submitButtonSelector = settingObj.submitButtonSelector
    this.inactiveButtonClass = settingObj.inactiveButtonClass
    this.inputErrorClass = settingObj.inputErrorClass
    this.errorClass = settingObj.errorClass
    this.formElement = formElement
    this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector))
    this.buttonElement = this.formElement.querySelector(this.submitButtonSelector)
  }

  resetInputError(element) {
    const formElement = element.closest(this.formSelector)
    if (!!formElement) {
      const errorElementList = formElement.querySelectorAll(`.${this.errorClass}`)
      const inputErrorElementList = formElement.querySelectorAll(`.${this.inputErrorClass}`)
      formElement.reset()
      if (errorElementList.length > 0) {
        errorElementList.forEach((error) => {
          error.classList.remove(this.errorClass)
        })
      }
      if (inputErrorElementList.length > 0) {
        inputErrorElementList.forEach((inputError) => {
          inputError.classList.remove(this.inputErrorClass)
        })
      }
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    if (errorElement) {
      inputElement.classList.add(this.inputErrorClass);
      errorElement.classList.add(this.errorClass)
      errorElement.textContent = errorMessage
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    if (errorElement) {
      inputElement.classList.remove(this.inputErrorClass);
      errorElement.classList.remove(this.errorClass)
      errorElement.textContent = ""
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !(inputElement.validity.valid)
    })
  }

  _toggleBtnState() {
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this.inactiveButtonClass)
      this.buttonElement.setAttribute('disabled', true)
    }
    else {
      this.buttonElement.classList.remove(this.inactiveButtonClass)
      this.buttonElement.removeAttribute('disabled')
    }
  }

  _setEvenListeners() {
    const _this = this;
    this.inputList.forEach(inputElement => {
      inputElement.addEventListener("input", function () {
        _this._checkInputValidity(inputElement)
        _this._toggleBtnState()
      })
    })
    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      // e.stopImmediatePropagation();
    })
  }

  enableValidation() {
    this._setEvenListeners();
    this._toggleBtnState()
  }
}
