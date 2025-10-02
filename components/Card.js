import { api } from "./api.js"; //importing the api class to use its methods inside the Card class
export class Card {
  constructor(cardData, cardTemplate, handleCardClick) {
    //Third parameter as a function to open the image popup
    this.cardData = cardData;
    this.cardTemplate = cardTemplate; //where you insert the card data
    this.card = null; //This means this is still not defined. This indicates a value, not a string. Thats's why we don't put an empty string "" instead.
    this.handleCardClick = handleCardClick; //a function to handle the card click event
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
    //this method gets the data from the card object and inserts it into the template
    //2
    this.card = this._cloneTemplate(); //this represents the cloned template
    this.card.querySelector(".card__image-text").textContent =
      this.cardData.name;
    this.card.querySelector(".card__image").src = this.cardData.link;
    if (this.cardData.isLiked) {
      this.card.querySelector(".card__like-button").classList.add("active"); //If the card is liked, we add the active class to the like button
    } //This is to match the server data when the card is created
    this._setEventListeners();
    return this.card;
  }

  _setEventListeners() {
    const deleteButton = this.card.querySelector(".card__trash-button"); //When you clone the template you save that node in this.card, so now all access comes from this.card
    const likeButton = this.card.querySelector(".card__like-button"); //constructor
    const image = this.card.querySelector(".card__image");

    deleteButton.addEventListener("click", (event) => {
      event.target.closest(".card__item").remove();
    });

    likeButton.addEventListener("click", () => {
      if (this.cardData.isLiked) {
        //take the card object and go right into its isLiked property
        console.log(this.cardData, "---> cardData inside Card.js");
        api.unlikeTheCard(this.cardData._id).then(() => {
          likeButton.classList.remove("active");
          this.cardData.isLiked = false; //updating your local copy of the data to match what the server just did.
        });
      } else {
        api.likeTheCard(this.cardData._id).then(() => {
          likeButton.classList.add("active");
          this.cardData.isLiked = true; //now the local server matches the updated server state
        });
      }
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
