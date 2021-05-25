const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
const popupImg = document.querySelector(".popup__img");
const popupImgCaption = document.querySelector(".popup__img-caption");

const _closeByEsc = (event) => {
  if (event.key === "Escape") closePopup()
}

const _closeOnOverlay = (event) => {
  if (event.target.classList.contains('popup_opened')) closePopup()
};

export const closePopup = () => {
  const activePopup = document.querySelector('.popup_opened').classList
  activePopup.remove('popup_opened')
  document.removeEventListener('keydown', _closeByEsc)
  document.removeEventListener('click', _closeOnOverlay)
}

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', _closeByEsc)
  document.addEventListener('click', _closeOnOverlay)
}

export const openCardPreview = (event) => {
  popupImg.src = ''
  openPopup(popupViewImageElement)
  popupImg.src = event.target.src
  popupImgCaption.textContent = (event.target.parentElement).querySelector(".card__title").textContent
  popupImg.alt = (event.target.parentElement).querySelector(".card__title").textContent
}
