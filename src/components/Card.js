export class Card {
  constructor({ cardData, handleCardClick, handleTrashClick, handleLikeClick }, cardTemplate) {
    this.cardData = cardData;
    this.cardText = cardData.name;
    this.cardLink = cardData.link;
    this.handleCardClick = handleCardClick;
    this.handleTrashClick = handleTrashClick;
    this.handleLikeClick = handleLikeClick;
    this.cardTemplate = cardTemplate;
    this.element = this._getTemplate();
    this.cardPic = this.element.querySelector(".card__pic")
  }

  _getTemplate() {
    return this.cardTemplate.querySelector(".card").cloneNode(true);
  }

  // _fillHeart(event) {
  //   event.target.classList.toggle('card__like_active');
  // }

  // _removeCard(event) {
  //   event.target.closest(".card").remove();
  // }

  _setEventListeners() {
    this.element.querySelector(".card__like-btn").addEventListener('click', this.handleLikeClick);
    this.element.querySelector(".card__delete").addEventListener('click', this.handleTrashClick);
    this.cardPic.addEventListener('click', this.handleCardClick)
  }

  generateCard() {
    this.cardPic.src = this.cardLink
    this.element.querySelector('.card__title').textContent = this.cardText;
    this.cardPic.alt = this.cardText;
    this.element.id = this.cardData._id
    if (!!this.cardData.likes) {
      this.element.querySelector('.card__like-total').textContent = Object.keys(this.cardData.likes).length

      this.cardData.likes.forEach(like => {
        if (like['_id'] === "2bd44014f2a9ab1fc336e33a") {
          this.element.querySelector(".card__like-btn").classList.add('card__like_active')
        }
      })
    }
    if (!!this.cardData.owner) {
      console.log(this.element);
      if (this.cardData.owner._id !== "2bd44014f2a9ab1fc336e33a") {
        this.element.querySelector(".card__delete").style.display = 'none';

      }
    }
    this._setEventListeners();

    return this.element
  }
}
