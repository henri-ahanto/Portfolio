import React, {useRef} from 'react';
import Logo from '../../assets/HS_Code.svg';
import './NavBar.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../../contexts/ThemeContext.tsx';

export default function NavBar(){
    const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();
    
    return (<>
        <div className={`app_header ${theme}`}>
            <div className='nav'>
                <div className='logo'>
                    <a href="">
                        <img src={Logo} />
                    </a>
                </div>
                <div className='navAction'>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon style={{color : '#fff'}} />}
                    </button>
                </div>
            </div>
            
        </div>
        </>
    );
}