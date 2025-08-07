export class Popup {
  constructor(container) {
    this.container = container;
    this.closeButton = container.querySelectorAll(".popup__button-close");
  }
  open() {
    this.container.classList.add("popup_opened");
  }
  close() {
    this.container.classList.remove("popup_opened");
  }

  // Closes the popup ONLY when Escape is pressed
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(evt);
    }
  }

  //Closes when you click in the overlay or the close button
  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      // Listens for Escape key
      this._handleEscClose(evt);
    });
    this.closeButton.forEach((button) => {
      button.addEventListener("click", () => {
        //Listens for click on close button
        this.close();
      });
    });
    this.container.addEventListener("click", (evt) => {
      if (evt.target === this.container) {
        //Listens for click on overlay
        this.close();
      }
    });
  }
}
