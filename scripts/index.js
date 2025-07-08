//Popup ---> 1. Select DOM elements
import {
  openProfilePopup,
  openProfileButton,
  popupProfile,
  closeProfilePopup,
  closeProfileButton,
  popupAddPlace,
  openAddPopup,
  closeAddPopup,
  addButton,
  initialCards,
  cardTemplate,
  cardsZone,
} from "./utils.js"; //Goes a the top and mixes functions and vars
import { enableValidation } from "./FormValidator.js"; //Importing the validation function
import { Card } from "./cards.js";


//Instantiate is saved in a const
initialCards.forEach((card) => {
  const newCard = new Card(card, cardTemplate);
  const newNode = newCard._renderCard();
  cardsZone.appendChild(newNode); 
});

openProfileButton.addEventListener("click", openProfilePopup); //Adds the event to the button, not the class

closeProfileButton.addEventListener("click", closeProfilePopup);
document.addEventListener("keydown", (evt) => {
  //Remember evt.keys work only in the whole document, not in a specific element
  if (evt.key === "Escape") {
    closeProfilePopup();
  }
});
popupProfile.addEventListener("click", (evt) => {
  if (evt.target === popupProfile) {
    closeProfilePopup();
  }
});

//Edit profile form
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

//This notation is hard, but makes the code reusable:
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "popup__error_visible",
});

//Add image popup
function handleForm(evt) {
  evt.preventDefault();
  const name = addPlaceInput.value;
  const link = addLinkInput.value;

  if (!name || !link) {
    alert("Por favor, completa los campos");
    return;
  }
  const cardData = { name, link };
  const card = createCard(cardData);
  cardsZone.appendChild(card);

  formAdd.reset(); // Limpia inputs
  closePopup(); // Cierra el popup
}

formAdd.addEventListener("submit", handleForm);
addButton.addEventListener("click", openAddPopup);

buttonClose.addEventListener("click", closeAddPopup);
popupAddPlace.addEventListener("click", (evt) => {
  if (evt.target === popupAddPlace) {
    closeAddPopup();
  }
});
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeAddPopup();
  }
});
