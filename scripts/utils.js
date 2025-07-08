//PROFILE POPUP
export const openProfileButton = document.querySelector(".main-bar__button-type-form"); //Edit profile
export const popupProfile = document.querySelector(".popup-edit-profile"); //Edit profile
export const closeProfileButton = document.querySelector(".popup__button-close-profile"); //Edit profile
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

export function openProfilePopup() {
  popupProfile.classList.add("popup_opened"); //Adds the class to popup, not the button
  
}

export function closeProfilePopup() {
  popupProfile.classList.remove("popup_opened");
}


//ADD IMAGE POPUP
export const popupAddPlace = document.querySelector(".popup-add-place"); //Add card
export const addButton = document.querySelector(".main-bar__button-type-add");
const formAdd = document.querySelector(".form__add");
const addPlaceInput = document.querySelector(".form__input-place");
const addLinkInput = document.querySelector(".form__input-link");

export function openAddPopup() {
  popupAddPlace.classList.add("popup_opened");
}

export function closeAddPopup() {
  popupAddPlace.classList.remove("popup_opened");
}


//CARDS POPUP
export function openImagePopup(src, altText, captionText) { 
  const imageContainer = document.querySelector(".popup-image");
  const image = document.querySelector(".popup-image__img");
  const imageCaption = document.querySelector(".popup-image__caption");
  const imageCloseButton = document.querySelector(".popup__button-close-image");
  // Actualiza la imagen y el texto
  image.src = src;
  image.alt = altText;
  imageCaption.textContent = captionText;

  // Abre el popup
  imageContainer.classList.add("popup_opened");

  // Función para cerrar el popup
  function closePopup() {
    imageContainer.classList.remove("popup_opened");
    imageCloseButton.removeEventListener("click", closePopup);
  }

  // Añade el listener para cerrar al botón
  imageCloseButton.addEventListener("click", closePopup);
  imageContainer.addEventListener("click", (evt) => {
    if (evt.target === imageContainer) {
      closePopup();
    }
  });
}

