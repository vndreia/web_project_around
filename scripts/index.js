//Popup ---> 1. Select DOM elements
import {
  openProfileButton,
  popupProfile,
  closeProfileButton,
  popupAddPlace,
  addButton,
  initialCards,
  cardTemplate,
  cardsZone,
  closeAddButton,
  addPlaceInput,
  addLinkInput,
  imageContainer,
  imagePopupCloseButton,
} from "./utils.js"; //Goes a the top and mixes functions and vars
import { Card } from "../components/Card.js"; //Importing the class Card
import { FormValidator } from "../components/FormValidator.js"; //Importing the class FormValidator
import { Section } from "../components/Section.js"; //Importing the class Section
import { PopupWithForm } from "../components/PopupWithForms.js"; //Importing the class PopupWithForm
//Instantiate is saved in a const
import { PopupWithImage } from "../components/PopupWithImage.js"; //Importing the class PopupWithImage
//RENDER CARDS
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

//FORMS
const profilePopup = new PopupWithForm(popupProfile, (values) => {
  handleForm(values); //Values was passed from the PopupWithForm class in the _getInputValues method, so the function executes after the form is submitted
});
profilePopup.setEventListeners(); //Setting event listeners for the profile popup

//Edit profile form //ESTO DEBERÍA ESTAR EN UTILS?
const formElement = document.querySelector(".form");
const inputName = document.querySelector(".form__input-type-name");
const inputJob = document.querySelector(".form__input-type-about");
const editName = document.querySelector(".main-bar__title"); ///????
const editJob = document.querySelector(".main-bar__paragraph"); //COMO AGREGO LOS CAMBIOS AQUÍ??

function handleForm(values) {
  console.log(values, "values"); //Logs the values from the form inputs
  if (values) {
    editName.textContent = values.name; //Updates the input values in the form
    editJob.textContent = values.about; //Updates the input values in the form

    profilePopup.close(); // Cerrar el popup después de actualizar
  }
}

//Open profile popup
openProfileButton.addEventListener("click", () => {
  profilePopup.open(); //Opens the profile popup when the button is clicked
});
//Close profile popup
closeProfileButton.addEventListener("click", () => {
  profilePopup.close(); //Closes the profile popup when the close button is clicked
});

//Add place form
const addPlacePopup = new PopupWithForm(popupAddPlace, (values) => {
  handlePlace(values);
});
addPlacePopup.setEventListeners(); //Setting event listeners for the add place popup

function handlePlace(values) {
  const formattedValues = { name: values.place, link: values.link };
  const newCard = new Card(formattedValues, cardTemplate);
  const cardImage = newCard._renderCard();
  section.addItem(cardImage); //Adds the new card to the section
  addPlacePopup.close(); // Closes the popup after adding the card
  addPlaceInput.value = ""; //"" empty space
  addLinkInput.value = ""; //Resets the input values after adding the card
}

//Open and close popupAddPlace
addButton.addEventListener("click", () => {
  addPlacePopup.open();
});

closeAddButton.addEventListener("click", () => {
  addPlacePopup.close();
});

//Show image popup
export const imagePopup = new PopupWithImage(imageContainer);

imagePopup.close();

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
