class Api {
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
}
//cargar cards
//editar perfil de usuario

export const api = new Api("https://around-api.es.tripleten-services.com/v1/", {
  authorization: "b0e42903-56d9-4a35-ba61-32f35d4aa19b", //my token
  "Content-Type": "application/json",
});
