import Popup from './Popup.js';
import {popupImg,popupImgCaption} from './constants.js'

export default class PopupWithImage extends Popup {
  constructor(cardSelector) {
    super(cardSelector);
  }

  open(event) {
    popupImg.src = ''
    popupImg.src = event.target.src
    popupImgCaption.textContent = (event.target.parentElement).querySelector(".card__title").textContent
    popupImg.alt = (event.target.parentElement).querySelector(".card__title").textContent
    super.open()
  }
}
