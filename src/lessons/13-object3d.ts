import type { LessonModuleType } from "~/lab";

/**
 * Bài 13 — Object3D
 * position, rotation, scale chỉ là lớp vỏ của một ma trận 4×4.
 *
 * Note      /blog/threejs/object3d/object3d — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/13-object3d.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "matrix",
      title: "Vặn từng thuộc tính, nhìn ma trận đổi theo",
      setup: () => {
        // TODO — Vặn từng thuộc tính, nhìn ma trận đổi theo
      },
    },
  ],
};
