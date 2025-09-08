import { useState } from 'react'
import { useTheme } from './contexts/ThemeContext.jsx'
import './App.css'
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home.js';
import Services from './pages/Services/Services.jsx';
import Contact from './pages/Contacts/Contact.js';

function App() {
  const theme = useTheme()
  return (
    <>  
      <div className={`body`}>
          <NavBar />
          <Home />
          <Services />
          <Contact />
      </div>
    </>
  )
}

export default App
