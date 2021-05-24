import { Card, openPopup, closePopup } from './Card.js'
import { FormValidator, resetInputError } from './FormValidator.js'

const profileElement = document.querySelector('.profile')
const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
const profileTitleElement = profileElement.querySelector('.profile__name');
const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
const formAddElement = popupFormAddElement.querySelector('form');
const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]');
const formEditElement = popupFormEditElement.querySelector('form');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeJob = document.querySelector('.popup__input_type_job');
const popupInputTypeImgTitle = document.querySelector('.popup__input_type_img-title')
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const closeBtnList = Array.from(document.querySelectorAll('.popup__btn_type_close'));
const cardsContainerElement = document.querySelector(".cards");

const renderCard = (cardData) => {
  let cardElement = new Card(cardData)
  return cardElement = cardElement.generateCard()
}

const inputPopupFormEditContent = () => {
  popupInputTypeName.value = profileTitleElement.textContent
  popupInputTypeJob.value = profileSubtitleElement.textContent
}

const handleFormEditSubmit = () => {
  profileTitleElement.textContent = popupInputTypeName.value
  profileSubtitleElement.textContent = popupInputTypeJob.value
  closePopup()
}

const handleFormAddSubmit = () => {
  const newImage = {
    name: popupInputTypeImgTitle.value,
    link: popupInputTypeLink.value
  }
  const newCard = renderCard(newImage)
  cardsContainerElement.prepend(newCard)
  closePopup()
}

const formEditValidator = new FormValidator(validationConfig, popupFormEditElement);
const formAddValidator = new FormValidator(validationConfig, popupFormAddElement);

editProfileBtnElement.addEventListener('click', () => {
  resetInputError(formEditElement)
  inputPopupFormEditContent()
  formEditValidator.enableValidation();
  openPopup(popupFormEditElement)
});

addCardBtnElement.addEventListener('click', () => {
  resetInputError(formAddElement)
  formAddValidator.enableValidation();
  openPopup(popupFormAddElement);
})

formEditElement.addEventListener('submit', () => {
  handleFormEditSubmit();
})

formAddElement.addEventListener('submit', () => {
  handleFormAddSubmit();
})

closeBtnList.forEach(closeBtn => {
  closeBtn.addEventListener('click', closePopup);
})

const cardList = initialCards.map(card => renderCard(card))
cardsContainerElement.append(...cardList)
