import "./pages/index.css"

import { Card } from './scripts/Card.js'
import { FormValidator, resetInputError } from './scripts/FormValidator.js'
import { initialCards } from './scripts/data-card.js'
import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement } from './scripts/constants.js'
import { validationConfig } from './scripts/validate-selector.js'

import Popup from './scripts/Popup.js'
import PopupWithImage from './scripts/PopupWithImage.js'
import Section from './scripts/Section.js'
import UserInfo from './scripts/UserInfo.js'
import PopupWithForm from './scripts/PopupWithForm.js'

const createCard = (cardData) => {
  let cardElement = new Card({
    cardData,
    handleCardClick: (event, cardSelector) => {
      const popupWithImage = new PopupWithImage(cardSelector);
      popupWithImage.open(event)
    }
  }, popupViewImageElement)

  return cardElement = cardElement.generateCard()
}

const userInfo = new UserInfo({ profileTitleElement, profileSubtitleElement })
const inputPopupFormEditContent = () => {
  userInfo.getUserInfo()
}

const handleFormEditSubmit = (newUserData) => {
  userInfo.setUserInfo(newUserData)
}

const handleFormAddSubmit = (newUserData) => {
  const { name, job: link } = newUserData
  const newCard = createCard({ name, link })
  cardsContainerElement.prepend(newCard)
}

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);

editProfileBtnElement.addEventListener('click', () => {
  resetInputError(formEditElement)
  inputPopupFormEditContent()
  formEditValidator.enableValidation();

  const popup = new Popup(popupFormEditElement);
  popup.open()
});

addCardBtnElement.addEventListener('click', () => {
  resetInputError(formAddElement)
  formAddValidator.enableValidation()

  const popup = new Popup(popupFormAddElement);
  popup.open();
})

const popupEdit = new PopupWithForm(formEditElement, handleFormEditSubmit)
popupEdit.setEventlisteners()

const popupAdd = new PopupWithForm(formAddElement, handleFormAddSubmit)
popupAdd.setEventlisteners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card)
  }
}, cardsContainerElement)

cardList.renderItems()
