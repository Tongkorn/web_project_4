import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
  }

  _getInputValues() {

  }

  close(){

  }


  // handleFormEditSubmit = () => {
  //   profileTitleElement.textContent = popupInputTypeName.value
  //   profileSubtitleElement.textContent = popupInputTypeJob.value
  //   closePopup()
  // }

  // handleFormAddSubmit = () => {
  //   const newImage = {
  //     name: popupInputTypeImgTitle.value,
  //     link: popupInputTypeLink.value
  //   }
  //   const newCard = createCard(newImage)
  //   cardsContainerElement.prepend(newCard)
  //   closePopup()
  // }

  setEventlisteners() {

    formEditElement.addEventListener('submit', () => {
      this.handleFormEditSubmit();
    })

    formAddElement.addEventListener('submit', () => {
      this.handleFormAddSubmit();
    })
  }
}
