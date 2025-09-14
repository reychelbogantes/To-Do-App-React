import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import IngresarTarea from '../../Components/IngresarTarea/IngresarTarea'
import ListaTarea from '../../Components/ListaTareas/ListaTarea'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'



import './Index.css'
function Index() {
       useEffect(() => {
        const link = document.querySelector("link[rel~='icon']");
        if (link) link.href = "/favicon-32x32.png"; // nuevo favicon
        document.title = "To Do List";
      }, []);


  const navigate = useNavigate();
  let timer;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      navigate("/Login"); // redirigir a Login tras inactividad
    },/* 1 * 60 * */30000); // 30 segundos de inactividad
  };

  useEffect(() => {
    // Eventos que reinician el timer
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // iniciar el primer timer

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);
  
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