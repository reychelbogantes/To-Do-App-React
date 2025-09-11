import React from 'react'
import logo from '../../assets/logoblanco.png'

import './Header.css'
function Header() {
  return (
    <div>
        <header>
        <img id='Logo' src={logo} alt="Logo de la app" />
        <h1>Tareas por hacer</h1>
        </header>
    </div>
    
  )
}

export default Header