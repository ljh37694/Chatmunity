'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/layout/SideNavbar.module.css';
import { faComments, faFire, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
    { text: 'Room', icon: faComments, url: '/room'}
  ];

  const [activeMenu, setActiveMenu] = useState<number>(-1);

  useEffect(() => {
    if (activeMenu !== -1) {
      router.push(navMenuList[activeMenu].url);
    } else {
      setActiveMenu(Number(sessionStorage.getItem('activeSideMenu')));
    }
  }, [activeMenu]);

  return (
    <nav className={styles['navbar']}>
      <section className={styles.menuContainer}>
        {navMenuList.map((item, idx) => {
          return (
            <label className={`${styles.menu} ${activeMenu === idx ? styles.activeMenu : ''}`} key={idx} onClick={() => {
                setActiveMenu(idx);
                sessionStorage.setItem('activeSideMenu', `${idx}`);
                router.push(item.url);
              }} >
              <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              <p>{item.text}</p>
            </label>
          );
        })}

      </section>
    </nav>
  )
}