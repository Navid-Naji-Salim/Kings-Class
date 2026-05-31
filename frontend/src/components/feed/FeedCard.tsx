import { Heart, MessageCircle, PartyPopper, ShieldCheck } from "lucide-react";
import type { FeedPost } from "../../types/feed";

const typeLabels = {
  learning: "Learning Moment",
  celebration: "Celebration",
  announcement: "Announcement"
};

export function FeedCard({ post }: { post: FeedPost }) {
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

      <footer className="feed-card__footer">
        <button type="button">
          <Heart size={17} />
          {post.reactions.hearts}
        </button>
        <button type="button">
          <PartyPopper size={17} />
          {post.reactions.cheers}
        </button>
        <button type="button">
          <MessageCircle size={17} />
          {post.comments.length}
        </button>
        <span>{post.reactions.seen} seen</span>
      </footer>

      {post.comments.length ? (
        <div className="comment-preview">
          <strong>{post.comments[0].author}</strong>
          <span>{post.comments[0].body}</span>
        </div>
      ) : null}
    </article>
  );
}
