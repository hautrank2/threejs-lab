import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 12 — Animation loop và delta time
 * Vì sao animation chạy nhanh gấp đôi trên màn 120Hz.
 *
 * Note      /blog/threejs/ba-thanh-phan/animation-loop — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/12-animation-loop.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "delta",
      title: "Hằng số và delta, đặt cạnh nhau",
      setup: (lab) => {
        const { scene, onTick, readout } = lab;

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const wrong = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({ color: 0xef4444 }),
        );
        wrong.position.set(-1.2, 0.5, 0);
        scene.add(wrong);

        const right = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({ color: 0x22c55e }),
        );
        right.position.set(1.2, 0.5, 0);
        scene.add(right);

        let frames = 0;
        let acc = 0;

        onTick((delta) => {
          wrong.rotation.y += 0.01; // sai: phụ thuộc tần số quét
          right.rotation.y += 0.6 * delta; // đúng: 0.6 radian mỗi giây

          frames++;
          acc += delta;
          if (acc >= 0.5) {
            readout(
              `${Math.round(frames / acc)} FPS\n` +
                `đỏ  (+= 0.01)      ${(((wrong.rotation.y * 180) / Math.PI) % 360).toFixed(0)}°\n` +
                `xanh (0.6 * delta) ${(((right.rotation.y * 180) / Math.PI) % 360).toFixed(0)}°`,
            );
            frames = 0;
            acc = 0;
          }
        });
      },
    },
  ],
};
