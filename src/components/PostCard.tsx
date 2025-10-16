'use client';

import Image from "next/image";
import styles from "./PostCard.module.css";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export type PostUI = {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
};

export default function PostCard({ post }: { post: PostUI }) {
  const [likes, setLikes] = useState(post.likes);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    if (loading) return;
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .update({ likes: likes + 1 })
      .eq("id", post.id);

    if (!error) {
      setLikes((prev) => prev + 1);
    } else {
      alert("좋아요 처리 중 오류 발생: " + error.message);
    }
    setLoading(false);
  }

  return (
    <article className={styles.card}>
      <Image
        src={post.author.avatar}
        width={40}
        height={40}
        alt="avatar"
        className={styles.avatar}
      />
      <div className={styles.body}>
        <header className={styles.head}>
          <div className={styles.line1}>
            <strong>{post.author.name}</strong>
            <span className={styles.time}>{post.createdAt}</span>
          </div>
        </header>
        <p className={styles.content}>{post.content}</p>
        <footer className={styles.meta}>
          <button onClick={handleLike} disabled={loading}>
            ❤️ {likes}
          </button>
          <button>💬 {post.comments}</button>
          <button>🔁 {post.shares}</button>
        </footer>
      </div>
    </article>
  );
}
