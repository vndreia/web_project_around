import Popup from "./Popup.js"; // ← Add this!

export class PopupWithConfirmation extends Popup {
  constructor(container, confirmationDeleteBtn, closeBtn, handleDelete) {
    //you repeat the same parameters as in the parent class
    super(container); //You call the same number of parameters as the parent class constructor
    this.confirmationDeleteBtn = confirmationDeleteBtn;
    this.closeBtn = closeBtn;
    this.handleDelete = handleDelete; //Function to keep track of the user confirmation
    //it’s actually the function that runs whatever deletion logic you want.
    //It could be:An API call to delete the item on the server, UI updates after deletion, Or both
    this._cardId = null; //private because we don't want it to be accessed outside this class
    this._cardElement = null; //null because the class will take the backend dynamic data
  }
  //now open is external bc:
  //open() happens before the confirmation button click
  //open() is triggered by external DOM events (delete button cards)
  //setEventListeners() sets up internal popup events (confirm/close buttons)
  //therefore open is out of setEventListeners
  open(cardId, cardElement) {
    this._cardId = cardId; //without cardId and cardElement, the popup wouldn't know WHAT to delete when the user clicks "Confirm".
    this._cardElement = cardElement;
    super.open(); //Popup uses the stored values in (this._cardId, this._cardElement) to delete the correct item when the user confirms the action.
  }

  setEventListeners() {
    super.setEventListeners(); //calls the listeners from the parent class (Popup)
    /*this._handleDelete - Verifies a delete handler function exists before trying to call it (prevents "undefined is not a function" errors)
this._cardId - Ensures there's an ID to delete (prevents deleting nothing or causing errors in your delete logic)
this._cardElement - Confirms the DOM element exists (prevents trying to manipulate a non-existent element) */
    this.confirmationDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete && this._cardId && this._cardElement) {
        this._handleDelete(this._cardId, this._cardElement) //once you verified there's a delete handler function, a card ID, and a card element to work with
          //now you can safely call the delete handler function, passing in the stored card ID and card element
          .then(() => this.close()) //and then close the popup after the deletion is successful
          .catch(console.error); //shows any errors that occur during the deletion process
      }
    });

    this.closeBtn.addEventListener("click", () => this.close()); //this happens when user is not sure to delete and clicks the close button
  }
}
