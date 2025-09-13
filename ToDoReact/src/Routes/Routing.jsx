import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Index from '../Pages/Pricipal/Index';
import Login from '../Pages/Login/Login'; 
import Registro from '../Pages/Registro/Registro';


const Routing =() => {
  return (


    <Router>
      <Routes>
        <Route path='/Registro' element={<Registro />} />
        <Route path='/Index' element={<Index />} />
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
   

  );
};

export default Routing