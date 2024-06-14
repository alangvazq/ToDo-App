// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const token = localStorage.getItem("jwt");
if (!token) {
  location.replace("./index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const tareasPendientes = document.querySelector(".tareas-pendientes");
  const tareasTerminadas = document.querySelector(".tareas-terminadas");
  const nroFinalizadas = document.querySelector("#cantidad-finalizadas");

  const btnCerrarSesion = document.querySelector("#closeApp");
  const formCrearTarea = document.forms[0];
  const urlUser = "https://todo-api.digitalhouse.com/v1/users/getMe";
  const urlTask = "https://todo-api.digitalhouse.com/v1/tasks";

  obtenerNombreUsuario();
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    const cerrarSesion = confirm("Estas seguro que quieres salir?");
    if (cerrarSesion) {
      localStorage.removeItem("jwt");
      setTimeout(() => {
        location.replace("./index.html");
      }, 2000);
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(urlUser, settings)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userInfo = document.querySelector(".user-info p");
        userInfo.innerText = data.firstName;
      })
      .catch((err) => console.log(err));
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    fetch(urlTask, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        renderizarTareas(data);
        botonesCambioEstado();
      })
      .catch((err) => console.log(err));
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nuevaTarea = document.getElementById("nuevaTarea");
    const settings = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        description: nuevaTarea.value,
        completed: false
      })
    };

    fetch(urlTask, settings)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          nroFinalizadas.innerText
          console.log(typeof nroFinalizadas.innerText);
          nuevaTarea.value = "";
          const fecha = new Date(data.createdAt);
          tareasPendientes.innerHTML += `
          <li class="tarea">
            <button class="change" id="${
              data.id
            }"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${data.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
        `;
        })
        .catch((err) => console.log(err));
  });
  // {
  //   "id": 1,
  //   "description": "Aprender Javascript",
  //   "completed": false,
  //   "userId": 1,
  //   "createdAt": "2021-06-30T22:53:09.549Z"
  // }
  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    
    let contador = 0;
    nroFinalizadas.innerText = contador;

    listado.forEach((tarea) => {
      const fecha = new Date(tarea.createdAt);
      if (tarea.completed) {
        contador++;
        tareasTerminadas.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `;
      } else {
        tareasPendientes.innerHTML += `
          <li class="tarea">
            <button class="change" id="${
              tarea.id
            }"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
        `;
      }
    });
    nroFinalizadas.innerText = contador;
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnMofidicarTarea = document.querySelectorAll(".change");
    console.log(btnMofidicarTarea);
    // Recorrer la lista de botones
    // Agregar un evento a cada botón
    // Condicion de verificar si la tarea está completa o incompleta
    // Traigo el ID para luego hacer el fetch método PUT y modificar la tarea
  }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {}
});