import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '@/styles/layout/TopNavbar.module.css';
import Link from "next/link";
import TopNavbarMenu from "../ui/TopNavbarMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import DrawerButton from "../ui/DrawerButton";

export default async function TopNavbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className={styles.navbar}>
      <section className={styles.logo}>
        <DrawerButton />
        <Link href='/'>CM</Link>
      </section>

      <section className={styles["search-container"]}>
        <label><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
        <input className={styles["search-input"]} />
      </section>

      <section className={styles.menu}>
        <TopNavbarMenu />
      </section>
    </nav>
  );
}