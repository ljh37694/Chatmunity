import PostRoom from "@/components/ui/PostRoom";
import styles from "./page.module.css";
import { connectDB } from "@/app/utils/datadbase";
import { Post } from "@/types";

interface Props {
  params: {
    id: string,
  }
}

export default async function RoomDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const result = await db.collection<Post>('post').find().toArray();

  return (
    <div>
      {props.params.id}
      <PostRoom postList={result} roomId={props.params.id} />
    </div>
  );
}