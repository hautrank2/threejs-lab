import type { LessonModuleType } from "~/lab";

/**
 * Bài 8 — Bộ khung dùng lại
 * createLab() viết một lần, 37 bài sau chỉ tốn vài dòng để bắt đầu.
 *
 * Note      /blog/threejs/chuan-bi/course-boilerplate — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/08-course-boilerplate.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "cube",
      title: "Khối hộp đầu tiên",
      setup: () => {
        // TODO — Khối hộp đầu tiên
      },
    },
  ],
};
