import { useMemo, useState } from "react";
import { FeedCard } from "../components/feed/FeedCard";
import { Composer } from "../components/feed/Composer";
import { initialFeedPosts } from "../data/feedPosts";
import type { FeedPost } from "../types/feed";

export function ClassFeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(initialFeedPosts);
  const stats = useMemo(
    () => ({
      posts: posts.length,
      seen: posts.reduce((total, post) => total + post.reactions.seen, 0),
      engagement: posts.reduce((total, post) => total + post.reactions.hearts + post.reactions.cheers, 0)
    }),
    [posts]
  );

  return (
    <section className="feed-page">
      <div className="feed-hero">
        <div>
          <p className="eyebrow">Class Feed</p>
          <h2>Daily classroom story, ready for families.</h2>
          <p>Teachers can publish learning moments, celebrations, and simple announcements in a friendly timeline.</p>
        </div>
        <div className="feed-stats" aria-label="Feed summary">
          <span>
            <strong>{stats.posts}</strong>
            Updates
          </span>
          <span>
            <strong>{stats.seen}</strong>
            Family views
          </span>
          <span>
            <strong>{stats.engagement}</strong>
            Reactions
          </span>
        </div>
      </div>

      <div className="feed-grid">
        <Composer onPublish={(post) => setPosts((currentPosts) => [post, ...currentPosts])} />
        <div className="timeline">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
