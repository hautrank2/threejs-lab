import type { LessonModuleType } from "~/lab";
import { sceneFog } from "./mine/09-scene";

/**
 * Bài 9 — Scene
 * Node gốc của một cái cây, cộng ba thuộc tính toàn cục.
 *
 * Note      /blog/threejs/ba-thanh-phan/scene — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/09-scene.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "fog",
      title: "Một hàng khối chạy về phía xa",
      lab: { helpers: false },
      setup: sceneFog,
    },
  ],
};
