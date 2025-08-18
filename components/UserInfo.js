/*La clase UserInfo es responsable de presentar información sobre el usuario en la página. Esta clase debe:

Llevar al constructor un objeto con los selectores de dos elementos: uno que contiene el nombre del usuario, y otro que contiene el trabajo del usuario.
Almacenar un método público llamado getUserInfo(), que devuelve un objeto con información sobre el usuario. Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto.
Almacena un método público llamado setUserInfo(), que toma los datos del nuevo usuario y los agrega en la página. */
//The input values are dynamic and they change, BUT the information in the page SHOULD NOT  change
//That's why we need a class to handle the user information

export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector; //Selectors are private because they are not used outside the class
    this._jobSelector = jobSelector; //They should always be private because they should always be remained the same
  }
  //Returns the user information as an object with name and job properties
  getUserInfo() {
    //Doesn't take any parameters because it gets the values from the previous constructor
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }
  //Updates the user information with text content, assigning the values to the selectors
  setUserInfo({ name, job }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
  }
}
