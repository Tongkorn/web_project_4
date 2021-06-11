export const profileElement = document.querySelector('.profile')
export const editProfileBtnElement = profileElement.querySelector('.profile__edit-btn')
export const addCardBtnElement = profileElement.querySelector('.profile__add-btn')
export const profileTitleElement = profileElement.querySelector('.profile__name');
export const profileSubtitleElement = profileElement.querySelector('.profile__job');
export const popupFormAddElement = document.querySelector('[data-form="popup__form_add"]')
export const formAddElement = popupFormAddElement.querySelector('form');
export const popupFormEditElement = document.querySelector('[data-form="popup__form_edit"]');
export const formEditElement = popupFormEditElement.querySelector('form');
export const popupInputTypeName = document.querySelector('.popup__input_type_name');
export const popupInputTypeJob = document.querySelector('.popup__input_type_job');
export const popupInputTypeImgTitle = document.querySelector('.popup__input_type_img-title')
export const popupInputTypeLink = document.querySelector('.popup__input_type_link');
export const closeBtnList = Array.from(document.querySelectorAll('.popup__btn_type_close'));
// export const closeBtnTag ='.popup__btn_type_close';
export const cardsContainerElement = document.querySelector(".cards");
export const cardTemplate = document.querySelector("#card-template").content;


export const popupViewImageElement = document.querySelector('[data-image="popup__view_image"]')
export const popupImg = document.querySelector(".popup__img");
export const popupImgCaption = document.querySelector(".popup__img-caption");
