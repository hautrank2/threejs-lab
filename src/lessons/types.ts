import type { LessonModuleType } from "~/lab";

export type LessonKindType =
  /** Chặng — chỉ để nhóm, không mở được. */
  | "section"
  /** Có bài tập chạy được trong lab. */
  | "lesson"
  /** Blog đã viết nhưng không có gì để chạy (bài lý thuyết, bài cài đặt). */
  | "note"
  /** Có trong giáo trình, chưa viết note và chưa dựng lab. */
  | "planned";

export type LessonNodeType = {
  kind: LessonKindType;
  /** Trùng slug của note bên blog, để hai bên tra được nhau. */
  slug: string;
  title: string;
  description?: string;
  /** Đường dẫn note tương ứng bên blog, tính từ `/blog/threejs`. */
  blogPath?: string;
  /** Mục "Thử phá" của note — thứ đáng nghịch sau khi bài chạy được. */
  breaks?: string[];
  /** Chỉ có ở `kind: "lesson"`. Tải lười, không nằm trong bundle đầu tiên. */
  load?: () => Promise<{ lesson: LessonModuleType }>;
  children?: LessonNodeType[];
};

export type ProgressType = { done: number; total: number };
