'use client'

import { useEffect, useRef, useState } from 'react';
import { Profile, UserData } from '@/types';
import styles from '@/styles/layout/FriendsPanel.module.css';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { socket } from '@/socket';

interface Menu {
  name: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function FriendItem(props: { data: Profile, friendData: UserData, session: Session | null }) {
  const { img, name } = props.data;
  const { friendData } = props;

  const [status, setStatus] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const router = useRouter();

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

  useEffect(() => {
    socket.on('userStatus', (userId: string, status: string) => {
      if (userId === friendData.email) {
        setStatus(statusList.indexOf(status));
      }
    });

    axios.get('/api/userStatus?email=' + friendData.email)
      .then((res) => {
        setStatus(statusList.indexOf(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const menuList: Menu[] = [
    {
      name: 'DM',
      onClick: () => {
        const users = [props.session?.user?.email as string, friendData.email];

        axios.get('/api/dmRoom?member=' + JSON.stringify(users)).then((res) => {
          router.push(`/dm/${res.data._id}`);
        }).catch((err) => {
          console.log(err);
        });
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