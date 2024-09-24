import styles from '@/styles/ui/Reply.module.css';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  className?: string,
}

export default function Reply(props: Props) {
  return (
    <div className={`${styles.container} ${props.className}`}>
      hi
    </div>
  )
}