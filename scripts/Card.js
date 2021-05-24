const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
const popupImg = document.querySelector(".popup__img");
const popupImgCaption = document.querySelector(".popup__img-caption");
const cardTemplate = document.querySelector("#card-template").content;

const _closeByEsc = (event) => {
  if (event.key === "Escape") closePopup()
}

const _closeOnOverlay = (event) => {
  if (event.target.classList.contains('popup_opened')) closePopup()
};

export const closePopup = () => {
  const activePopup = document.querySelector('.popup_opened').classList
  activePopup.remove('popup_opened')
  document.removeEventListener('keydown', _closeByEsc)
  document.removeEventListener('click', _closeOnOverlay)
}

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', _closeByEsc)
  document.addEventListener('click', _closeOnOverlay)
}

export class Card {
  constructor(cardData) {
    this.cardText = cardData.name;
    this.cardLink = cardData.link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    return cardElement
  }

  _openExpandImage(event) {
    popupImg.src = ''
    openPopup(popupViewImageElement)
    popupImg.src = event.target.src
    popupImgCaption.textContent = (event.target.parentElement).querySelector(".card__title").textContent
    popupImg.alt = (event.target.parentElement).querySelector(".card__title").textContent
  }

  _fillHeart(event) {
    event.target.classList.toggle('card__like_active');
  }

  _removeCard(event) {
    event.target.closest(".card").remove();
  }

  _setEventListeners() {
    this.element.querySelector(".card__like-btn").addEventListener('click', this._fillHeart);
    this.element.querySelector(".card__delete").addEventListener('click', this._removeCard);
    this.element.querySelector(".card__pic").addEventListener('click', this._openExpandImage)
  }

  generateCard() {
    this.element = this._getTemplate();
    this.element.querySelector(".card__pic").src = this.cardLink;
    this.element.querySelector('.card__title').textContent = this.cardText;
    this._setEventListeners();

    return this.element
  }
}
