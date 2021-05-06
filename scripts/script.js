const profileElement = document.querySelector('.profile')
const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
const profileTitleElement = profileElement.querySelector('.profile__name');
const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]')
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

const inputElementList = Array.from(document.querySelectorAll(`${validationConfig.inputSelector}`))
const submitButtonElement = document.querySelector(`${validationConfig.submitButtonSelector}`)

function createNewCard(newCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardPicElement = cardElement.querySelector(".card__pic");
  cardPicElement.style.backgroundImage = `url(${newCard.link})`;
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
  popupImg.style.backgroundImage = e.target.style.backgroundImage;
  popupImgCaption.textContent = (e.target.parentElement).querySelector(".card__title").textContent
  popupImg.alt = (e.target.parentElement).querySelector(".card__title").textContent
}

function fillHeart(e) {
  e.target.classList.toggle('card__like_active');
}

function removeCard(e) {
  e.target.closest(".card").remove();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'))
    }
  })
}

function closePopup(popupElement) {
  popupElement.closest('.popup').classList.remove('popup_opened')
  document.removeEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'))
    }
  })
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
  document.querySelectorAll('.popup').forEach(popupElement => {
    popupElement.addEventListener('click', function (e) {
      if (e.target === popupElement) {
        closePopup(popupElement)
      }
    })
  })
}
editProfileBtnElement.addEventListener('click', () => {
  openPopup(popupFormEditElement);
  resetInputError(popupFormEditElement.querySelector('form'))
  inputPopupFormEditContent()
  toggleBtnState(inputElementList, submitButtonElement)
  enableValidation(validationConfig);
  setEventCloseOnclickOverlay()
});

addCardBtnElement.addEventListener('click', () => {
  openPopup(popupFormAddElement);
  resetInputError(popupFormAddElement.querySelector('form'))
  toggleBtnState(inputElementList, submitButtonElement)
  enableValidation(validationConfig);
  setEventCloseOnclickOverlay()
})

renderInitialCards(initialCards, false);
