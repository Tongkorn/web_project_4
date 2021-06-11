import "../index.css"

import { Card } from '../components/Card.js'
import { FormValidator, resetInputError } from '../components/FormValidator.js'
import { initialCards } from '../utils/data-card.js'
import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, popupImg, cardTemplate } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'

// import Popup from '../components/Popup.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'

const popupWithImage = new PopupWithImage(popupViewImageElement);

// const popup = new Popup(popupFormEditElement);


const createCard = (cardData) => {
  let cardElement = new Card({
    cardData,
    handleCardClick: (event) => {
      popupWithImage.open(event)
    }
  }, cardTemplate)

  return cardElement = cardElement.generateCard()
}


const userInfo = new UserInfo(profileTitleElement, profileSubtitleElement)
const inputPopupFormEditContent = () => {
  popupInputTypeName.value = userInfo.getUserInfo().name
  popupInputTypeJob.value = userInfo.getUserInfo().job
}

const handleFormEditSubmit = (newUserData) => {
  userInfo.setUserInfo(newUserData)
}

const handleFormAddSubmit = (newUserData) => {
  const newCard = createCard(newUserData)
  cardsContainerElement.prepend(newCard)
}

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);
// formEditValidator.enableValidation();
// formAddValidator.enableValidation()


editProfileBtnElement.addEventListener('click', () => {
  formEditValidator.resetInputError(formEditElement)
  inputPopupFormEditContent()
  formEditValidator.enableValidation();
  const popupEditProfile = new PopupWithForm(popupFormEditElement, handleFormEditSubmit)
  popupEditProfile.open()
});

addCardBtnElement.addEventListener('click', () => {
  formAddValidator.resetInputError(formAddElement)
  formAddValidator.enableValidation()

  const popupAddCard = new PopupWithForm(popupFormAddElement, handleFormAddSubmit)
  popupAddCard.open();

})

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card)
  }
}, cardsContainerElement)

cardList.renderItems()
