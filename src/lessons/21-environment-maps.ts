import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "roughness",
      title: "Năm quả cầu kim loại, không một cái đèn nào",
      // KHÔNG đèn nào cả — toàn bộ ánh sáng đến từ environment map
      lab: { helpers: false, lights: false },
      setup: (lab) => {
        const { scene, renderer } = lab;
        lab.camera.position.set(0, 0, 8);

        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const envMap = pmrem.fromScene(room, 0.04).texture;

        scene.environment = envMap;
        scene.background = envMap;
        scene.backgroundBlurriness = 0.35;

        const geometry = new THREE.SphereGeometry(0.85, 64, 32);
        const spheres: THREE.Mesh[] = [];

        for (let i = 0; i < 5; i++) {
          const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: i / 4,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = (i - 2) * 2;
          scene.add(mesh);
          spheres.push(mesh);
        }

        const params = {
          environment: true,
          background: true,
          blurriness: 0.35,
          intensity: 1,
          metalness: 1,
        };

        const gui = lab.gui;

        gui.add(params, "environment").name("scene.environment").onChange((on: boolean) => {
          scene.environment = on ? envMap : null;
        });

        gui.add(params, "background").name("scene.background").onChange((on: boolean) => {
          scene.background = on ? envMap : new THREE.Color(0x0e1116);
        });

        gui.add(params, "blurriness", 0, 1, 0.01).onChange((v: number) => {
          scene.backgroundBlurriness = v;
        });

        gui
          .add(params, "intensity", 0, 3, 0.01)
          .name("environmentIntensity")
          .onChange((v: number) => {
            scene.environmentIntensity = v;
          });

        gui.add(params, "metalness", 0, 1, 0.01).onChange((v: number) => {
          spheres.forEach((mesh) => {
            (mesh.material as THREE.MeshStandardMaterial).metalness = v;
          });
        });

        lab.onTick((delta) => {
          spheres.forEach((mesh) => (mesh.rotation.y += 0.2 * delta));
        });

        // PMREMGenerator giữ render target riêng -> dọn khi rời bài
        lab.onCleanup(() => {
          envMap.dispose();
          pmrem.dispose();
          room.dispose();
        });

        lab.readout(
          "Trái: roughness 0 (như gương).  Phải: roughness 1 (kim loại xước).\n" +
            "Tắt scene.environment -> năm quả cầu đen thui trên nền đẹp.",
        );
      },
    },
  ],
};
