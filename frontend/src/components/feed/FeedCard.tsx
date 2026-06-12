import { useState } from "react";
import type { FormEvent } from "react";
import { Heart, MessageCircle, PartyPopper, Send, ShieldCheck } from "lucide-react";
import type { FeedPost } from "../../types/feed";

const typeLabels = {
  learning: "Learning Moment",
  celebration: "Celebration",
  announcement: "Announcement"
};

export function FeedCard({ post }: { post: FeedPost }) {
  const [hearts, setHearts] = useState(post.reactions.hearts);
  const [cheers, setCheers] = useState(post.reactions.cheers);
  const [hasHearted, setHasHearted] = useState(false);
  const [hasCheered, setHasCheered] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [commentBody, setCommentBody] = useState("");

  function toggleHeart() {
    setHasHearted((current) => {
      setHearts((count) => count + (current ? -1 : 1));
      return !current;
    });
  }

  function toggleCheer() {
    setHasCheered((current) => {
      setCheers((count) => count + (current ? -1 : 1));
      return !current;
    });
  }

  function handleComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!commentBody.trim()) {
      return;
    }

    setComments((currentComments) => [
      { id: crypto.randomUUID(), author: "Admin", body: commentBody.trim() },
      ...currentComments
    ]);
    setCommentBody("");
  }

  return (
    <article className={`feed-card feed-card--${post.type}`}>
      <header className="feed-card__header">
        <div className="teacher-avatar">{post.teacherName.split(" ").map((word) => word[0]).slice(0, 2).join("")}</div>
        <div>
          <h3>{post.teacherName}</h3>
          <p>
            {post.teacherTitle} · {post.className}
          </p>
        </div>
        <span className="post-time">{post.createdAt}</span>
      </header>

      <div className="post-badge">
        {post.type === "celebration" ? <PartyPopper size={15} /> : <ShieldCheck size={15} />}
        {typeLabels[post.type]}
      </div>

      <p className="feed-card__body">{post.body}</p>

      {post.attachments?.length ? (
        <div className="attachment-strip">
          {post.attachments.map((attachment) => (
            <span key={attachment}>{attachment}</span>
          ))}
        </div>
      ) : null}

      {post.media?.length ? (
        <div className="post-media-grid">
          {post.media.map((item) => (
            <img key={item.id} src={item.url} alt={item.name} />
          ))}
        </div>
      ) : null}

      <footer className="feed-card__footer">
        <button className={`reaction-button reaction-button--heart${hasHearted ? " is-active" : ""}`} type="button" onClick={toggleHeart} aria-pressed={hasHearted}>
          <Heart size={17} />
          {hearts}
        </button>
        <button className={`reaction-button reaction-button--cheer${hasCheered ? " is-active" : ""}`} type="button" onClick={toggleCheer} aria-pressed={hasCheered}>
          <PartyPopper size={17} />
          {cheers}
        </button>
        <button className="reaction-button" type="button">
          <MessageCircle size={17} />
          {comments.length}
        </button>
        <span>{post.reactions.seen} seen</span>
      </footer>

      {comments.length ? (
        <div className="comment-preview">
          <strong>{comments[0].author}</strong>
          <span>{comments[0].body}</span>
        </div>
      ) : null}

      <form className="comment-form" onSubmit={handleComment}>
        <input value={commentBody} onChange={(event) => setCommentBody(event.target.value)} placeholder="Add a quick comment..." aria-label="Add a comment" />
        <button type="submit" aria-label="Post comment">
          <Send size={16} />
        </button>
      </form>
    </article>
  );
}
