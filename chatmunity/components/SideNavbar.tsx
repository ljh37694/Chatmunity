import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideNavbar.module.css';
import { faFire, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export default function SideNavbar() {
  interface NavMenu {
    text: string,
    icon: IconDefinition,
  }

  const navMenuList: NavMenu[] = [
    { text: 'Home', icon: faHome },
    { text: 'Hot', icon: faFire },
  ];

  return (
    <nav id={styles['navbar']}>
      <section className={styles.menuContainer}>
        {navMenuList.map((item, idx) => {
          return (
            <label className={styles.menu} key={idx}>
              <FontAwesomeIcon icon={item.icon} />
              <p>{item.text}</p>
            </label>
          );
        })}

      </section>
    </nav>
  )
}