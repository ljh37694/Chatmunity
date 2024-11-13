import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '@/styles/layout/TopNavbar.module.css';
import Link from "next/link";
import TopNavbarMenu from "../ui/TopNavbarMenu";
import DrawerButton from "../ui/DrawerButton";
import TopNavbarInput from "../ui/TopNavbarInput";

export default async function TopNavbar() {
  return (
    <nav className={styles.navbar}>
      <section className={styles.left}>
        <div className={styles.logo}>
          <DrawerButton />
          <Link href='/'>CM</Link>
        </div>
      </section>

      <section className={styles.middle}>
        <TopNavbarInput />
      </section>

      <section className={styles.right}>
        <div className={styles.menu}>
          <TopNavbarMenu />
        </div>
      </section>
    </nav>
  );
}