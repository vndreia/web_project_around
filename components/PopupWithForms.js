import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleData) {
    super(selector);
    this.form = document.querySelector(".form");
    this.inputs = this.form.querySelectorAll(".form__input");
    this.handleData = handleData; //Function to handle form data  //Pero qué hace handleData???
  }
  //Gathers data from the form inputs
  _getInputValues() {
    const values = {}; //Object to store input values
    this.inputs.forEach((input) => {
      values[input.name] = input.value; //Iterates over the inputs and stores their values
    });
    return values; //Returns the object with input values
  }

  //Cómo sacas los valores de los inputs?
  //Por qué los corchetes lo hacen dinámico?
  setEventListeners() {
    super.setEventListeners(); //Calls the setEventListeners method from Popup
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this.handleData(inputValues);
    });
  }

  close() {
    super.close(); //Calls the close method from Popup
    this.form.reset(); //Restores the form to its original values after closing
  }

  open() {
    super.open();
  }
}
