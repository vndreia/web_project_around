import { Popup } from "./Popup";

export class PopupAvatar extends Popup {
  constructor(container, addPictureBtn, closeBtn, handleUpdateAvatar) {
    super(container);
    this.container = container; // The popup container
    this._addPictureBtn = addPictureBtn; // The "Save" button
    this._closeBtn = closeBtn;
    this._form = this.container.querySelector(".form__edit-avatar");
    this._urlInput = this._form.querySelector(".form__input-avatar");
    this._handleUpdateAvatar = handleUpdateAvatar; // Function to update avatar (API call happens here)
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleUpdateAvatar(this._urlInput.value);
    });
  }

  open() {
    super.open();
    this._form.reset(); //ensures it's clear when opened in case the user closes by mistake
  }

  close() {
    super.close();
    this._form.reset(); //after it's closed, reset the form, also when submitted
  }
}
