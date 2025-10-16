'use client';

import { useState } from "react";
import styles from "./Composer.module.css";
import { supabase } from "../lib/supabaseClient";

export default function Composer({ onPosted }: { onPosted?: () => void }){
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(){
    if(!content.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("posts").insert({
      author_name: author || "익명",
      content
    });
    setSaving(false);
    if(!error){
      setContent("");
      if(onPosted) onPosted();
    } else {
      alert("저장 중 오류: " + error.message);
    }
  }

  return (
    <div className={styles.wrap}>
      <input
        className={styles.author}
        placeholder="작성자 이름 (선택)"
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
      />
      <textarea
        maxLength={500}
        placeholder="오늘의 계약/영업 인사이트를 짧게 공유해보세요 (최대 500자)"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />
      <div className={styles.row}>
        <div className={styles.hint}>#태그를 포함하면 탐색에 노출이 잘 됩니다</div>
        <button className={styles.postBtn} onClick={submit} disabled={saving || !content.trim()}>
          {saving ? "게시 중…" : "게시"}
        </button>
      </div>
    </div>
  );
}
