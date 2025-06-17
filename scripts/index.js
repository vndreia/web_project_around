//Popup ---> 1. Select DOM elements
const popupButton = document.querySelector(".main-bar__button-type-form");
const popup = document.querySelector(".popup-edit-profile");
const popupClose = document.querySelector(".popup__button-close");

// ---> 2. Manipulate elements
//Edit info popup
function openPopUp() {
  popup.classList.add("popup_opened"); //Adds the class to popup, not the button
}
popupButton.addEventListener("click", openPopUp); //Adds the event to the button, not the class

//Close popup
function closePopUp() {
  popup.classList.remove("popup_opened");
}
//Here goes the esc to close popup
popupClose.addEventListener("click", closePopUp);
document.addEventListener("keydown", (evt) => {
  //Remember evt.keys work only in the whole document, not in a specific element
  if (evt.key === "Escape") {
    closePopUp();
  }
});
popup.addEventListener("click", (evt) => {
  closePopUp();
});
// ---> 3. Create events

//Form de edit
const formElement = document.querySelector(".form");
console.log(formElement);
const inputName = document.querySelector(".form__input-type-name");
console.log(inputName);
const inputJob = document.querySelector(".form__input-type-about");
console.log(inputJob);
const editName = document.querySelector(".main-bar__title");
console.log(editName);
const editJob = document.querySelector(".main-bar__paragraph");
console.log(editJob);
//Manipulation
function handleSubmit(evt) {
  evt.preventDefault(); // Previene el comportamiento por defecto del formulario (que recargue la página)

  const name = inputName.value; // Obtener el valor del campo 'name'
  const job = inputJob.value; // Obtener el valor del campo 'about'

  editName.textContent = name; // Actualizar el nombre en la parte visible
  editJob.textContent = job; // Actualizar el 'about' en la parte visible
  popup.classList.remove("popup_opened"); // Cerrar el popup después de enviar el formulario
}

//Eventos
formElement.addEventListener("submit", handleSubmit); // Aquí estamos escuchando el evento submit del formulario
console.log(editName, editJob);

import { enableValidation } from "./validate.js"; //Importing the validation function
//This notation is a pain in the *** but it makes the code reusable:
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "popup__error_visible",
});
