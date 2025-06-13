/*En lugar de seleccionar manualmente los inputs y botones fuera de la función, los seleccionas dentro de enableValidation() 
usando los selectores que recibes como parámetros. Eso hace tu función mucho más reutilizable y elegante.*/


enableValidation({
  formSelector: ".form__add",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "popup__error"
});

const showError = (input, config) => {

}

const hideError = (input, config) => {

}

const checkInputValidity = (input, config) => {

}

const toggleButtonState = (form, button, config) => {

}

const setEventListeners = (form, config ) => {

}