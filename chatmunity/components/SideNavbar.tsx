'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideNavbar.module.css';
import { faFire, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function SideNavbar() {
  interface NavMenu {
    text: string,
    icon: IconDefinition,
  }

  const navMenuList: NavMenu[] = [
    { text: 'Home', icon: faHome },
    { text: 'Hot', icon: faFire },
  ];

  const [activeMenu, setActiveMenu] = useState(-1);

  return (
    <nav id={styles['navbar']}>
      <section className={styles.menuContainer}>
        {navMenuList.map((item, idx) => {
          return (
            <label className={`${styles.menu} ${activeMenu === idx ? styles.activeMenu : ''}`} key={idx} onClick={() => setActiveMenu(idx)} >
              <FontAwesomeIcon icon={item.icon} />
              <p>{item.text}</p>
            </label>
          );
        })}

      </section>
    </nav>
  )
}