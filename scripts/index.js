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
  popupDeleteCard,
  deleteConfirmationBtn,
  closeDeletePopup,
  cardElement,
  avatarContainer,
  closeAvatarBtn,
  editProfileAvatarBtn,
  saveAvatarBtn,
} from "./utils.js"; //Import goes a the top and can mix functions and vars
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupAvatar } from "../components/PopupAvatar.js";
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
function addCards() {
  api.getInitialCards().then((cards) => {
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
}

addCards();
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

//EDIT PROFILE FORM
//We create a new instance of PopupWithForm for the profile popup
//We pass the popupProfile selector and a function to handle the form submission
//The function takes the values from the form and sets the user info
//We also call the api method to update the user info on the server
const profilePopup = new PopupWithForm(popupProfile, (values) => {
  // handleForm(values); //Values was passed from the PopupWithForm class in the _getInputValues method, so the function executes after the form is submitted
  api.editProfile(values).then((values) => {});
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

//AVATAR POPUP
const handleUpdateAvatar = (url) => {
  api
    .changeAvatar({ avatar: url }) // ← Pass as object with 'avatar' key
    //  //RESTful APIs typically expect structured data like { key: value }
    .then((res) => console.log(res, "-----> response from changing avatar"))
    .then((userData) => {
      const imageAvatar = document.querySelector(".main-bar__image");
      imageAvatar.src = userData.avatar;
      avatarContainer.close();
    })
    .catch((err) => console.log(err, "-----> error changing avatar"));
};

const avatarPopup = new PopupAvatar(
  avatarContainer,
  saveAvatarBtn,
  closeAvatarBtn,
  handleUpdateAvatar
);

editProfileAvatarBtn.addEventListener("click", () => {
  avatarPopup.open();
});

avatarPopup.setEventListeners(); //Setting event listeners for the avatar popup

//ADD PLACE FORM
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

//IMAGE POPUP
export const imagePopup = new PopupWithImage(imageContainer);
imagePopup.setEventListeners(""); //Setting event listeners for the image popup
imagePopup.close();

//DELETE CARD POPUP
function handleDeletePopup(cardId, cardElement) {
  console.log(cardElement, "<--- Card Element");
  //when you click a delete button, your app needs to tell the API which card. That’s why we pass cardId down into handleDelete.
  return api.deleteCard(cardId).catch((err) => {
    console.log(err, "-----> error deleting card");
  });
}

export const deleteCardPopup = new PopupWithConfirmation(
  popupDeleteCard,
  deleteConfirmationBtn,
  closeDeletePopup,
  handleDeletePopup,
  addCards
);

deleteCardPopup.setEventListeners(); //Setting event listeners for the delete card popu

//FORM VALIDATION
//Create a new instance of FormValidator
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
