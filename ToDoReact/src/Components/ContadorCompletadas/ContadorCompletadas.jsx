import React from 'react'

import './ContadorCompletadas.css'
function ContadorCompletadas({ tareas }) {

 // Filtramos solo las tareas que están completadas
  const completadas = tareas.filter(t => t.completada).length;

 
  return (
    <div>

    <div>
    <div className="contador-completadas">
     <h3>{completadas}</h3>
    </div>
    <h3>✅ Completadas</h3>
    </div>


    </div>
  )
}

export default ContadorCompletadas