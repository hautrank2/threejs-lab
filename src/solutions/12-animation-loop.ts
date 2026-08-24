import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "delta",
      title: "Hằng số và delta, đặt cạnh nhau",
      setup: (lab) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const wrong = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({ color: 0xef4444 }),
        );
        wrong.position.set(-1.2, 0.5, 0);
        lab.scene.add(wrong);

        const right = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({ color: 0x22c55e }),
        );
        right.position.set(1.2, 0.5, 0);
        lab.scene.add(right);

        let frames = 0;
        let acc = 0;

        lab.onTick((delta) => {
          wrong.rotation.y += 0.01; // sai: phụ thuộc tần số quét
          right.rotation.y += 0.6 * delta; // đúng: 0.6 radian mỗi giây

          frames++;
          acc += delta;
          if (acc >= 0.5) {
            const deg = (rad: number) => (((rad * 180) / Math.PI) % 360).toFixed(0);
            lab.readout(
              `${Math.round(frames / acc)} FPS\n` +
                `đỏ   (+= 0.01)      ${deg(wrong.rotation.y)}°\n` +
                `xanh (0.6 * delta)  ${deg(right.rotation.y)}°`,
            );
            frames = 0;
            acc = 0;
          }
        });
      },
    },
  ],
};
