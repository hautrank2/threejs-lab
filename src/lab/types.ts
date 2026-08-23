import type { Lab } from "./create-lab";

/**
 * Một bài tập chạy được. Trả về hàm dọn nếu bài tự tạo thêm tài nguyên ngoài
 * `lab` (panel Stats, PMREMGenerator…) — hoặc dùng `lab.onCleanup`.
 */
export type DemoSetupFn = (
  lab: Lab,
) => void | (() => void) | Promise<void | (() => void)>;

export type DemoType = {
  id: string;
  title: string;
  /** Tuỳ chọn của `createLab` mà bài này cần. */
  lab?: { helpers?: boolean; lights?: boolean };
  setup: DemoSetupFn;
};

export type LessonModuleType = {
  demos: DemoType[];
};
