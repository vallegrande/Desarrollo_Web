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
          // Limpiar los bordes rojos
          document.getElementById("nombres").classList.remove("border-red-500");
          document.getElementById("apellidos").classList.remove("border-red-500");
          document.getElementById("numDoc").classList.remove("border-red-500");
          document.getElementById("celular").classList.remove("border-red-500");
          document.getElementById("correo").classList.remove("border-red-500");
          document.getElementById("fechaNacimiento").classList.remove("border-red-500");

          // Ocultar los mensajes de error
          document.getElementById("errorNombres").classList.add("hidden");
          document.getElementById("errorApellidos").classList.add("hidden");
          document.getElementById("errorNumDoc").classList.add("hidden");
          document.getElementById("errorCelular").classList.add("hidden");
          document.getElementById("errorFechaNacimiento").classList.add("hidden");

          // Limpiar los campos del formulario (opcional, si quieres vaciar los campos al cancelar)
          document.getElementById("formPersona").reset();
          document.getElementById("modalPersona").classList.add("hidden");
     });

     document.getElementById("formPersona").addEventListener("submit", async (e) => {
          e.preventDefault();

          const nombres = document.getElementById("nombres").value;
          const apellidos = document.getElementById("apellidos").value;
          const tipoDoc = document.getElementById("tipoDoc").value;
          const numDoc = document.getElementById("numDoc").value;
          const celular = document.getElementById("celular").value;
          const correo = document.getElementById("correo").value;
          const fechaNacimiento = document.getElementById("fechaNacimiento").value;

          // Validaciones
          let formIsValid = true;

          // Validar nombres
          const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/;
          if (!nombres || !nombreRegex.test(nombres)) {
               document.getElementById("nombres").classList.add("border-red-500");
               document.getElementById("errorNombres").classList.remove("hidden");
               formIsValid = false;
          } else {
               document.getElementById("nombres").classList.remove("border-red-500");
               document.getElementById("errorNombres").classList.add("hidden");
          }

          // Validar apellidos
          if (!apellidos || !nombreRegex.test(apellidos)) {
               document.getElementById("apellidos").classList.add("border-red-500");
               document.getElementById("errorApellidos").classList.remove("hidden");
               formIsValid = false;
          } else {
               document.getElementById("apellidos").classList.remove("border-red-500");
               document.getElementById("errorApellidos").classList.add("hidden");
          }

          // Validar número de documento
          let numDocRegex;
          if (tipoDoc === "DNI") {
               numDocRegex = /^\d{8}$/; // 8 dígitos numéricos para DNI
          } else if (tipoDoc === "CNE") {
               numDocRegex = /^[a-zA-Z0-9]{15}$/; // 15 caracteres alfanuméricos para CNE
          }

          if (!numDoc || !numDocRegex.test(numDoc)) {
               document.getElementById("numDoc").classList.add("border-red-500");
               document.getElementById("errorNumDoc").classList.remove("hidden");
               formIsValid = false;
          } else {
               document.getElementById("numDoc").classList.remove("border-red-500");
               document.getElementById("errorNumDoc").classList.add("hidden");
          }

          // Validar celular
          const celularRegex = /^9\d{8}$/; // Celular que debe empezar con 9 y luego 8 dígitos
          if (!celular || !celularRegex.test(celular)) {
               document.getElementById("celular").classList.add("border-red-500");
               document.getElementById("errorCelular").classList.remove("hidden");
               formIsValid = false;
          } else {
               document.getElementById("celular").classList.remove("border-red-500");
               document.getElementById("errorCelular").classList.add("hidden");
          }

          // Validar correo
          const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!correo || !correoRegex.test(correo)) {
               document.getElementById("correo").classList.add("border-red-500");
               document.getElementById("errorCorreo").classList.remove("hidden");
               formIsValid = false;
          } else {
               document.getElementById("correo").classList.remove("border-red-500");
               document.getElementById("errorCorreo").classList.add("hidden");
          }

          // Validar fecha de nacimiento
          const today = new Date();
          const birthDate = new Date(fechaNacimiento);
          if (birthDate >= today) {
               document.getElementById("fechaNacimiento").classList.add("border-red-500");
               document.getElementById("errorFechaNacimiento").classList.remove("hidden");
               formIsValid = false;
          } else {
               document.getElementById("fechaNacimiento").classList.remove("border-red-500");
               document.getElementById("errorFechaNacimiento").classList.add("hidden");
          }

          // Si alguna validación falla, no enviamos los datos
          if (!formIsValid) {
               Swal.fire({
                    icon: 'error',
                    title: 'Formulario inválido',
                    text: 'Por favor, corrige los errores en el formulario.',
               });
               return;
          }

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
                    Swal.fire({
                         icon: 'success',
                         title: 'Persona agregada',
                         text: 'La persona fue agregada correctamente',
                    });
                    cargarActivos();
                    document.getElementById("modalPersona").classList.add("hidden");
               } else {
                    const errorData = await response.json();
                    Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: `Error: ${errorData.error}`,
                    });
               }
          } catch (error) {
               console.error("Error al enviar datos", error);
               Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al agregar persona',
               });
          }
     });

     // Validaciones en tiempo real
     document.getElementById("nombres").addEventListener("input", () => {
          const nombres = document.getElementById("nombres").value;
          const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/;
          if (!nombreRegex.test(nombres)) {
               document.getElementById("nombres").classList.add("border-red-500");
               document.getElementById("errorNombres").classList.remove("hidden");
          } else {
               document.getElementById("nombres").classList.remove("border-red-500");
               document.getElementById("errorNombres").classList.add("hidden");
          }
     });

     document.getElementById("apellidos").addEventListener("input", () => {
          const apellidos = document.getElementById("apellidos").value;
          const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/;
          if (!nombreRegex.test(apellidos)) {
               document.getElementById("apellidos").classList.add("border-red-500");
               document.getElementById("errorApellidos").classList.remove("hidden");
          } else {
               document.getElementById("apellidos").classList.remove("border-red-500");
               document.getElementById("errorApellidos").classList.add("hidden");
          }
     });

     document.getElementById("numDoc").addEventListener("input", () => {
          const numDoc = document.getElementById("numDoc").value;
          const tipoDoc = document.getElementById("tipoDoc").value;
          let numDocRegex;
          if (tipoDoc === "DNI") {
               numDocRegex = /^\d{8}$/;
          } else if (tipoDoc === "CNE") {
               numDocRegex = /^[a-zA-Z0-9]{15}$/;
          }
          if (!numDocRegex.test(numDoc)) {
               document.getElementById("numDoc").classList.add("border-red-500");
               document.getElementById("errorNumDoc").classList.remove("hidden");
          } else {
               document.getElementById("numDoc").classList.remove("border-red-500");
               document.getElementById("errorNumDoc").classList.add("hidden");
          }
     });

     document.getElementById("celular").addEventListener("input", () => {
          const celular = document.getElementById("celular").value;
          const celularRegex = /^9\d{8}$/;
          if (!celularRegex.test(celular)) {
               document.getElementById("celular").classList.add("border-red-500");
               document.getElementById("errorCelular").classList.remove("hidden");
          } else {
               document.getElementById("celular").classList.remove("border-red-500");
               document.getElementById("errorCelular").classList.add("hidden");
          }
     });

     document.getElementById("correo").addEventListener("input", () => {
          const correo = document.getElementById("correo").value;
          const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!correoRegex.test(correo)) {
               document.getElementById("correo").classList.add("border-red-500");
          } else {
               document.getElementById("correo").classList.remove("border-red-500");
          }
     });

     document.getElementById("fechaNacimiento").addEventListener("input", () => {
          const fechaNacimiento = document.getElementById("fechaNacimiento").value;
          const today = new Date();
          const birthDate = new Date(fechaNacimiento);
          if (birthDate >= today) {
               document.getElementById("fechaNacimiento").classList.add("border-red-500");
               document.getElementById("errorFechaNacimiento").classList.remove("hidden");
          } else {
               document.getElementById("fechaNacimiento").classList.remove("border-red-500");
               document.getElementById("errorFechaNacimiento").classList.add("hidden");
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
                    Swal.fire({
                         icon: 'success',
                         title: 'Persona actualizada',
                         text: 'La persona fue actualizada correctamente',
                    });
                    cargarActivos();
                    document.getElementById("modalEditarPersona").classList.add("hidden");
               } else {
                    const errorData = await response.json();
                    Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: `Error: ${errorData.error}`,
                    });
               }
          } catch (error) {
               console.error("Error al guardar cambios", error);
               Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar persona',
               });
          }
     });

     // Cerrar modal de editar
     document.getElementById("btnCancelarEditar").addEventListener("click", () => {
          document.getElementById("modalEditarPersona").classList.add("hidden");
     });

     // Eliminar persona
     const eliminarPersona = async (id) => {
          const result = await Swal.fire({
               title: '¿Está seguro de que desea eliminar esta persona?',
               text: "¡Esta acción no se puede deshacer!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Sí, eliminar',
               cancelButtonText: 'Cancelar',
          });

          if (result.isConfirmed) {
               try {
                    const response = await fetch(`/api/personas/eliminar/${id}`, {
                         method: "PUT",
                    });

                    if (response.ok) {
                         Swal.fire({
                              icon: 'success',
                              title: 'Persona eliminada',
                              text: 'La persona fue eliminada correctamente',
                         });
                         cargarActivos();
                    } else {
                         Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Error al eliminar persona',
                         });
                    }
               } catch (error) {
                    console.error("Error al eliminar persona", error);
                    Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: 'Error al eliminar persona',
                    });
               }
          }
     };

});
