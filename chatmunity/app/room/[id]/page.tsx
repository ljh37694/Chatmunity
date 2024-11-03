import PostRoom from "@/components/ui/PostRoom";
import styles from "./page.module.css";
import { connectDB } from "@/app/utils/datadbase";
import { Post, PostRoomType } from "@/types";

interface Props {
  params: {
    id: string,
  }
}

export default async function RoomDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const postList = await db.collection<Post>('post').find({
    room_id: props.params.id,
  }).toArray();
  
  const roomData = await db.collection<PostRoomType>('room').findOne({ id: props.params.id });

  return (
    <div className={styles.container}>
      <PostRoom postList={postList} roomData={roomData} />
    </div>
  );
}