export default class Storage {
  static getUsers() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = "";

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://getpantry.cloud/apiv1/pantry/c763a4f5-f066-46e7-98d0-ad638c5c0bc8", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  static newUser(obj, userName) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "day": obj
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://getpantry.cloud/apiv1/pantry/c763a4f5-f066-46e7-98d0-ad638c5c0bc8/basket/${userName}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  static updateData(obj, userName) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      obj
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://getpantry.cloud/apiv1/pantry/c763a4f5-f066-46e7-98d0-ad638c5c0bc8/basket/${userName}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  // static getData(userName) {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = "";

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch(`https://getpantry.cloud/apiv1/pantry/c763a4f5-f066-46e7-98d0-ad638c5c0bc8/basket/${userName}`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  static getData(userName) {
    return fetch(`https://getpantry.cloud/apiv1/pantry/c763a4f5-f066-46e7-98d0-ad638c5c0bc8/basket/${userName}`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
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

    fetch(`https://getpantry.cloud/apiv1/pantry/c763a4f5-f066-46e7-98d0-ad638c5c0bc8/basket/${userName}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

}




  // PantryID=c763a4f5-f066-46e7-98d0-ad638c5c0bc8