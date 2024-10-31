'use client'

import Button from '@/components/common/Button';
import styles from './page.module.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Post } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
  params: {
    title: string,
  }
}

export default function Write(props: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const title = searchParams?.get('title');

    console.log(title);

    if (typeof title === 'string') {
      setTitle(title);
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert('제목을 입력하세요');
    } else if (!contentRef.current?.value) {
      alert('내용을 입력하세요');
    } else {
      const post: Post = {
        title: titleRef.current!.value,
        content: contentRef.current!.value,
        likes: 0,
        views: 0,
        writer: session?.user!.email as string,
        name: session?.user?.name as string,
        date: new Date().toString(),
        room_id: props.params.title,
      };
  
      axios.post('/api/write', post)
        .then((res: AxiosResponse) => {
          console.log(res.data);

          router.push('/room/' + props.params.title);
          router.refresh();
        })
        .catch((e: AxiosError) => {
          console.log(e);
        });
    }
  }

  return (
    <div>
      <form name='postForm' className={styles.form} onSubmit={onSubmit}>
        <input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} ref={titleRef} className={styles.title} placeholder='제목을 입력해주세요' />
        <textarea wrap='hard' placeholder='내용을 입력해주세요' ref={contentRef} className={styles.content} rows={28} cols={100}></textarea>
        <Button className={styles.button} type="submit" text='글쓰기' />
      </form>
    </div>
  );
}