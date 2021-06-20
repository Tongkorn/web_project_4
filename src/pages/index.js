import "./index.css"

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { getInitialCards, getUserData, updateUser, addCard } from '../utils/api.js'
import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, cardTemplate } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'

import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'

const popupWithImage = new PopupWithImage(popupViewImageElement);

const createCard = (cardData) => {
  const cardElement = new Card({
    cardData,
    handleCardClick: (event) => {
      popupWithImage.open(event)
    }
  }, cardTemplate)
  return cardElement.generateCard()
}

const userInfo = new UserInfo(profileTitleElement, profileSubtitleElement)
const inputPopupFormEditContent = () => {
  popupInputTypeName.value = userInfo.getUserInfo().name
  popupInputTypeJob.value = userInfo.getUserInfo().job
}

const handleFormEditSubmit = (newUserData) => {
  userInfo.setUserInfo(newUserData)
  updateUser(newUserData)
}

const handleFormAddSubmit = (newUserData) => {
  const newCard = createCard(newUserData)
  cardsContainerElement.prepend(newCard)
  addCard(newUserData)
}

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);
formEditValidator.enableValidation();
formAddValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupFormEditElement, handleFormEditSubmit)
const popupAddCard = new PopupWithForm(popupFormAddElement, handleFormAddSubmit)

editProfileBtnElement.addEventListener('click', () => {
  formEditValidator.resetInputError(formEditElement)
  inputPopupFormEditContent()
  popupEditProfile.open()
});

addCardBtnElement.addEventListener('click', () => {
  formAddValidator.resetInputError(formAddElement)
  popupAddCard.open();
})

getUserData()
  .then((res) => {
    console.log(res);
    userInfo.setUserInfo(res)
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })

getInitialCards()
  .then((res) => {
    console.log(res);
    const cardList = new Section({
      items: res,
      renderer: (item) => {
        const card = createCard(item)
        cardList.addItem(card)
      }
    }, cardsContainerElement)
    cardList.renderItems()
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })


