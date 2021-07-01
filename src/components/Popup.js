export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this)
    this.closeBtnElement = popupElement.querySelector('.popup__btn_type_close')
  }

  setEventlisteners() {
    this._popupElement.addEventListener('click', this._closeOnOverlay)
    this.closeBtnElement.addEventListener('click', this.close)
  }

  open() {
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _closeOnOverlay = (event) => {
    if (event.target.classList.contains('popup_opened')) this.close()
  };

  _handleEscClose(event) {
    if (event.key === "Escape") this.close()
  }
}
