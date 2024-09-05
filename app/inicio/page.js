"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";  // Cambiado de "next/router" a "next/navigation"
import styles from "../page.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el token está en localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirigir al login si no hay token
      router.push("/");
    } else {
      setLoading(false); // Dejar que el contenido se cargue
    }
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
    </div>
  );
}
