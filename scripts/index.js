//Popup ---> 1. Select DOM elements
import {
  openProfilePopup, //Esta se va???
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
import { PopupWithForm } from "../components/PopupWithForms.js"; //Importing the class PopupWithForm
//Instantiate is saved in a const

//This is the renderer function that will show the cards in the section
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

//Instantiate 2 PopupWithForm classes
const profilePopup = new PopupWithForm(popupProfile, handleForm);
profilePopup.setEventListeners(); //Setting event listeners for the profile popup
const addPlacePopup = new PopupWithForm(popupAddPlace, handleForm);

//Edit profile form //ESTO DEBERÍA ESTAR EN UTILS?
const formElement = document.querySelector(".form");
const inputName = document.querySelector(".form__input-type-name");
const inputJob = document.querySelector(".form__input-type-about");
const editName = document.querySelector(".main-bar__title");
const editJob = document.querySelector(".main-bar__paragraph");

//Manipulation
function handleForm(values) {
  //HELP  esto solo es el handle form del profilePopup, no del addPlacePopup //Cómo funciona??
  inputName.textContent = values.name; //Updates the input values in the form
  inputJob.textContent = values.job; //Updates the input values in the form
  profilePopup.close(); // Cerrar el popup después de actualizar
}
//Open profile popup
openProfileButton.addEventListener("click", () => {
  profilePopup.open(); //Opens the profile popup when the button is clicked
});
//Close profile popup
closeProfileButton.addEventListener("click", () => {
  profilePopup.close(); //Closes the profile popup when the close button is clicked
});

//Eventos

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

//Add image popup  //ESTÁ SERÍA LA HANDLEDATA
function handleImageForm(evt) {
  evt.preventDefault();
  const name = addPlaceInput.value;
  const link = addLinkInput.value;

  if (!name || !link) {
    alert("Por favor, completa los campos");
    return;
  }
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
