import React from 'react'
import { GetUsers } from '../../services/Servicios'; 
import { Link,useNavigate } from 'react-router-dom';

import './Login.css'
function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState(''); 
  const [mensaje, setMensaje] = React.useState(''); // Estado para el mensaje

  const [logueado, setLogueado] = React.useState(false);

  const navigate = useNavigate();

  // Función para manejar click del botón
  const CargarIngreso = async () => {
     if (logueado) {
    // Si ya estaba logueado, cerrar sesión
    setLogueado(false);
    localStorage.removeItem("usuarioLogueado");
    setMensaje("Sesión cerrada ✅");
  } else {
    try {
      const usuarios = await GetUsers(); // obtener todos los usuarios de db.json
      console.log(usuarios);

      // Buscar usuario con username y password correctos
      const usuarioValido = usuarios.find(
        (u) => u.username === username && u.password === password
      );

      if (usuarioValido) {
        setMensaje("Ingreso exitoso ✅");
        setLogueado(true);

        // 👉 Guardamos el usuario en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido));

        // Redirigir a /home solo si es válido
        setTimeout(() => {
          navigate("/Index");
        }, 1000);
      } else {
        setMensaje("Usuario o contraseña incorrectos ❌");
      }
    } catch (error) {
      setMensaje("Error al ingresar ❌");
      console.error(error);
    }
  }
  };


  return (
    <div>

        <div className="container">
            <h2>Inicio de Sesión</h2>
                
                <input type="text" id="username" name="username" placeholder='👤Usuario' required value={username} onChange={e => setUsername(e.target.value)} /><br />
                
               
                <input type="password" id="password" name="password" placeholder='🔒 Contraseña' required value={password}  onChange={e => setPassword(e.target.value)}  /><br />

                {mensaje && <p className="mensaje">{mensaje}</p>}


                <button onClick={CargarIngreso} type="submit"> {logueado ? "Cerrar sesión" : "Iniciar sesión"}</button>
                <p>¿Todavía no estás registrado? <br />Puedes ir a <Link to="/Registro">registrarte</Link></p>


    
        
        </div>


    </div>
  )
}

export default Login