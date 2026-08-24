import type { LessonModuleType } from "~/lab";

/**
 * Bài 17 — Các material hay dùng
 * Tám loại đặt cạnh nhau, và cây quyết định chọn loại nào.
 *
 * Note      /blog/threejs/geometry-material/common-materials — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/17-common-materials.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "tam-loai",
      title: "Tám loại đứng cạnh nhau",
      lab: { helpers: false },
      setup: () => {
        // TODO — Tám loại đứng cạnh nhau
      },
    },
  ],
};
