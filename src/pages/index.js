/*******************************************************************
  Import css for webpack to read.
 ******************************************************************/
import "./index.css"

/*******************************************************************
  Import const and utils.
 ******************************************************************/

import { profileTitleElement, profileSubtitleElement, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, cardTemplate, popupDeleteCardElement, profileAvatarElement, popupFormChangeAvatarElement, formChangeAvatarElement } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'
import { loadingText } from '../utils/loading.js'

/*******************************************************************
  Import Method Classes.
 ******************************************************************/

import API from '../components/Api.js';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithDelete from '../components/PopupWithDelete.js'

/*******************************************************************
  Setting API request url and header.
 ******************************************************************/

const api = new API(
  "https://around.nomoreparties.co/v1/", {
  method: "GET",
  headers: {
    authorization: "e09604a5-57aa-4b20-9a83-ea66e5c6924b",
    "Content-Type": "application/json"
  }
})

/*******************************************************************
  Main functions.
 ******************************************************************/

const popupWithImage = new PopupWithImage(popupViewImageElement);
const userInfo = new UserInfo(profileTitleElement, profileSubtitleElement, profileAvatarElement)

const handleCardClickCallbackFn = (event) => {
  popupWithImage.open(event)
}

const handleTrashClickCallbackFn = (cardId) => {
  popupWithDelete.open(cardId)
}

const createCard = ({ name, link, _id, likes, owner }) => {
  const userId = userInfo.getUserId()
  const cardElement = new Card({
    name, link, _id, likes, owner, handleCardClickCallbackFn, handleTrashClickCallbackFn,
    handleLikeClickCallbackFn: (event) => {
      const cardId = event.target.closest(".card").id
      !(event.target.classList.contains("card__like_active"))
        ? api.addLike(cardId)
          .then((res) => {
            cardElement.addLikes(res, event)
          })
          .catch(err => {
            console.log(`Error: ${err}`)
          })
        : api.removeLike(cardId)
          .then((res) => {
            cardElement.removeLikes(res, event)
          })
          .catch(err => {
            console.log(`Error: ${err}`)
          })
    }
  }, userId, cardTemplate)
  return cardElement.generateCard()
}

const createSection = (cardData, prepend = true) => {
  const section = new Section({
    items: cardData,
    renderer: (item) => {
      const card = createCard(item)
      prepend
        ? section.addNewItem(card)
        : section.addInitialItem(card)
    }
  }, cardsContainerElement)
  return section
}

const handleFormEditSubmit = (newUserData) => {
  loadingText(popupFormEditElement, true)
  api.updateUser(newUserData)
    .then((result) => {
      userInfo.setUserInfo(result)
      loadingText(popupFormEditElement, false)
      popupEditProfile.close()
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleFormAddSubmit = (newUserData) => {
  loadingText(popupFormAddElement, true)
  api.addCard(newUserData)
    .then((res) => {
      createSection(res).renderItems()
      popupAddCard.close()
      loadingText(popupFormAddElement, false)
    }).catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleChangeAvatar = (newAvatarObj) => {
  loadingText(popupFormChangeAvatarElement, true)
  api.changeProfilePic(newAvatarObj)
    .then((result) => {
      profileAvatarElement.style.backgroundImage = `url(${result.avatar})`
      popupChangeAvatar.close()
      loadingText(popupFormChangeAvatarElement, false)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleDeleteCallbackFn = () => {
  const cardId = popupWithDelete.cardId;
  api.deleteCard(cardId)
    .then(() => {
      document.getElementById(`${popupWithDelete.cardId}`).remove()
      popupWithDelete.close();
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

/*******************************************************************
  Form Validators.
 ******************************************************************/

const formEditValidator = new FormValidator(validationConfig, popupFormEditElement);
const formAddValidator = new FormValidator(validationConfig, popupFormAddElement);
const formChangeAvatar = new FormValidator(validationConfig, popupFormChangeAvatarElement);
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formChangeAvatar.enableValidation();

/*******************************************************************
  Set EventListeners - Popup With Forms + confirm Deletetion.
 ******************************************************************/

const popupEditProfile = new PopupWithForm(popupFormEditElement, handleFormEditSubmit)
const popupAddCard = new PopupWithForm(popupFormAddElement, handleFormAddSubmit)
const popupChangeAvatar = new PopupWithForm(popupFormChangeAvatarElement, handleChangeAvatar)
const popupWithDelete = new PopupWithDelete(popupDeleteCardElement, handleDeleteCallbackFn)
popupEditProfile.setEventlisteners()
popupAddCard.setEventlisteners()
popupChangeAvatar.setEventlisteners()
popupWithDelete.setEventlisteners()

editProfileBtnElement.addEventListener('click', () => {
  formEditValidator.resetErrorMessage(formEditElement)
  userInfo.setPopupInput(popupInputTypeName, popupInputTypeJob)
  popupEditProfile.open()
});

addCardBtnElement.addEventListener('click', () => {
  formAddValidator.resetErrorMessage(formAddElement)
  popupAddCard.open();
})

profileAvatarElement.addEventListener('click', () => {
  formAddValidator.resetErrorMessage(formChangeAvatarElement)
  popupChangeAvatar.open()
})

/*******************************************************************
  Initialize cards and user info.
 ******************************************************************/

const initializeCards = (cardData) => {
  createSection(cardData, false).renderItems()
}

const initializeUser = (data) => {
  userInfo.setUserInfo(data)
  userInfo.setAvatar(data)
  userInfo.setUserId(data)
}

/*******************************************************************
  Server Request - cards and user info.
 ******************************************************************/

Promise.all([
  api.getInitialCards(),
  api.getUserData()
])
  .then(data => {
    initializeUser(data[1])
    return data
  }).catch(error => {
    return (`Error: ${error}`)
  })
  .then((data) => {
    initializeCards(data[0])
  }).catch(error => {
    return (`Error: ${error}`)
  })

