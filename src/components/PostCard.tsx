import Image from "next/image";
import styles from "./PostCard.module.css";

export type PostUI = {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  tags?: string[];
};

export default function PostCard({ post }: { post: PostUI }){
  return (
    <article className={styles.card}>
      <Image src={post.author.avatar} width={40} height={40} alt="avatar" className={styles.avatar} />
      <div className={styles.body}>
        <header className={styles.head}>
          <div className={styles.line1}>
            <strong>{post.author.name}</strong>
            <span className={styles.time}>{post.createdAt}</span>
          </div>
        </header>
        <p className={styles.content}>{post.content}</p>
        <footer className={styles.meta}>
          <button>❤️ {post.likes}</button>
          <button>💬 {post.comments}</button>
          <button>🔁 {post.shares}</button>
        </footer>
      </div>
    </article>
  );
}
