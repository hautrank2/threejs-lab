import type { LessonModuleType } from "~/lab";

/**
 * dispose() và rò rỉ bộ nhớ GPU
 * scene.remove() không giải phóng gì cả.
 *
 * Note      /blog/threejs/phu-luc/dispose-va-memory-leak — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/phu-luc-dispose.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "may-do-ro-ri",
      title: "Máy đo rò rỉ",
      lab: { helpers: false },
      setup: () => {
        // TODO — Máy đo rò rỉ
      },
    },
  ],
};
