'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/ui/HeartButton.module.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Session } from 'next-auth';

interface Props {
  postData: Post;
  session: Session | null;
}

export default function HeartButton({ postData, session }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(0);

  const onClickHeartButton = () => {
    setIsActive(!isActive);
    setHeartCount(isActive ? heartCount - 1 : heartCount + 1);

    axios.put(`/api/post?id=${postData._id}&count=${isActive ? -1 : 1}&email=${session?.user?.email}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    setHeartCount(postData?.likes);
  }, [postData]);

  useEffect(() => {
    axios.get(`/api/heart?email=${session?.user?.email}&post_id=${postData._id}`)
      .then(res => {
        setIsActive(res.data ? true : false);
        console.log(res.data);
      });
  }, []);

  return (
    <button className={styles.heartButton}>
      <FontAwesomeIcon icon={faHeart} onClick={onClickHeartButton} className={`${styles.heartIcon} ${isActive ? styles.activeHeartIcon : ''}`} size='lg' />
      <span>{heartCount}</span>
    </button>
  );
}
