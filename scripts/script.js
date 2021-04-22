let profile = document.querySelector('.profile')
let openEditProfileBtn = profile.querySelector('.profile__edit-btn')
let openAddCardBtn = profile.querySelector('.profile__add-btn')
let profileTitle = profile.querySelector('.profile__name');
let profileSubtitle = profile.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__edit-profile');
let nameInput = popup.querySelector('.popup__input_type_name')
let jobInput = popup.querySelector('.popup__input_type_job')
let popupTitle = popup.querySelector(".popup__title");
let popupBtn = popup.querySelector(".popup__btn_type_save");
let closeEditProfileBtn = popup.querySelector('.popup__btn_type_close');
let cardsContainer = document.querySelector(".cards");

const cardTemplate = document.querySelector("#card-template").content;
// const popupCardImgTemplate = document.querySelector("#popup-card-img-template").content;

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function addCards(card, initialCardsOrder = false) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__pic").style.backgroundImage = `url(${card.link})`;
  cardElement.querySelector(".card__pic").addEventListener('click', openPopupCardImage);
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector(".card__like-btn").addEventListener('click', fillHeart);
  cardElement.querySelector(".card__delete").addEventListener('click', removeCard)

  initialCardsOrder ?
    cardsContainer.append(cardElement)
    : cardsContainer.prepend(cardElement)

  clearPopupInput();
}

function openPopupCardImage() {
  popup.classList.toggle('popup_opened');
  const popupCardImgTemplate = document.querySelector("#popup-card-img-template").content;
  let popupCardElement = popupCardImgTemplate.querySelector(".popup__card").cloneNode(true);
  formElement.replaceWith(popupCardElement);
  popupCardElement.querySelector(".popup__btn_type_close").addEventListener('click', closeEditProfilePopup)
}

function fillHeart(evt) {
  evt.target.classList.toggle('card__like_active');
}

function removeCard(evt) {
  evt.target.closest(".card").remove();
}

function openAddCardPopup() {
  popup.classList.toggle('popup_opened');
  formElement.classList.toggle('popup__add-card');
  popupTitle.textContent = "New place";
  popupBtn.textContent = "Create";
  nameInput.placeholder = "Title";
  jobInput.placeholder = "Image link";
}

function openEditProfilePopup() {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupTitle.textContent = "Edit profile";
    popupBtn.textContent = "Save";
  }
}

function closeEditProfilePopup() {
  popup.classList.remove('popup_opened');
  clearPopupInput();
  console.log("closeeeee")
}

function clearPopupInput() {
  formElement.classList.remove('popup__add-card')
  if (!!formElement) {
    nameInput.value = "";
    jobInput.value = "";
    popupTitle.textContent = "";
    popupBtn.textContent = "";
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target.classList === ("popup__edit-profile")) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  }
  if (evt.target.classList.contains("popup__add-card")) {
    let newCard =
    {
      name: popup.querySelector('.popup__input_type_name').value,
      link: popup.querySelector('.popup__input_type_job').value,
    }

    formElement.classList.remove('popup__add-card')
    addCards(newCard);
  }
  popup.classList.remove('popup_opened');
}

initialCards.forEach(card => addCards(card, true));

openEditProfileBtn.addEventListener('click', openEditProfilePopup)
closeEditProfileBtn.addEventListener('click', closeEditProfilePopup)
formElement.addEventListener('submit', handleFormSubmit)
openAddCardBtn.addEventListener('click', openAddCardPopup);
