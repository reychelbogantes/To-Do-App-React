import React from 'react'


import './ContadorPendientes.css'
function ContadorPendientes({ tareas }) {

        
  // Filtramos solo las tareas que no están completadas
  const pendientes = tareas.filter(t => !t.completada).length;


  return (
    <div>


    <div>
    <div className="contador-pendientes">
      <h3>{pendientes}</h3>
    </div>
    <h3>⏳ Pendientes</h3>
    </div>

    

    </div>
  )
}

export default ContadorPendientes