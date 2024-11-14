"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css'; // Asegúrate de importar el CSS
import { useContext } from "react";
import { UserContext } from "../userContext";
export default function Detalle() {
  const router = useRouter();
  const { user,cerrar } = useContext(UserContext);
  console.log(user)
    const cerrarSesion = ()=> {
        cerrar()
        router.push('/')
    }
  if (!user) {
    return <div className={styles.container}><h1>No ha user...</h1></div>;
  }
  console.log(user)

  return (
    <div className={styles.perfil}>
      <h2>Nombre: {user.first_name}</h2>
      <h2>Apellido: {user.last_name}</h2>
      <h3>Username: {user.username}</h3>
      <button onClick={() => router.push('/inicio')}>Regresar</button>
      <button onClick={() => cerrarSesion()}>Cerrar Sesion</button>
    </div>
  );
}
