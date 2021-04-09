let content = document.querySelector('.content');
let profile = document.querySelector('.profile')
let openEditProfileBtn = profile.querySelector('#profile-edit-btn')
// let openAddProfileBtn = profile.querySelector('.profile__add-btn')
// let addProfileBtn = profile.querySelector('.profile__add')
let profileText = profile.querySelector('.profile__text');
let profileTitle = profileText.querySelector('.profile__name');
let profileSubtitle = profileText.querySelector('.profile__job');
let popupContainer = content.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('.input__name');
let jobInput = popupContainer.querySelector('.input__job')
let saveProfileBtn = popupContainer.querySelector('.btn__save');
let closeEditProfileBtn = popupContainer.querySelector('.btn__close');
let warningList;

openEditProfileBtn.addEventListener('click', openEditProfilePopup)
closeEditProfileBtn.addEventListener('click', openEditProfilePopup)

// openAddProfileBtn.addEventListener('click', openAddProfilePopup)
// closeAddProfileBtn.addEventListener('click', openAddProfilePopup)

saveProfileBtn.addEventListener('click', saveProfile);
// addProfileBtn.addEventListener('click', addProfile)

let likeBtnList = content.querySelectorAll('.card__like');
if (likeBtnList.length > 0) {
    console.log(likeBtnList)
    likeBtnList.forEach(element => {
        console.log(element)
        element.addEventListener('click', function () {
            element.classList.toggle('card__like-active')
        })
    })
}

function openEditProfilePopup() {
    popupContainer.classList.toggle('popup_opened');
    nameInput.value = profileTitle.innerText;
    jobInput.value = profileSubtitle.innerText;
    clearWarning();
}

function saveProfile(evt) {
    evt.preventDefault();
    nameInput = popupContainer.querySelector('.input__name');
    jobInput = popupContainer.querySelector('.input__job')
    if ((nameInput.value == '') || (jobInput.value == '')) {
        saveProfileBtn.insertAdjacentHTML('beforebegin', `<h4 class="warning">Please fill your info.</h4>`)
    } else {
        profileTitle.innerText = nameInput.value;
        profileSubtitle.innerText = jobInput.value;
        popupContainer.classList.toggle('popup_opened');
        clearWarning();
    }
}

function clearWarning() {
    warningList = popupContainer.querySelectorAll('.warning');
    if (warningList.length > 0) {
        warningList.forEach(element => {
            element.remove();
        });
    }
}

// function openAddProfilePopup() {
//     popupContainer.classList.toggle('popup_opened');
//     nameInput = popupContainer.querySelector('.input__name');
//     jobInput = popupContainer.querySelector('.input__job')
//     addProfile(nameInput.value, jobInput.value)
// }

// function addProfile(nameInput, jobInput) {
//     profileText.insertAdjacentHTML("beforeend", `<h1 class="profile__name">${nameInput}</h1>
//     <p class="profile__job">${jobInput}</p>`)
// }