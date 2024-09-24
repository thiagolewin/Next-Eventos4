"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.css'; // Asegúrate de importar el CSS

export default function Detalle() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const idFromQuery = new URLSearchParams(window.location.search).get('id');
    if (idFromQuery) {
      const fetchEvento = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/event/${idFromQuery}`);
          const data = await response.json();
          setEvento(data[0]); // Asumiendo que solo se necesita el primer evento
          setLoading(false);
        } catch (e) {
          console.warn(e);
        }
      };

      fetchEvento();
    }
  }, []);

  if (loading) {
    return <div className={styles.container}><h1>Loading...</h1></div>;
  }

  if (!evento) {
    return <div className={styles.container}><h1>No event data found</h1></div>;
  }

  return (
    <div className={styles.container}>
      <h1>{evento.name}</h1>
      <h2>{evento.description}</h2>
      <h3>Duración: {evento.duration_in_minutes} minutos</h3>
      <h4>Precio: ${evento.price}</h4>
      <button onClick={() => router.push('/inicio')}>Regresar</button>
    </div>
  );
}
