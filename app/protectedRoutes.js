'use client'
import { UserContext } from "./userContext"
import { useRouter } from "next/router"; 
import { useContext } from "react"

export const ProtectedRoutes = ({children}) => {
    const router = useRouter()
    const {user} = useContext(UserContext)
    console.log(router.pathname)
    if(!user && !router.pathname !== "/") {
        router.push("/");
    }
    return children
}