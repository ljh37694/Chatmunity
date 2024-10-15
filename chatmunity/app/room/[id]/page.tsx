import PostRoom from "@/components/ui/PostRoom";
import styles from "./page.module.css";
import { connectDB } from "@/app/utils/datadbase";
import { Post, Room } from "@/types";

interface Props {
  params: {
    id: string,
  }
}

export default async function RoomDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const postList = await db.collection<Post>('post').find().toArray();
  const roomData = await db.collection<Room>('room').findOne({ id: props.params.id });

  return (
    <div>
      <PostRoom postList={postList} roomData={roomData} />
    </div>
  );
}