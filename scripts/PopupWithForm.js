import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this.popupSelector = popupSelector;
    this.handleFormSubmit = handleFormSubmit.bind(this);
  }

  _getInputValues() {
    const userInfo = {
      name: this.popupSelector.querySelectorAll('.popup__input')[0].value,
      job: this.popupSelector.querySelectorAll('.popup__input')[1].value
    }
    return userInfo;
  }

  close() {
    this.popupSelector.reset();
    super.close();
  }

  setEventlisteners() {
    this.popupSelector.addEventListener('submit', () => {
      this.handleFormSubmit(this._getInputValues());
      this.close()
    })
  }
}
