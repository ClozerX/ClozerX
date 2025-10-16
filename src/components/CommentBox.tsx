'use client';

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CommentBox({ postId, onPosted }: { postId: string; onPosted?: () => void }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      author_name: author || "익명",
      content,
    });

    setLoading(false);
    if (error) alert("댓글 등록 중 오류: " + error.message);
    else {
      setContent("");
      if (onPosted) onPosted();
    }
  }

  return (
    <div style={{ marginTop: "8px", paddingLeft: "48px" }}>
      <input
        placeholder="작성자 이름 (선택)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{
          width: "100%",
          border: "1px solid #e6ebf2",
          borderRadius: "8px",
          padding: "6px 10px",
          marginBottom: "4px",
        }}
      />
      <textarea
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        style={{
          width: "100%",
          border: "1px solid #e6ebf2",
          borderRadius: "8px",
          padding: "6px 10px",
          resize: "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "end", marginTop: "4px" }}>
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          style={{
            background: "#3A8DFF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          {loading ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
}
