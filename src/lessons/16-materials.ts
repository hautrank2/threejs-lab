import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 16 — Material
 * Thuộc tính chung, và hai thứ bắt buộc phải needsUpdate.
 *
 * Note      /blog/threejs/geometry-material/materials — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/16-materials.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "chung",
      title: "Thuộc tính chung, và hai thứ cần needsUpdate",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, gui } = lab;
        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.4,
        });

        const mesh = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1, 0.35, 128, 24),
          material,
        );
        scene.add(mesh);

        // một mặt phẳng phía sau, để thấy rõ transparent và opacity
        const back = new THREE.Mesh(
          new THREE.PlaneGeometry(8, 8),
          new THREE.MeshStandardMaterial({ color: 0x1e293b }),
        );
        back.position.z = -2;
        scene.add(back);

        const params = {
          color: "#38bdf8",
          side: THREE.FrontSide as number,
          flatShading: false,
        };

        gui.addColor(params, "color").onChange((v) => material.color.set(v));
        gui.add(material, "wireframe");
        gui.add(material, "visible");
        gui
          .add(material, "transparent")
          .onChange(() => (material.needsUpdate = true));
        gui.add(material, "opacity", 0, 1, 0.01);
        gui.add(material, "roughness", 0, 1, 0.01);
        gui.add(material, "metalness", 0, 1, 0.01);

        // hai thuộc tính dưới đây đổi cấu trúc shader -> BẮT BUỘC needsUpdate
        gui.add(params, "flatShading").onChange((v) => {
          material.flatShading = v;
          material.needsUpdate = true;
        });

        gui
          .add(params, "side", {
            Front: THREE.FrontSide,
            Back: THREE.BackSide,
            Double: THREE.DoubleSide,
          })
          .onChange((v) => {
            material.side = Number(v) as THREE.Side;
            material.needsUpdate = true;
          });
      },
    },
  ],
};
