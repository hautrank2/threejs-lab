import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "fps",
      title: "Nhìn FPS tụt theo thời gian thực",
      setup: (lab) => {
        const stats = new Stats();
        stats.showPanel(0); // 0 = FPS, 1 = ms mỗi frame, 2 = bộ nhớ
        stats.dom.classList.add("lab-stats");
        lab.container.append(stats.dom);
        lab.onCleanup(() => stats.dom.remove());

        const geometry = new THREE.TorusKnotGeometry(0.7, 0.25, 128, 32);
        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.3,
        });

        const knots: THREE.Mesh[] = [];

        // bấm chuột để thêm 20 cái nữa — nhìn FPS tụt theo thời gian thực
        function addKnots(count: number) {
          for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 12,
            );
            lab.scene.add(mesh);
            knots.push(mesh);
          }
        }

        addKnots(20);
        lab.on(lab.renderer.domElement, "click", () => addKnots(20));

        lab.gui.add({ them: () => addKnots(20) }, "them").name("thêm 20 nút thắt");

        lab.onTick((delta) => {
          stats.update();
          for (const knot of knots) knot.rotation.y += 0.4 * delta;
        });
      },
    },
  ],
};
