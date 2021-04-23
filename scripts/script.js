let profile = document.querySelector('.profile')
let openEditProfileBtn = profile.querySelector('.profile__edit-btn')
let openAddCardBtn = profile.querySelector('.profile__add-btn')
let profileTitle = profile.querySelector('.profile__name');
let profileSubtitle = profile.querySelector('.profile__job');

let popup = document.querySelector('.popup');
// let formElement = popup.querySelector('.popup__edit-profile');
// let nameInput = popup.querySelector('.popup__input_type_name')
// let jobInput = popup.querySelector('.popup__input_type_job')
// let popupTitle = popup.querySelector(".popup__title");
// let popupBtn = popup.querySelector(".popup__btn_type_save");
// let closeEditProfileBtn = popup.querySelector('.popup__btn_type_close');
let cardsContainer = document.querySelector(".cards");

const popupEditProfileTemplate = document.querySelector("#popup-edit-profile-template").content;
const cardTemplate = document.querySelector("#card-template").content;
const popupCardImgTemplate = document.querySelector("#popup-card-img-template").content;

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

function addCards(cards, initialCardsOrder = false) {
  cards.forEach((card) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__pic").style.backgroundImage = `url(${card.link})`;
    cardElement.querySelector(".card__pic").addEventListener('click', openExpandImage);
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector(".card__like-btn").addEventListener('click', fillHeart);
    cardElement.querySelector(".card__delete").addEventListener('click', removeCard)
    initialCardsOrder ?
      cardsContainer.append(cardElement)
      : cardsContainer.prepend(cardElement)
  })
}

function openExpandImage(e) {
  e.preventDefault()
  let popupExpandImageElement = popupCardImgTemplate.querySelector(".popup__card").cloneNode(true);
  popupExpandImageElement.querySelector(".popup__img").style.backgroundImage = e.target.style.backgroundImage;
  openPopup(popupExpandImageElement)
}

function fillHeart(evt) {
  evt.target.classList.toggle('card__like_active');
}

function removeCard(evt) {
  evt.target.closest(".card").remove();
}

function openAddCardPopup() {
  popup.classList.toggle('popup__add-card');
  let popupAddCardElement = popupEditProfileTemplate.querySelector(".popup__edit-profile").cloneNode(true);
  popupAddCardElement.querySelector(".popup__input_type_name").placeholder = "Title";
  popupAddCardElement.querySelector(".popup__input_type_job").placeholder = "Image link";
  popupAddCardElement.querySelector(".popup__title").textContent = "New place";
  popupAddCardElement.querySelector(".popup__btn_type_save").textContent = "Create";
  openPopup(popupAddCardElement)
  popupAddCardElement.addEventListener('submit', handleFormSubmit)
}

function openEditProfilePopup() {
  popup.classList.toggle('popup__edit');
  let popupEditProfileElement = popupEditProfileTemplate.querySelector(".popup__edit-profile").cloneNode(true);
  popupEditProfileElement.querySelector(".popup__input_type_name").value = profileTitle.textContent;
  popupEditProfileElement.querySelector(".popup__input_type_job").value = profileSubtitle.textContent;
  popupEditProfileElement.querySelector(".popup__title").textContent = "Edit profile";
  popupEditProfileElement.querySelector(".popup__btn_type_save").textContent = "Save";
  openPopup(popupEditProfileElement)
  popupEditProfileElement.addEventListener('submit', handleFormSubmit)
}

function closeEditProfilePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup__edit');
  popup.classList.remove('popup__add-card');
  while (popup.firstChild) {
    popup.removeChild(popup.firstChild);
  }
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = evt.target.querySelector(".popup__input_type_name");
  let jobInput = evt.target.querySelector(".popup__input_type_job");
  if (evt.target.closest(".popup__edit")) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popup.classList.remove('popup__edit');
    evt.target.closest(".popup__edit-profile").remove()
  }
  if (!!(evt.target.closest(".popup__add-card"))) {
    let newCard = [
      {
        name: nameInput.value,
        link: jobInput.value,
      }
    ]
    popup.classList.remove('popup__add-card')
    evt.target.closest(".popup__edit-profile").remove()
    addCards(newCard);
  }
  popup.classList.remove('popup_opened');
}

function openPopup(element) {
  popup.append(element);
  element.querySelector(".popup__btn_type_close").addEventListener('click', closeEditProfilePopup);
  popup.classList.toggle('popup_opened');
}

addCards(initialCards, true);

openEditProfileBtn.addEventListener('click', openEditProfilePopup)
openAddCardBtn.addEventListener('click', openAddCardPopup);
