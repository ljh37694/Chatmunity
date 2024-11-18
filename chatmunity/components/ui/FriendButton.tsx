'use client'

import styles from '@/styles/ui/FriendButton.module.css';

import { faUserFriends } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from 'react';

export default function FriendButton() {
  useEffect(() => {
    document.querySelector('#right-panel')?.classList.add('hide-right-panel');
  }, []);

  return (
    <label className={styles.icon} onClick={(e) => {
      const friendPanel = document.querySelector('#right-panel');
      const backdrop: HTMLElement | null = document.querySelector('#backdrop');

      if (friendPanel?.classList.contains('show-right-panel')) {
        friendPanel?.classList.add('hide-right-panel');
        friendPanel?.classList.remove('show-right-panel');
        backdrop?.classList.remove('show-backdrop');
      } else {
        friendPanel?.classList.add('show-right-panel');
        friendPanel?.classList.remove('hide-right-panel');
        backdrop?.classList.add('show-backdrop');
      }
    }}>
      <FontAwesomeIcon icon={faUserFriends} />
    </label>
  )
}