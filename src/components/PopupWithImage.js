import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this.popupElement = popupElement;
    this.popupImg = popupElement.querySelector(".popup__img");
    this.popupImgCaption = popupElement.querySelector(".popup__img-caption");
  }

  open(event) {
    const cardText = `${(event.target.parentElement).querySelector(".card__title").textContent}`
    this.popupImg.src = '' //reset image before open popup.
    this.popupImg.src = event.target.src
    this.popupImgCaption.textContent = cardText
    this.popupImg.alt = cardText

    super.open()
  }
}
