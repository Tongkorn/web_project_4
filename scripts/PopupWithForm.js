import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this.popupSelector = popupSelector;
    this.handleFormSubmit = handleFormSubmit.bind(this);
  }

  _getInputValues() {
    const inputValues = {
      name: popupInputTypeName.value,
      job: popupInputTypeJob.value
    }
    return inputValues;
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
