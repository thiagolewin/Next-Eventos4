"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Cambiado de "next/router" a "next/navigation"
import styles from "../page.module.css";
export default function Contacto(){
  const router = useRouter();  // Utiliza el hook de next/navigation
    return (<>
    <section className={styles.containerContacto}>
    <div className={styles.form_container}>
      <form className={styles.form}>
        <div className={styles.form_group}>
          <label for="email">Company Email</label>
          <input type="text" id="email" name="email" required=""></input>
        </div>
        <div className={styles.form_group}>
          <label for="textarea">How Can We Help You?</label>
          <textarea name="textarea" id="textarea" rows="10" cols="50" required="">          </textarea>
        </div>
        <button className={styles.form_submit_btn} type="submit">Submit</button>
      </form>
    </div>
    </section>
      
    
         <nav className="footbar">
          <a onClick={()=>{router.push("/inicio");}}>Home</a>
          <a onClick={()=>{router.push("/contacto");}}>Contacto</a>
        </nav>
        </>)
}