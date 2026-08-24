import type { LessonModuleType } from "~/lab";

/**
 * Bài 18 — lil-gui
 * Thư mục, dropdown, preset, và mẹo trỏ thẳng vào object Three.js.
 *
 * Note      /blog/threejs/geometry-material/lil-gui — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/18-lil-gui.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "dashboard",
      title: "Dashboard đầy đủ: thư mục, dropdown, preset",
      setup: () => {
        // TODO — Dashboard đầy đủ: thư mục, dropdown, preset
      },
    },
  ],
};
