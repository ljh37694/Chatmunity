import styles from './page.module.css';
import ChattingRoom from '@/components/ChattingRoom';
import { Chat } from '@/components/ChattingRoom';

export default function Main() {
  const postList: Chat[] = [
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
    { content: "내용" },
  ];

  return (
    <div className={styles.container}>
      <ChattingRoom chatList={postList} />
    </div>
  );
}