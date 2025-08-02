import { openImagePopup } from "../scripts/utils.js";

//1 selección de elementos

export class Card {
  constructor(cardData, cardTemplate) {
    this.cardData = cardData;
    this.cardTemplate = cardTemplate;
    this.card = null; //This means this is still not defined. This indicates a value, not a string. Thats's why we don't put an empty string "" instead.
    //This means this.card exists but its value its yet not defined.
    //Will be defined when the template is cloned.
  }

  //Methods
  _renderCard() {
    this._getDataTemplate();
    return this.card;
  }

  _cloneTemplate() {
    return this.cardTemplate.cloneNode(true);
  }

  _getDataTemplate() {
    this.card = this._cloneTemplate();
    this.card.querySelector(".card__image-text").textContent =
      this.cardData.name;
    this.card.querySelector(".card__image").src = this.cardData.link;
    this._setEventListeners();
    return this.card;
  }

  _setEventListeners() {
    const deleteButton = this.card.querySelector(".card__trash-button"); //When you clone the template you save that node in this.card, so now all access comes from this.card
    const likeButton = this.card.querySelector(".card__like-button");
    const image = this.card.querySelector(".card__image");

    deleteButton.addEventListener("click", (event) => {
      event.target.closest(".card__item").remove();
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("active");
    });

    image.addEventListener("click", () => {
      openImagePopup(
        this.cardData.link,
        this.cardData.name,
        this.cardData.name
      );
    });
  }
}
