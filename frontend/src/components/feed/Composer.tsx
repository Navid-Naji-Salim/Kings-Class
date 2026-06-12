import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ImagePlus, Megaphone, Send } from "lucide-react";
import type { FeedPost, FeedPostType } from "../../types/feed";

type ComposerProps = {
  onPost: (post: FeedPost) => void;
};

type DraftMedia = {
  id: string;
  name: string;
  url: string;
};

export function Composer({ onPost }: ComposerProps) {
  const [body, setBody] = useState("");
  const [type, setType] = useState<FeedPostType>("learning");
  const [media, setMedia] = useState<DraftMedia[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!body.trim()) {
      return;
    }

    onPost({
      id: crypto.randomUUID(),
      teacherName: "King's Class Admin",
      teacherTitle: "School Administrator",
      className: "All Classes",
      type,
      createdAt: "Just now",
      body: body.trim(),
      attachments: type === "announcement" ? ["Admin announcement"] : ["Classroom post"],
      media,
      reactions: { hearts: 0, cheers: 0, seen: 1 },
      comments: []
    });
    setBody("");
    setMedia([]);
  }

  function handleMediaChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"));
    setMedia((currentMedia) => [
      ...currentMedia,
      ...files.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file)
      }))
    ]);
    event.target.value = "";
  }

  function removeMedia(id: string) {
    setMedia((currentMedia) => currentMedia.filter((item) => item.id !== id));
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer__header">
        <div>
          <p className="eyebrow">Create post</p>
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
        placeholder="Write a classroom post families would be excited to read..."
        rows={4}
      />

      {media.length ? (
        <div className="media-preview-grid" aria-label="Selected media">
          {media.map((item) => (
            <figure key={item.id} className="media-preview">
              <img src={item.url} alt="" />
              <figcaption>{item.name}</figcaption>
              <button type="button" onClick={() => removeMedia(item.id)} aria-label={`Remove ${item.name}`}>
                Remove
              </button>
            </figure>
          ))}
        </div>
      ) : null}

      <div className="composer__footer">
        <label className="soft-button media-button">
          <ImagePlus size={17} />
          Add media
          <input type="file" accept="image/*" multiple onChange={handleMediaChange} />
        </label>
        <button type="button" className="soft-button">
          <Megaphone size={17} />
          Notify families
        </button>
        <button className="post-button" type="submit">
          <Send size={17} />
          Post
        </button>
      </div>
    </form>
  );
}
