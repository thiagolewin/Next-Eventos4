import Image from 'next/image';
import eventoimg from './images/eventos.png';
import perfil from './images/perfil.png';
import styles from "./globals.css";
import { useRouter } from "next/navigation";  // Importación correcta

export default function NavBar() {
    const router = useRouter();  // Usa el hook aquí

    const redirectTo = (place) => {
        router.push("/" + place); // Cambia a la ruta correspondiente
    }

    return (
        <nav className="navbar">
            <Image 
                src={eventoimg} 
                alt="Logo" 
                width={50} 
                height={50} 
                onClick={() => redirectTo("inicio")} 
            />
            <Image 
                src={perfil} 
                alt="Perfil" 
                width={50} 
                height={50} 
                onClick={() => redirectTo("perfil")} 
            />
        </nav>
    );
}
    