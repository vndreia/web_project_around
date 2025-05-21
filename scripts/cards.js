const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];
//1 selección de elementos
const cardsZone = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card__template').content;  //se accede al contenido del template seleccionado
const cardContainer = document.querySelector('.card__item');
//2 Manipulación
function deleteCard(card) {
card.remove();
}

function createCard(cardData) {
const newNode = cardTemplate.cloneNode(true); //Deep clone
//Nuevo nodo (contenido de la card)
//Seleccionar los elementos a modificar
const title = newNode.querySelector('.card__image-text');
const image = newNode.querySelector('.card__image');
const deleteButton = newNode.querySelector('.card__trash-button');

//3 Funcionalidad o manipulación del DOM
title.textContent = cardData.name;
image.src = cardData.link;
image.alt = cardData.name;
//Añadir ahora sí el nuev o nodo al DOM
//3 Añadir Evento
deleteButton.addEventListener('click', () => {
 newNode.remove();
});
return newNode;
}

function renderCards() {
    //Iterar 6 veces (num de cards)
    initialCards.forEach((cardData) => {
      console.log(cardData, 'cardData');
      //Creación de la card (clonación)
        const card = createCard(cardData); 
        //Añadir card al DOM
        cardsZone.appendChild(card);
    });
}

renderCards();