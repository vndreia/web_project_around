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
  console.log(`Verificando: ${input.id}, válido: ${input.validity.valid}`);
  if (input.validity.valid) {
    hideError(input, config);
    input.classList.remove(config.inputErrorClass); //Cleans up error class
  } else {
    showError(input, config);
    input.classList.add(config.inputErrorClass); //Highlights the wrong input
  }
};

const toggleButtonState = (formElement, button, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector)); //Array allow us to verify each input
  const isValid = inputs.every((input) => input.validity.valid); //Checks if all inputs are valid

  if (isValid) {
    button.disabled = false; //Enables the button
    button.classList.remove(config.inactiveButtonClass); //Removes the class that disables the button
  } else {
    button.disabled = true; //Disables the button
    button.classList.add(config.inactiveButtonClass); //Adds the class that disables the button
  }
};

const setEventListeners = (formElement, config) => {
  const inputs = formElement.querySelectorAll(config.inputSelector); //When I select that, a NodeList is created
  const button = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(formElement, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      toggleButtonState(formElement, button, config);
    });
  });
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
};

export { enableValidation };
//This tells the browser it's ok to import this function in other files
