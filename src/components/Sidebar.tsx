import styles from "./Sidebar.module.css";

export default function Sidebar(){
  return (
    <nav className={styles.nav}>
      <a className={styles.item} href="#">홈</a>
      <a className={styles.item} href="#">탐색</a>
      <a className={styles.item} href="#">알림</a>
      <a className={styles.item} href="#">프로필</a>
      <a className={styles.item} href="#">설정</a>
    </nav>
  );
}
