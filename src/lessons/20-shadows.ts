import type { LessonModuleType } from "~/lab";

/**
 * Bài 20 — Shadows
 * Ba công tắc phải bật cùng lúc, và cách chữa shadow acne.
 *
 * Note      /blog/threejs/anh-sang/shadows — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/20-shadows.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "ba-cong-tac",
      title: "Ba công tắc, và khung shadow camera",
      lab: { helpers: false, lights: false },
      setup: () => {
        // TODO — Ba công tắc, và khung shadow camera
      },
    },
  ],
};
