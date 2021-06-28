import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupElement,handleDeleteCallbackFn) {
    super(popupElement)
    this.popupElement = popupElement;
    this.handleDelete = handleDeleteCallbackFn;
  }

  open(event){
    super.open();
    this.setEventlisteners(event)
  }

  setEventlisteners(event){
    const cardId = event.target.closest(".card").id
    // console.log(cardId)
          // console.log(event.target.closest(".card").id)

    this.popupElement.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      // handleDeleteCardSubmit(cardEvent)
      // console.log(event.target.closest(".card").id)
      this.handleDelete(cardId)
      this.close()
      // console.log(cardEvent.target.closest(".card").id);
    })
  }


}
