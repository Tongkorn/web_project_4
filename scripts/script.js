let profile = document.querySelector('.profile')
let openEditProfileBtn = profile.querySelector('.profile__edit-btn')
// let openAddProfileBtn = profile.querySelector('.profile__add-btn')
// let addProfileBtn = profile.querySelector('.profile__add')
let profileTitle = profile.querySelector('.profile__name');
let profileSubtitle = profile.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__edit-profile');
let nameInput = popup.querySelector('.popup__input_type_name')
let jobInput = popup.querySelector('.popup__input_type_job')
let closeEditProfileBtn = popup.querySelector('.popup__btn_type_close');
// let heartElements = document.querySelectorAll('.card__like-btn');

function openEditProfilePopup() {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

function closeEditProfilePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

// function fillHeart(evt) {
//   evt.target.classList.toggle('card__like_active');
// }

// function openAddProfilePopup() {
//     popup.classList.toggle('popup_opened');
//     nameInput = popup.querySelector('.popup__input_type_name');
//     jobInput = popup.querySelector('.popup__input_type_job')
//     addProfile(nameInput.value, jobInput.value)
// }

// function addProfile(nameInput, jobInput) {
//     profileText.insertAdjacentHTML("beforeend", `<h1 class="profile__name">${nameInput}</h1>
//     <p class="profile__job">${jobInput}</p>`)
// }

openEditProfileBtn.addEventListener('click', openEditProfilePopup)
closeEditProfileBtn.addEventListener('click', closeEditProfilePopup)
formElement.addEventListener('submit', handleFormSubmit)

// for (heart of heartElements) {
//   heart.addEventListener('click', fillHeart, false);
// }

// openAddProfileBtn.addEventListener('click', openAddProfilePopup)
// closeAddProfileBtn.addEventListener('click', openAddProfilePopup)

// addProfileBtn.addEventListener('click', addProfile)
