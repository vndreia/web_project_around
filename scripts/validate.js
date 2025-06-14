/*En lugar de seleccionar manualmente los inputs y botones fuera de la función, los seleccionas dentro de enableValidation() 
usando los selectores que recibes como parámetros. Eso hace tu función mucho más reutilizable y elegante.*/
//The function to show the default browser error message:
const showError = (input, config) => {
  const errorElement = document.querySelector(`#${input.id}-error`); //Template literal selects a dynamic ID linked to span
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass); //errorClass is a property from the 'config' obj
};

const hideError = (input, config) => {
  const errorElement = document.querySelector(`#${input.id}-error`); //Template literal selects a dynamic ID linked to span
  errorElement.textContent = ""; //Empty string to reset the validationMessage set by default
  errorElement.classList.remove(config.errorClass); 
};

//Function that verifies inputs validity
const checkInputValidity = (input, config) => {
  if (input.validity.valid) {
    hideError(input, config)
  } else {
    showError(input, config);
  }
};

const toggleButtonState = (form, button, config) => {};

const setEventListeners = (formElement, config) => {
  const inputs = formElement.querySelectorAll(config.inputSelector); //When I select that, a NodeList is created
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
};

enableValidation({
  formSelector: ".form__add",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "popup__error_visible",
});

