'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/ui/HeartButton.module.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  postData: Post;
}

export default function HeartButton({ postData }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(0);

  const onClickHeartButton = () => {
    setIsActive(!isActive);
    setHeartCount(isActive ? heartCount - 1 : heartCount + 1);
    axios.put(`/post?id=${postData._id}&count=${isActive ? 1 : -1}`)
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

  return (
    <button className={styles.heartButton}>
      <FontAwesomeIcon icon={faHeart} onClick={onClickHeartButton} className={`${styles.heartIcon} ${isActive ? styles.activeHeartIcon : ''}`} size='lg' />
      <span>{heartCount}</span>
    </button>
  );
}
