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

  //   popupInputTypeName.value = profileTitleElement.textContent
  //   popupInputTypeJob.value = profileSubtitleElement.textContent
  userInfo.getUserInfo()
}

const handleFormEditSubmit = (newUserData) => {
  //   profileTitleElement.textContent = popupInputTypeName.value
  //   profileSubtitleElement.textContent = popupInputTypeJob.value
  //   closePopup()
  // const userInfo = new UserInfo({ profileTitleElement, profileSubtitleElement })
  // console.log(userInfo.getUserInfo())
  // userInfo.setUserInfo({popupInputTypeName,popupInputTypeJob})
  console.log(newUserData)
  userInfo.setUserInfo(newUserData)

}

// const handleFormAddSubmit = () => {
//   const newImage = {
//     name: popupInputTypeImgTitle.value,
//     link: popupInputTypeLink.value
//   }
//   const newCard = createCard(newImage)
//   cardsContainerElement.prepend(newCard)
//   closePopup()
// }

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
  formAddValidator.enableValidation();

  const popup = new Popup(popupFormAddElement);
  popup.open();
})

const popupForm = new PopupWithForm(formEditElement, handleFormEditSubmit)

popupForm.setEventlisteners()


// formEditElement.addEventListener('submit', () => {
//   handleFormEditSubmit();
// })

formAddElement.addEventListener('submit', () => {
  handleFormAddSubmit();
})

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card)
  }
}, cardsContainerElement)

cardList.renderItems()
