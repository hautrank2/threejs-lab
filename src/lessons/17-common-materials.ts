import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 17 — Các material hay dùng
 * Tám loại đặt cạnh nhau, và cây quyết định chọn loại nào.
 *
 * Note      /blog/threejs/geometry-material/common-materials — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/17-common-materials.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "tam-loai",
      title: "Tám loại đứng cạnh nhau",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, camera } = lab;

        camera.position.set(0, 0, 10);

        const geometry = new THREE.SphereGeometry(0.8, 64, 32);

        const entries: [string, THREE.Material][] = [
          ["Basic", new THREE.MeshBasicMaterial({ color: 0x38bdf8 })],
          ["Lambert", new THREE.MeshLambertMaterial({ color: 0x38bdf8 })],
          [
            "Phong",
            new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 100 }),
          ],
          [
            "Standard",
            new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              roughness: 0.3,
            }),
          ],
          [
            "Physical",
            new THREE.MeshPhysicalMaterial({
              color: 0x38bdf8,
              roughness: 0.3,
              metalness: 0.4,
              clearcoat: 1,
            }),
          ],
          ["Normal", new THREE.MeshNormalMaterial()],
          ["Toon", new THREE.MeshToonMaterial({ color: 0x38bdf8 })],
          ["Depth", new THREE.MeshDepthMaterial()],
        ];

        entries.forEach(([, material], i) => {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(((i % 4) - 1.5) * 2.2, i < 4 ? 1.2 : -1.2, 0);
          scene.add(mesh);
        });

        // nhãn tên bằng canvas -> sprite, không cần font loader
        entries.forEach(([name], i) => {
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 64;

          const ctx = canvas.getContext("2d")!;
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "32px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(name, 128, 44);

          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;

          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({ map: texture }),
          );
          sprite.scale.set(2, 0.5, 1);
          sprite.position.set(
            ((i % 4) - 1.5) * 2.2,
            (i < 4 ? 1.2 : -1.2) - 1.2,
            0,
          );
          scene.add(sprite);
        });
      },
    },
  ],
};
