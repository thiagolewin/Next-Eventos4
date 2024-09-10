"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";  // Cambiado de "next/router" a "next/navigation"
import styles from "../page.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [eventos,setEventos] = useState([])
  const router = useRouter();

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
      {eventos.map((event)=>(<div>{event.name}{event.description}</div>))}
    </div>
  );
}
