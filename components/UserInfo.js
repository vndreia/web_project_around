//Class to manage user information on the webpage

export class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._nameSelector = nameSelector; //Selectors are private because they are not used outside the class
    this._jobSelector = jobSelector;
    this._imageSelector = imageSelector;
    //They should always be private because they should always be remained the same
  }
  //Returns the user information as an object with name and job properties
  getUserInfo() {
    //Doesn't take any parameters because it gets the values from the previous constructor
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
    //aquí no se pone image porque no se va a usar en ningún lado POR QUÉ?
  }
  //Updates the user information with text content, assigning the values to the selectors
  setUserInfo({ name, job, image }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
    this._imageSelector.src = image;
  }
}
