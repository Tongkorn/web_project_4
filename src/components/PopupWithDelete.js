import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupElement, handleDeleteCallbackFn) {
    super(popupElement)
    this.popupElement = popupElement;
    this.handleDelete = handleDeleteCallbackFn;
    this.cardId = '';
  }

  open(cardId) {
    super.open();
    this.cardId = cardId;
    this.setEventlisteners()
  }

  setEventlisteners() {
    this.popupElement.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleDelete()
    })
  }
}
