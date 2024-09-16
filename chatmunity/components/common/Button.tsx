import styles from '@/styles/common/Button.module.css';

interface Props {
  text: string,
  className?: string,
  [key: string]: any,
  onClick?: (e :React.MouseEvent<HTMLElement, MouseEvent>) => void,
}

export default function Button(props: Props) {
  const { text, className, ...rest } = props;

  return (
    <button className={`${styles.button} ${className}`} {...rest}>{text}</button>
  );
}