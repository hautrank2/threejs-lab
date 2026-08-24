import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "cube",
      title: "Khối hộp đầu tiên",
      setup: (lab) => {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 }),
        );
        cube.position.y = 0.5;
        lab.scene.add(cube);

        const params = { speed: 0.6 };
        lab.gui.add(params, "speed", 0, 4, 0.01).name("tốc độ (radian/giây)");

        lab.onTick((delta) => {
          cube.rotation.y += params.speed * delta;
        });

        lab.readout(
          "Bài học chỉ có mấy dòng: tạo mesh, add, onTick.\n" +
            "Renderer, camera, resize, vòng lặp — createLab() gánh hết.",
        );
      },
    },
  ],
};
