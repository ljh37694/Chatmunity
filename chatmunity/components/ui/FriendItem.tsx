'use client'

import { useEffect, useRef, useState } from 'react';
import { Profile, UserData } from '@/types';
import styles from '@/styles/layout/FriendsPanel.module.css';
import axios from 'axios';
import { Session } from 'next-auth';

interface Menu {
  name: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function FriendItem(props: { data: Profile, friendData: UserData, session: Session | null }) {
  const { img, name } = props.data;

  const [status, setStatus] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const ref = useRef<HTMLLabelElement>(null);

  const statusList: readonly string[] = ['offline', 'online', 'away'];

  const onContextMenu = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setShowMenu(true);
    console.log('contextmenu');
  }

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      console.log(e.target);
      if (ref.current && showMenu && !ref.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', onMouseDown);

    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [showMenu]);

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
        axios.delete('/api/friend', {
          data: {
            user_id: props.session?.user?.email as string,
            friend_id: props.friendData.email,
          }
        }).then((res) => {
          console.log(res);
          console.log('친구 삭제 성공!');
        }).catch((err) => {
          console.log(err);
          console.log('친구 삭제 실패!');
        });
      }
    }
  ];

  return (
    <label className={styles.friend} onContextMenu={onContextMenu} ref={ref}>
      <div className={styles.profile}>
        <img src={img} />
        <div onClick={() => setStatus((status + 1) % statusList.length)} className={`${styles.statusCircle} ${styles[statusList[status]]}`}></div>
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