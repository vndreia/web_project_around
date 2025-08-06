import { Popup } from "./Popup";

class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
  }

  _getInputValues() {
    const form = document.querySelector(".form");
    const inputs = form.querySelectorAll(".form__input");
    const values = {};
    };
  } //Gathers data from the form inputs

  setEventListeners() {
    super.setEventListeners(); //Calls the setEventListeners method from Popup
    super.close; //Calls the close method from Popup
    //Restarts the form:
  }
