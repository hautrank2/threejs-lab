import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "tam-loai",
      title: "Tám loại đứng cạnh nhau",
      lab: { helpers: false },
      setup: (lab) => {
        lab.camera.position.set(0, 0, 10);

        const geometry = new THREE.SphereGeometry(0.8, 64, 32);

        const entries: Array<[string, THREE.Material]> = [
          ["Basic", new THREE.MeshBasicMaterial({ color: 0x38bdf8 })],
          ["Lambert", new THREE.MeshLambertMaterial({ color: 0x38bdf8 })],
          ["Phong", new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 100 })],
          [
            "Standard",
            new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              roughness: 0.3,
              metalness: 0.4,
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
          lab.scene.add(mesh);
        });

        // nhãn tên bằng canvas -> sprite, không cần font loader
        entries.forEach(([name], i) => {
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 64;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "32px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(name, 128, 44);

          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;

          const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.scale.set(2, 0.5, 1);
          sprite.position.set(
            ((i % 4) - 1.5) * 2.2,
            (i < 4 ? 1.2 : -1.2) - 1.2,
            0,
          );
          lab.scene.add(sprite);

          // Sprite không phải Mesh -> disposeObject() bỏ qua, phải tự dọn
          lab.onCleanup(() => {
            texture.dispose();
            spriteMaterial.dispose();
          });
        });

        lab.readout(
          "Hàng trên: Basic, Lambert, Phong, Standard\n" +
            "Hàng dưới: Physical, Normal, Toon, Depth",
        );
      },
    },
  ],
};
