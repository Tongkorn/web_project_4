import { Card } from './Card.js'
import { FormValidator, resetInputError } from './FormValidator.js'
import { openPopup, closePopup, openCardPreview } from './popup-utils.js'

const createCard = (cardData) => {
  let cardElement = new Card(cardData, openCardPreview)
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
  const newCard = createCard(newImage)
  cardsContainerElement.prepend(newCard)
  closePopup()
}

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);

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

const cardList = initialCards.map(card => createCard(card))
cardsContainerElement.append(...cardList)
