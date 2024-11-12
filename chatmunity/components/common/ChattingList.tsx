import styles from "@/styles/common/ChattingList.module.css";

interface Props {
  inputComp: React.ReactNode,
  children: React.ReactNode,
}

export default function ChattingList(props: Props) {
  const { inputComp, children } = props;

  return (
    <div className={styles.container}>
      <section className={styles.chatContainer}>
        <div className={styles.chatList}>
          { children }
        </div>
      </section>
      
      <section className={styles.inputContainer}>
       {inputComp}
      </section>
    </div>
  )
}