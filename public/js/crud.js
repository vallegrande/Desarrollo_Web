document.addEventListener("DOMContentLoaded", () => {
     const tablaPersonas = document.getElementById("tablaPersonas");

     // Cargar personas activas
     const cargarActivos = async () => {
          try {
               const response = await fetch("/api/personas/activos");
               if (!response.ok) {
                    throw new Error("Error al obtener los datos");
               }
               const personas = await response.json();
               tablaPersonas.innerHTML = "";
               personas.forEach((persona) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                    <td class="border px-4 py-2">${persona.id}</td>
                    <td class="border px-4 py-2">${persona.nombres}</td>
                    <td class="border px-4 py-2">${persona.apellidos}</td>
                    <td class="border px-4 py-2">${persona.tipo_doc}</td>
                    <td class="border px-4 py-2">${persona.num_doc}</td>
                    <td class="border px-4 py-2">${persona.celular}</td>
                    <td class="border px-4 py-2">${persona.correo}</td>
                    <td class="border px-4 py-2">${persona.fecha_nacimiento}</td>
                    <td class="border px-4 py-2">${persona.estado}</td>
                    <td class="border px-4 py-2">
                        <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded btnEditar" data-id="${persona.id}">Editar</button>
                        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded btnEliminar" data-id="${persona.id}">Eliminar</button>
                    </td>
                `;
                    tablaPersonas.appendChild(fila);
               });

               // Agregar eventos para editar y eliminar
               document.querySelectorAll(".btnEditar").forEach((btn) => {
                    btn.addEventListener("click", () => abrirModalEditar(btn.dataset.id));
               });

               document.querySelectorAll(".btnEliminar").forEach((btn) => {
                    btn.addEventListener("click", () => eliminarPersona(btn.dataset.id));
               });
          } catch (error) {
               console.log(error);
          }
     };

     cargarActivos();

     // Mostrar Modal para agregar
     document.getElementById("btnAgregar").addEventListener("click", () => {
          document.getElementById("modalPersona").classList.remove("hidden");
     });

     // Cerrar modal de agregar
     document.getElementById("btnCancelar").addEventListener("click", () => {
          document.getElementById("modalPersona").classList.add("hidden");
     });

     // ENVIAR DATOS DE LA PERSONA
     document.getElementById("formPersona").addEventListener("submit", async (e) => {
          e.preventDefault();

          const nombres = document.getElementById("nombres").value;
          const apellidos = document.getElementById("apellidos").value;
          const tipoDoc = document.getElementById("tipoDoc").value;
          const numDoc = document.getElementById("numDoc").value;
          const celular = document.getElementById("celular").value;
          const correo = document.getElementById("correo").value;
          const fechaNacimiento = document.getElementById("fechaNacimiento").value;

          const persona = {
               nombres,
               apellidos,
               tipo_doc: tipoDoc,
               num_doc: numDoc,
               celular,
               correo,
               fecha_nacimiento: fechaNacimiento,
          };

          try {
               const response = await fetch("/api/personas", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(persona),
               });

               if (response.ok) {
                    alert("Persona agregada correctamente");
                    cargarActivos();
                    document.getElementById("modalPersona").classList.add("hidden");
               } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
               }
          } catch (error) {
               console.error("Error al enviar datos", error);
               alert("Error al agregar persona");
          }
     });

     // Abrir Modal para editar
     const abrirModalEditar = async (id) => {
          try {
               const response = await fetch(`/api/personas/${id}`);
               if (!response.ok) {
                    throw new Error("Error al obtener datos de la persona");
               }
               const persona = await response.json();

               document.getElementById("idPersonaEditar").value = persona.id;
               document.getElementById("nombresEditar").value = persona.nombres;
               document.getElementById("apellidosEditar").value = persona.apellidos;
               document.getElementById("tipoDocEditar").value = persona.tipo_doc;
               document.getElementById("numDocEditar").value = persona.num_doc;
               document.getElementById("celularEditar").value = persona.celular;
               document.getElementById("correoEditar").value = persona.correo;
               document.getElementById("fechaNacimientoEditar").value = persona.fecha_nacimiento;

               document.getElementById("modalEditarPersona").classList.remove("hidden");
          } catch (error) {
               console.error("Error al abrir modal de edición", error);
          }
     };

     // Guardar cambios en edición
     document.getElementById("formEditarPersona").addEventListener("submit", async (e) => {
          e.preventDefault();

          const id = document.getElementById("idPersonaEditar").value;
          const nombres = document.getElementById("nombresEditar").value;
          const apellidos = document.getElementById("apellidosEditar").value;
          const tipoDoc = document.getElementById("tipoDocEditar").value;
          const numDoc = document.getElementById("numDocEditar").value;
          const celular = document.getElementById("celularEditar").value;
          const correo = document.getElementById("correoEditar").value;
          const fechaNacimiento = document.getElementById("fechaNacimientoEditar").value;

          const persona = {
               nombres,
               apellidos,
               tipo_doc: tipoDoc,
               num_doc: numDoc,
               celular,
               correo,
               fecha_nacimiento: fechaNacimiento,
          };

          try {
               const response = await fetch(`/api/personas/${id}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(persona),
               });

               if (response.ok) {
                    alert("Persona actualizada correctamente");
                    cargarActivos();
                    document.getElementById("modalEditarPersona").classList.add("hidden");
               } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
               }
          } catch (error) {
               console.error("Error al guardar cambios", error);
               alert("Error al actualizar persona");
          }
     });

     // Cerrar modal de editar
     document.getElementById("btnCancelarEditar").addEventListener("click", () => {
          document.getElementById("modalEditarPersona").classList.add("hidden");
     });

     // Eliminar persona
     const eliminarPersona = async (id) => {
          if (confirm("¿Está seguro de que desea eliminar esta persona?")) {
               try {
                    const response = await fetch(`/api/personas/eliminar/${id}`, {
                         method: "PUT",
                    });

                    if (response.ok) {
                         alert("Persona eliminada correctamente");
                         cargarActivos();
                    } else {
                         alert("Error al eliminar persona");
                    }
               } catch (error) {
                    console.error("Error al eliminar persona", error);
               }
          }
     };

});
