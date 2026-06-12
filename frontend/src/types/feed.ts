export type FeedPostType = "announcement" | "learning" | "celebration";

export type FeedPost = {
  id: string;
  teacherName: string;
  teacherTitle: string;
  className: string;
  type: FeedPostType;
  createdAt: string;
  body: string;
  attachments?: string[];
  media?: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  reactions: {
    hearts: number;
    cheers: number;
    seen: number;
  };
  comments: Array<{
    id: string;
    author: string;
    body: string;
  }>;
};
