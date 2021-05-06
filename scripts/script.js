const profileElement = document.querySelector('.profile')
const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
const profileTitleElement = profileElement.querySelector('.profile__name');
const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]')
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeJob = document.querySelector('.popup__input_type_job');
const popupInputTypeImgTitle = document.querySelector('.popup__input_type_img-title')
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
const popupImg = document.querySelector(".popup__img");
const popupImgCaption = document.querySelector(".popup__img-caption");
const closePopupBtnElementList = document.querySelectorAll('.popup__btn_type_close');
const cardsContainerElement = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

function createNewCard(newCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__pic").style.backgroundImage = `url(${newCard.link})`;
  cardElement.querySelector('.card__title').textContent = newCard.name;
  cardElement.querySelector(".card__pic").addEventListener('click', (e) => {
    openExpandImage(e)
    setEventClickOverlayClosePopup(e.target)
  })
  cardElement.querySelector(".card__like-btn").addEventListener('click', fillHeart);
  cardElement.querySelector(".card__delete").addEventListener('click', removeCard);
  return cardElement
}

function renderCards(newCards, insertBefore = true) {
  newCards.forEach(newCard => {
    const newCardElement = createNewCard(newCard)
    insertBefore ?
      cardsContainerElement.prepend(newCardElement)
      : cardsContainerElement.append(newCardElement)
  });
}

function openExpandImage(e) {
  openPopup(popupViewImageElement)
  popupImg.style.backgroundImage = e.target.style.backgroundImage;
  popupImgCaption.textContent = (e.target.parentElement).querySelector(".card__title").textContent
}

function fillHeart(e) {
  e.target.classList.toggle('card__like_active');
}

function removeCard(e) {
  e.target.closest(".card").remove();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

function closePopup(popupElement) {
  if (popupElement.closest('.popup').classList.contains('popup_opened')) {
    popupElement.closest('.popup').classList.remove('popup_opened')
  }
}

function resetInputError(popupElement) {
  const formElement = popupElement.closest(`${settingObj.formSelector}`)
  if (!!formElement) {
    const errorElementList = formElement.querySelectorAll(`.${settingObj.errorClass}`)
    const inputErrorElementList = formElement.querySelectorAll(`.${settingObj.inputErrorClass}`)

    formElement.reset()
    if (errorElementList.length > 0) {
      errorElementList.forEach((error) => {
        error.classList.remove(`${settingObj.errorClass}`)
      })
    }
    if (inputErrorElementList.length > 0) {
      inputErrorElementList.forEach((inputError) => {
        inputError.classList.remove(`${settingObj.inputErrorClass}`)
      })
    }
  }
  closePopup(popupElement)
}

function inputPopupFormEditContent() {
  popupInputTypeName.value = profileTitleElement.textContent
  popupInputTypeJob.value = profileSubtitleElement.textContent
}

function handleFormEditSubmit() {
  profileTitleElement.textContent = popupInputTypeName.value
  profileSubtitleElement.textContent = popupInputTypeJob.value
}

function handleFormAddSubmit() {
  const newImage = {
    name: popupInputTypeImgTitle.value,
    link: popupInputTypeLink.value
  }
  cardsContainerElement.prepend(createNewCard(newImage))
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  if (errorElement) {
    inputElement.classList.add(`${settingObj.inputErrorClass}`);
    errorElement.classList.add(`${settingObj.errorClass}`)
    errorElement.textContent = errorMessage
  }
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  if (errorElement) {
    inputElement.classList.remove(`${settingObj.inputErrorClass}`);
    errorElement.classList.remove(`${settingObj.errorClass}`)
    errorElement.textContent = ""
  }
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !(inputElement.validity.valid)
  })
}

function toggleBtnState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${settingObj.inactiveButtonClass}`)
  } else {
    buttonElement.classList.remove(`${settingObj.inactiveButtonClass}`)
  }
}

function settingForm(e) {
  if (e.target.classList.contains("popup__edit-profile")) {
    handleFormEditSubmit()
    closePopup(popupFormEditElement)
  }
  if (e.target.classList.contains("popup__add-card")) {
    handleFormAddSubmit()
    resetInputError(e.currentTarget)
    closePopup(popupFormAddElement)
  }
}

function setEventClickOverlayClosePopup(formElement) {
  if (formElement.classList.contains("card__pic")) {
    popupImg.closest('.popup_opened').addEventListener('click', (e) => {
      if (e.target === popupImg.closest('.popup_opened')) {
        closePopup(popupImg)
      }
    })
  } else if (formElement.parentElement.classList.contains('popup_opened')) {
    formElement.parentElement.addEventListener('click', (e) => {
      if (e.target === formElement.parentElement) {
        closePopup(formElement)
      }
    })
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${settingObj.inputSelector}`))
  const buttonElement = formElement.querySelector(`${settingObj.submitButtonSelector}`)
  const closeBtnList = Array.from(document.querySelectorAll('.popup__btn_type_close'));

  toggleBtnState(inputList, buttonElement)

  editProfileBtnElement.addEventListener('click', () => {
    openPopup(popupFormEditElement);
    inputPopupFormEditContent()
    toggleBtnState(inputList, buttonElement)
    setEventClickOverlayClosePopup(formElement)
  });

  addCardBtnElement.addEventListener('click', () => {
    openPopup(popupFormAddElement);
    toggleBtnState(inputList, buttonElement)
    setEventClickOverlayClosePopup(formElement)
  })

  inputList.forEach(inputElement => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement)
      toggleBtnState(inputList, buttonElement)
    })
  })

  closeBtnList.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      resetInputError(closeBtn)
      closePopup(formElement.querySelector('.popup__btn_type_close'));
    });
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      if (popupImg.closest('.popup_opened')) {
        closePopup(popupImg.closest('.popup_opened'))
      }
      if (formElement.parentElement.classList.contains('popup_opened')) {
        closePopup(formElement)
      }
    }
  })
}

function enableValidation(settingObject) {
  const formList = Array.from(document.querySelectorAll(`${settingObject.formSelector}`));

  formList.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      settingForm(e)
    })
    setEventListeners(form)
  })
}

renderCards(initialCards, false);
enableValidation(settingObj);
