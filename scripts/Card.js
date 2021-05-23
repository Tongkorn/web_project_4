// const profileElement = document.querySelector('.profile')
// const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
// const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
// const profileTitleElement = profileElement.querySelector('.profile__name');
// const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popups = document.querySelectorAll('.popup');
// const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
// const formAddElement = popupFormAddElement.querySelector('form');
// const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]');
// const formEditElement = popupFormEditElement.querySelector('form');
// const popupInputTypeName = document.querySelector('.popup__input_type_name');
// const popupInputTypeJob = document.querySelector('.popup__input_type_job');
// const popupInputTypeImgTitle = document.querySelector('.popup__input_type_img-title')
// const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
const popupImg = document.querySelector(".popup__img");
const popupImgCaption = document.querySelector(".popup__img-caption");
const closeBtnList = Array.from(document.querySelectorAll('.popup__btn_type_close'));
// const cardsContainerElement = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;


(function setEventCloseOnclickOverlay() {
  popups.forEach(popupElement => {
    popupElement.addEventListener('click', function (e) {
      if (e.target === popupElement) {
        closePopup(popupElement)
      }
    })
  })
})();

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
}


export function closeByEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'))
  }
}

export function closePopup(popupElement) {
  popupElement.closest('.popup').classList.remove('popup_opened')
  // resetInputError(popupElement)
  document.removeEventListener('keydown', closeByEsc)
}

export class Card {
  constructor(cardData) {
    this.cardData = cardData;
    this._setCloseBtn()
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    return cardElement
  }

  _openExpandImage(e) {
    popupImg.src = ''
    openPopup(popupViewImageElement)
    popupImg.src = e.target.src
    popupImgCaption.textContent = (e.target.parentElement).querySelector(".card__title").textContent
    popupImg.alt = (e.target.parentElement).querySelector(".card__title").textContent
  }

  _fillHeart(e) {
    e.target.classList.toggle('card__like_active');
  }

  _removeCard(e) {
    e.target.closest(".card").remove();
  }
  _setEventListeners() {
    this.element.querySelector(".card__like-btn").addEventListener('click', this._fillHeart);
    this.element.querySelector(".card__delete").addEventListener('click', this._removeCard);
  }

  _setCloseBtn() {
    closeBtnList.forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        closePopup(e.target)
      });
    })

  }
}

export class DefaultCard extends Card {
  constructor(cardData) {
    super(cardData)
    this.cardText = cardData.name;
    this.cardLink = cardData.link;
  }

  generateCard() {
    this.element = super._getTemplate();
    const cardPicElement = this.element.querySelector(".card__pic");
    cardPicElement.addEventListener('click', (e) => {
      super._openExpandImage(e)
    })
    cardPicElement.src = this.cardLink;
    super._setEventListeners();
    // cardPicElement.style.backgroundImage = `url(${newCardData.link})`;
    this.element.querySelector('.card__title').textContent = this.cardText;
    return this.element
  }
}
