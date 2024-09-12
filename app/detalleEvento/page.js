// app/detalleEvento/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../page.module.css";

export default function Detalle() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [eventos, setEventos] = useState(null); // Cambiado a null por defecto
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const idFromQuery = queryParams.get('id');
        console.log(idFromQuery)
        if (idFromQuery) {
            const prepareApp = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/event/${idFromQuery}`);
                    const data = await response.json();
                    console.log(data)
                    setEventos(data);
                    setLoading(false);
                } catch (e) {
                    console.warn(e);
                }
            };
    
            prepareApp();
        }
    }, []);
    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!eventos) {
        return <h1>No event data found</h1>;
    }

    return (
        <div>
            <h1>{eventos[0].name}</h1>
            <h2>{eventos[0].description}</h2>
            <h3>Duracion:{eventos[0].duration_in_minutes}</h3>
            <h4>Precio:{eventos[0].price}</h4>
        </div>
    );
}
