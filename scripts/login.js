window.addEventListener("load", function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
  
    const url = "https://todo-api.digitalhouse.com/v1/users/login";
    const form = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const pass = document.querySelector("#inputPassword");
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = {
        email: email.value,
        password: pass.value,
      };
      const config = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      };
      realizarLogin(config);
    });
  
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
      fetch(url, settings)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            setTimeout(() => {
              location.replace("./mis-tareas.html");
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  });