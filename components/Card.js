export class Card {
  constructor(cardData, cardTemplate, handleCardClick) {
    //Third parameter as a function to open the image popup
    this.cardData = cardData;
    this.cardTemplate = cardTemplate;
    this.card = null; //This means this is still not defined. This indicates a value, not a string. Thats's why we don't put an empty string "" instead.
    this.handleCardClick = handleCardClick;
    //This means this.card exists but its value its yet not defined, Will be defined when the template is cloned.
  }

  //Methods
  _renderCard() {
    this._getDataTemplate();
    return this.card;
  }

  _cloneTemplate() {
    //1
    return this.cardTemplate.cloneNode(true);
  }

  _getDataTemplate() {
    //2
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
      this.handleCardClick(
        this.cardData.link,
        this.cardData.name,
        this.cardData.name
      ); //Defines the parameters inside to get the values straight from the cardData object
    });
    //Pretty much as:
    /* but cardImage here is cardData
    cardImage.setEventListeners("click", () => {
      const src = cardImage.src;
      const altText = cardImage.alt;
      const captionText = cardImage.textContent.caption;
      imagePopup.open(src, altText, captionText);
    });*/
  }
}
