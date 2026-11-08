import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 18 — lil-gui
 * Thư mục, dropdown, preset, và mẹo trỏ thẳng vào object Three.js.
 *
 * Note      /blog/threejs/geometry-material/lil-gui — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/18-lil-gui.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "dashboard",
      title: "Dashboard đầy đủ: thư mục, dropdown, preset",
      setup: (lab) => {
        const { scene, gui, onTick } = lab;

        const shapes: Record<string, THREE.BufferGeometry> = {
          Box: new THREE.BoxGeometry(1.4, 1.4, 1.4),
          Sphere: new THREE.SphereGeometry(0.9, 48, 24),
          Torus: new THREE.TorusGeometry(0.7, 0.3, 24, 64),
          Knot: new THREE.TorusKnotGeometry(0.6, 0.25, 128, 24),
        };

        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.4,
        });
        const mesh = new THREE.Mesh(shapes.Box, material);
        mesh.position.y = 0.7;
        scene.add(mesh);

        const params = {
          shape: "Box",
          color: "#38bdf8",
          speed: 0.6,
          spin: true,
          luuPreset: () => console.log(JSON.stringify(gui.save(), null, 2)),
        };

        gui
          .add(params, "shape", Object.keys(shapes))
          .name("hình")
          .onChange((name) => {
            mesh.geometry = shapes[name];
          });

        const look = gui.addFolder("Vẻ ngoài");
        look.addColor(params, "color").onChange((v) => material.color.set(v));
        look.add(material, "roughness", 0, 1, 0.01);
        look.add(material, "metalness", 0, 1, 0.01);
        look.add(material, "wireframe");

        const motion = gui.addFolder("Chuyển động");
        motion.add(params, "spin").name("đang xoay");
        motion.add(params, "speed", 0, 4, 0.01).name("tốc độ");

        gui.add(params, "luuPreset").name("in preset ra console");

        onTick((delta) => {
          if (params.spin) mesh.rotation.y += params.speed * delta;
        });
      },
    },
  ],
};
