import type { LessonModuleType } from "~/lab";

/**
 * Bài 21 — Environment maps
 * Thứ thật sự làm scene đẹp lên, và nó rẻ hơn thêm đèn.
 *
 * Note      /blog/threejs/anh-sang/environment-maps — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/21-environment-maps.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "roughness",
      title: "Năm quả cầu kim loại, không một cái đèn nào",
      lab: { helpers: false, lights: false },
      setup: () => {
        // TODO — Năm quả cầu kim loại, không một cái đèn nào
      },
    },
  ],
};
