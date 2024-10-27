'use client'

import styles from '@/styles/ui/PostHeaderMenu.module.css';
import { Post } from '@/types';
import { faEllipsisVertical, faMessage, faPen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Menu {
  icon: IconDefinition,
  text: string,
  isWriterMenu: boolean,
  onClick: React.MouseEventHandler,
}

interface Props {
  isWriter: boolean,
  postData: Post,
}

export default function PostHeaderMenu(props: Props) {
  const [show, setShow] = useState<boolean>(false);

  const router = useRouter();

  const menuList: Menu[] = [
    {
      icon: faPen,
      text: "수정하기",
      isWriterMenu: true,
      onClick: (e: React.MouseEvent) => {
        router.push("/edit/" + props.postData._id);
      }
    },
    {
      icon: faMessage,
      text: "DM",
      isWriterMenu: false,
      onClick: () => {
        router.push("/dm");
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
              if (!item.isWriterMenu || (item.isWriterMenu && props.isWriter)) {
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