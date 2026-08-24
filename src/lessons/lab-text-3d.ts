import type { LessonModuleType } from "~/lab";

/**
 * Ba cách đưa chữ vào scene
 * TextGeometry, canvas texture, và CSS2DRenderer.
 *
 * Bài này không có note bên blog — tự nghĩ ra cách làm.
 * Đối chiếu src/solutions/lab-text-3d.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "ba-cach",
      title: "Ba cách đưa chữ vào scene",
      lab: { helpers: false },
      setup: () => {
        // TODO — Ba cách đưa chữ vào scene
      },
    },
  ],
};
