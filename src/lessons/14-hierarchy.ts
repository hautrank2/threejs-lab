import type { LessonModuleType } from "~/lab";

/**
 * Bài 14 — Object3D hierarchy
 * Cây scene chính là phép nhân ma trận dây chuyền.
 *
 * Note      /blog/threejs/object3d/hierarchy — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/14-hierarchy.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "solar",
      title: "Hệ mặt trời hai tầng",
      lab: { helpers: false, lights: false },
      setup: () => {
        // TODO — Hệ mặt trời hai tầng
      },
    },
    {
      id: "local-world",
      title: "Nhìn thấy local và world cùng lúc",
      setup: () => {
        // TODO — Nhìn thấy local và world cùng lúc
      },
    },
  ],
};
