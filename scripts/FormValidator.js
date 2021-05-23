export class FormValidator {
  constructor(settingObj, formElement) {
    this.formSelector = settingObj.formSelector
    this.inputSelector = settingObj.inputSelector
    this.submitButtonSelector = settingObj.submitButtonSelector
    this.inactiveButtonClass = settingObj.inactiveButtonClass
    this.inputErrorClass = settingObj.inputErrorClass
    this.errorClass = settingObj.errorClass

    this.element = formElement
    // this._resetInputError
  }

  _resetInputError() {
    console.log('object')
    const formElement = this.element.closest(`${this.formSelector}`)
    if (!!formElement) {
      const errorElementList = formElement.querySelectorAll(`.${this.errorClass}`)
      const inputErrorElementList = formElement.querySelectorAll(`.${this.inputErrorClass}`)

      formElement.reset()
      if (errorElementList.length > 0) {
        errorElementList.forEach((error) => {
          error.classList.remove(`${this.errorClass}`)
        })
      }
      if (inputErrorElementList.length > 0) {
        inputErrorElementList.forEach((inputError) => {
          inputError.classList.remove(`${this.inputErrorClass}`)
        })
      }
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    console.log('_showInputError')
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    if (errorElement) {
      inputElement.classList.add(`${this.inputErrorClass}`);
      errorElement.classList.add(`${this.errorClass}`)
      errorElement.textContent = errorMessage
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    if (errorElement) {
      inputElement.classList.remove(`${this.inputErrorClass}`);
      errorElement.classList.remove(`${this.errorClass}`)
      errorElement.textContent = ""
    }
  }

  _checkInputValidity(formElement, inputElement) {
    console.log('check inputValidity')
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
    const inputList = Array.from(this.element.querySelectorAll(`${this.inputSelector}`))
    const buttonElement = this.element.querySelector(`${this.submitButtonSelector}`)

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${this.inactiveButtonClass}`)
      buttonElement.setAttribute('disabled', true)
    }
    else {
      buttonElement.classList.remove(`${this.inactiveButtonClass}`)
      buttonElement.removeAttribute('disabled')
    }
  }

  _setEvenListeners(formList) {
    console.log('set event in FormValidator')
    formList.forEach(formElement => {
      console.log(this)
      const inputList = Array.from(formElement.querySelectorAll(`${this.inputSelector}`))
      inputList.forEach(inputElement => {
        inputElement.addEventListener("input", function () {
          console.log(this)
          this._checkInputValidity(formElement, inputElement)
          this._toggleBtnState(formElement)
        })
      })

      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      })
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(`${this.formSelector}`));
    this._setEvenListeners(formList);
  }

}
