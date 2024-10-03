'use client'

import styles from '@/styles/ui/FriendButton.module.css';

import { faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from 'react';

export default function FriendButton() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <label className={styles.icon} onClick={(e) => {
      const friendPanel = document.querySelector('#right-panel');

      if (show) {
        friendPanel?.classList.add('hide-right-panel');
        friendPanel?.classList.remove('show-right-panel');
      } else {
        friendPanel?.classList.add('show-right-panel');
        friendPanel?.classList.remove('hide-right-panel');
      }

      setShow(!show);
    }}>
      <FontAwesomeIcon icon={faComments} />
    </label>
  )
}