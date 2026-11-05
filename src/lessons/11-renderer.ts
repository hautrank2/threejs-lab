import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 11 — Renderer
 * Nơi duy nhất chạm vào GPU, và ba thiết lập quyết định đẹp hay nhoè.
 *
 * Note      /blog/threejs/ba-thanh-phan/renderer — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/11-renderer.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "tone-mapping",
      title: "Pixel ratio, tone mapping và ba con số",
      lab: { helpers: false },
      setup: (lab) => {
        // TODO — Pixel ratio, tone mapping và ba con số

        const { scene, renderer, onTick, readout, gui } = lab;

        const knot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1, 0.35, 200, 32),
          new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            metalness: 0.6,
            roughness: 0.25,
          }),
        );
        scene.add(knot);

        const params: {
          pixelRatio: number;
          toneMapping: number;
          exposure: number;
        } = {
          pixelRatio: Math.min(devicePixelRatio, 2),
          toneMapping: THREE.ACESFilmicToneMapping,
          exposure: 1,
        };

        gui
          .add(params, "pixelRatio", 0.25, 3, 0.25)
          .name("devicePixelRatio")
          .onChange((value) => {
            renderer.setPixelRatio(value);
            renderer.setSize(innerWidth, innerHeight);
          });

        gui
          .add(params, "toneMapping", {
            None: THREE.NoToneMapping,
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
          })
          .onChange(
            (value) =>
              (renderer.toneMapping = Number(value) as THREE.ToneMapping),
          );

        gui
          .add(params, "exposure", 0, 3, 0.01)
          .onChange((value) => (renderer.toneMappingExposure = value));

        renderer.toneMapping = params.toneMapping as THREE.ToneMapping;

        let frames = 0;
        let acc = 0;

        onTick((delta) => {
          knot.rotation.y += 0.4 * delta;

          frames++;
          acc += delta;
          if (acc >= 0.5) {
            readout(
              `FPS        ${Math.round(frames / acc)}\n` +
                `draw call  ${renderer.info.render.calls}\n` +
                `triangles  ${renderer.info.render.triangles.toLocaleString("vi-VN")}\n` +
                `pixel vẽ   ${((innerWidth * innerHeight * params.pixelRatio ** 2) / 1e6).toFixed(1)}M`,
            );
            frames = 0;
            acc = 0;
          }
        });
      },
    },
  ],
};
