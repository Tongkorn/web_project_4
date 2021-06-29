import "./index.css"

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { getInitialCards, getUserData, updateUser, addCard, deleteCard, addLike, removeLike, changeProfilePic } from '../utils/api.js'
import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, cardTemplate, popupDeleteCardElement, profileAvatarElement, popupChangeAvatarElement } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'

import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithDelete from "../components/PopupWithDelete.js"

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
      })
    },
    handleLikeClick: (event) => {
      if (!(event.target.classList.contains("card__like_active"))) {
        addLike(event.target.closest(".card").id)
          .then(res => {
            event.target.classList.toggle('card__like_active');
            event.target.closest(".card").querySelector('.card__like-total').textContent = parseInt(event.target.closest(".card").querySelector('.card__like-total').textContent) + 1
          })
          .catch(err => {
            console.log(`Error: ${err}`)
          })
      } else if (event.target.classList.contains("card__like_active")) {
        removeLike(event.target.closest(".card").id)
          .then(res => {
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
  deleteCard(cardEvent.target.closest(".card").id)
    .then((result) => {
      cardEvent.target.closest(".card").remove();
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleFormEditSubmit = (newUserData) => {
  saving(popupFormEditElement, true)

  updateUser(newUserData)
    .then((result) => {
      userInfo.setUserInfo(newUserData)
      saving(popupFormEditElement, false)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleFormAddSubmit = (newUserData) => {
  saving(popupFormAddElement, true)

  addCard(newUserData)
    .then((result) => {
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

  changeProfilePic(newAvatarObj)
    .then((result) => {
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

getInitialCards()
  .then((res) => {
    const cardList = new Section({
      items: res,
      renderer: (item) => {
        const card = createCard(item)
        cardList.addItem(card)
      }
    }, cardsContainerElement)
    cardList.renderItems()
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })

getUserData()
  .then((res) => {
    profileAvatarElement.style.backgroundImage = `url(${res.avatar})`
    userInfo.setUserInfo(res)
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })
