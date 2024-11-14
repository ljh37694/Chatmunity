import ChattingRoom from '@/components/common/ChattingRoom';
import styles from './page.module.css';
import ChattingList from '@/components/common/ChattingList';
import { connectDB } from '@/app/utils/datadbase';
import { Chat, Post } from '@/types';
import Chatting from '@/components/ui/Chatting';
import SearchInput from '@/components/ui/SearchInput';

interface Props {
  params: {
    query: string,
  }
}

export default async function SearchPage(props: Props) {
  const { params: { query }, } = props;

  const searchQuery = decodeURIComponent(query);

  const clinet = await connectDB;
  const db = clinet.db('Chatmunity');
  const searchResult = await db.collection<Post>('post').find({ title: { $regex: searchQuery, $options: 'i' } }).toArray();

  const postList: Chat[] = searchResult.map((item) => {
    return {
      _id: item._id.toString(),
      content: item.title,
      date: item.date,
      name: item.name,
      writer: item.writer,
    }
  });

  return (
    <ChattingRoom title={searchQuery}>
      <ChattingList inputComp={<SearchInput />}>
        {
          postList.map((item, idx) => {
            return (
              <Chatting chatData={item} url={`/post/` + item._id} isOtherChat={false} key={idx} />
            );
          })
        }
      </ChattingList>
    </ChattingRoom>
  );
}