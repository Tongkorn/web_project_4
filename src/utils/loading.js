export const loadingText = (popupElement, isSaving) => {
  const element = popupElement.querySelector('.popup__btn_type_save')
  if (isSaving) {
    element.innerHTML = element.getAttribute("data-text-saving")
  } else {
    element.innerHTML = element.getAttribute("data-text-original")
  }
}

