import PostRoom from "@/components/ui/PostRoom";
import styles from "./page.module.css";
import { connectDB } from "@/app/utils/datadbase";
import { Post, PostRoomType } from "@/types";
import ChattingRoom from "@/components/common/ChattingRoom";
import ChattingList from "@/components/common/ChattingList";
import PostInput from "@/components/ui/PostInput";
import Chatting from "@/components/ui/Chatting";

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
    <ChattingRoom title={roomData?.title as string} className={styles.container}>
      <ChattingList inputComp={<PostInput roomId={props.params.id} />}>
        {
          postList.map((item, idx) => {
            const data: Post = {
              ...item,
              _id: item._id.toString(),
            }

            return (
              <Chatting chatData={data} isOtherChat={idx % 2 === 0} url={`/post/${item._id}`} key={item._id.toString()} />
            );
          })
        }
      </ChattingList>
    </ChattingRoom>
  );
}