'use client'

import styles from '@/styles/layout/TopNavbar.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function DrawerButton() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <label className={styles.drawerBtn} onClick={() => {
      const leftPanel: HTMLElement | null = document.querySelector('#left-panel');

      if (show) {
        leftPanel?.classList.add('hide-left-panel');
        leftPanel?.classList.remove('show-left-panel');
      } else {
        leftPanel?.classList.add('show-left-panel');
        leftPanel?.classList.remove('hide-left-panel');
      }

      setShow(!show);
    }}>
      <FontAwesomeIcon icon={faBars} />
    </label>
  )
}