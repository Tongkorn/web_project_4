export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEseClose = this._handleEseClose.bind(this);
  }

  setEventlisteners() {
    document.addEventListener('keydown', this._handleEseClose)
    this._popupSelector.addEventListener('click', (event) => {
      event.target.classList.contains(closeBtnTag)
        ? this.close()
        : this._closeOnOverlay(event)
    })
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
    this.setEventlisteners();
  }

  close() {
    const activePopup = this._popupSelector.parentElement.querySelector('.popup_opened')
    if (!!activePopup) {
      activePopup.classList.remove('popup_opened')
      document.removeEventListener('keydown', this._handleEseClose)

      this._popupSelector.removeEventListener('click', (event) => {
        event.target.classList.contains(closeBtnTag)
          ? this.close()
          : this._closeOnOverlay(event)
      })
    }
  }

  _closeOnOverlay = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('popup_opened'))
      this.close()
  };

  _handleEseClose(event) {
    event.preventDefault();
    if (event.key === "Escape")
      this.close()
  }
}


