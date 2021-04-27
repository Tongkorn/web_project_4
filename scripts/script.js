const profileElement = document.querySelector('.profile')
const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
const profileTitleElement = profileElement.querySelector('.profile__name');
const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]')
const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
const closePopupBtnElementList = document.querySelectorAll('.popup__btn_type_close');
const cardsContainerElement = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

function createNewCard(newCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__pic").style.backgroundImage = `url(${newCard.link})`;
  cardElement.querySelector('.card__title').textContent = newCard.name;
  cardElement.querySelector(".card__pic").addEventListener('click',
    openExpandImage)
  cardElement.querySelector(".card__like-btn").addEventListener('click', fillHeart);
  cardElement.querySelector(".card__delete").addEventListener('click', removeCard);
  return cardElement
}

function addCards(newCards, insertBefore = true) {
  newCards.forEach(newCard => {
    const newCardElement = createNewCard(newCard)
    insertBefore ?
      cardsContainerElement.prepend(newCardElement)
      : cardsContainerElement.append(newCardElement)
  });
}

function openExpandImage(e) {
  openPopup(popupViewImageElement)
  popupViewImageElement.querySelector(".popup__img").style.backgroundImage = e.target.style.backgroundImage;
  popupViewImageElement.querySelector(".popup__img-caption").textContent = (e.target.parentElement).querySelector(".card__title").textContent
}

function fillHeart(e) {
  e.target.classList.toggle('card__like_active');
}

function removeCard(e) {
  e.target.closest(".card").remove();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

function closePopup(e) {
  if (e.target.closest('.popup').classList.contains('popup_opened')) {
    e.target.closest('.popup').classList.remove('popup_opened')
  }
}

function clearPopupFormInput(e) {
  e.target.closest('form').reset()
}

function inputPopupFormEditContent(popupElement) {
  popupElement.querySelector('.popup__input_type_name').value = profileTitleElement.textContent
  popupElement.querySelector('.popup__input_type_job').value = profileSubtitleElement.textContent
}

function handleFormEditSubmit(e) {
  profileTitleElement.textContent = e.target.closest('.popup__edit-profile').querySelector('.popup__input_type_name').value
  profileSubtitleElement.textContent = e.target.closest('.popup__edit-profile').querySelector('.popup__input_type_job').value
  closePopup(e)
}

function handleFormAddSubmit(e) {
  let newImage = [
    {
      name: e.target.closest('.popup__add-card').querySelector('.popup__input_type_name').value,
      link: e.target.closest('.popup__add-card').querySelector('.popup__input_type_link').value
    }
  ]
  addCards(newImage)
}

addCards(initialCards, false);

editProfileBtnElement.addEventListener('click', () => {
  openPopup(popupFormEditElement);
  inputPopupFormEditContent(popupFormEditElement)
});

addCardBtnElement.addEventListener('click', () => {
  openPopup(popupFormAddElement);
})

popupFormEditElement.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  handleFormEditSubmit(e)
})

popupFormAddElement.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  handleFormAddSubmit(e)
  clearPopupFormInput(e)
  closePopup(e)
})

closePopupBtnElementList.forEach(btnElement => {
  btnElement.addEventListener('click', (e) => {
    closePopup(e);
    clearPopupFormInput(e)
  });
})
