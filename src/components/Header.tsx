import Image from "next/image";
import styles from "./Header.module.css";

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <Image src="/logo.svg" alt="ClozerX" width={28} height={28} />
        <span className={styles.brand}>ClozerX</span>
      </div>
      <input className={styles.search} placeholder="검색: #태그, 키워드..." />
      <div className={styles.actions}>
        <button className={styles.primary}>글쓰기</button>
        <button className={styles.ghost}>로그인</button>
      </div>
    </header>
  );
}
