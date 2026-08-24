import type { LessonModuleType } from "~/lab";

/**
 * Bài 11 — Renderer
 * Nơi duy nhất chạm vào GPU, và ba thiết lập quyết định đẹp hay nhoè.
 *
 * Note      /blog/threejs/ba-thanh-phan/renderer — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/11-renderer.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "tone-mapping",
      title: "Pixel ratio, tone mapping và ba con số",
      lab: { helpers: false },
      setup: () => {
        // TODO — Pixel ratio, tone mapping và ba con số
      },
    },
  ],
};
