import type { LessonModuleType } from "~/lab";

/**
 * Bài 7 — GUI để vặn tham số
 * dat.GUI đã cũ; lil-gui đi kèm sẵn trong gói three.
 *
 * Note      /blog/threejs/chuan-bi/dat-gui — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/07-dat-gui.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "gui",
      title: "Bốn kiểu control",
      setup: () => {
        // TODO — Bốn kiểu control
      },
    },
  ],
};
