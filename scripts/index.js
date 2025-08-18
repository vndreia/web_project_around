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
  editName,
  editJob,
} from "./utils.js"; //Import goes a the top and can mix functions and vars
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
//Instantiate is always saved in a
//imagePopup2 is created before imagePopup, because its functionality is to open the image popup when a card is clicked
//This means imagePopup2 has to be created before any card is created, so the function can be passed as a parameter when creating a new Card instance
const imagePopup2 = new PopupWithImage(imageContainer);
//RENDER CARDS
//This is the renderer function that will show the cards in the section
//Card is passed as a new instance inside the Section class
//Notice how the new Section instance takes three parameters: items, renderer, and container
//The renderer function is passed as a callback with data, title, and title2 parameters as link, altText and title
//The renderer function is responsible for creating a new Card instance and returning the rendered card element
const section = new Section(
  initialCards,
  (card) => {
    const newCard = new Card(card, cardTemplate, (data, title, title2) =>
      imagePopup2.open(data, title, title2)
    ); //Se pasa la función que abre el popup
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

//UserInfo
//Since I used an object for the constructor, I must pass an object in the parameter
const userInfo = new UserInfo({ nameSelector: editName, jobSelector: editJob }); //Instantiating UserInfo class with the selectors for name and job}){
userInfo.setUserInfo({ name: "Andrea", job: "Web Developer" }); //Setting initial user info
userInfo.getUserInfo(); //This methos is empty because it doesn't take any parameters, it just returns the user info from the selectors

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
imagePopup.setEventListeners(""); //Setting event listeners for the image popup
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
