import "./index.css"

// import { initialCards } from '../utils/data-card.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, cardTemplate, popupDeleteCardElement, profileAvatarElement, popupChangeAvatarElement } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'

import API from '../components/Api.js';
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithDelete from '../components/PopupWithDelete.js'

const api = new API(
  "https://around.nomoreparties.co/v1/", {
  method: "GET",
  headers: {
    authorization: "e09604a5-57aa-4b20-9a83-ea66e5c6924b",
    "Content-Type": "application/json"
  }
})

const popupWithImage = new PopupWithImage(popupViewImageElement);
const popupWithDelete = new PopupWithDelete(popupDeleteCardElement)

const createCard = (cardData) => {
  const cardElement = new Card({
    cardData,
    handleCardClick: (event) => {
      popupWithImage.open(event)
    },
    handleTrashClick: (cardEvent) => {
      popupWithDelete.open()
      popupDeleteCardElement.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        handleDeleteCardSubmit(cardEvent)
        popupWithDelete.close()
        console.log(cardEvent.target.closest(".card").id);
      })
    },
    handleLikeClick: (event) => {
      if (!(event.target.classList.contains("card__like_active"))) {
        api.addLike(event.target.closest(".card").id)
          .then(res => {
            console.log(res)
            event.target.classList.toggle('card__like_active');
            event.target.closest(".card").querySelector('.card__like-total').textContent = parseInt(event.target.closest(".card").querySelector('.card__like-total').textContent) + 1
          })
          .catch(err => {
            console.log(`Error: ${err}`)
          })
      } else if (event.target.classList.contains("card__like_active")) {
        api.removeLike(event.target.closest(".card").id)
          .then(res => {
            console.log(res)
            event.target.classList.toggle('card__like_active');
            event.target.closest(".card").querySelector('.card__like-total').textContent = parseInt(event.target.closest(".card").querySelector('.card__like-total').textContent) - 1
          })
          .catch(err => {
            console.log(`Error: ${err}`)
          })
      }
    }
  }, cardTemplate)
  return cardElement.generateCard()
}

const userInfo = new UserInfo(profileTitleElement, profileSubtitleElement)
const inputPopupFormEditContent = () => {
  popupInputTypeName.value = userInfo.getUserInfo().name
  popupInputTypeJob.value = userInfo.getUserInfo().job
}

const saving = (popupElement, isSaving) => {
  const element = popupElement.querySelector('.popup__btn_type_save')
  if (isSaving) {
    element.innerHTML = element.getAttribute("data-text-saving")
  } else {
    element.innerHTML = element.getAttribute("data-text-original")
  }
}

const handleDeleteCardSubmit = (cardEvent) => {
  api.deleteCard(cardEvent.target.closest(".card").id)
    .then((result) => {
      console.log(result)
      cardEvent.target.closest(".card").remove();
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleFormEditSubmit = (newUserData) => {
  saving(popupFormEditElement, true)

  api.updateUser(newUserData)
    .then((result) => {
      console.log(result)
      userInfo.setUserInfo(newUserData)
      saving(popupFormEditElement, false)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleFormAddSubmit = (newUserData) => {
  saving(popupFormAddElement, true)

  api.addCard(newUserData)
    .then((result) => {
      console.log(result)
      const newCard = createCard(result)
      cardsContainerElement.prepend(newCard)
      saving(popupFormAddElement, false)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleChangeAvatar = (newAvatarObj) => {
  saving(popupChangeAvatarElement, true)

  api.changeProfilePic(newAvatarObj)
    .then((result) => {
      console.log(result)
      profileAvatarElement.style.backgroundImage = `url(${newAvatarObj.avatar})`
      saving(popupChangeAvatarElement, false)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);
formEditValidator.enableValidation();
formAddValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupFormEditElement, handleFormEditSubmit)
const popupAddCard = new PopupWithForm(popupFormAddElement, handleFormAddSubmit)
const popupChangeAvatar = new PopupWithForm(popupChangeAvatarElement, handleChangeAvatar)

editProfileBtnElement.addEventListener('click', () => {
  formEditValidator.resetInputError(formEditElement)
  inputPopupFormEditContent()
  popupEditProfile.open()
});

addCardBtnElement.addEventListener('click', () => {
  formAddValidator.resetInputError(formAddElement)
  popupAddCard.open();
})

profileAvatarElement.addEventListener('click', () => {
  popupChangeAvatar.open()
})

const initializeCards = (data) => {
  console.log(data)
  const cardList = new Section({
    items: data,
    renderer: (item) => {
      const card = createCard(item)
      cardList.addItem(card)
    }
  }, cardsContainerElement)
  cardList.renderItems()
}

const initializeUser = (data) => {
  console.log(data)
  profileAvatarElement.style.backgroundImage = `url(${data.avatar})`
  userInfo.setUserInfo(data)
}

//Immediate Rejection Handling
Promise.all([
  api.getInitialCards()
    .catch(error => {
      return (`Error: ${error}`)
    }),
  api.getUserData()
    .catch(error => {
      return (`Error: ${error}`)
    })
])
  .then(data => {
    initializeCards(data[0])
    initializeUser(data[1])
  })
