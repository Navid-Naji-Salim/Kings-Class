import type { FeedPost } from "../types/feed";

export const initialFeedPosts: FeedPost[] = [
  {
    id: "post-1",
    teacherName: "Ms. Hana Kareem",
    teacherTitle: "Grade 4 Homeroom",
    className: "Grade 4 - Cedar",
    type: "learning",
    createdAt: "Today, 10:20 AM",
    body: "Our class practiced persuasive writing today by preparing short speeches about how to care for the school garden. The confidence in their voices is growing quickly.",
    attachments: ["Writing workshop", "Garden care speeches"],
    reactions: { hearts: 18, cheers: 11, seen: 32 },
    comments: [
      { id: "c1", author: "Admin", body: "Wonderful topic choice. Please share two samples in tomorrow's assembly folder." }
    ]
  },
  {
    id: "post-2",
    teacherName: "Mr. Dilan Ahmed",
    teacherTitle: "Science Teacher",
    className: "Grade 6 - Oak",
    type: "celebration",
    createdAt: "Yesterday, 2:45 PM",
    body: "Students completed their first circuits lab. Teams tested switches, bulbs, and battery placement, then explained why one design worked better than another.",
    attachments: ["Circuits lab", "Team reflections"],
    reactions: { hearts: 25, cheers: 19, seen: 41 },
    comments: []
  },
  {
    id: "post-3",
    teacherName: "Ms. Sara Naji",
    teacherTitle: "Early Years Lead",
    className: "KG2 - Pearl",
    type: "announcement",
    createdAt: "Monday, 8:05 AM",
    body: "Reminder for families: KG2 will bring one favorite storybook on Wednesday for reading circle. Please label the book with your child's name.",
    attachments: ["Family reminder"],
    reactions: { hearts: 12, cheers: 4, seen: 27 },
    comments: []
  }
];
