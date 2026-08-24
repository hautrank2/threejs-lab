import type { LessonModuleType } from "~/lab";

/**
 * Bài 12 — Animation loop và delta time
 * Vì sao animation chạy nhanh gấp đôi trên màn 120Hz.
 *
 * Note      /blog/threejs/ba-thanh-phan/animation-loop — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/12-animation-loop.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "delta",
      title: "Hằng số và delta, đặt cạnh nhau",
      setup: () => {
        // TODO — Hằng số và delta, đặt cạnh nhau
      },
    },
  ],
};
