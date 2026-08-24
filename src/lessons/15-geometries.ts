import type { LessonModuleType } from "~/lab";

/**
 * Bài 15 — Geometries
 * Hình dạng chỉ là mảng số. Segments là chỗ đốt hiệu năng dễ nhất.
 *
 * Note      /blog/threejs/geometry-material/geometries — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/15-geometries.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "bang-tra",
      title: "Bảng tra 12 geometry dựng sẵn",
      lab: { helpers: false },
      setup: () => {
        // TODO — Bảng tra 12 geometry dựng sẵn
      },
    },
    {
      id: "tam-giac",
      title: "Tự dựng một tam giác",
      lab: { helpers: false },
      setup: () => {
        // TODO — Tự dựng một tam giác
      },
    },
    {
      id: "song",
      title: "Sửa từng đỉnh lúc chạy",
      lab: { helpers: false },
      setup: () => {
        // TODO — Sửa từng đỉnh lúc chạy
      },
    },
  ],
};
