import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "dashboard",
      title: "Dashboard đầy đủ: thư mục, dropdown, preset",
      setup: (lab) => {
        // bốn hình tạo sẵn MỘT LẦN — tạo mới trong onChange là rò rỉ GPU
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
        lab.scene.add(mesh);

        // mesh chỉ giữ một geometry tại một thời điểm -> ba cái còn lại tự dọn
        lab.onCleanup(() => {
          for (const geometry of Object.values(shapes)) geometry.dispose();
        });

        const gui = lab.gui;

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
          .onChange((name: string) => {
            mesh.geometry = shapes[name];
          });

        const look = gui.addFolder("Vẻ ngoài");
        look.addColor(params, "color").onChange((v: string) => material.color.set(v));
        look.add(material, "roughness", 0, 1, 0.01);
        look.add(material, "metalness", 0, 1, 0.01);
        look.add(material, "wireframe");

        const motion = gui.addFolder("Chuyển động");
        motion.add(params, "spin").name("đang xoay");
        motion.add(params, "speed", 0, 4, 0.01).name("tốc độ");

        gui.add(params, "luuPreset").name("in preset ra console");

        lab.onTick((delta) => {
          if (params.spin) mesh.rotation.y += params.speed * delta;
        });
      },
    },
  ],
};
