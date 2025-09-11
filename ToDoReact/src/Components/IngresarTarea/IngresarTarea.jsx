import React from 'react'
import { postTareas } from '../../Services/Servicios';
import Alerta from '../Alerta/Alerta'; 

import './IngresarTarea.css'
function IngresarTarea() {

   const [Tarea, setTarea] = React.useState('');
   const [alerta, setAlerta] = React.useState(null);
  

  const CargarIngreso = async () => {
    try {
       // Verificación: que no esté vacío o lleno de espacios
    if (Tarea.trim() === "") {
       setAlerta({ mensaje: "Ingrese un texto", onConfirm: () => setAlerta(null) });
      return; // No seguimos si está vacío
    }
      // Construimos el objeto de la tarea
      const nuevaTarea = {
        titulo: Tarea,
        completada: false
      }; 
       await postTareas(nuevaTarea); // Esperamos a que se complete la petición

      setAlerta({ mensaje: "✅ Tarea agregada con éxito", tipo: "success" });
      setTarea(""); // Limpiamos el input

      // Limpiamos la alerta después de 3 segundos
      setTimeout(() => {
        setAlerta(null);
      }, 1000);
      // Recargamos la página después de 1 segundo (para que se vea el mensaje un instante)
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      setAlerta({ mensaje: "❌ Error al ingresar tarea", tipo: "error" });
      console.error(error);
    }}

    // Función para detectar Enter
    const manejarEnter = (e) => {
      if (e.key === "Enter") {
      CargarIngreso();
    }
  }

  return (
    <div>

      <div className="container-tarea">
        <input type="text" placeholder='✍🏻 Ingrese tarea' required value={Tarea}  onChange={e => setTarea(e.target.value)} onKeyDown={manejarEnter} />
        <button className='button-64' onClick={CargarIngreso} type="submit"><span className="text">Agregar</span></button>
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

export default IngresarTarea