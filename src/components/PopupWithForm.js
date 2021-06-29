import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmitCallbackFn) {
    super(popupElement)
    this.popupElement = popupElement;
    this.handleFormSubmit = handleFormSubmitCallbackFn.bind(this);
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

  resetForm() {
    this.popupElement.reset()
  }

  setEventlisteners() {
    this.popupElement.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleFormSubmit(this._getInputValues());
    })
  }
}
