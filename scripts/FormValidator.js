export const resetInputError = (element) => {
  const formElement = element.closest(validationConfig.formSelector)
  if (!!formElement) {
    const errorElementList = formElement.querySelectorAll(`.${validationConfig.errorClass}`)
    const inputErrorElementList = formElement.querySelectorAll(`.${validationConfig.inputErrorClass}`)
    formElement.reset()
    if (errorElementList.length > 0) {
      errorElementList.forEach((error) => {
        error.classList.remove(validationConfig.errorClass)
      })
    }
    if (inputErrorElementList.length > 0) {
      inputErrorElementList.forEach((inputError) => {
        inputError.classList.remove(validationConfig.inputErrorClass)
      })
    }
  }
}

export class FormValidator {
  constructor(settingObj, formElement) {
    this.formSelector = settingObj.formSelector
    this.inputSelector = settingObj.inputSelector
    this.submitButtonSelector = settingObj.submitButtonSelector
    this.inactiveButtonClass = settingObj.inactiveButtonClass
    this.inputErrorClass = settingObj.inputErrorClass
    this.errorClass = settingObj.errorClass
    this.element = formElement
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    if (errorElement) {
      inputElement.classList.add(this.inputErrorClass);
      errorElement.classList.add(this.errorClass)
      errorElement.textContent = errorMessage
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    if (errorElement) {
      inputElement.classList.remove(this.inputErrorClass);
      errorElement.classList.remove(this.errorClass)
      errorElement.textContent = ""
    }
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !(inputElement.validity.valid)
    })
  }

  _toggleBtnState() {
    const inputList = Array.from(this.element.querySelectorAll(this.inputSelector))
    const buttonElement = this.element.querySelector(this.submitButtonSelector)
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass)
      buttonElement.setAttribute('disabled', true)
    }
    else {
      buttonElement.classList.remove(this.inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  }

  _setEvenListeners(formList) {
    const _this = this;
    formList.forEach(formElement => {
      const inputList = Array.from(formElement.querySelectorAll(this.inputSelector))
      inputList.forEach(inputElement => {
        inputElement.addEventListener("input", function () {
          _this._checkInputValidity(formElement, inputElement)
          _this._toggleBtnState(formElement)
        })
      })

      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        resetInputError(e.target)
      })
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    this._setEvenListeners(formList);
    this._toggleBtnState()
  }
}
