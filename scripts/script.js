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
  cardElement.querySelector(".card__pic").addEventListener('click',
    openExpandImage)
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

function resetPopupFormInput(e) {
  if (!!(e.target.closest('form'))) {
    e.target.closest('form').reset()
  }
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
  inputElement.classList.add(`${settingObj.inputErrorClass}`);
  errorElement.classList.add(`${settingObj.errorClass}`)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(`${settingObj.inputErrorClass}`);
  errorElement.classList.remove(`${settingObj.errorClass}`)
  errorElement.textContent = ""
}

function checkInputValidity(formElement, inputElement) {
  const errorMessage = inputElement.validationMessage
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

function toggleBtnState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${settingObj.inactiveButtonClass}`)
  } else {
    buttonElement.classList.remove(`${settingObj.inactiveButtonClass}`)
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${settingObj.inputSelector}`))
  const buttonElement = formElement.querySelector(`${settingObj.submitButtonSelector}`)
  toggleBtnState(inputList, buttonElement)

  inputList.forEach(inputElement => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement)
      toggleBtnState(inputList, buttonElement)
    })
  })
}

function settingForm(e) {
  if (e.target.classList.contains("edit-profile")) {
    handleFormEditSubmit()
    closePopup(popupFormEditElement)
  }
  if (e.target.classList.contains("add-card")) {
    handleFormAddSubmit()
    resetPopupFormInput(e)
    closePopup(popupFormAddElement)
  }
}

function settingForm(e) {
  if (e.target.classList.contains("popup__edit-profile")) {
    handleFormEditSubmit()
    closePopup(popupFormEditElement)
  }
  if (e.target.classList.contains("popup__add-card")) {
    handleFormAddSubmit()
    resetPopupFormInput(e)
    closePopup(popupFormAddElement)
  }
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

editProfileBtnElement.addEventListener('click', () => {
  openPopup(popupFormEditElement);
  inputPopupFormEditContent()
});

addCardBtnElement.addEventListener('click', () => {
  openPopup(popupFormAddElement);
})

closePopupBtnElementList.forEach(btnElement => {
  btnElement.addEventListener('click', (e) => {
    closePopup(btnElement);
    resetPopupFormInput(e)
  });
})

renderCards(initialCards, false);
enableValidation(settingObj);
