import React from 'react';
import styles from './HeaderAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HeaderAdmin = () => {
  return (
    <header className={styles.headerAdmin}>
      <div className={styles.logo}>NiceAdmin</div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
        <button className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={styles.actions}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faBell} />
          <span className={styles.badge}>4</span>
        </div>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className={styles.badge}>3</span>
        </div>
        <div className={styles.profile}>
          <img src="https://via.placeholder.com/30" alt="profile" className={styles.profileImage} />
          <span className={styles.profileName}>K. Anderson</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;