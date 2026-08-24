import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "revision",
      title: "Kiểm tra đã cài đúng",
      lab: { helpers: false },
      setup: (lab) => {
        // Bài giảng bảo mở console. Trong lab thì in thẳng ra màn hình —
        // `readout` cũng là thứ dùng lại ở 37 bài sau.
        const v = new THREE.Vector3(1, 2, 3);

        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 }),
        );
        lab.scene.add(cube);

        lab.onTick((delta) => {
          cube.rotation.y += 0.6 * delta;
          cube.rotation.x += 0.2 * delta;
        });

        lab.readout(
          `THREE.REVISION   ${THREE.REVISION}   (r${THREE.REVISION} = 0.${THREE.REVISION}.x)\n` +
            `Vector3(1,2,3)   x=${v.x} y=${v.y} z=${v.z}  length=${v.length().toFixed(3)}\n\n` +
            `three và @types/three phải khớp phiên bản minor:\n` +
            `  npm ls three @types/three`,
        );
      },
    },
  ],
};
