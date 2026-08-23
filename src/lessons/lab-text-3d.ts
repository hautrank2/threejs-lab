import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import type { LessonModuleType } from "~/lab";

const FONT_URL = "/fonts/helvetiker_regular.typeface.json";

/**
 * Vẽ chữ lên canvas 2D rồi dùng canvas đó làm texture cho một PlaneGeometry.
 * Rẻ nhất trong ba cách, nhưng chữ phẳng và mờ khi zoom gần.
 */
function textByTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    // đặt fillStyle TRƯỚC fillRect, nếu không ra màu đen mặc định
    ctx.fillStyle = "#1e40af";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "Bold 64px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace; // thiếu dòng này màu bị nhạt

  return new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
  );
}

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "ba-cach",
      title: "Ba cách đưa chữ vào scene",
      lab: { helpers: false },
      setup: async (lab) => {
        const { scene } = lab;
        lab.camera.position.set(0, 0, 6);

        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
        );
        cube.position.set(-3, -2.5, 0);
        scene.add(cube);

        // --- Cách 2: canvas texture (rẻ nhất) ---
        const textured = textByTexture("Texture");
        textured.position.set(0, -2, 0);
        scene.add(textured);

        // --- Cách 3: CSS2DRenderer (chữ là thẻ DOM, luôn nhìn thẳng camera) ---
        const labelRenderer = new CSS2DRenderer();
        const { width, height } = lab.size();
        labelRenderer.setSize(width, height);
        labelRenderer.domElement.className = "lab-css2d";
        lab.container.append(labelRenderer.domElement);

        const div = document.createElement("div");
        div.textContent = "Text from CSS2DRenderer";
        div.className = "lab-label";

        // CSS2DObject ĐÃ LÀ một Object3D — add thẳng vào scene
        const label = new CSS2DObject(div);
        label.position.set(0, 2, 0);
        scene.add(label);

        // CSS2DRenderer phải render mỗi frame, nếu không label không hiện
        lab.onTick(() => {
          const now = lab.size();
          labelRenderer.setSize(now.width, now.height);
          labelRenderer.render(scene, lab.camera);
        });

        lab.onCleanup(() => {
          label.removeFromParent();
          div.remove();
          labelRenderer.domElement.remove();
        });

        // --- Cách 1: TextGeometry (chữ 3D thật sự, có khối) ---
        let alive = true;
        lab.onCleanup(() => {
          alive = false;
        });

        const font = await new FontLoader().loadAsync(FONT_URL);
        if (!alive) return; // đã chuyển bài trước khi font tải xong

        const textGeo = new TextGeometry("TRAN TRUNG HAU", {
          font,
          size: 0.6,
          depth: 0.2, // trước r163 tên là "height"
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelSegments: 5,
        });
        textGeo.center(); // đưa chữ về giữa gốc toạ độ

        const textMesh = new THREE.Mesh(
          textGeo,
          new THREE.MeshStandardMaterial({
            color: 0xffcc33,
            metalness: 0.3,
            roughness: 0.4,
          }),
        );
        scene.add(textMesh);

        lab.onTick((delta, elapsed) => {
          cube.rotation.x += 0.25 * delta;
          cube.rotation.y += delta;
          textMesh.rotation.y = Math.sin(elapsed / 1.5) * 0.4;
        });
      },
    },
  ],
};
