'use client';

import { UserContext } from "./userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { usePathname } from 'next/navigation'
export const ProtectedRoutes = ({ children }) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const pathname = usePathname()
    useEffect(() => {
        // Redirect if the user is not logged in and is not on the homepage
        if (user == "null" || user == null && !(pathname === "/" || pathname === "/register")) {
            router.push("/");
        }

        // Redirect if the user is logged in and tries to access the homepage or register page
        if (user != null && (pathname === "/" || pathname === "/register")) {
            router.push("/inicio");
        }
    }, [user, router]);

    return children;
};
