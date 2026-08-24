import type { LessonModuleType } from "~/lab";

/**
 * Bài 19 — Lights
 * Sáu loại đèn, cái nào rẻ cái nào đắt, và vì sao RectAreaLight hay đen thui.
 *
 * Note      /blog/threejs/anh-sang/lights — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/19-lights.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "sau-loai",
      title: "Sáu loại đèn, bật tắt từng cái",
      lab: { helpers: false, lights: false },
      setup: () => {
        // TODO — Sáu loại đèn, bật tắt từng cái
      },
    },
  ],
};
