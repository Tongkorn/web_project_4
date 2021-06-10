import {cardTemplate} from './constants.js'

export class Card {
  constructor({ cardData, handleCardClick }, cardSelector) {
    this.cardText = cardData.name;
    this.cardLink = cardData.link;
    this.handleCardClick = handleCardClick;
    this.cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    return cardElement
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
    this.element.querySelector(".card__pic").addEventListener('click', (event) => {
      this.handleCardClick(event, this.cardSelector)
    })
  }

  generateCard() {
    this.element = this._getTemplate();
    this.element.querySelector(".card__pic").src = this.cardLink;
    this.element.querySelector('.card__title').textContent = this.cardText;
    this._setEventListeners();

    return this.element
  }
}