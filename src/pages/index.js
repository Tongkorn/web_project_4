import "./index.css"

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { getInitialCards, getUserData, updateUser, addCard, deleteCard } from '../utils/api.js'
import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, cardTemplate, popupDeleteCardElement } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'

import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithDelete from "../components/PopupWithDelete.js"

const popupWithImage = new PopupWithImage(popupViewImageElement);

const popupWithDelete = new PopupWithDelete(popupDeleteCardElement)

const createCard = (cardData) => {
  const cardElement = new Card({
    cardData,
    handleCardClick: (event) => {
      popupWithImage.open(event)
    },
    handleTrashClick: (cardEvent) => {
      popupWithDelete.open()
      popupDeleteCardElement.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        handleDeleteCardSubmit(cardEvent)
        popupWithDelete.close()
        console.log(cardEvent.target.closest(".card").id);
      })
    }
  }, cardTemplate)
  return cardElement.generateCard()
}

const userInfo = new UserInfo(profileTitleElement, profileSubtitleElement)
const inputPopupFormEditContent = () => {
  popupInputTypeName.value = userInfo.getUserInfo().name
  popupInputTypeJob.value = userInfo.getUserInfo().job
}

const handleDeleteCardSubmit = (cardEvent) => {
  deleteCard(cardEvent.target.closest(".card").id)
    .then((result) => { console.log(result) })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
  cardEvent.target.closest(".card").remove();
}

const handleFormEditSubmit = (newUserData) => {
  userInfo.setUserInfo(newUserData)
  updateUser(newUserData)
    .then((result) => { console.log(result) })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleFormAddSubmit = (newUserData) => {
  const newCard = createCard(newUserData)
  cardsContainerElement.prepend(newCard)
  addCard(newUserData)
    .then((result) => { console.log(result) })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
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
    console.log(res)
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


