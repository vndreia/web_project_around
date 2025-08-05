import { Popup } from "./Popup";

class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
  }

  _getInputValues() {} //Gathers data from the form inputs

  setEventListeners() {
    super.close; //Calls the close method from Popup
    //Restarts the form:
  }
}
