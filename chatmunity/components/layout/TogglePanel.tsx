import styles from '@/styles/layout/TogglePanel.module.css';
import LogoutButton from '../ui/LogoutButton';
import LoginButton from '../ui/LoginButton';

interface Props {
  show: boolean,
  isLogined: boolean,
}

export default function TogglePanel(props: Props) {
  return (
    <div className={`${styles.container} ${props.show ? styles.show : ''}`}>
      { props.isLogined ? <LogoutButton /> : <LoginButton /> }
    </div>
  )
}