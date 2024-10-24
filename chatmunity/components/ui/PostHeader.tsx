import { connectDB } from '@/app/utils/datadbase';
import styles from '@/styles/ui/PostHeader.module.css';
import { Post, UserData } from '@/types';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

interface Props {
  postData: Post | null,
}

export default async function PostHeader(props: Props) {
  const { postData } = props;

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const writerData = await db.collection<UserData>('user').findOne({ email: postData?.writer });
  
  const postDate = dayjs(postData?.date);

  const timeDiff = (time: Dayjs) => {
    const diff = dayjs.duration(dayjs().diff(time));

    if (diff.years()) {
      return diff.years() + "년 전";
    } else {
      if (diff.months()) {
        return diff.months() + "달 전";
      } else {
        if (diff.hours()) {
          return diff.hours() + "시간 전";
        } else {
          return diff.minutes() + "분 전";
        }
      }
    }
  }

  return (
    <section className={styles.header}>
      <img className={styles.img} src={writerData?.image} />

      <div className={styles.content}>
        <div className={styles.info}>
          <p>{writerData?.name}</p>
          <p className={styles.time}>{ timeDiff(postDate) }</p>
        </div>
        <FontAwesomeIcon className={styles.menu} icon={faEllipsisVertical} />
      </div>
    </section>
  );
}