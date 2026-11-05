import type { LessonModuleType } from "~/lab";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

/**
 * Bài 13 — Object3D
 * position, rotation, scale chỉ là lớp vỏ của một ma trận 4×4.
 *
 * Note      /blog/threejs/object3d/object3d — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/13-object3d.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "matrix",
      title: "Vặn từng thuộc tính, nhìn ma trận đổi theo",
      setup: (lab) => {
        const { scene, onTick, readout, gui } = lab;

        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8 }),
        );
        cube.position.y = 0.5;
        scene.add(cube);

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
        gui.add(cube, "castShadow");

        const deg = (rad: number) => ((rad * 180) / Math.PI).toFixed(0);

        onTick(() => {
          readout(
            `rotation  x=${deg(cube.rotation.x)}°  y=${deg(cube.rotation.y)}°  z=${deg(cube.rotation.z)}°\n` +
              `order     ${cube.rotation.order}   (đổi thứ tự -> kết quả khác)\n` +
              `matrix[12..14]  ${cube.matrix.elements
                .map((n) => n.toFixed(2))
                .join("  ")}`,
          );
        });
      },
    },
  ],
};
