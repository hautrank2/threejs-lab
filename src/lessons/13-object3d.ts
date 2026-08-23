import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "matrix",
      title: "Vặn từng thuộc tính, nhìn ma trận đổi theo",
      setup: (lab) => {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8 }),
        );
        cube.position.y = 0.5;
        lab.scene.add(cube);

        // mỗi Object3D có đúng ba thuộc tính này, và một matrix dựng từ chúng
        const gui = lab.gui;

        const position = gui.addFolder("position");
        position.add(cube.position, "x", -4, 4, 0.01);
        position.add(cube.position, "y", -4, 4, 0.01);
        position.add(cube.position, "z", -4, 4, 0.01);

        // rotation tính bằng RADIAN, không phải độ
        const rotation = gui.addFolder("rotation (radian)");
        rotation.add(cube.rotation, "x", -Math.PI, Math.PI, 0.01);
        rotation.add(cube.rotation, "y", -Math.PI, Math.PI, 0.01);
        rotation.add(cube.rotation, "z", -Math.PI, Math.PI, 0.01);

        const scale = gui.addFolder("scale");
        scale.add(cube.scale, "x", 0.1, 3, 0.01);
        scale.add(cube.scale, "y", 0.1, 3, 0.01);
        scale.add(cube.scale, "z", 0.1, 3, 0.01);

        gui.add(cube, "visible");
        gui.add(cube.rotation, "order", ["XYZ", "YXZ", "ZXY", "ZYX", "YZX", "XZY"]);

        const deg = (rad: number) => ((rad * 180) / Math.PI).toFixed(0);

        lab.onTick(() => {
          lab.readout(
            `rotation  x=${deg(cube.rotation.x)}°  y=${deg(cube.rotation.y)}°  z=${deg(cube.rotation.z)}°\n` +
              `order     ${cube.rotation.order}   (đổi thứ tự -> kết quả khác)\n` +
              `matrix[12..14]  ${cube.matrix.elements
                .slice(12, 15)
                .map((n) => n.toFixed(2))
                .join("  ")}`,
          );
        });
      },
    },
  ],
};
