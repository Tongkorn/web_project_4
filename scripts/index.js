import { Card } from './Card.js'
import { FormValidator, resetInputError } from './FormValidator.js'

import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import Section from './Section.js'

import UserInfo from './UserInfo.js'
import PopupWithForm from './PopupWithForm.js'

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
  // # 1
  // const newImage = {
  //   name: newUserData.name,
  //   link: newUserData.job
  // }

  // # 2 
  const newImage = Object.assign({},newUserData)
  newImage.link = Object.assign(newUserData.job)

  const newCard = createCard(newImage)
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
