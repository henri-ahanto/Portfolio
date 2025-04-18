import React from 'react';
import styles from './HomePage.module.scss';
import logo from '../../assets/logo.png';
import photo from '../../assets/photo.png';

const HomePage = () => {
  const menuItems = ['Accueil', 'Projets', 'À propos', 'Contact'];
  const competences = ['I\'m a frontend developer', 'I\'m a Graphics Designer', 'I\'m a backend developer'];

  return (
    <div className={styles.homepage}>
      {/* En-tête */}
      <div className={styles.blue}>

      </div>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>Logo</h1>
        </div>
        <nav className={styles.menu}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className={styles.mainContent}>
        <div className={styles.photoContainer}>
          <img src={photo} alt="Ma photo" className={styles.photo} />
        </div>
        <div className={styles.competencesContainer}>
          <h2>Je suis dévelloppeur</h2>
          <ul>
            {competences.map((competence, index) => (
              <li key={index}>{competence}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default HomePage;