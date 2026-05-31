import { useState } from "react";
import type { FormEvent } from "react";
import { ImagePlus, Megaphone, Send } from "lucide-react";
import type { FeedPost, FeedPostType } from "../../types/feed";

type ComposerProps = {
  onPublish: (post: FeedPost) => void;
};

export function Composer({ onPublish }: ComposerProps) {
  const [body, setBody] = useState("");
  const [type, setType] = useState<FeedPostType>("learning");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!body.trim()) {
      return;
    }

    onPublish({
      id: crypto.randomUUID(),
      teacherName: "King's Class Admin",
      teacherTitle: "School Administrator",
      className: "All Classes",
      type,
      createdAt: "Just now",
      body: body.trim(),
      attachments: type === "announcement" ? ["Admin announcement"] : ["Classroom update"],
      reactions: { hearts: 0, cheers: 0, seen: 1 },
      comments: []
    });
    setBody("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer__header">
        <div>
          <p className="eyebrow">Publish update</p>
          <h2>Share with a class</h2>
        </div>
        <select value={type} onChange={(event) => setType(event.target.value as FeedPostType)} aria-label="Post type">
          <option value="learning">Learning Moment</option>
          <option value="celebration">Celebration</option>
          <option value="announcement">Announcement</option>
        </select>
      </div>

      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Write a classroom update families would be excited to read..."
        rows={4}
      />

      <div className="composer__footer">
        <button type="button" className="soft-button">
          <ImagePlus size={17} />
          Add media
        </button>
        <button type="button" className="soft-button">
          <Megaphone size={17} />
          Notify families
        </button>
        <button className="publish-button" type="submit">
          <Send size={17} />
          Publish
        </button>
      </div>
    </form>
  );
}
