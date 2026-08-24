import * as THREE from "three";
import { disposeObject } from "~/lab";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "may-do-ro-ri",
      title: "Máy đo rò rỉ",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, renderer } = lab;

        const params = { cleanUp: false };
        lab.gui.add(params, "cleanUp").name("gọi dispose()");
        lab.on(renderer.domElement, "click", () => {
          params.cleanUp = !params.cleanUp;
          lab.gui.controllers.forEach((c) => c.updateDisplay());
        });

        let batch: THREE.Group | null = null;
        let timer = 0;

        function spawn() {
          const group = new THREE.Group();
          for (let i = 0; i < 40; i++) {
            const mesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.4, 0.4, 0.4),
              new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }),
            );
            mesh.position.set(
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 6,
            );
            group.add(mesh);
          }
          return group;
        }

        lab.onTick((delta) => {
          timer += delta;
          if (timer > 0.5) {
            timer = 0;
            if (batch) {
              if (params.cleanUp) disposeObject(batch);
              else scene.remove(batch);
            }
            batch = spawn();
            scene.add(batch);
          }

          lab.readout(
            `bấm vào scene để bật/tắt dispose()\n` +
              `chế độ: ${params.cleanUp ? "dispose()  ✅" : "chỉ remove()  ❌"}\n` +
              `geometries: ${renderer.info.memory.geometries}\n` +
              `textures:   ${renderer.info.memory.textures}`,
          );
        });
      },
    },
  ],
};
