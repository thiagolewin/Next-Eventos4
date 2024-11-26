"use client"
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";
import NavBar from "../navbar";
import { UserContext } from '../userContext.js';
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([]);
  const router = useRouter();
  const { user } = useContext(UserContext);
  
  const redirectoEvent = (event) => {
    // Convertir el objeto en una cadena JSON
    const eventString = JSON.stringify(event);

    // Redirigir a la nueva ruta con el parámetro de consulta
    router.push(`/detalleEvento?id=${event.id}`);
  };

  useEffect(() => {    
    
    const prepareApp = async () => {
      try {
        // Realiza el fetch de los eventos
        const response = await fetch('http://localhost:3000/api/event');
        const data = await response.json();
        setEventos(data); // Guarda los datos en el estado
        setLoading(false); // Marca la aplicación como lista
      } catch (e) {
        console.warn(e);
      }
    };
    if(user) {
      prepareApp();
    }
    if (!user) {
      // Redirigir al login si no hay token
      router.push("/");
    } else {
      setLoading(false); // Dejar que el contenido se cargue
    }
  }, []);

  // Verificar si el token está en localStorage    
  if (!user) {
    return <p>No estás logueado.</p>;    
}

  //if (loading) return <p>Cargando...</p>;

  return (
    <>
    <NavBar></NavBar>
      <div className={styles.inicio}>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
      {eventos.map((event) => (
        <button key={event.id} onClick={() => redirectoEvent(event)}>
          {event.name} - {event.description}
        </button>
      ))}
    </div>
    <nav className="footbar">
          <a onClick={()=>{router.push("/inicio");}}>Home</a>
          <a onClick={()=>{router.push("/contacto");}}>Contacto</a>
        </nav>    
        </>
  );
}
