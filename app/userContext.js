"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Cargar usuario del localStorage al inicio
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Parseamos el JSON si existe
            } catch {
                console.error("Error al parsear usuario guardado");
                localStorage.removeItem('user'); // Eliminamos si hay datos corruptos
            }
        }
    }, []);

    // Guardar el usuario en el localStorage
    const saveUserToken = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Guardamos como JSON
            setUser(user);
        }
    };

    // Cerrar sesión
    const cerrar = () => {
        localStorage.removeItem('user'); // Eliminamos el usuario
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, saveUserToken, cerrar }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto más fácilmente
export const useUser = () => useContext(UserContext);
