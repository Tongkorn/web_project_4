const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// function resetInputError(popupElement) {
//   const formElement = popupElement.closest(`${validationConfig.formSelector}`)
//   if (!!formElement) {
//     const errorElementList = formElement.querySelectorAll(`.${validationConfig.errorClass}`)
//     const inputErrorElementList = formElement.querySelectorAll(`.${validationConfig.inputErrorClass}`)

//     formElement.reset()
//     if (errorElementList.length > 0) {
//       errorElementList.forEach((error) => {
//         error.classList.remove(`${validationConfig.errorClass}`)
//       })
//     }
//     if (inputErrorElementList.length > 0) {
//       inputErrorElementList.forEach((inputError) => {
//         inputError.classList.remove(`${validationConfig.inputErrorClass}`)
//       })
//     }
//   }
// }

// function showInputError(formElement, inputElement, errorMessage) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//   if (errorElement) {
//     inputElement.classList.add(`${validationConfig.inputErrorClass}`);
//     errorElement.classList.add(`${validationConfig.errorClass}`)
//     errorElement.textContent = errorMessage
//   }
// }

// function hideInputError(formElement, inputElement) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//   if (errorElement) {
//     inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
//     errorElement.classList.remove(`${validationConfig.errorClass}`)
//     errorElement.textContent = ""
//   }
// }

// function checkInputValidity(formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage)
//   } else {
//     hideInputError(formElement, inputElement)
//   }
// }

// function hasInvalidInput(inputList) {
//   return inputList.some(inputElement => {
//     return !(inputElement.validity.valid)
//   })
// }

// function toggleBtnState(popupElement) {
//   const inputList = Array.from(popupElement.querySelectorAll(`${validationConfig.inputSelector}`))
//   const buttonElement = popupElement.querySelector(`${validationConfig.submitButtonSelector}`)

//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`)
//     buttonElement.setAttribute('disabled', true)
//   }
//   else {
//     buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`)
//     buttonElement.removeAttribute('disabled')
//   }
// }

// function setEvenListeners(formList) {
//   formList.forEach(formElement => {
//     const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`))

//     inputList.forEach(inputElement => {
//       inputElement.addEventListener("input", function () {
//         checkInputValidity(formElement, inputElement)
//         toggleBtnState(formElement)
//       })
//     })

//     formElement.addEventListener('submit', (e) => {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//     })
//   })
// }

// function enableValidation(validationConfig) {
//   const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
//   setEvenListeners(formList);
// }


