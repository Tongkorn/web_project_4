const profileElement = document.querySelector('.profile')
const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
const profileTitleElement = profileElement.querySelector('.profile__name');
const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popups = document.querySelectorAll('.popup');
const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
const formAddElement = popupFormAddElement.querySelector('form');
const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]');
const formEditElement = popupFormEditElement.querySelector('form');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeJob = document.querySelector('.popup__input_type_job');
const popupInputTypeImgTitle = document.querySelector('.popup__input_type_img-title')
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
const popupImg = document.querySelector(".popup__img");
const popupImgCaption = document.querySelector(".popup__img-caption");
const closeBtnList = Array.from(document.querySelectorAll('.popup__btn_type_close'));
const cardsContainerElement = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

function createNewCard(newCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardPicElement = cardElement.querySelector(".card__pic");
  cardPicElement.src = newCard.link;
  // cardPicElement.style.backgroundImage = `url(${newCard.link})`;
  cardElement.querySelector('.card__title').textContent = newCard.name;
  cardPicElement.addEventListener('click', (e) => {
    openExpandImage(e)
  })
  cardElement.querySelector(".card__like-btn").addEventListener('click', fillHeart);
  cardElement.querySelector(".card__delete").addEventListener('click', removeCard);
  return cardElement
}

function renderInitialCards(cards, insertBefore = true) {
  cards.forEach(newCard => {
    const newCardElement = createNewCard(newCard)
    insertBefore ?
      cardsContainerElement.prepend(newCardElement)
      : cardsContainerElement.append(newCardElement)
  });
}

function openExpandImage(e) {
  openPopup(popupViewImageElement)
  // popupImg.style.backgroundImage = e.target.style.backgroundImage;
  popupImg.src = e.target.src
  popupImgCaption.textContent = (e.target.parentElement).querySelector(".card__title").textContent
  popupImg.alt = (e.target.parentElement).querySelector(".card__title").textContent
}

function fillHeart(e) {
  e.target.classList.toggle('card__like_active');
}

function removeCard(e) {
  e.target.closest(".card").remove();
}

function closeByEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
}

function closePopup(popupElement) {
  popupElement.closest('.popup').classList.remove('popup_opened')
  resetInputError(popupElement)
  document.removeEventListener('keydown', closeByEsc)
}

function inputPopupFormEditContent() {
  popupInputTypeName.value = profileTitleElement.textContent
  popupInputTypeJob.value = profileSubtitleElement.textContent
}

function handleFormEditSubmit() {
  profileTitleElement.textContent = popupInputTypeName.value
  profileSubtitleElement.textContent = popupInputTypeJob.value
}

function handleFormAddSubmit() {
  const newImage = {
    name: popupInputTypeImgTitle.value,
    link: popupInputTypeLink.value
  }
  cardsContainerElement.prepend(createNewCard(newImage))
}

closeBtnList.forEach(closeBtn => {
  closeBtn.addEventListener('click', (e) => {
    closePopup(e.target)
  });
})

function setEventCloseOnclickOverlay() {
  popups.forEach(popupElement => {
    popupElement.addEventListener('click', function (e) {
      if (e.target === popupElement) {
        closePopup(popupElement)
      }
    })
  })
}

editProfileBtnElement.addEventListener('click', () => {
  resetInputError(formEditElement)
  inputPopupFormEditContent()
  toggleBtnState(popupFormEditElement)
  openPopup(popupFormEditElement);
});

addCardBtnElement.addEventListener('click', () => {
  resetInputError(formAddElement)
  toggleBtnState(popupFormAddElement)
  openPopup(popupFormAddElement);
})

formEditElement.addEventListener('submit', (e) => {
  handleFormEditSubmit();
  closePopup(e.target)
})

formAddElement.addEventListener('submit', (e) => {
  handleFormAddSubmit();
  closePopup(e.target)
})

renderInitialCards(initialCards, false);
setEventCloseOnclickOverlay();
enableValidation(validationConfig);



