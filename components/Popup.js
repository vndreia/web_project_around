export class Popup {
  constructor(container) {
    this.container = container;
    this.closeButton = container.querySelector(".popup__button-close");
  }
  open() {
    this.container.classList.add("popup_opened");
  }
  close() {
    this.container.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    // Closes the popup when Escape is pressed
    if (evt.key === "Escape") {
      this.close(evt);
    }
  }

  setEventListeners() {
    document.addEventListener(keydown, (evt) => {
      this._handleEscClose(evt);
    });
  } //Closes when you click in the overlay or the close button
}
