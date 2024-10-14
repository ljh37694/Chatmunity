'use client'

import styles from "@/app/room/page.module.css";
import Button from '../common/Button';
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const router = useRouter();

  return (
    <div className={styles.roomBtn}>
      <Button text='방 만들기' onClick={() => {
        router.push('/create-room');
      }} />
    </div>
  )
}