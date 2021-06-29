import "./index.css"

// import { initialCards } from '../utils/data-card.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { profileTitleElement, profileSubtitleElement, popupElementList, popupFormEditElement, popupFormAddElement, formEditElement, formAddElement, popupViewImageElement, editProfileBtnElement, addCardBtnElement, cardsContainerElement, popupInputTypeName, popupInputTypeJob, cardTemplate, popupDeleteCardElement, profileAvatarElement, popupChangeAvatarElement } from '../utils/constants.js'
import { validationConfig } from '../utils/validate-selector.js'
import { loadingText } from '../utils/loading.js'

import API from '../components/Api.js';
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import Popup from '../components/Popup.js'
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
      console.log(result)
      userInfo.setUserInfo(newUserData)
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
      console.log(res)
      loadingText(popupFormAddElement, false)
      createSection(res).renderItems()
      popupAddCard.close()
    }).catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleChangeAvatar = (newAvatarObj) => {
  loadingText(popupChangeAvatarElement, true)
  api.changeProfilePic(newAvatarObj)
    .then(() => {
      profileAvatarElement.style.backgroundImage = `url(${newAvatarObj.avatar})`
      loadingText(popupChangeAvatarElement, false)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const handleDeleteCallbackFn = () => {
  api.deleteCard(cardId)
    .then(() => {
      document.getElementById(`${popupWithDelete.cardId}`).remove()
      popupWithDelete.close();
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

const setInputPopupFormEdit = () => {
  popupInputTypeName.value = profileTitleElement.textContent
  popupInputTypeJob.value = profileSubtitleElement.textContent
}

/*******************************************************************
  Form Validators
 ******************************************************************/

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);
formEditValidator.enableValidation();
formAddValidator.enableValidation();


/*******************************************************************
  Popup With Forms + confirm Deletetion
 ******************************************************************/

const popupEditProfile = new PopupWithForm(popupFormEditElement, handleFormEditSubmit)
const popupAddCard = new PopupWithForm(popupFormAddElement, handleFormAddSubmit)
const popupChangeAvatar = new PopupWithForm(popupChangeAvatarElement, handleChangeAvatar)
const popupWithDelete = new PopupWithDelete(popupDeleteCardElement, handleDeleteCallbackFn)

/*******************************************************************
  Set EventListeners on Static Buttons.
 ******************************************************************/

Array.from(popupElementList).forEach(popupElement => {
  new Popup(popupElement).setEventlisteners();
})

editProfileBtnElement.addEventListener('click', () => {
  formEditValidator.resetErrorMessage(formEditElement)
  setInputPopupFormEdit()
  popupEditProfile.open()
});

addCardBtnElement.addEventListener('click', () => {
  formAddValidator.resetErrorMessage(formAddElement)
  popupAddCard.open();
})

profileAvatarElement.addEventListener('click', () => {
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
  popupInputTypeName.value = data.name
  popupInputTypeJob.value = data.job
}

/*******************************************************************
  Immediate Reject Handling
 ******************************************************************/

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
    initializeUser(data[1])
    return data
  })
  .then((data) => {
    initializeCards(data[0])
  })

