import { MessageSquareText, Send, Sparkles } from "lucide-react";
import { messageThreads } from "../data/adminPrototype";

export function MessagesPage() {
  return (
    <section className="prototype-page prototype-page--messages">
      <div className="prototype-hero">
        <div>
          <h2>Coordinate family conversations from one inbox.</h2>
          <p>Prototype thread previews, unread counts, broadcast drafts, and scheduled reminders for future parent communication tools.</p>
        </div>
        <button className="admin-primary-action" type="button">
          <Send size={17} />
          New message
        </button>
      </div>

      <div className="message-layout">
        <div className="thread-list">
          {messageThreads.map((thread) => (
            <article key={thread.subject} className="thread-card">
              <div className="thread-card__topline">
                <strong>{thread.family}</strong>
                <span>{thread.time}</span>
              </div>
              <h3>{thread.subject}</h3>
              <p>{thread.preview}</p>
              {thread.unread ? <span className="unread-pill">{thread.unread} unread</span> : <span className="quiet-pill">All caught up</span>}
            </article>
          ))}
        </div>

        <aside className="message-assistant">
          <Sparkles size={20} />
          <h3>Draft helper</h3>
          <p>Future versions could suggest warm, school-approved replies in Kurdish, Arabic, or English before staff send them.</p>
          <button className="soft-button" type="button">
            <MessageSquareText size={17} />
            Try sample reply
          </button>
        </aside>
      </div>
    </section>
  );
}
