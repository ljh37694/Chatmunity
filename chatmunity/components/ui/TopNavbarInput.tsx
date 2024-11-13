'use client'

import styles from '@/styles/ui/TopNavbarInput.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopNavbarInput() {
  const onSubmit = (e: React.FormEvent) => {
    
  }

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <label>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>
      <input className={styles.input} />
    </form>
  );
}