'use client'

import styles from '@/styles/ui/PostHeaderMenu.module.css';
import { DmRoom, Post, UserData } from '@/types';
import { faEllipsisVertical, faMessage, faPen, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Menu {
  icon: IconDefinition,
  text: string,
  show: boolean,
  onClick: React.MouseEventHandler,
}

interface Props {
  postData: Post,
  session: Session | null,
}

export default function PostHeaderMenu(props: Props) {
  const { session, postData } = props;
  const [show, setShow] = useState<boolean>(false);

  const router = useRouter();

  const menuList: Menu[] = [
    {
      icon: faPen,
      text: "수정하기",
      show: session?.user?.email === postData.writer,
      onClick: (e: React.MouseEvent) => {
        router.push("/edit/" + postData._id);
      }
    },
    {
      icon: faPlus,
      text: "친구추가",
      show: true,
      onClick: (e: React.MouseEvent) => {
        console.log(e);
      }
    },
    {
      icon: faMessage,
      text: "DM",
      show: session?.user?.email !== postData.writer,
      onClick: () => {
        axios.get("/api/dmRoom?member=" + JSON.stringify([session?.user?.email, postData.writer]))
          .then((res) => {
            if (res.data) {
              router.push("/dm/" + res.data._id);
            } else {
              const data: DmRoom = {
                member: [
                  {
                    email: session?.user?.email as string,
                    name: session?.user?.name as string,
                  },
                  {
                    email: postData.writer,
                    name: postData.name,
                  },
                ]
              };

              axios.post<DmRoom>('/api/dmRoom', data)
                .then((res) => {
                  console.log(res.data);
                  router.push('/dm');
                })
                .catch(e => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }
    },
  ];

  return (
    <div className={styles.container}>
      <FontAwesomeIcon className={styles.menuIcon} icon={faEllipsisVertical} onClick={(e) => {
        setShow(!show);
      }} />

      {
        !show ? null : 
        <section className={styles.modal}>
          {
            menuList.map((item, idx) => {
              if (item.show) {
                return (
                  <label className={styles.menu} key={idx} onClick={item.onClick}>
                    <FontAwesomeIcon className={styles.icon} icon={item.icon} />
                    <p>{item.text}</p>
                  </label>
                );
              }
            })
          }
        </section>
      }
    </div>
  )
}