'use client'

import styles from '@/styles/layout/TopNavbar.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function DrawerButton() {
  useEffect(() => {
    document.querySelector('#left-panel')?.classList.add('hide-left-panel');
  }, []);

  return (
    <label className={styles.drawerBtn} onClick={() => {
      const leftPanel: HTMLElement | null = document.querySelector('#left-panel');
      const backdrop: HTMLElement | null = document.querySelector('#backdrop');

      // left panel이 활성화되어 있을 때
      if (leftPanel?.classList.contains('show-left-panel')) {
        leftPanel?.classList.add('hide-left-panel');
        leftPanel?.classList.remove('show-left-panel');

        backdrop?.classList.remove('show-backdrop');
      } else {
        leftPanel?.classList.add('show-left-panel');
        leftPanel?.classList.remove('hide-left-panel');

        backdrop?.classList.add('show-backdrop');
      }
    }}>
      <FontAwesomeIcon icon={faBars} />
    </label>
  )
}