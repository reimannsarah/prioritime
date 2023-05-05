export default class Storage {
  static getUsers() {
    return fetch(`https://getpantry.cloud/apiv1/pantry/${process.env.PANTRY_ID}`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `Error ${response.status}
          There was an error grabbing the users`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  static saveUser(user, userName) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      user
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    return fetch(`https://getpantry.cloud/apiv1/pantry/${process.env.PANTRY_ID}/basket/${userName}`, requestOptions)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `Error: ${response.status}
          There was an error saving the data for the user`;
          throw new Error(errorMessage);
        } else {
          return response;
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  static getData(userName) {
    return fetch(`https://getpantry.cloud/apiv1/pantry/${process.env.PANTRY_ID}/basket/${userName}`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          const errorMessage = `Error ${response.status}`;
          throw new Error(errorMessage);
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  static deleteUser(userName) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = "";

    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://getpantry.cloud/apiv1/pantry/${process.env.PANTRY_ID}/basket/${userName}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

}