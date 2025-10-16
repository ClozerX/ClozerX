'use client';

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Comment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadComments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (!error && data) setComments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadComments();
  }, []);

  if (loading) return <div style={{ paddingLeft: "48px", color: "#999" }}>댓글 불러오는 중...</div>;

  return (
    <div style={{ paddingLeft: "48px", marginTop: "4px" }}>
      {comments.length === 0 && (
        <div style={{ fontSize: "13px", color: "#999" }}>아직 댓글이 없습니다.</div>
      )}
      {comments.map((c) => (
        <div key={c.id} style={{ marginBottom: "4px", fontSize: "14px" }}>
          <strong>{c.author_name || "익명"}</strong> {c.content}
        </div>
      ))}
    </div>
  );
}
