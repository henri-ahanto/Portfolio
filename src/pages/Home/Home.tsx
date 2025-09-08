import { useTheme } from "../../contexts/ThemeContext";
import './Home.css';

export default function Home (){
    const {theme, setTheme, toggleTheme } = useTheme();
    return (
        <div className={`home page ${theme}`}>
            <h1>
                HS Code
            </h1>
            <p>
                Un programme un code unique<br/>
            </p>
            <div className="action">
                <a href="#contact" className={`link_button ${theme}`}>Me contacter</a>
            </div>
        </div>
    );
}