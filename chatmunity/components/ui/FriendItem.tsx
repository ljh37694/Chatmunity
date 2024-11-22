'use client'

import { useEffect, useState } from 'react';
import { Profile } from '@/types';
import styles from '@/styles/layout/FriendsPanel.module.css';

interface Menu {
  name: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function FriendItem(props: { data: Profile }) {
  const { img, name } = props.data;

  const [status, setStatus] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const statusList: readonly string[] = ['offline', 'online', 'away'];

  const onContextMenu = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setShowMenu(!showMenu);
    console.log('contextmenu');
  }

  const menuList: Menu[] = [
    {
      name: 'DM',
      onClick: () => {
        console.log('DM');
      }
    },
    {
      name: '친구 삭제',
      onClick: () => {
        console.log('친구 삭제');
      }
    }
  ]

  return (
    <label className={styles.friend} onContextMenu={onContextMenu}>
      <div className={styles.profile}>
        <img src={img} />
        <div onClick={() => setStatus((status + 1) % statusList.length)}  className={`${styles.statusCircle} ${styles[statusList[status]]}`}></div>
      </div>
      
      <p>{name}</p>

      {
        showMenu && (
          <section className={styles.menu}>
            {
              menuList.map((menu, index) => (
                <div key={index} onClick={menu.onClick} className={styles.menuItem}>{menu.name}</div>
              ))
            }
          </section>
        )
      }
    </label>
  );
}