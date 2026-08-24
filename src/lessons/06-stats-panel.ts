import type { LessonModuleType } from "~/lab";

/**
 * Bài 6 — Stats panel
 * Ba con số ở góc màn hình, và lý do nên bật ngay từ bài đầu.
 *
 * Note      /blog/threejs/chuan-bi/stats-panel — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/06-stats-panel.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "fps",
      title: "Nhìn FPS tụt theo thời gian thực",
      setup: () => {
        // TODO — Nhìn FPS tụt theo thời gian thực
      },
    },
  ],
};
