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
  formAdd,
  addPlaceInput,
  addLinkInput,
  closeAddButton,
} from "./utils.js"; //Goes a the top and mixes functions and vars
import { Card } from "../components/Card.js"; //Importing the class Card
import { FormValidator } from "../components/FormValidator.js"; //Importing the class FormValidator
import { Section } from "../components/Section.js"; //Importing the class Section

//Instantiate is saved in a const
/*initialCards.forEach((card) => {
  const newCard = new Card(card, cardTemplate);
  const newNode = newCard._renderCard();
  cardsZone.appendChild(newNode);
});*/

//This is the renderer function!!!!!!! that will show the cards in the section
//Card is passed as a new instance inside the Section class
//Notice how the new Section instance takes three parameters: items, renderer, and container
const section = new Section(
  initialCards,
  (card) => {
    const newCard = new Card(card, cardTemplate);
    return newCard._renderCard();
  },
  cardsZone
);

section.renderItems(); //Calling the renderItems method to render all cards

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
  popupProfile.classList.remove("popup_opened"); // Cerrar el popup después de enviar el formulario
}

//Eventos
formElement.addEventListener("submit", handleSubmit); // Aquí estamos escuchando el evento submit del formulario
console.log(editName, editJob);

//This notation is hard, but makes the code reusable:
const formValidator = new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "popup__error_visible",
});

formValidator._enableValidation();
//Add image popup
function handleForm(evt) {
  evt.preventDefault();
  const name = addPlaceInput.value;
  const link = addLinkInput.value;

  if (!name || !link) {
    alert("Por favor, completa los campos");
    return;
  }
  //Aquí siento que tengo que cambiar algo pero no sé qué
  const cardData = { name, link };
  const newCard = new Card(cardData, cardTemplate);
  const newNode = newCard._renderCard();
  cardsZone.prepend(newNode);

  formAdd.reset(); // Limpia inputs
  closeAddPopup(); // Cierra el popup
}

formAdd.addEventListener("submit", handleForm);
addButton.addEventListener("click", openAddPopup);

closeAddButton.addEventListener("click", closeAddPopup);
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
