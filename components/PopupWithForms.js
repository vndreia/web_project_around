import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleData) {
    super(selector);
    this.selector = selector;
    this.form = this.selector;
    this.inputs = this.form.querySelectorAll(".form__input");
    this.handleData = handleData; //Function to handle form data
  }
  //Gathers data from the form inputs
  _getInputValues() {
    const values = {}; //Object to store input values
    this.inputs.forEach((input) => {
      values[input.name] = input.value; //Iterates over the inputs and stores their values
    }); //No es que se cree una propiedad llamada "input" dentro de values, sino que se crea una propiedad cuyo nombre es el valor que tiene input.name.
    //"Dentro del objeto values, pon una propiedad que se llame como input.name y que tenga como contenido (valor) lo que tiene input.value."
    return values; //Returns the object with input values
  }

  setEventListeners() {
    super.setEventListeners(); //Calls the setEventListeners method from Popup
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      console.log(inputValues, "inputNames");
      this.handleData(inputValues);
    });
  }

  close() {
    super.close(); //Calls the close method from Popup
  }

  open() {
    super.open();
  }
}
