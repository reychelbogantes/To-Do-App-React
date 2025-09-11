import React from 'react'

import IngresarTarea from '../../Components/IngresarTarea/IngresarTarea'
import ListaTarea from '../../Components/ListaTareas/ListaTarea'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'



import './Index.css'
function Index() {
  return (
    <div>
      
        <div>
        <Header/>
        <IngresarTarea/>
        <ListaTarea/>
        <Footer/>
        </div>
       

    </div>
  )
}

export default Index