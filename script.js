/*
    Proyecto: Registro de Competencias
    Autor: SASE
    Licencia: GPL-3.0
    © 2025
    Este programa es software libre: puedes redistribuirlo y/o modificarlo
    bajo los términos de la Licencia Pública General de GNU.
*/


function iniciarPagina() {
  document.querySelector(".intro").style.display = "none"; // Oculta la intro
  document.getElementById("main-content").style.display = "flex"; // Muestra el contenido principal
}


// Array para almacenar los registros
let registros = [];

// Cargar los registros desde localStorage al cargar la página
window.onload = function() {
  // Recuperar los registros guardados en localStorage
  const registrosGuardados = localStorage.getItem("registros");

  // Si hay registros guardados, los parseamos y asignamos al array registros
  if (registrosGuardados) {
    registros = JSON.parse(registrosGuardados);
  }
  // Mostrar los resultados después de cargar los registros
  consultarCompetencias();
}

// Función para registrar una persona
function registrarPersona() {
  const nombre = document.getElementById("nombre").value;
  const competencias = document.getElementById("competencias").value;

  if (nombre && competencias) {
    // Crear un objeto para el registro
    const registro = { nombre, competencias };

    // Añadir el registro al array
    registros.push(registro);

    // Guardar los registros en localStorage
    localStorage.setItem("registros", JSON.stringify(registros));

    // Limpiar los campos de entrada
    document.getElementById("nombre").value = '';
    document.getElementById("competencias").value = '';

    alert("Registro guardado correctamente");
  } else {
    alert("Por favor, complete todos los campos.");
  }
}

// Función para consultar los registros
function consultarCompetencias() {
  const terminoBusqueda = document.getElementById("buscar").value.toLowerCase(); // Convertir a minúsculas para una búsqueda no sensible al caso
  const listaResultados = document.getElementById("resultados");

  listaResultados.innerHTML = '';  // Limpiar la lista antes de mostrar nuevos resultados

  if (terminoBusqueda) {
    // Filtrar los registros según el término de búsqueda
    const resultadosFiltrados = registros.filter(registro => {
      return registro.nombre.toLowerCase().includes(terminoBusqueda) || 
             registro.competencias.toLowerCase().includes(terminoBusqueda);
    });

    // Si hay resultados, mostrarlos
    if (resultadosFiltrados.length > 0) {
      resultadosFiltrados.forEach((registro, index) => {
        const li = document.createElement("li");
        li.textContent = `${registro.nombre} - ${registro.competencias}`;

        // Crear el botón de eliminar dentro de cada li
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add("btn-eliminar");
        eliminarBtn.onclick = function() {
          eliminarRegistro(index);
        };

        // Añadir el botón al li
        li.appendChild(eliminarBtn);

        // Añadir el li a la lista de resultados
        listaResultados.appendChild(li);
      });
    } else {
      listaResultados.innerHTML = "<li>Non se encontraron rexistros.</li>";
    }
  } else {
    listaResultados.innerHTML = "<li>Por favor ingrese un término de búsqueda.</li>";
  }
}

// Función para eliminar un registro
function eliminarRegistro(index) {
  // Eliminar el registro del array
  registros.splice(index, 1);

  // Guardar los registros actualizados en localStorage
  localStorage.setItem("registros", JSON.stringify(registros));

  // Volver a mostrar los resultados después de eliminar
  consultarCompetencias();
}

