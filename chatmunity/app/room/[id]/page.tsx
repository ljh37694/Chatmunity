import styles from "./page.module.css";

interface Props {
  params: {
    id: string,
  }
}

export default function RoomDetail(props: Props) {
  return (
    <div>{props.params.id}</div>
  )
}