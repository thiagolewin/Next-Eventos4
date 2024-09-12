"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([]);
  const router = useRouter();

  const redirectoEvent = (event) => {
    // Convertir el objeto en una cadena JSON
    const eventString = JSON.stringify(event);

    // Redirigir a la nueva ruta con el parámetro de consulta
    router.push(`/detalleEvento?id=${event.id}`);
  };

  useEffect(() => {
    // Verificar si el token está en localStorage
    const prepareApp = async () => {
      try {
        // Realiza el fetch de los eventos
        const response = await fetch('http://localhost:3001/api/event');
        const data = await response.json();
        setEventos(data); // Guarda los datos en el estado
        setLoading(false); // Marca la aplicación como lista
      } catch (e) {
        console.warn(e);
      }
    };

    prepareApp();
    /*if (!token) {
      // Redirigir al login si no hay token
      router.push("/");
    } else {
      setLoading(false); // Dejar que el contenido se cargue
    }*/
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
      {eventos.map((event) => (
        <button key={event.id} onClick={() => redirectoEvent(event)}>
          {event.name} - {event.description}
        </button>
      ))}
    </div>
  );
}
