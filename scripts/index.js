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
  profileImage,
} from "./utils.js"; //Import goes a the top and can mix functions and vars
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/api.js";
//Instantiate is always saved in a const
//imagePopup2 is created before imagePopup, because its functionality is to open the image popup when a card is clicked
//This means imagePopup2 has to be created before any card is created, so the function can be passed as a parameter when creating a new Card instance
const imagePopup2 = new PopupWithImage(imageContainer);
let section = null; //Needed a section variable to use different Section instances
//We will use this instance to render the cards from the server
//RENDER CARDS
//This is the renderer function that will show the cards in the section
//Card is passed as a new instance inside the Section class
//Notice how the new Section instance takes three parameters: items, renderer, and container
//The renderer function is passed as a callback with data, title, and title2 parameters as link, altText and title
//The renderer function is responsible for creating a new Card instance and returning the rendered card element
api.getInitialCards().then((cards) => {
  console.log(cards, "-----> cards from server");
  section = new Section( //This is where I create the Section instance for the 1st time and reuse it to render the cards from the server
    cards, //Here's where I changed initialCards to cards to load from server
    (card) => {
      const newCard = new Card(card, cardTemplate, (data, title, title2) =>
        imagePopup2.open(data, title, title2)
      ); //Se pasa la función que abre el popup
      return newCard._renderCard();
    },
    cardsZone
  );
  section.renderItems(); //Calling the renderItems method to render all cards
});

//FORMS
//UserInfo
//Since I used an object for the constructor, I must pass an object in the parameter
const userInfo = new UserInfo({
  nameSelector: editName,
  jobSelector: editJob,
  imageSelector: profileImage,
}); //Instantiating UserInfo class with the selectors for name and job}){
userInfo.setUserInfo({ name: "Andrea", job: "Web Developer" }); //Setting initial user info
userInfo.getUserInfo(); //This method is empty because it doesn't take any parameters, it just returns the user info from the selectors
//We use the api instance to get user info from the server:
api.getUserInfo().then((data) => {
  //Makes a server request
  userInfo.setUserInfo({
    name: data.name,
    job: data.about,
    image: data.avatar,
  }); // Server responds: "Name is John, job is Developer", userInfo is choosing which specific data to pick from the server response and show on your webpage.
  console.log(data, "----> data"); //Logging the data received from the server
});

//Profile form
const profilePopup = new PopupWithForm(popupProfile, (values) => {
  // handleForm(values); //Values was passed from the PopupWithForm class in the _getInputValues method, so the function executes after the form is submitted
  api.editProfile(values).then((values) => {
    console.log(values, "-----> updated values from my server");
  });
  userInfo.setUserInfo({
    name: values.name,
    job: values.about,
    image: values.image,
  });
  profilePopup.close(); //Sets the user info with the values from the form
});
profilePopup.setEventListeners(); //Setting event listeners for the profile popup
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
  const formattedValues = { name: values.place, link: values.link }; // values.place ← comes from name="place" and values.link ← comes from name="link" in the form inputs
  //Now before calling the API, we need to format the values to match the API requirements, cuz the API expects an object with name and link properties
  api.addNewCard(formattedValues).then((card) => {
    console.log(card, "-----> new card from my server");
    const newCard = new Card(card, cardTemplate); //changed formattedValues to newCard to show the card created in the server with its ID
    const cardImage = newCard._renderCard();
    section.addItem(cardImage); //Adds the new card to the section
    addPlacePopup.close(); // Closes the popup after adding the card
    addPlaceInput.value = ""; //"" empty space
    addLinkInput.value = ""; //Resets the input values after adding the card
  });
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
