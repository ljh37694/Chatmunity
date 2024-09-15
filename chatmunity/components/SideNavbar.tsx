'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideNavbar.module.css';
import { faFire, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavMenu {
  text: string,
  icon: IconDefinition,
  url: string,
}

export default function SideNavbar() {
  const router = useRouter();

  const navMenuList: NavMenu[] = [
    { text: 'Home', icon: faHome, url: '/main'},
    { text: 'Hot', icon: faFire, url: '/hot' },
  ];

  const [activeMenu, setActiveMenu] = useState(-1);

  useEffect(() => {
    if (activeMenu !== -1) {
      router.push(navMenuList[activeMenu].url);
    }
  }, [activeMenu]);

  return (
    <nav id={styles['navbar']}>
      <section className={styles.menuContainer}>
        {navMenuList.map((item, idx) => {
          return (
            <label className={`${styles.menu} ${activeMenu === idx ? styles.activeMenu : ''}`} key={idx} onClick={() => {
                setActiveMenu(idx);
                router.push(item.url);
              }} >
              <FontAwesomeIcon icon={item.icon} />
              <p>{item.text}</p>
            </label>
          );
        })}

      </section>
    </nav>
  )
}