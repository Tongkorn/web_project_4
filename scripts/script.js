const profileElement = document.querySelector('.profile')
const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
const profileTitleElement = profileElement.querySelector('.profile__name');
const profileSubtitleElement = profileElement.querySelector('.profile__job');
const popupElementList = document.querySelectorAll('.popup');
const popupFormEditElement = document.querySelector('[data-form= "popup__form_edit"]')
const popupFormAddElement = document.querySelector('[data-form= "popup__form_add"]')
const popupViewImageElement = document.querySelector('[data-form="popup__view_image"]')
const saveEditProfileElement = document.querySelector('[data-form="save__edit-profile"]')
const saveAddImageElement = document.querySelector('[data-form="save__add-image"]')
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
    let newCardElement = createNewCard(newCard)
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

function closePopup(popupElement) {
  popupElement.length > 1
    ? popupElement.forEach(item => { item.classList.remove('popup_opened') })
    : popupElement.classList.remove('popup_opened')
}

function clearPopupFormInput(popupElement) {
  popupElement.querySelector('.popup__input_type_name').value = "";
  popupElement.querySelector('.popup__input_type_job').value = "";
}

function inputPopupFormEditContent(popupElement) {
  popupElement.querySelector('.popup__input_type_name').value = profileTitleElement.textContent
  popupElement.querySelector('.popup__input_type_job').value = profileSubtitleElement.textContent
  saveEditProfileElement.addEventListener('click', (e) => {
    e.preventDefault();
    handleFormEditSubmit(popupElement)
  })
}

function handleFormEditSubmit(popupElement) {
  profileTitleElement.textContent = popupElement.querySelector('.popup__input_type_name').value
  profileSubtitleElement.textContent = popupElement.querySelector('.popup__input_type_job').value
  closePopup(popupElement)
}

function handleFormAddImageSubmit(popupElement) {
  saveAddImageElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    let newImage = [
      {
        name: popupElement.querySelector('.popup__input_type_name').value,
        link: popupElement.querySelector('.popup__input_type_job').value
      }
    ]
    addCards(newImage)
    closePopup(popupElement)
    clearPopupFormInput(popupElement)
  })
}

addCards(initialCards, false);

editProfileBtnElement.addEventListener('click', () => {
  openPopup(popupFormEditElement);
  inputPopupFormEditContent(popupFormEditElement)
});

addCardBtnElement.addEventListener('click', () => {
  openPopup(popupFormAddElement);
  handleFormAddImageSubmit(popupFormAddElement)
})

closePopupBtnElementList.forEach(element => {
  element.addEventListener('click', () => {
    closePopup(popupElementList);
  });
})
