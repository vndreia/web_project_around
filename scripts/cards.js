const initialCards = [
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

//1 selección de elementos
const cardsZone = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card__template").content; //se accede al contenido del template seleccionado
const cardContainer = document.querySelector(".card__item");
const buttonClose = document.querySelector(".popup__button-close-place");

//2 Manipulación

function openPopup() {
  const popup = document.querySelector(".popup-add-place");
  popup.classList.add("popup_opened");
}
// Selección del botón que abre el popup
const addButtonMain = document.querySelector(".main-bar__button-type-add");
addButtonMain.addEventListener("click", openPopup);

function closePopup() {
  const popup = document.querySelector(".popup-add-place");
  popup.classList.remove("popup_opened");
}

buttonClose.addEventListener("click", closePopup);

function createCard(cardData) {
  const newNode = cardTemplate.cloneNode(true); //Deep clone
  //Nuevo nodo (contenido de la card)
  //Seleccionar los elementos a modificar
  const title = newNode.querySelector(".card__image-text");
  const image = newNode.querySelector(".card__image");
  const deleteButton = newNode.querySelector(".card__trash-button");
  const likeButton = newNode.querySelector(".card__like-button");
  //3 Funcionalidad o manipulación del DOM
  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
  //Añadir ahora sí el nuev o nodo al DOM
  //3 Añadir Evento
  deleteButton.addEventListener("click", (event) => {
    event.target.closest(".card__item").remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");
  });

  image.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name, cardData.name);
  });
  return newNode;
}

function renderCards() {
  //Iterar 6 veces (num de cards)
  initialCards.forEach((cardData) => {
    console.log(cardData, "cardData");
    //Creación de la card (clonación)
    const card = createCard(cardData);
    //Añadir card al DOM
    cardsZone.appendChild(card);
  });
}
renderCards();

//Segundo popup
//----> 1. Select DOM elements
const addButton = document.querySelector(".main-bar__button-type-add");
const formAdd = document.querySelector(".form__add");
const addPlaceInput = document.querySelector(".form__input-place");
const addLinkInput = document.querySelector(".form__input-link");

//----> 2. Manipulate elements
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
formAdd.addEventListener("submit", handleForm); // Aquí estamos escuchando el evento submit del formulario

//Open the image popup section
function openImagePopup(src, altText, captionText) {
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
}
