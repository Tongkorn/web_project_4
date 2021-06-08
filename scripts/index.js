import { Card } from './Card.js'
import { FormValidator, resetInputError } from './FormValidator.js'

import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import Section from './Section.js'

import UserInfo from './UserInfo.js'

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



const inputPopupFormEditContent = () => {
  const userInfo = new UserInfo({ profileTitleElement, profileSubtitleElement })
  //   popupInputTypeName.value = profileTitleElement.textContent
  //   popupInputTypeJob.value = profileSubtitleElement.textContent
  userInfo.setUserInfo(userInfo.getUserInfo());
}

const handleFormEditSubmit = () => {
  //   profileTitleElement.textContent = popupInputTypeName.value
  //   profileSubtitleElement.textContent = popupInputTypeJob.value
  //   closePopup()

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

formEditElement.addEventListener('submit', () => {
  handleFormEditSubmit();
})

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
