export const settingsForValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
};

export const settingsForApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'f438dcb5-8fef-4aba-b8aa-e100fa71cd0a',
    'Content-Type': 'application/json'
  }
}
