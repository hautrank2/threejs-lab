import type { LessonModuleType } from "~/lab";

/**
 * Bài 10 — Camera
 * Bốn tham số, và một dòng quên gọi là hỏng cả bài.
 *
 * Note      /blog/threejs/ba-thanh-phan/camera — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/10-camera.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "perspective",
      title: "Bốn khối giống hệt nhau, đặt xa dần",
      setup: () => {
        // TODO — Bốn khối giống hệt nhau, đặt xa dần
      },
    },
  ],
};
