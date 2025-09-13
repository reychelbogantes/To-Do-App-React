// --- POST: Crear tarea ---
async function postTareas(tareaData) {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario) throw new Error("No hay usuario logueado");

    // 👉 agregar el username automáticamente a la tarea
    const tareaConUsuario = {
      ...tareaData,
      username: usuario.username
    };

    const response = await fetch("http://localhost:3000/Tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tareaConUsuario),
    });

    if (!response.ok) throw new Error("Error en el POST");
    return await response.json();
  } catch (error) {
    console.error("Error posting Tareas:", error);
    throw error;
  }
}

// --- GET: Obtener solo las tareas del usuario logueado ---
async function GetTareas() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario) return []; // si no hay usuario, no hay tareas

    const response = await fetch("http://localhost:3000/Tareas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error en el GET");

    const data = await response.json();
    // 👉 Filtramos solo las del usuario logueado
    return data.filter(t => t.username === usuario.username);
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
    // 👉 aseguramos que conserve el username del usuario logueado
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const tareaActualizada = { ...nuevosDatos, username: usuario.username };

    const response = await fetch(`http://localhost:3000/Tareas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tareaActualizada),
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

// --- Registro de usuario ---
async function postUsers(username,email,password) {
    try {
     
        const userData = { 
            username,email,password
        
        };

        const response = await fetch("http://localhost:3000/Usuarios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

// --- Obtener todos los usuarios (para login y validaciones) ---
async function GetUsers(username,password) {
    try {

        const response = await fetch("http://localhost:3000/Usuarios", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postUsers,GetUsers}