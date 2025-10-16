import { Popup } from "./Popup.js"; //IMPORT THE PARENT CLASS

export class PopupWithConfirmation extends Popup {
  constructor(
    container,
    confirmationDeleteBtn,
    closeBtn,
    handleDelete,
    addCards
  ) {
    //you repeat the same parameters as in the parent class
    super(container); //You call the same number of parameters as the parent class constructor
    //But only the ones that you need to create the child class instance
    //In this case, only container is needed by the parent class (Popup)
    this._confirmationDeleteBtn = confirmationDeleteBtn;
    this._closeBtn = closeBtn;
    this._handleDelete = handleDelete; //Function to keep track of the user confirmation
    //it’s actually the function that runs whatever deletion logic you want.
    //It could be:An API call to delete the item on the server, UI updates after deletion, Or both
    this._cardId = null; //private because we don't want it to be accessed outside this class
    this._cardElement = null; //null because the class will take the backend dynamic data
    this._addCards = addCards;
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

  close() {
    super.close();
    this._cardId = null; //Resetting the stored cardId and cardElement when the popup closes
    this._cardElement = null; //prevents accidental deletions if the popup is reopened without a new cardId/cardElement
    console.log("this.close");
  }

  setEventListeners() {
    super.setEventListeners(); //calls the listeners from the parent class (Popup)
    /*this._handleDelete - Verifies a delete handler function exists before trying to call it (prevents "undefined is not a function" errors)
this._cardId - Ensures there's an ID to delete (prevents deleting nothing or causing errors in your delete logic)
this._cardElement - Confirms the DOM element exists (prevents trying to manipulate a non-existent element) */
    this._confirmationDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete && this._cardId && this._cardElement) {
        this._handleDelete(this._cardId, this._cardElement) //once you verified there's a delete handler function, a card ID, and a card element to work with
          //now you can safely call the delete handler function, passing in the stored card ID and card element
          .then(() => this._cardElement.remove())
          //and then close the popup after the deletion is successful
          .then(() => this._addCards())
          .then(() => this.close())
          .catch((error) => console.error(error)); //shows any errors that occur during the deletion process
      }
    });
    console.log("this.closeBtn:", this.closeBtn);
    this._closeBtn.addEventListener("click", () => this.close()); //this happens when user is not sure to delete and clicks the close button
  }
}
