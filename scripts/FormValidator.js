
export class FormValidator {
 constructor(config) { //Config is the 'template' and formElement is any form to select
 this.config = config;
 }

 _showError = (input) => {
  const errorElement = document.querySelector(`#${input.id}-error`); //Template literal selects a dynamic ID linked to span
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(this.config.errorClass); //errorClass is a property from the 'config' obj
};

_hideError = (input) => {
  const errorElement = document.querySelector(`#${input.id}-error`); //Template literal selects a dynamic ID linked to span
  errorElement.textContent = ""; //Empty string to reset the validationMessage set by default
  errorElement.classList.remove(this.config.errorClass);
};

 _checkInputValidity = (input) => { 
  if (input.validity.valid) {
    this._hideError(input);
    input.classList.remove(this.config.inputErrorClass);
  } else {
    this._showError(input); 
    input.classList.add(this.config.inputErrorClass); 
  }
};

_toggleButtonState = (formElement, button) => { 
  const inputs = Array.from(formElement.querySelectorAll(this.config.inputSelector)); //Array allow us to verify each input
  const isValid = inputs.every((input) => input.validity.valid); //Checks if all inputs are valid

  if (isValid) {
    button.disabled = false; //Enables the button
    button.classList.remove(this.config.inactiveButtonClass); //Removes the class that disables the button
  } else {
    button.disabled = true; //Disables the button
    button.classList.add(this.config.inactiveButtonClass); //Adds the class that disables the button
  }
};

_setEventListeners = (formElement) => {
  const inputs = formElement.querySelectorAll(this.config.inputSelector); //When I select that, a NodeList is created
  const button = formElement.querySelector(this.config.submitButtonSelector);
  this._toggleButtonState(formElement, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => { //Input is the event that appears when the user writes in a input
      this._checkInputValidity(input);
      this._toggleButtonState(formElement, button);
    });
  });
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
};

_enableValidation = () => {
  const forms = document.querySelectorAll(this.config.formSelector); //Access to the form template
  forms.forEach((form) => {
    this._setEventListeners(form);
  });

}
}