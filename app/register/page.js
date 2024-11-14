// Importar useRouter desde next/navigation
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Cambiado de "next/router" a "next/navigation"
import styles from "../page.module.css";

export default function Home() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  // Utiliza el hook de next/navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "first_name" : name,
        "last_name" : last_name,
        "username" : user,
        "password" : password
      })
    });
    const data = await res.json();  
    console.log(data)
    if (res.status != 400) {
      console.log("a")
      localStorage.setItem("token", data.token);
      // Redirigir al usuario después de iniciar sesión
      router.push("/inicio");  // Cambiado el uso de router
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.content__form} onSubmit={handleSubmit}>
          <div className={styles.content__inputs}>
            <label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Name</span>
            </label>
            <label>
              <input
                required
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
              <span>Last Name</span>
            </label>
            <label>
              <input
                required
                type="email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <span>Email</span>
            </label>
            <label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <div className={styles.content__or_text}>
          <span></span>
          <span>OR</span>
          <span></span>
        </div>
        <div className={styles.content__forgot_buttons}>
          <button onClick={()=>{router.push("/");}}>Logearse</button>
        </div>
      </div>
    </div>
  );
}
