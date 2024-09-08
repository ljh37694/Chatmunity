import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHome, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './TopNavbar.module.css';
import Link from "next/link";

export default function TopNavbar() {
  interface NavMenu {
    url: string,
    icon: IconDefinition,
  }
  
  const navMenuList: NavMenu[] = [{ url: "/main", icon: faHome }, { url: '/write', icon: faPlus }];
  
  return (
    <nav id={styles.navbar}>
      <section className={styles.logo}>
        <Link href='/'>CM</Link>
      </section>

      <section className={styles["search-container"]}>
        <label><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
        <input className={styles["search-input"]} />
      </section>

      <section className={styles.menu}>
        {navMenuList.map((item, idx) => {
          return (
            <Link href={item.url} key={idx}>
              <FontAwesomeIcon icon={item.icon} />
            </Link>
          );
        })}
      </section>
    </nav>
  );
}