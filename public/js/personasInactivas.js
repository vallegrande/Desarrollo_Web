const cargarInactivos = async () => {
     try {
          const response = await fetch("/api/personas/inactivos");
          if (!response.ok) {
               throw new Error("Error al obtener las personas inactivas");
          }
          const personas = await response.json();
          const tablaPersonasInactivas = document.getElementById("tablaPersonasInactivas");

          tablaPersonasInactivas.innerHTML = "";

          if (personas.length === 0) {
               tablaPersonasInactivas.innerHTML = `
                <tr>
                    <td colspan="10" class="border px-4 py-2 text-center">No hay personas inactivas registradas</td>
                </tr>
            `;
               return;
          }

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
                <td class="border px-4 py-2">${persona.estado === 'I' ? 'Inactivo' : 'Activo'}</td>
                <td class="border px-4 py-2">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded btnRestaurar" data-id="${persona.id}">
                        Restaurar
                    </button>
                </td>
            `;
               tablaPersonasInactivas.appendChild(fila);
          });

          // Agregar eventos para restaurar
          document.querySelectorAll(".btnRestaurar").forEach((btn) => {
               btn.addEventListener("click", () => restaurarPersona(btn.dataset.id));
          });
     } catch (error) {
          console.error(error);
          const tablaPersonasInactivas = document.getElementById("tablaPersonasInactivas");
          tablaPersonasInactivas.innerHTML = `
            <tr>
                <td colspan="10" class="border px-4 py-2 text-center text-red-500">Error al cargar los datos</td>
            </tr>
        `;
     }
};

const restaurarPersona = async (id) => {
     try {
          const response = await fetch(`/api/personas/restaurar/${id}`, {
               method: "PUT",
          });
          if (!response.ok) {
               throw new Error("Error al restaurar la persona");
          }
          const data = await response.json();
          alert(data.message);
          cargarInactivos(); // Recargar la lista después de restaurar
     } catch (error) {
          console.error(error);
          alert("Error al intentar restaurar la persona");
     }
};

// Cargar la lista de personas inactivas al iniciar
document.addEventListener("DOMContentLoaded", () => {
     cargarInactivos();
});
