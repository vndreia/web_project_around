import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(container) {
    super(container);
    this.image = container.querySelector(".popup-image__img");
    this.caption = container.querySelector(".popup-image__caption");
    this.closeButton = container.querySelectorAll(".popup__button-close-image");
  }

  _addImage(src, altText, captionText) {
    this.image.src = src;
    this.image.alt = altText;
    this.caption.textContent = captionText;
  }

  open(src, altText, captionText) {
    super.open();
    this._addImage(src, altText, captionText);
  }

  close() {
    this.setEventListeners();
    super.close();
  }
}
