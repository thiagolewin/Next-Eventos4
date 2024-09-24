"use client"
import local from 'next/font/local';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem('user'))
        setUser(localStorage.getItem('user'))
    },[])
    const saveUserToken = (user) => {
        localStorage.setItem("user",user)
        setUser(user)
    }
    const cerrar = ()=> {
        localStorage.setItem("user",null)
        setUser(null)
    }
    return (
        <UserContext.Provider value={{ user, setUser,saveUserToken,cerrar }}>
            {children}
        </UserContext.Provider>
    );
};
