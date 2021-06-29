export class Card {
  constructor({ name, link, _id, likes, owner, handleCardClickCallbackFn, handleTrashClickCallbackFn, handleLikeClickCallbackFn }, userId, cardTemplate) {
    this.cardName = name;
    this.cardLink = link;
    this.cardId = _id;
    this.cardOwnerId = owner._id;
    this.cardLikes = likes;
    this.userId = userId;
    this.handleCardClick = handleCardClickCallbackFn;
    this.handleTrashClick = handleTrashClickCallbackFn;
    this.handleLikeClick = handleLikeClickCallbackFn;
    this.cardTemplate = cardTemplate;
    this.element = this._getTemplate();
    this.cardPic = this.element.querySelector(".card__pic")
  }

  _getTemplate() {
    return this.cardTemplate.querySelector(".card").cloneNode(true);
  }

  _fillHeart(event) {
    event.target.classList.toggle('card__like_active');
  }

  _plusLike(res, event) {
    event.target.closest(".card").querySelector(".card__like-total").textContent = (res.likes).length
  }

  // _removeCard(event) {
  //   event.target.closest(".card").remove();
  // }

  _minusLike(res, event) {
    event.target.closest(".card").querySelector(".card__like-total").textContent = (res.likes).length
  }

  addLikes(res, event) {
    this._fillHeart(event)
    this._plusLike(res, event)
  }

  removeLikes(res, event) {
    this._fillHeart(event)
    this._minusLike(res, event)
  }

  _showUserFilledHeart() {
    this.cardLikes.forEach(like => {
      if (like['_id'] === this.userId) {
        this.element.querySelector(".card__like-btn").classList.toggle('card__like_active')
      }
    })
  }

  _showTrash() {
    this.element.querySelector(".card__delete").style.display = 'none';
  }

  _setEventListeners() {
    this.element.querySelector(".card__like-btn").addEventListener('click', this.handleLikeClick);
    this.element.querySelector(".card__delete").addEventListener('click', (event) => {
      event.preventDefault
      this.handleTrashClick(this.cardId)
    });
    this.cardPic.addEventListener('click', this.handleCardClick)
  }

  generateCard() {
    this.cardPic.src = this.cardLink
    this.element.querySelector('.card__title').textContent = this.cardName;
    this.cardPic.alt = this.cardName;
    this.element.querySelector('.card__like-total').textContent = Object.keys(this.cardLikes).length

    this.element.id = this.cardId

    if (this.cardLikes.length > 0) this._showUserFilledHeart()
    if (this.cardOwnerId !== this.userId) this._showTrash()

    this._setEventListeners();
    return this.element
  }
}
