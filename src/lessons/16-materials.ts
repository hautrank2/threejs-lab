import type { LessonModuleType } from "~/lab";

/**
 * Bài 16 — Material
 * Thuộc tính chung, và hai thứ bắt buộc phải needsUpdate.
 *
 * Note      /blog/threejs/geometry-material/materials — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/16-materials.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "chung",
      title: "Thuộc tính chung, và hai thứ cần needsUpdate",
      lab: { helpers: false },
      setup: () => {
        // TODO — Thuộc tính chung, và hai thứ cần needsUpdate
      },
    },
  ],
};
