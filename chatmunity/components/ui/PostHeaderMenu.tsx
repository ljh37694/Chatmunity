'use client'

import styles from '@/styles/ui/PostHeaderMenu.module.css';
import { faEllipsisVertical, faMessage, faUserFriends, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface Menu {
  icon: IconDefinition,
  text: string,
}

export default function PostHeaderMenu() {
  const [show, setShow] = useState<boolean>(false);

  const menuList: Menu[] = [
    {
      icon: faUserFriends,
      text: "친구 추가",
    },
    {
      icon: faMessage,
      text: "DM",
    },
  ]

  return (
    <div className={styles.container}>
      <FontAwesomeIcon onClick={(e) => {
        e.preventDefault();
        setShow(!show);
      }} className={styles.menuIcon} icon={faEllipsisVertical} />

      {
        !show ? null : 
        <section className={styles.modal}>
          {
            menuList.map((item, idx) => {
              return (
                <label className={styles.menu}>
                  <FontAwesomeIcon className={styles.icon} icon={item.icon} />
                  <p>{item.text}</p>
                </label>
              );
            })
          }
        </section>
      }
    </div>
  )
}