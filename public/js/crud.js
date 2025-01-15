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
                        <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded">Editar</button>
                        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                    </td>
                `;
                    tablaPersonas.appendChild(fila);
               });
          } catch (error) {
               console.log(error);
          }
     };

     cargarActivos();

     // Mostrar Modal
     document.getElementById("btnAgregar").addEventListener("click", () => {
          document.getElementById("modalPersona").classList.remove("hidden");
     });

     // Cerrar modal
     document.getElementById("btnCancelar").addEventListener("click", () => {
          document.getElementById("modalPersona").classList.add("hidden");
     });

     // ENVIAR DATOS DE LA PERSONA:
     document.getElementById("formPersona").addEventListener("submit", async (e) => {
          e.preventDefault;

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
     })
});
