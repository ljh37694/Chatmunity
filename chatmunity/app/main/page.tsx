import styles from './page.module.css';
import ChattingRoom from '@/components/ChattingRoom';
import { Chat } from '@/components/ChattingRoom';

export default function Main() {
  const postList: Chat[] = Array<Chat>(100);

  postList.fill(
    { 
      content: "내용",
      url: '/post/1'
    },
  );

  return (
    <div className={styles.container}>
      <ChattingRoom chatList={postList} />
    </div>
  );
}