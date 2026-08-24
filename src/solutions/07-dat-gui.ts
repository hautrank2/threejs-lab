import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "gui",
      title: "Bốn kiểu control",
      setup: (lab) => {
        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.4,
        });
        const cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
        cube.position.y = 0.75;
        lab.scene.add(cube);

        const params = {
          speed: 0.6,
          color: "#38bdf8",
          wireframe: false,
          reset: () => cube.rotation.set(0, 0, 0),
        };

        const gui = lab.gui;

        gui.add(params, "speed", 0, 3, 0.01).name("tốc độ xoay");
        gui
          .addColor(params, "color")
          .name("màu")
          .onChange((value: string) => material.color.set(value));
        gui.add(params, "wireframe").onChange((value: boolean) => {
          material.wireframe = value;
        });
        gui.add(params, "reset").name("đặt lại góc xoay");

        const folder = gui.addFolder("Vị trí");
        folder.add(cube.position, "x", -4, 4, 0.01);
        folder.add(cube.position, "y", 0, 4, 0.01);
        folder.add(cube.position, "z", -4, 4, 0.01);

        lab.onTick((delta) => {
          cube.rotation.y += params.speed * delta;
        });
      },
    },
  ],
};
