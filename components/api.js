export class Api {
  constructor(baseURL, headers) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  //método genérico para gestión de la llamada
  makeRequest(endpoint, method, body) {
    //this receives the route
    return fetch(`${this.baseURL}${endpoint}`, {
      //we concatenate the baseURL with the endpoint)
      //fetch can have its own methods
      method: method, //GET, POST, PUT, DELETE
      headers: this.headers,
      body: body ? JSON.stringify(body) : null, //we convert the body to a string in case it exists, because GET doesn't have body
    })
      .then((response) => {
        if (!response.ok) {
          //if response is not ok
          return Promise.reject(`Error: ${response.status}`); //we reject the promise with the error
        } else {
          return response.json(); //if everything is ok, we return the response as json, the frontend needs the data in object format
        }
      })
      .catch((error) => console.log("Error:", error)); //we catch any error and log it
  }

  //cargar información del usuario
  getUserInfo() {
    return this.makeRequest("users/me", "GET"); //No body for GET
  }
  //cargar cards
  getInitialCards() {
    return this.makeRequest("cards", "GET"); //No body for GET
  }
  //editar perfil de usuario with patch
  editProfile(body) {
    //this time we need body for patch
    return this.makeRequest("users/me", "PATCH", body);
    {
      //we send the body with the new data
    }
  }
  //add new cards with POST
  addNewCard(body) {
    return this.makeRequest("cards", "POST", body);
  }
  //like card
  likeTheCard(cardId) {
    //need the cardId to like a specific card
    //This method will be used to toggle the like state of a card
    //INTERESTING one: the Tripleten API uses PUT instead of PATCH for likes bc it treats it as a sepparate resource
    //and each API has its own rules, which is why its important to read the API documentation ):
    return this.makeRequest(`cards/${cardId}/likes`, "PUT"); //the likes endpoint was a guess from Claude literally based in REST patterns... it worked!
  }
  unlikeTheCard(cardId) {
    return this.makeRequest(`cards/${cardId}/likes`, "DELETE");
  }

  deleteCard(cardId) {
    return this.makeRequest(`cards/${cardId}`, "DELETE");
  }

  changeAvatar(body) {
    //this API expects an object with 'avatar' key??????
    return this.makeRequest("users/me/avatar", "PATCH", body);
  }
}
export const api = new Api("https://around-api.es.tripleten-services.com/v1/", {
  authorization: "b0e42903-56d9-4a35-ba61-32f35d4aa19b", //token
  "Content-Type": "application/json",
});
