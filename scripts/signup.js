  // const Joi = 
  console.log(Joi);
window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const url = "https://todo-api.digitalhouse.com/v1/users";
  const form = document.forms[0];
  const inputNombre = document.querySelector("#inputNombre");
  const inputApellido = document.querySelector("#inputApellido");
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const inputPasswordRepetida = document.querySelector(
    "#inputPasswordRepetida"
  );

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = {
      firstName: inputNombre.value,
      lastName: inputApellido.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };
    realizarRegister(config);
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
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
