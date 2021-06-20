import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupElement) {
    super(popupElement)
    this.popupElement = popupElement;
  }

  open() {
    super.open()
  }

  close(){
    super.close();
  }

}
