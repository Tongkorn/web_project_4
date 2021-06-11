import {closeBtnList } from '../utils/constants';

export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this)
  }

  _setEventlisteners() {
    document.addEventListener('keydown', this._handleEscClose)
    this._popupElement.addEventListener('click', this._closeOnOverlay)
  }

  open() {
    this._popupElement.classList.add('popup_opened')
    this._setEventlisteners();
    closeBtnList.forEach(closeBtn => {
      closeBtn.addEventListener('click', this.close)
    })
  }

  close() {
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
    this._popupElement.removeEventListener('click', this._closeOnOverlay)
    closeBtnList.forEach(closeBtn => {
      closeBtn.removeEventListener('click', this.close)
    })
  }

  _closeOnOverlay = (event) => {
    if (event.target.classList.contains('popup_opened')) this.close()
  };

  _handleEscClose(event) {
    if (event.key === "Escape") this.close()
  }
}


