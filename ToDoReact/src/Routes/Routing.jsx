import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Index from '../Pages/Pricipal/Index';


const Routing =() => {
  return (


    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
      </Routes>
    </Router>
   

  );
};

export default Routing