//PROFILE POPUP
export const openProfileButton = document.querySelector(
  ".main-bar__button-type-form"
); //Edit profile
export const popupProfile = document.querySelector(".popup-edit-profile"); //Edit profile
export const closeProfileButton = document.querySelector(
  ".popup__button-close-profile"
); //Edit profile
export const editName = document.querySelector(".main-bar__title");
export const profileImage = document.querySelector(".main-bar__image");
export const editJob = document.querySelector(".main-bar__paragraph");
export const cardTemplate = document.querySelector("#card__template").content; //se accede al contenido del template seleccionado
export const cardsZone = document.querySelector(".cards");
export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//IMAGE POPUP
export const imageContainer = document.querySelector(".popup-image");
export const cardImage = imageContainer.querySelector(".card__image");
export const imagePopupCloseButton = document.querySelector(
  ".popup__button-close-image"
);

//ADD IMAGE POPUP
export const popupAddPlace = document.querySelector(".popup-add-place"); //Add card
export const addButton = document.querySelector(".main-bar__button-type-add");
export const formAdd = document.querySelector(".form__add");
export const addPlaceInput = document.querySelector(".form__input-place");
export const addLinkInput = document.querySelector(".form__input-link");
export const closeAddButton = document.querySelector(
  ".popup__button-close-place"
);

//DELETE CARD POPUP
export const popupDeleteCard = document.querySelector(".popup-delete-card"); //Delete card
export const deleteConfirmationBtn = document.querySelector(
  ".form__button-delete"
);
export const closeDeletePopup = document.querySelector(
  ".popup__button-close-delete-card"
);
export const cardContainer = document.querySelector(".cards"); //section where all the cards are
