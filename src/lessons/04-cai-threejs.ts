import type { LessonModuleType } from "~/lab";

/**
 * Bài 4 — Cài three và @types/three
 * Hai gói, và quy tắc khớp phiên bản minor.
 *
 * Note      /blog/threejs/chuan-bi/cai-threejs — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/04-cai-threejs.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "revision",
      title: "Kiểm tra đã cài đúng",
      lab: { helpers: false },
      setup: () => {
        // TODO — Kiểm tra đã cài đúng
      },
    },
  ],
};
