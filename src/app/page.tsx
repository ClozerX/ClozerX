'use client';

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import styles from "./styles.module.css";
import { supabase } from "../lib/supabaseClient";

export type DBPost = {
  id: string;
  author_name: string | null;
  content: string | null;
  created_at: string;
};

export default function Home(){
  const [posts, setPosts] = useState<DBPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts(){
    setLoading(true);
const { data, error } = await supabase
  .from("posts")
  .select("id, author_name, content, created_at, likes")
  .order("created_at", { ascending: false })
  .limit(50);

    if(!error && data) setPosts(data as DBPost[]);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.shell}>
      <Header />
      <div className={styles.body}>
        <aside className={styles.left}>
          <Sidebar />
        </aside>

        <main className={styles.center}>
          <Composer
            onPosted={async () => {
              await loadPosts();
            }}
          />
          <div className={styles.feed}>
            {loading && <div className="card" style={{background:'#fff', border:'1px solid #eceff4', borderRadius:16, padding:14}}>불러오는 중…</div>}
            {!loading && posts.length === 0 && (
              <div className="card" style={{background:'#fff', border:'1px solid #eceff4', borderRadius:16, padding:14}}>아직 게시글이 없습니다. 첫 글을 써보세요!</div>
            )}
            {posts.map(p => (
              <PostCard
                key={p.id}
                post={{
                  id: p.id,
                  author: { name: p.author_name || "익명", avatar: "/logo.svg" },
                  content: p.content || "",
                  createdAt: new Date(p.created_at).toLocaleString(),
                  likes: 0, comments: 0, shares: 0,
                }}
              />
            ))}
          </div>
        </main>

        <aside className={styles.right}>
          <section className={styles.widget + " " + styles.card}>
            <h3>인기 태그</h3>
            <ul>
              <li>#공공조달</li>
              <li>#SaaS</li>
              <li>#B2B</li>
              <li>#세일즈</li>
              <li>#클로징팁</li>
            </ul>
          </section>
          <section className={styles.widget + " " + styles.card}>
            <h3>추천 사용자</h3>
            <ul>
              <li>@closer_mk</li>
              <li>@govbid_pro</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
