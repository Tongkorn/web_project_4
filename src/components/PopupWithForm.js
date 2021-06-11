import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement)
    this.popupElement = popupElement;
    this.handleFormSubmit = handleFormSubmit.bind(this);
  }

  _getInputValues() {
    const userInfo = {}
    Array.from(this.popupElement.querySelectorAll('.popup__input')).forEach(item => {
      userInfo[item.name] = item.value
    })
    return userInfo;
  }

  open() {
    super.open()
    this.setEventlisteners()
  }

  setEventlisteners() {
    this.popupElement.querySelector('form').addEventListener('submit', () => {
      this.handleFormSubmit(this._getInputValues());
      super.close()
    })
  }
}
