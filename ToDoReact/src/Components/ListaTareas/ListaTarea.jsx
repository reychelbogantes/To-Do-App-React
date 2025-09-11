import React from 'react'
import{GetTareas, completarTarea, volverAPendientes, editarTarea, eliminarTarea } from '../../Services/Servicios.js'
import ContadorPendientes from '../ContadorPendientes/ContadorPendientes.jsx'
import ContadorCompletadas from '../ContadorCompletadas/ContadorCompletadas.jsx'
import Alerta from '../Alerta/Alerta.jsx'

import './ListaTarea.css'
function ListaTarea() {
  const [Tareas, setTareas] = React.useState([]);
  const [alerta, setAlerta] = React.useState(null);

  React.useEffect(() => {
    fetchTareas();
  }, []);
  // Función para obtener las tareas desde el servicio
  const fetchTareas = async () => {
    try {
      const data = await GetTareas();
      setTareas(data);
    } catch (error) {
      console.error("Error fetching Tareas:", error);
    }
  };
  // --- Editar con prompt personalizado ---
  const BtnEditar = (tarea) => {
  setAlerta({
    tipo: "prompt",
    mensaje: "Editar tarea:",
    valorInicial: tarea.titulo,
    onConfirm: async (nuevoTitulo) => {
      if (nuevoTitulo.trim() !== "") {
        // ✅ Guardar si no está vacío
        const tareaEditada = { ...tarea, titulo: nuevoTitulo.trim() };
        await editarTarea(tarea.id, tareaEditada);
        fetchTareas();
        setAlerta(null); // cerrar solo si todo va bien
      } else {
        // Mostrar alerta si está vacío
        setAlerta({
          tipo: "alert",
          mensaje: "❌ El título no puede estar vacío",
          onConfirm: () => setAlerta(null)
        });
      }
    },
    onCancel: () => setAlerta(null)
    });
   };

  // --- Eliminar con confirm personalizado ---
  const BtnEliminar = (id) => {
    setAlerta({
      tipo: "confirm",
      mensaje: "¿Seguro que quieres eliminar esta tarea?",
      onConfirm: async () => {
        await eliminarTarea(id);
        fetchTareas();
        setAlerta(null);
      },
      onCancel: () => setAlerta(null)
    });
  };



  return (
    <div>
       
        <div className='container-listas'>
        <div className='container-contadores'>
        {/* Los contadores reciben todas las tareas */}
        <ContadorPendientes tareas={Tareas} />
        <ContadorCompletadas tareas={Tareas} />
        </div>
        <hr id='linea' />
        <h2>Lista de Tareas</h2>
        <div className='container-columnas'>
        <div className='container-lista-pendientes'>
            <h2>Pendientes</h2>
            
            <div>
              {Tareas.filter(t => !t.completada).length === 0 ? (
              <p>No existen tareas pendientes</p> ) : (
              Tareas.filter(t => !t.completada).map(tarea => (
              <div key={tarea.id}>
              <span>{tarea.titulo}</span>
              <button className='Completadas' onClick={async () => { await completarTarea(tarea.id); fetchTareas(); }}>
                Completadas
              </button>
              <button className="Editar" onClick={() => BtnEditar(tarea)}></button>
              <button className="Eliminar" onClick={() => BtnEliminar(tarea.id)}></button>
                    </div>
                ))
                )}

            </div>


        </div>
        <div className='container-lista-completadas'>
            <h2>Completadas</h2>
            <div>
             {Tareas.filter(t => t.completada).length === 0 ? (
             <p>No existen tareas completadas</p>  ) : (
              Tareas.filter(t => t.completada).map(tarea => (
              <div key={tarea.id}>
              <span>{tarea.titulo}</span>
              <button className='VPendientes' onClick={async () => { await volverAPendientes(tarea.id); fetchTareas(); }}>
                Volver a pendientes
              </button>
              <button className="Editar"  onClick={() => BtnEditar(tarea)}></button>
              <button className="Eliminar" onClick={() => BtnEliminar(tarea.id)}></button>
              </div>
                ))) } 
        </div>
        </div>
        </div>





        </div>

        {alerta && (<Alerta 
        tipo={alerta.tipo} 
        mensaje={alerta.mensaje} 
        onConfirm={alerta.onConfirm} 
        onCancel={alerta.onCancel}
        valorInicial={alerta.valorInicial}  /> )}

    </div>
  )
}

export default ListaTarea