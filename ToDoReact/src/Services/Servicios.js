// --- POST: Crear tarea ---
async function postTareas(tareaData) {
  try {
    const response = await fetch("http://localhost:3000/Tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tareaData),
    });

    if (!response.ok) throw new Error("Error en el POST");
    return await response.json();
  } catch (error) {
    console.error("Error posting Tareas:", error);
    throw error;
  }
}

// --- GET: Obtener todas las tareas ---
async function GetTareas() {
  try {
    const response = await fetch("http://localhost:3000/Tareas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error en el GET");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Tareas:", error);
    throw error;
  }
}

// --- PATCH: Marcar como completada ---
async function completarTarea(id) {
  try {
    const response = await fetch(`http://localhost:3000/Tareas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completada: true }),
    });

    if (!response.ok) throw new Error("Error al completar tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en completarTarea:", error);
    throw error;
  }
}

// --- PATCH: Volver a pendientes ---
async function volverAPendientes(id) {
  try {
    const response = await fetch(`http://localhost:3000/Tareas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completada: false }),
    });

    if (!response.ok) throw new Error("Error al mover a pendientes");
    return await response.json();
  } catch (error) {
    console.error("Error en volverAPendientes:", error);
    throw error;
  }
}

// --- PUT: Editar tarea (cambia titulo u otras propiedades) ---
async function editarTarea(id, nuevosDatos) {
  try {
    const response = await fetch(`http://localhost:3000/Tareas/${id}`, {
      method: "PUT", // 👈 reemplaza el objeto entero
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevosDatos),
    });

    if (!response.ok) throw new Error("Error al editar tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en editarTarea:", error);
    throw error;
  }
}

// --- DELETE: Eliminar tarea ---
async function eliminarTarea(id) {
  try {
    const response = await fetch(`http://localhost:3000/Tareas/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar tarea");
    return true;
  } catch (error) {
    console.error("Error en eliminarTarea:", error);
    throw error;
  }
}

export {
  postTareas,GetTareas,
  completarTarea, volverAPendientes,
  editarTarea, eliminarTarea,
};