// Importar useRouter desde next/navigation
"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";  // Cambiado de "next/router" a "next/navigation"
import styles from "./page.module.css";
import NavBar from "./navbar";
import { UserContext } from "./userContext";
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  // Utiliza el hook de next/navigation  

  const {saveUserToken} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar las credenciales al backend
    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log(data)
    if (typeof(data) == "object") {
      console.log(data)
      saveUserToken(data);
      router.push("/inicio")
      // Redirigir al usuario después de iniciar sesión
    // Cambiado el uso de router
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.content__form} onSubmit={handleSubmit}>
          <div className={styles.content__inputs}>
            <label>
              <input
                required
                type=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>Phone number, username, or email</span>
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
          <button type="submit">Log In</button>
        </form>
        <div className={styles.content__or_text}>
          <span></span>
          <span>OR</span>
          <span></span>
        </div>
        <div className={styles.content__forgot_buttons}>
          <button onClick={()=>{router.push("/register");}}>Registrarse</button>
        </div>
      </div>
    </div>
    </>
    
  );
}
